// Questi UI – ein Bild je Fachbaustein und je Screen: Story in Hell und Dunkel nebeneinander, 470 pt breit (430-pt-Gerät samt Phone-Rahmen), @2x.
// Ergebnis: src/components/<Name>/<Name>.png (erste Story je Ordner) · src/app/screens/<Screen>.png (jede Screen-Story) · src/app/App.png, src/app/Cover.png.
// Aufruf: npm run shots                          → baut den Katalog (ladle build) und rendert alles
//         npm run shots -- QuestRow HeuteScreen  → nur diese
//         --changed   nur Bilder, die älter sind als ihr Code (Baustein: eigener Ordner; Screen: src/app, src/data) oder als
//                     gemeinsame Styles, Kategorien und Nordhaus (../NordhausUI/src)
//         --no-build  nimmt den vorhandenen build/ · --parallel=N Seiten gleichzeitig (Standard: Kerne − 2, höchstens 12)
// Werkzeuge (Browser, Server, Schriftschutz, Arbeitsverteilung) kommen aus ../NordhausUI/scripts/katalog.mjs.
// Braucht Playwright (devDependency) und einmalig: npx playwright install chromium
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { only, flag, PARALLEL, baue, server, browser, schriftDa, pool } from '../../NordhausUI/scripts/katalog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 470,
  GAP = 24,
  SCALE = 2; // 430 pt Gerät + Rand des Phone-Rahmens
const t0 = Date.now();

// Jüngste Änderung unter einem Ordner (rekursiv) bzw. einer Datei
const juengste = (p) => {
  if (!fs.existsSync(p)) return 0;
  const st = fs.statSync(p);
  if (!st.isDirectory()) return st.mtimeMs;
  return Math.max(
    0,
    ...fs
      .readdirSync(p)
      .filter((f) => !f.endsWith('.png'))
      .map((f) => juengste(path.join(p, f))),
  );
};

baue(root);
const build = path.join(root, 'build');
const meta = JSON.parse(fs.readFileSync(path.join(build, 'meta.json'), 'utf8')).stories;

// Ziel je Story: Fachbaustein (erste Story je Ordner) → components/<Name>/<Name>.png; Screen → app/screens/<Export>.png; App / Cover → app/<Name>.png
const stories = {};
for (const [id, s] of Object.entries(meta)) {
  const fp = s.filePath.replace(/\\/g, '/');
  let m;
  if ((m = /src\/components\/([^/]+)\//.exec(fp))) {
    if (!stories[m[1]])
      stories[m[1]] = { id, out: `src/components/${m[1]}/${m[1]}.png`, quelle: `src/components/${m[1]}` };
    continue;
  }
  if (/src\/app\/App\.stories/.test(fp)) {
    stories.App = { id, out: 'src/app/App.png', quelle: 'src/app' };
    continue;
  }
  if (/src\/app\/Cover\.stories/.test(fp)) {
    stories.Cover = { id, out: 'src/app/Cover.png', quelle: 'src/app' };
    continue;
  }
  if (/src\/app\/[a-z]+\.stories/.test(fp)) {
    const name = id
      .split('--')
      .pop()
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join('');
    stories[name] = { id, out: `src/app/screens/${name}.png`, quelle: 'src/app' };
  }
}

let names = (only.length ? only : Object.keys(stories)).sort();
const missing = names.filter((n) => !stories[n]);
if (missing.length) {
  console.error('Keine Story für: ' + missing.join(', '));
  process.exit(1);
}
if (flag('--changed') && !only.length) {
  const basis = Math.max(
    ...['src/styles', 'src/categories.js', 'src/index.js', '.ladle', '../NordhausUI/src'].map((p) =>
      juengste(path.join(root, p)),
    ),
  );
  const daten = juengste(path.join(root, 'src/data'));
  names = names.filter((n) => {
    const { out, quelle } = stories[n];
    const f = path.join(root, out);
    if (!fs.existsSync(f)) return true;
    const t = fs.statSync(f).mtimeMs + 1000;
    // Screens und Bausteine zeigen den Datenstand – Änderungen dort machen alle Bilder alt
    return basis > t || daten > t || juengste(path.join(root, quelle)) > t;
  });
  if (!names.length) {
    console.log('Alle Bilder sind aktuell.');
    process.exit(0);
  }
}

const srv = await server(build);
const b = await browser();
let n = 0;
await pool(
  names,
  PARALLEL,
  async () => {
    const ctx = await b.newContext({
      viewport: { width: WIDTH, height: 900 },
      deviceScaleFactor: SCALE,
      locale: 'de-DE',
      timezoneId: 'Europe/Berlin',
      reducedMotion: 'reduce',
    });
    return { page: await ctx.newPage(), compose: await ctx.newPage() };
  },
  async ({ page, compose }, name) => {
    const { id, out: rel } = stories[name];
    const shot = async (theme) => {
      await page.goto(`${srv.base}/?story=${id}&mode=preview&theme=${theme}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await schriftDa(page);
      await page.waitForTimeout(150);
      return page.screenshot({ fullPage: true, type: 'png' });
    };
    const light = await shot('light');
    const dark = await shot('dark');
    const b64 = (buf) => 'data:image/png;base64,' + buf.toString('base64');
    await compose.setContent(`<!doctype html><html><body style="margin:0;background:#8a8782;display:flex;align-items:flex-start;gap:${GAP}px;width:max-content">
    <img src="${b64(light)}" style="display:block;width:${WIDTH}px"><img src="${b64(dark)}" style="display:block;width:${WIDTH}px"></body></html>`);
    await compose.setViewportSize({ width: WIDTH * 2 + GAP, height: 100 });
    const out = path.join(root, rel);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await compose.screenshot({ path: out, fullPage: true, type: 'png' });
    n++;
    console.log(rel);
  },
);
await b.close();
srv.close();
console.log(
  `${n} Bilder geschrieben · ${Math.round((Date.now() - t0) / 1000)} s mit ${Math.min(PARALLEL, names.length)} parallelen Seiten.`,
);

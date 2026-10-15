// Questi UI – ein Bild je Fachbaustein und je Screen: Story in Hell und Dunkel nebeneinander, 470 pt breit (430-pt-Gerät samt Phone-Rahmen), @2x.
// Ergebnis: src/components/<Name>/<Name>.png (erste Story je Ordner) · src/app/screens/<Screen>.png (jede Screen-Story) · src/app/App.png, src/app/Cover.png.
// Aufruf: npm run shots            → baut den Katalog (ladle build) und rendert alle Komponenten
//         npm run shots -- QuestRow HeuteScreen   → nur diese; --no-build nimmt den vorhandenen build/
// Braucht Playwright (devDependency) und einmalig: npx playwright install chromium
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith('--'));
const WIDTH = 470, GAP = 24, SCALE = 2; // 430 pt Gerät + Rand des Phone-Rahmens

if (!args.includes('--no-build')) {
  console.log('ladle build …');
  execSync('npx ladle build', { cwd: root, stdio: 'inherit' });
}
const build = path.join(root, 'build');
const meta = JSON.parse(fs.readFileSync(path.join(build, 'meta.json'), 'utf8')).stories;

// Ziel je Story: Fachbaustein (erste Story je Ordner) → components/<Name>/<Name>.png; Screen → app/screens/<Export>.png; App / Cover → app/<Name>.png
const stories = {};
for (const [id, s] of Object.entries(meta)) {
  const fp = s.filePath.replace(/\\/g, '/');
  let m;
  if ((m = /src\/components\/([^/]+)\//.exec(fp))) { if (!stories[m[1]]) stories[m[1]] = { id, out: `src/components/${m[1]}/${m[1]}.png` }; continue; }
  if (/src\/app\/App\.stories/.test(fp)) { stories.App = { id, out: 'src/app/App.png' }; continue; }
  if (/src\/app\/Cover\.stories/.test(fp)) { stories.Cover = { id, out: 'src/app/Cover.png' }; continue; }
  if (/src\/app\/[a-z]+\.stories/.test(fp)) { const name = id.split('--').pop().split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(''); stories[name] = { id, out: `src/app/screens/${name}.png` }; }
}
const names = (only.length ? only : Object.keys(stories)).sort();
const missing = names.filter((n) => !stories[n]);
if (missing.length) { console.error('Keine Story für: ' + missing.join(', ')); process.exit(1); }

// Statischer Server für build/ (Ladle ist eine Single-Page-App)
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let f = path.join(build, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(build, 'index.html');
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// --lang: native Datums- und Zeitfelder formatieren nach der Oberflächensprache, nicht nach locale (Regel 9: deutsch, 24 h)
const browser = await chromium.launch({
  args: ['--lang=de-DE', '--accept-lang=de-DE'],
  env: { ...process.env, LANG: 'de_DE.UTF-8', LANGUAGE: 'de_DE', LC_ALL: 'de_DE.UTF-8' },
});
const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: SCALE, locale: 'de-DE', timezoneId: 'Europe/Berlin', reducedMotion: 'reduce' });
const page = await ctx.newPage();
const compose = await ctx.newPage();

// Schutz: ohne die echte Schrift ist jedes Bild falsch – lieber abbrechen als mit Ersatzschrift rendern
async function schriftDa(page) {
  const fehlt = await page.evaluate(async () => {
    const proben = ['200', '300', '400', '500'].map((w) => `${w} 17px "Hanken Grotesk"`).concat('400 13px "JetBrains Mono"');
    const r = await Promise.all(proben.map((p) => document.fonts.load(p).then((f) => (f.length ? null : p), () => p)));
    return r.filter(Boolean);
  });
  if (fehlt.length) throw new Error(`Schrift nicht geladen: ${fehlt.join(', ')} – nordhaus-ui/src/fonts.css in .ladle/components.jsx prüfen`);
}
async function shot(id, theme) {
  await page.goto(`${base}/?story=${id}&mode=preview&theme=${theme}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await schriftDa(page);
  await page.waitForTimeout(150);
  return page.screenshot({ fullPage: true, type: 'png' });
}
let n = 0;
for (const name of names) {
  const { id, out: rel } = stories[name];
  const light = await shot(id, 'light');
  const dark = await shot(id, 'dark');
  const b64 = (buf) => 'data:image/png;base64,' + buf.toString('base64');
  await compose.setContent(`<!doctype html><html><body style="margin:0;background:#8a8782;display:flex;align-items:flex-start;gap:${GAP}px;width:max-content">
    <img src="${b64(light)}" style="display:block;width:${WIDTH}px"><img src="${b64(dark)}" style="display:block;width:${WIDTH}px"></body></html>`);
  await compose.setViewportSize({ width: WIDTH * 2 + GAP, height: 100 });
  const out = path.join(root, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await compose.screenshot({ path: out, fullPage: true, type: 'png' });
  n++;
  console.log(rel);
}
await browser.close();
server.close();
console.log(`${n} Bilder geschrieben.`);

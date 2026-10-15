// Questi UI – alles in einem Lauf: Lint (ohne Bild-Stufe) → nur veraltete Bilder neu (parallel) → Lint.
// Aufruf: npm run check            (vor jedem Commit und am Ende jeder Runde)
//         npm run check -- --alle   alle Bilder neu statt nur der veralteten
// Exit 1, sobald eine Stufe Befunde hat. Danach ansehen: npm run bogen (nur neu gerenderte Bilder).
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const t0 = Date.now();
const lint = () =>
  spawnSync(process.execPath, ['../NordhausUI/scripts/lint.mjs', '--root', '.'], { cwd: root, encoding: 'utf8' });
const befunde = (r, mitBild) =>
  r.stdout.split('\n').filter((z) => /^\s+\[/.test(z) && (mitBild || !/\[Bild\]/.test(z)));

const vor = befunde(lint(), false);
console.log(`▸ Lint: ${vor.length ? vor.length + ' Befunde' : 'ok'}`);
if (vor.length) {
  console.log(vor.join('\n'));
  process.exit(1);
}
console.log('\n▸ Bilder');
const bilder = spawnSync(process.execPath, ['scripts/shots.mjs', ...(args.includes('--alle') ? [] : ['--changed'])], {
  cwd: root,
  stdio: 'inherit',
});
const nach = lint();
const rest = befunde(nach, true);
console.log(`\n▸ Lint: ${rest.length ? rest.length + ' Befunde' : 'ok'}`);
if (rest.length) console.log(rest.join('\n'));
const gruen = bilder.status === 0 && nach.status === 0;
console.log(`\n${gruen ? 'Alles grün' : 'Befunde – siehe oben'} · ${Math.round((Date.now() - t0) / 1000)} s gesamt`);
process.exit(gruen ? 0 : 1);

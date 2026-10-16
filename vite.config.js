// Nordhaus liegt als Ordner daneben (file:../NordhausUI) und wird direkt aus den Quellen geladen –
// Änderungen dort erscheinen sofort. dedupe sorgt dafür, dass beide Projekte dasselbe React benutzen.
// alias: Pfad statt des Verweises in node_modules – den Windows-Verweis (Junction) kann die Linux-Sandbox
// auf dem Rechner nicht lesen; Ziel ist auf allen Systemen derselbe Ordner.
import { fileURLToPath } from 'node:url';

export default {
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: { 'nordhaus-ui': fileURLToPath(new URL('../NordhausUI', import.meta.url)) },
  },
};

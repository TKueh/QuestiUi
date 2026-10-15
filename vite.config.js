// Nordhaus liegt als Ordner daneben (file:../NordhausUI) und wird direkt aus den Quellen geladen –
// Änderungen dort erscheinen sofort. dedupe sorgt dafür, dass beide Projekte dasselbe React benutzen.
export default {
  resolve: { dedupe: ['react', 'react-dom'] },
};

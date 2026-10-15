// Ladle: Reihenfolge – App und Screens zuerst, dann die Fachbausteine. Die Schriften lädt .ladle/components.jsx lokal aus Nordhaus (src/fonts.css).
export default {
  storyOrder: () => [
    'app*',
    'screens*',
    'geräterahmen*',
    'zeilen*',
    'training*',
    'ernährung-und-finanzen*',
    'pläne-und-import*',
  ],
};

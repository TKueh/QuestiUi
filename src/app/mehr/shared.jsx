/* Änderungen wie ein Mensch sie zählt: entfernt, neu, geändert, verschoben – je Übung eine */
function diffCount(a, b) {
  const ia = a.map((x) => x.id);
  const ib = b.map((x) => x.id);
  let n = 0;
  ia.forEach((id) => {
    if (!ib.includes(id)) n++;
  });
  b.forEach((x) => {
    const o = a[ia.indexOf(x.id)];
    if (!o) n++;
    else if (o.title !== x.title || o.detail !== x.detail) n++;
  });
  const ca = ia.filter((id) => ib.includes(id));
  const cb = ib.filter((id) => ia.includes(id));
  ca.forEach((id, k) => {
    if (cb[k] !== id) n++;
  });
  return n;
}
/* Finanzplan: Verträge und Ziele sind die Quelle; Übersicht und Gruppen rechnen daraus */
const CONTRACTS = [
  ['Miete', 720, 'household', 'Wohnen'],
  ['Haftpflicht', 6.9, 'finance', 'Versicherungen'],
  ['Kfz-Versicherung', 46.8, 'finance', 'Versicherungen'],
  ['Hausrat', 8.5, 'finance', 'Versicherungen'],
  ['Handyvertrag', 24.99, 'work', 'Abos'],
  ['Judo-Verein', 32, 'training', 'Sport'],
  ['Sparplan', 250, 'personal', 'Sparen'],
];
const GOALS = [
  { label: 'Notgroschen', value: 4200, total: 6000, tone: 'finance' },
  { label: 'Urlaub 2027', value: 650, total: 1800, tone: 'personal' },
];

export { diffCount, CONTRACTS, GOALS };

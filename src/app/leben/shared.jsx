/* ---------- 3 · Leben ---------- */
/* Eine Zuordnung für beide Listen: offen (Idee, Wunsch) aus · festgelegt (Geplant, Entschieden) Graphit · erledigt (Besorgt, Gekauft, Verschenkt) an */
const GIFT = [
  { value: 'idea', label: 'Idee', led: 'off' },
  { value: 'planned', label: 'Geplant', led: 'ink' },
  { value: 'bought', label: 'Besorgt', led: 'on' },
  { value: 'given', label: 'Verschenkt', led: 'on' },
];
const WISH = [
  { value: 'idea', label: 'Wunsch', led: 'off' },
  { value: 'planned', label: 'Entschieden', led: 'ink' },
  { value: 'bought', label: 'Gekauft', led: 'on' },
  { value: 'given', label: 'Verschenkt', led: 'on' },
];

export { GIFT, WISH };

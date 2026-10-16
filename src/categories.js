import N from 'nordhaus-ui/src/bare.js';

/* Die acht Lebensbereiche der Quest-App: Wort, Icon und ein Nordhaus-Datenton. Nordhaus selbst kennt nur die Töne. */
const CATEGORIES = N.setCategories(
  {
    food: { label: 'Ernährung', icon: 'leaf', tone: 'olive' },
    training: { label: 'Training', icon: 'dumbbell', tone: 'wine' },
    movement: { label: 'Bewegung', icon: 'walk', tone: 'ochre' },
    household: { label: 'Haushalt', icon: 'basket', tone: 'umber' },
    finance: { label: 'Finanzen', icon: 'coin', tone: 'slate' },
    personal: { label: 'Persönlich', icon: 'note', tone: 'violet' },
    birthday: { label: 'Geburtstage', icon: 'gift', tone: 'rose' },
    work: { label: 'Arbeit', icon: 'briefcase', tone: 'teal' },
  },
  true,
);

export { CATEGORIES };

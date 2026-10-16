# DayModePicker

Betriebsartenschalter Normal · Krank · Urlaub – drei Kartentasten der `Nordhaus.SegmentedControl variant="tiles"` mit Icon, LED und Satz; die aktive rastet ein.

- `value` / `defaultValue` (`normal` · `sick` · `vacation`), `onChange`, `label`.
- Krank pausiert Training und Bewegung, Urlaub pausiert Pläne; die Serie zählt neutral weiter. `ThemePicker` (Automatisch · Hell · Dunkel, ohne Icon) ist dieselbe Kartentaste mit Theme-Miniaturen: `value` / `defaultValue` (`system` · `light` · `dark`), `onChange`, `label`.

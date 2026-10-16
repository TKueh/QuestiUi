# ChangeList

Änderungsliste zur Prüfung (Plan-Versionen, Kalenderimport): je Zeile Übernehmen-Haken, Art (Neu/Geändert/Entfällt/Konflikt als Zeichen + Wort), Titel und Vorher → Nachher. Konflikte sind standardmäßig nicht angehakt.

- `items` (`{ type: 'add'|'change'|'remove'|'conflict', title, before, after, note }`), `value` / `defaultValue`, `onChange`.
- Art-Icons 12 pt mit dem Standardstrich 1,5. Der Pfeil zwischen Vorher und Nachher wird als „wird zu“ gelesen.
- Die Art-Spalte ist fest (8,4 em der Label-Stufe), damit die Titel eine Spalte bilden – ein Fahrplan, keine Zeile für sich.
- Werte ohne Fläche: Vorher gestrichen in `ink-muted`, Nachher in `ink` (bei „Geändert“ halbfett). Keine hinterlegten Wert-Plättchen.

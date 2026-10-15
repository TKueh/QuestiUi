# DayPanel

Das Tagesdetail unter dem Monatskalender: Wochentag (bzw. „Heute“), Datum, der Tagesstand als Zähler mit Segmentlinie, eine Hinzufügen-Taste und darunter die Terminzeilen. Ein freier Tag zeigt einen kompakten Leerzustand. Dazu gehört `AgendaDay`, die aufklappbare Tagesgruppe der Listenansicht.

- `DayPanel`: `date`, `today`, `done`, `total`, `events` (Props wie `EventRow`), `onAdd`, `addLabel` (Standard „Hinzufügen“ – ein Verb).
- `AgendaDay`: `date`, `events`, `done`, `today`, `defaultOpen`. Aufgeklappte Tage bleiben bei einer Aktualisierung offen.
- Der Kopf bricht bei schmalen Breiten um: Datum oben, Stand und Taste darunter.
- Das `DayPanel` ist die Listenalternative zum Wochenraster: `CalendarWeek onDayClick` öffnet es.

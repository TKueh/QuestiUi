# EventRow

Terminzeile – ein `Nordhaus.ListItem` mit Zeitspalte (Beginn/Ende oder „Tag“), Fahrplan-Linie in der Kategoriefarbe (`rule`), Titel und Kategorie bzw. „Erledigt“ / „Kalenderblock“; rechts Pfeil, erledigt Haken.

- `start`, `end`, `allDay`, `title`, `subtitle`, `category`, `done`, `context` (fremder Kalenderblock, nie erledigt), `onClick`.
- `DayPanel` (Tagesdetail unter dem Monat) und `AgendaDay` (aufklappbare Tagesgruppe) setzen sie in Listen.

# QuestRow

Aufgabenzeile – ein `Nordhaus.ListItem` mit Abhak-Ring (`check`), Kennmarke der Kategorie, Titel, Beschreibung, Schritten („1/3“ als `meta`) und den Flags „Verpasst“ (`danger`) und „Pausiert“; die Zeile öffnet das Detail.

- `title`, `description`, `category`, `done` / `defaultDone`, `onToggle`, `onOpen`, `steps` (`[erledigt, gesamt]`), `time`, `status` (`missed`), `paused`.
- `QuestList`: `groups` (`{ title, items }`) oder `items`; der Gruppenstand folgt dem Abhaken – eine Quelle für Zeile und Zähler.
- Die Zeile ist mindestens 56 pt hoch (`row-h`, wie jede Fahrplan-Zeile seit Nordhaus 6.3 – ohne eigene Sonderhöhe); lange Beschreibungen brechen um statt zu kürzen.

# PlanPreviewWeek

Wochenvorschau für Planänderungen als **Fahrplan**: sieben Spalten mit kurzen Zeilen auf Haarlinien, das Änderungszeichen in eigener Zelle. Neu `+` in `positive`, geändert `~` in Graphit (500), entfällt `−` durchgestrichen. Keine getönten Kästchen.

- `days` (`[{ items: [{ title, short, state: 'same'|'add'|'change'|'remove' }] }]`), `from`, `title`.
- Screenreader hören den vollständigen Titel und den Zustand als Wort („…, neu“, „…, entfällt“, „…, geändert“), auch wenn die Zeile `short` zeigt. Kopf und Zeilen in `axis` bzw. `caption` – nie unter 10 pt.

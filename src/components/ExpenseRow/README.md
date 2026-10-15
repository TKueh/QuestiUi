# ExpenseRow

Ausgabenzeile – ein `Nordhaus.ListItem` mit Kennmarke, Titel, „Datum · Zahlungsart · Empfänger“ und dem Betrag rechts, tabellarisch mit Minus und zwei Nachkommastellen.

- `category`, `title`, `date`, `method`, `payee`, `amount` (Euro) oder `amountCents` (Vorrang), `onClick`.
- `HistoryGroup`: nach Datum gruppierter Verlauf – Kopf mit `date` und `summary` (Tagessumme), darunter die Zeilen als `children`.

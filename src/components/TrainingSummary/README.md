# TrainingSummary

Trainingszusammenfassung (Sätze, erfasste Last kg × Wdh., Dauer, Gefühl) und Trainingsgefühl als Schnellwahl: fünf Rasttasten von „Schwer“ bis „Stark“, die Wahl rastet in Graphit ein.

- `TrainingSummary`: `setsDone`, `setsTotal`, `load`, `duration`, `feeling`, `flat` (im Sheet ohne eigene Tafel).
- `FeelingPicker`: `value` / `defaultValue` (1–5, ohne Wert steht kein Zeiger), `onChange`, `label`. Baut auf `ChoiceRow.Quick` (ein Formularwert, kein Segment); Pfeiltasten wechseln.
- Last zählt nur abgehakte Sätze mit Zusatzgewicht – keine pauschale Kraftbewertung.

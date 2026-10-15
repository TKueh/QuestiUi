# TrainingSummary

Trainingszusammenfassung (Sätze, erfasste Last kg × Wdh., Dauer, Gefühl) und Trainingsgefühl als **Wahlskala**: fünf Rasten von „Schwer“ bis „Stark“, ein Graphit-Zeiger fährt zur Wahl.

- `TrainingSummary`: `setsDone`, `setsTotal`, `load`, `duration`, `feeling`.
- `FeelingPicker`: `value` / `defaultValue` (1–5, ohne Wert steht kein Zeiger), `onChange`, `label`. Baut auf `SegmentedControl block`; Pfeiltasten wechseln.
- Last zählt nur abgehakte Sätze mit Zusatzgewicht – keine pauschale Kraftbewertung.

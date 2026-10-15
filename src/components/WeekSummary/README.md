# WeekSummary

**Wochenpegel:** pro Tag ein Stapel kurzer Striche, ein Strich je geplanter Aufgabe (höchstens 12). Erledigt Graphit, offen `line-strong`; ein voller Tag steht ganz in Graphit. Darüber der Stand `3/10`, darunter der Wochentag.

- `days`: `[{ done, total, today, paused }]` (Mo–So).
- Heute: Wochentag in `current` mit 2-pt-Unterstrich, Stand in 500. Keine Signal-Fläche.
- Pausiert: Grundlinie gestrichelt, Wort „Pause“ – nie Signal, nie Deckkraft.
- Jeder Tag ist `role="img"` mit vollem Satz, z. B. „Mittwoch, heute: 3 von 10 erledigt“.

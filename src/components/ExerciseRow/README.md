# ExerciseRow

Eine Übung, gebaut wie eine Zeile im Fahrplan: links die laufende Nummer (`01`), daneben Name, Vorgabe (Sätze × Wiederholungen · Pause) und Hinweis, rechts das Gewicht. Darunter folgen die Satz-Tasten, eingerückt auf die Textkante. Übungen trennt eine Haarlinie, es gibt keinen Kasten.

- `index`, `name`, `sets`, `reps`, `rest`, `note`, `weight`, `planned` (Vorgabe: Label „Vorgabe“ und gestrichelte Linie), `setValues`, `deviations`, `doneSets`, `onEditWeight`, `editor` (Element unter der Übung, z. B. ein `Stepper` fürs Gewicht).
- `image` setzt statt der Nummer eine Abbildung aus dem Plan (`ExerciseFigure`, 56 pt, Nummer in der Ecke) auf `paper-figure` – in jedem Theme hell, damit Strichzeichnungen lesbar bleiben. Ohne Bild gibt es keinen Platzhalter.
- `WeightDisplay` steht auch allein: Wert 22/300 mit Einheit, Bearbeiten-Icon, Unterstrich beim Zeigen. `tag` setzt ein eigenes Versal-Label.
- Vergangene Trainings behalten ihre Werte. Geänderte Vorgaben gelten ab dem Änderungsdatum.

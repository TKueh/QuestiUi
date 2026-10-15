# KalenderMonatScreen
Kalender · Monat – vollständige Wochen mit Kalenderwochen-Spalte. Jede Zelle: Ziffer, bis zu vier Kategorie-Striche, Meilensteine (Geburtstag, Frist) als Kategorie-Icon mit einem Wort, unten der Tagesstand als feine Linie – Graphit bei Teilstand, Grün bei vollständig. Nachbarmonate ohne Marken.
- Auswahl ist das Graphit-Quadrat, heute die `current`-Ziffer mit Unterstrich, heute + gewählt die `current`-Fläche – wie in Wochenleiste und Liste.
- Legende unter dem Raster, weil die Striche allein Farbe sind. Darunter das Tagespanel des gewählten Tages. ‹ Heute › blättern Monate; Woche und Liste bleiben in der Vorschau auf der laufenden Woche (Tasten verriegelt).

# KalenderScreen
Kalender · Liste – die Standardansicht auf dem iPhone. Der große Titel ist immer der Monat; das Label darüber nennt den genauen Zeitraum (KW, Daten, A/B-Woche), rechts daneben Zurück · Heute · Weiter. Darunter der Ansichtsumschalter.
- Je Tag eine Fahrplan-Zeile: Wochentag und Datum links (heute in `current` mit Unterstrich), wichtigster Termin, Kategorie-Zähler mit Icon, rechts Zähler und Fortschrittslinie (Grün, wenn vollständig).
- Darunter das Tagespanel des gewählten Tages: Zähler mit Segmentfortschritt (ein Segment je Quest), ganztägige Einträge, Kalenderblöcke (gestrichelt) und Termine. Tippen öffnet den Termin im Sheet (`TerminScreen`).
- Dieselben Daten wie Woche und Monat – die drei Ansichten zeigen dieselbe Woche.

# KalenderWocheScreen
Kalender · Woche – Zeitraster über die volle Höhe. Kopf wie in allen Kalenderansichten (Monat als Titel, Zeitraum als Label, Zurück · Heute · Weiter).
- Zeile „Tag“ für ganztägige Einträge, Stundenspalte mit Halbstunden-Strichen, heute als leicht getönte Spalte mit `current`-Datum, Jetzt-Linie mit Uhrzeit.
- Termine: Oberkante in Kategorie-Farbe, Titel, bei genug Höhe die Uhrzeit. Kalenderblöcke (Arbeit) als feine Schraffur, erledigte Termine durchgestrichen mit Haken, Überschneidungen nebeneinander.
- Spalten ≈ 56 pt; vollständige Inhalte öffnet ein Tipp im Sheet (`TerminScreen`).

# TerminScreen
Kalender → Termin antippen (Woche, Monat oder Liste). Kompaktes Sheet über dem Raster: Bereich und Quelle oben, Zeit als Label, Titel, Umfang; Wiederholung und Erinnerung als Wertzeilen; darunter die übrigen Termine desselben Tages. Ist der Termin ein Krafttraining, führt „Starten“ ins Training, sonst hakt „Abhaken“ die Quest ab. Kalenderblöcke haben keine Aktion.

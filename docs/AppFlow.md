# App-Flow

32 Screens in fünf Tabs, verbunden zu einer App (`Questi.App`, Karte **Ablauf**). Jede Screen-Karte startet diese App an ihrer Stelle; von dort ist alles weiter bedienbar.

## Darstellungsformen

| Form | Wann | Kopf | Abschluss |
| --- | --- | --- | --- |
| **Tab** | Einstieg in einen Bereich | Wortmarke, Suche, **+** = „Neue Quest“ (in jedem Tab gleich); großer Titel mit Label | – |
| **Register** | Gleichrangige Sichten eines Bereichs | `Tabs` bzw. `SegmentedControl` (Kalender); Anlegen im Register als beschriftete Taste der Werkzeugleiste | – |
| **Unterseite** | Verwaltung, die man gezielt aufruft | `BackButton` mit dem Namen der Herkunft; ein **+** hier legt das Objekt der Seite an und nennt es | – |
| **Formular-Sheet** | Anlegen, bearbeiten | „Abbrechen · Titel · Sichern/Hinzufügen“ | Prüft beim Sichern: Fehler am Feld, Fokus dorthin, Sheet bleibt offen; mit Eingaben fragt Abbrechen nach |
| **Detail-Sheet** | Ansehen, abhaken, abschließen | Bereich, Quelle, Schließen; Datum, Titel, Beschreibung | `ActionBar` mit genau einer `accent`-Taste; erledigt: „Wieder öffnen“ |
| **Dialog** | Rückfrage, die nicht übergangen werden darf | Titel und Satz | gestapelte Tasten; Escape = die sichere Wahl |

Rückmeldung nach jeder Handlung, die etwas sichert oder abhakt: ein Toast über der TabBar, bei Abhaken mit „Widerrufen“.

## Übersicht

| Bereich | Screen | Erreicht über | Form | Weiter |
| --- | --- | --- | --- | --- |
| 1 Heute | `HeuteScreen` | Tab Heute | Tab | Quest antippen · Ring abhaken · Einkauf, Training · **+** · Wochenleiste → Kalender |
| | `QuestDetailScreen` | Heute → Quest | Detail-Sheet | Schritte · Alles abhaken / Wieder öffnen |
| | `MahlzeitScreen` | Heute → Mittagsportion | Detail-Sheet (kompakt) | Abhaken |
| | `EinkaufScreen` | Heute → Einkauf | Detail-Sheet (groß) | Artikel abhaken; vollständig = Quest erledigt |
| | `TrainingScreen` | Heute → Training; Termin → Starten | Detail-Sheet (groß) | Sätze · Gewicht (Stepper) · Training abschließen |
| | `TrainingAbschlussScreen` | Training → abschließen | Detail-Sheet | Training sichern → Heute |
| | `NeueQuestScreen` | **+** in jedem Tab; Leben → Planen; Tagespanel → Quest | Formular-Sheet | Zeit (Uhrzeit · Ganztägig · Ohne), Wiederholung, Erinnerung, Bereich, Schritte, Notiz · Hinzufügen |
| | `NeueQuestFehlerScreen` | Neue Quest → Hinzufügen ohne Titel, Ende vor Beginn | Formular-Sheet | Felder korrigieren |
| 2 Kalender | `KalenderScreen` | Tab Kalender (Liste ist Standard) | Tab | Tag wählen → Tagespanel → Termin |
| | `KalenderWocheScreen` | Kalender → Woche | Register | Termin · Tageskopf → Liste des Tages |
| | `KalenderMonatScreen` | Kalender → Monat | Register | ‹ Heute › blättert · Tag → Tagespanel |
| | `TerminScreen` | Kalender → Termin | Detail-Sheet (kompakt) | Starten (Training) · Abhaken · Verschieben (Tag und Beginn im Sheet) |
| 3 Leben | `LebenScreen` | Tab Leben (Geburtstage) | Tab + Register | Zeile → Eintrag · Status · **+ Geburtstag** · Geschenk einplanen |
| | `LebenBacklogScreen` | Leben → Vorhaben | Register | **+ Vorhaben** (Formular-Sheet) · Planen → Neue Quest · Termin → Monat |
| | `LebenWuenscheScreen` | Leben → Wünsche | Register | **+ Wunsch** (Formular-Sheet) · Status |
| | `EintragScreen` | Leben → Geburtstag | Formular-Sheet | Sichern |
| 4 Fortschritt | `FortschrittScreen` | Tab Fortschritt (Alltag) | Tab + Register | – |
| | `GeschenkeWuenscheScreen` | Fortschritt → Geschenke & Wünsche | Register | bearbeitet wird in Leben |
| | `AusgabenScreen` | Fortschritt → Ausgaben | Register | **+ Ausgabe** · Zeile → bearbeiten · Löschen mit Rückgängig |
| | `AusgabeScreen` | Ausgaben → + Ausgabe (gezeigt: fehlender Betrag) | Formular-Sheet | Sichern |
| 5 Mehr | `MehrScreen` | Tab Mehr | Tab | Gesundheit, Meine Pläne, Krank & Urlaub, Einstellungen, Daten |
| | `HealthScreen` | Mehr → Gesundheit; Fortschritt → Gesundheit | Unterseite bzw. Register | **+** → Messung |
| | `MessungScreen` | Gesundheit → **+** | Formular-Sheet (kompakt) | Sichern |
| | `DeinTagScreen` | Mehr → Krank & Urlaub | Detail-Sheet | Urlaub eintragen / Krank melden |
| | `KalenderAbgleichScreen` | Mehr → Kalenderdateien | Detail-Sheet (groß) | Auswahl übernehmen |
| | `PlaeneScreen` | Mehr → Meine Pläne | Unterseite | Trainingsplan, Finanzplan, Importieren |
| | `PlanEditorScreen` | Meine Pläne → Trainingsplan | Unterseite mit `ActionBar` | Verwerfen · Übernehmen |
| | `UngesichertScreen` | Planeditor → Zurück mit Änderungen | Dialog | Sichern · Verwerfen · Weiter bearbeiten |
| | `SpeicherfehlerScreen` | Planeditor → Sichern fehlgeschlagen | Unterseite | Erneut versuchen |
| | `PlanImportScreen` | Meine Pläne → Importieren | Detail-Sheet (groß) | Plan übernehmen |
| | `FinanzplanScreen` | Meine Pläne → Finanzplan | Unterseite | Fortsetzen (pausiert) |
| | `EinstellungenScreen` | Mehr → Einstellungen | Unterseite | Darstellung und Kontrast wirken sofort |

## Gemeinsame Daten

Alle Zahlen kommen aus `Questi.demo` und stimmen deshalb überall überein – auch nach jeder Handlung:

- **Woche:** Quests je Tag aus den Plänen; Heute, Wochenleiste, Filter, Liste, Woche, Monat, Tagespanel und Fortschritt rechnen aus denselben Quests. Termine sind Quests mit Uhrzeit plus Kalenderblöcke.
- **Geburtstage:** kommen aus Leben – jeder Geburtstag steht im Kalender ganztägig (Woche) bzw. als Marke (Monat), auch ein neu angelegter. Lena hat am Donnerstag dieser Woche Geburtstag – in Leben, Kalender und als Quest; ihr Geschenk ist besorgt und taucht als Ausgabe von 65 € auf.
- **Ausgaben:** Die Summe des Ausgabenbuchs ist der Monatswert; Geschenke & Wünsche rechnet dieselben Beträge zusammen.
- **Pläne:** Die Zahl in „Mehr“ ist die Zahl der aktiven und pausierten Pläne in „Meine Pläne“; ein Import erhöht beide.

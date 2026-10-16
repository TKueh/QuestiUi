# Durchsicht der 32 Screens (16. Oktober 2026)

Jeder Screen in Hell und Dunkel bis zum Ende gescrollt (64 Blickfelder je Theme), gemessen (Signalflächen, accent-Tasten, Schriftgröße, Treffer, Flucht) und gegen `Gestaltungsregeln.md`, `Grundsaetze.md` und `AppFlow.md` gelesen. Pfade ab `QuestiUI/src/`, Kern als `NordhausUI/…`.

**Hält:** je Screen eine Signalfläche und eine accent-Taste; Signal nur in den vier Rollen, Auswahl Graphit, keine getönten Flächen; Darstellungsformen nach Regel 10 (Formular-Sheets ohne ActionBar, Dialog gestapelt, verriegelt sichtbar); 10-px-Schrift nur an freigegebenen Stellen; Treffer über `::after` auf 44 pt; Du-Form, kein „OK“; Ausgabensumme und Tagessummen stimmen auf den Cent. Im Dunkeln bricht fast nichts.

**Bricht:** Zahlenbild, Begriffe, Kopf beim Scrollen. Die Befunde unten sind nach Wirkung geordnet; A–C sind wenige Änderungen mit Wirkung auf viele Screens.

**Stand 16.10.:** A1–A6, B7–B12 und C13–C18 sind behoben (Faltkopf mit Glasleiste und klebenden Reitern, Zählwerk über `frac`/`idx` in Kern und App, Beträge nie gerundet, Zweitzeile bricht um, Gruppentitel auf dem Gutter, Abschnitte 32 pt, FilterChips/Quick/DateField/Ring/SettingsRow statt falscher Bausteine, Pause-Icon im Kern-`ListItem`, Wieder öffnen, Kalenderblock gestrichelt, Toast nach Mahlzeit, eine Taste für den Speicherfehler, gesteuerte Pausen im Tagesmodus). Nebenbei: „Gestern“ statt „Vor 1 Tagen“, „Am selben Tag“ zeigt alle Termine.

**Stand 16.10., zweite Runde:** D19–D27, E28–E35, F36–F37 und G38/G40 sind behoben – Abschluss, Ø-Werte, Messung, Kalenderabgleich und Planvorschau rechnen aus den Daten; Geschenke und Wünsche lesen ihr Ausgegebenes aus dem Ausgabenbuch (`ref`); Ausgabe bearbeiten belegt Bereich, Zuordnung und Datum vor; ein Wort je Handlung (Sichern, Entfällt, Mittagsportion, Krank & Urlaub, Training & Bewegung); eine LED-Zuordnung für Geschenke und Wünsche; keine Einzelnummern, keine Pfeil-Zellen in Sheets, Serie in Fortschritt als Ziffer, Tagespanel ohne zweite Skala; ‹ Heute › in jeder Kalenderansicht, gleiche Zeile über dem Titel, „KW“ 11 pt. Aus H: Heute-Karten, Sheet-Köpfe, Abstände in Einkauf und Neue Quest, Pflicht-Stern ruhig (Kern), Fristen in Finanzton, Einstellungen öffnen den Abgleich wie Mehr, Gesundheitslegende.

**Bewusst so gelassen, mit Grund in der Doku:** Monat ohne Strich für Ernährung (steht an jedem Tag) und Meilenstein-Icon statt Strichen (Kalender.md); Wochenraster ohne Auswahl, hellere Heute-Spalte ist Token-Vorgabe (G39).

**Stand 16.10., Abschluss:** Auch der Feinschliff ist behoben – „+ Vorhaben“ und „+ Wunsch“ (eigenes Formular-Sheet), Einkauf und Abschluss ohne Tafel in der Tafel, Makrobalken bis zum Anschlag, „+ Messung“ beschriftet wie im Register, Ausgaben-Kopf ohne Doppelung, Import ohne doppelten Dateinamen und ohne Mono, Fristbetrag in der Zweitzeile, „Wohnen“ mit Haus-Icon, feste Detailspalte im Planeditor; im Dunkeln Training und Geburtstage weiter getrennt (Datentöne), Miniatur mit Kante, Avatar als `slab`. Durchgeklickt im Browser: Ausgabe bearbeiten und zuordnen (kommt in Leben an), Vorhaben und Wunsch anlegen (Fehler am Feld, Zähler, Budget), Planeditor (Rhythmus, Wochentage, Legende nur mit Änderungen, Sichern), Mahlzeit (Wieder öffnen, Toast mit Widerrufen).

**Bewusst so gelassen:** „72,4 kg heute“ unter der Kurve ist die Ablesung des angetippten Punkts (ohne Antippen der letzte); unter „Zuletzt“ trägt nur die eigene Messung den Stift – deren Wert steht deshalb eine Zelle weiter innen; kurzes Datum in Listen („Sa, 24. Okt.“), langes im Feld („Mi., 11. November“); Wochenbeginn und Aktuelle Woche sind Ablesungen ohne Bedienung; erledigte Satz-Tasten bleiben Graphit (Regel 6 „eingerastet“).

## A · Querschnitt – eine Änderung, viele Screens

1. **Kopf faltet nicht, Inhalt läuft unter die Statusleiste** (alle Tabs, Unterseiten, hinter Sheets). Regel 4, 11. `app/App.css:1-7` (`padding-top: safe-top`, keine Fläche), `components/Phone/Phone.css:19`; `useScrolled` wird nirgends genutzt. → TopBar mit `useScrolled` zur kompakten Glasleiste falten; Kalender-Segment und Reiter bleiben stehen; Sheet-Kopf bekommt beim Scrollen eine Haarlinie.
2. **Zählwerk (Regel 9) fast nirgends:** „1/3“, „3/10“, „2/4“, „6/7“, „186/210“, „22/24“, „3/4“, „Archiv (1)“, „Meine Pläne 5“, „Nächste Fristen 2“, „8 von 24 Sätzen“, „33 von 54“ – nur der Kopf von Heute („02 / 08“) und „Nach Bereich“ stimmen.
   - App: `components/QuestRow/QuestRow.jsx:24`, `QuestRow/QuestList.jsx:21`, `ShoppingList/ShoppingList.jsx:45`, `TrainingSummary/TrainingSummary.jsx:9`, `WeekSummary/WeekSummary.jsx:32`, `app/heute/TodayBody.jsx:112`, `QuestDetailSheet.jsx:42`, `ShoppingSheet.jsx:53,84`, `TrainingSheet.jsx:50,66`, `TrainingDoneSheet.jsx:31`, `app/mehr/MehrBody.jsx:31`, `app/leben/LifeBody.jsx:21,87,91`, `LifeBar.jsx:194`.
   - Kern: `SectionHeader.jsx:6` (`num(count)`), `FilterChips.jsx:26` (Count roh), Segment-Counts „Alle · 8“.
   - → überall `utils.frac`/zweistellig; im Kern SectionHeader, FilterChips, SegmentedControl gleich zählen lassen. Satzform („3 von 10“) nur im Namen für Screenreader.
3. **Beträge gerundet gegen Cent:** „35 € / 75 €“ gegen 34,90 €, „140 €“ gegen 139,90 €, „Versicherungen 62 €“ gegen 62,20 €. `components/BudgetLabel/BudgetLabel.jsx:12`, `app/shared.jsx:66-68` (`money`), `FinanceSummary`. → Bezahltes mit Cent, nur Ziele glatt.
4. **Beschreibungen werden gekürzt** (Regel 2): „33 Jahre · …“, „Kündigungsfrist endet 25. Ok…“, „Noch nicht eingeplant · ca…“, Datumsfeld „Heute · Fr., 16. Okt…“. Kern `NordhausUI/src/components/ListItem/ListItem.css:110-117` (`.nh-li-sub` nowrap). → Untertitel umbrechen lassen (zweizeilig); Datumsfeld in halber Spalte kürzeres Format.
5. **Flucht nicht auf dem Gutter:** Kern `SettingsGroup.css` (Titel, Fuß `padding: 0 space-4`), `ListItem.css:340` (`.nh-lgroup-head` ohne Tafel), Trenner-Einzug `ListItem.css:287-289` ungleich; App: Mehr (Avatar 32, „DATEN“ 36, Fuß 40), Einstellungen (zwei Fluchten), Woche (`CalWeekBody.jsx:175`, Raster fast bis zum Rand), Mahlzeit „ZUTATEN“.
6. **Abschnittsabstand uneinheitlich:** 32 pt (Alltag, Geschenke, Einstellungen, Finanzplan) gegen 24 pt (Ausgaben, Gesundheit, Pläne, Editor: `col(6)`). Regel 3. → überall `col(8)`.

## B · Falscher Baustein („Wann welche“)

7. Heute filtert mit `SegmentedControl`, Einkauf mit `FilterChips` – Filtern mit Anzahl ist FilterChips. `app/heute/TodayBody.jsx:52-62`.
8. Formularwerte als Segment: Wiederholung (`app/heute/NewQuestSheet.jsx:101`), Trainingsgefühl mit fünf Werten (`components/TrainingSummary/FeelingPicker.jsx:17`). → `ChoiceRow.Quick` bzw. `RadioGroup`.
9. Einkauf hakt mit eckiger Checkbox ab (Heute: Ring, Detail: StepList); die gewählte Box behält dazu die Unterkante (Regel 6). `components/ShoppingList/ShoppingList.jsx:11-20`, `.css:21-24,37-39`. → `ListItem check`.
10. Mehr mischt `ChoiceRow` (oben) und `SettingsRow` (Daten) – Chevrons auf zwei Fluchten. `app/mehr/MehrBody.jsx:19-90`. → eine Zeilenart.
11. Neue Quest: Datum nur Heute/Morgen, kein Weg zu einem anderen Tag (Regel 11 `DateField`). `NewQuestSheet.jsx:23-26,83`.
12. Erscheinung heißt „System“ und trägt Icons neben den Miniaturen – Regel 10 verlangt „Automatisch · Hell · Dunkel“ ohne Icon. `components/DayModePicker/ThemePicker.jsx:13-15`, `docs/screens/Mehr.md`.

## C · Zustände (Regel 6, 10)

13. **Pausiert** ohne Pause-Icon (Pläne: Finanzplan, auch Archiv nur `ink-muted`; `components/PlanRow/PlanRow.jsx:17-18`); der Finanzplan selbst zeigt den Zustand gar nicht, der Stift wirkt bedienbar (`app/mehr/FinancePage.jsx:107-121`).
14. **Erledigt:** Vorhaben „Keller aufräumen“ nicht durchgestrichen (`components/LifeRow/LifeRow.jsx` reicht `done` nicht durch); erledigter Termin behält eine verriegelte accent-Taste (`app/kalender/TerminSheet.jsx:46-57`); Einkauf erledigt zeigt nur „Schließen“ statt „Wieder öffnen“ (`ShoppingSheet.jsx:57-59`).
15. **Kontext:** Kalenderblock „Arbeit“ ist im Tagespanel ein normaler Termin, in der Woche schraffiert – `components/EventRow/EventRow.jsx:14` setzt `is-context` ohne CSS.
16. **Rückmeldung:** Mahlzeit abhaken ohne Toast mit „Widerrufen“ (`app/heute/MealSheet.jsx:57-60`).
17. Speicherfehler: zwei Tasten tun dasselbe („Erneut versuchen“ in der Notice, „Übernehmen“ in der Leiste); Kopf sagt „Fehler“ statt „Nicht gesichert“ (`PlanEditorPage.jsx:42,49`).
18. Krank & Urlaub: Checkboxen ungesteuert, gehen nicht in `setMode` ein (`app/mehr/DayModeSheet.jsx:31,56-70`); Serie zeigt „Pausiert“ schon vor dem Zeitraum (`:73`).

## D · Gleiche Daten, gleiche Zahl

19. Training „08 / 24 Sätze“ gegen Abschluss „22/24“, „4.280 kg“, „62 min“ fest verdrahtet (`TrainingDoneSheet.jsx:19-20,51` gegen `TrainingSheet.jsx:20`).
20. „Ø“ Ruhepuls 54 / Schritte 8.412 sind letzte Werte, nicht Mittel (Ø 56 / 7.916). `app/fortschritt/HealthBody.jsx:91-97`. Der Zeitraum wirkt nur auf das Gewicht.
21. Geschenke & Wünsche summiert `spent`, Ausgaben `expenses` – getrennte Quellen, `addExpense` ändert `spent` nicht (`data/demo.js:284-373,871`). Gesamtbudget 680 fest (`LifeBody.jsx:150`).
22. Kalenderabgleich: Kennzahlen fest („Geändert 2“, Liste hat 1 + 1 Entfernt) – `app/mehr/CalImportSheet.jsx:39-43`.
23. Planeditor-Vorschau fest (A, A, B trotz Wechsel) – `PlanEditorPage.jsx:66-72`.
24. Messung: Kopf „16. Okt. 72,4 kg“, „Zuletzt“ beginnt beim 15.10. (`data/demo.js:375-379`).
25. Monat lässt Ernährung bei Strichen und Legende weg, Geburtstags-Icon verdrängt die übrigen Striche (`data/demo.js:603-613`, `CalMonthBody.jsx:146`).
26. Ausgabe bearbeiten: Bereich, Zuordnung, Datum werden nicht vorbelegt; Judo-Gürtel wird beim Sichern zu „Haushalt“ (`app/fortschritt/ExpenseSheet.jsx:15-46,87`).
27. Termin „Am selben Tag“ zeigt nur Einträge ab 12:00 (`TerminSheet.jsx:20`).

## E · Begriffe und Sprache (Regel 9)

28. Sichern / Übernehmen / Übernommen / Gesichert und drei Toast-Texte für dieselbe Handlung (Editor, Dialog, Meldung; `App.jsx:288,356`, `PlanEditorPage.jsx:24`); Dialog sagt „schließt“, ausgelöst wird er durch Zurück.
29. „Entfernt“ (`components/ChangeList/ChangeList.jsx:10`) gegen „Entfällt“ (Legende, Doku); „+ Neu“ in `positive` (Grün heißt erledigt/gesichert).
30. „Mittagsbox B“ (Sheet) gegen „Mittagsportion B essen“ (Quest) – `MealSheet.jsx:40`.
31. „Krank & Urlaub“ (Mehr) · „Dein Tag“ (Badge) · „Tag anpassen“ (Titel); „Sport & Bewegung“ · „Training & Bewegung“ · „Sport und Bewegung“; „Haushalt beibehalten“ kippt die Logik der „… pausieren“-Gruppe.
32. „Vor 1 Tagen“ → „Gestern“ (`app/shared.jsx:64`); vergangener Geburtstag unter „Nächste 60 Tage“.
33. „Bitte einen Betrag eingeben.“ (keine Du-Form, `ExpenseSheet.jsx:24`), „Wofür war die Ausgabe?“ als Frage; „bpm“ englisch.
34. Beziehungen überschneiden sich („Freundin / Freund“ und „Freundin“) – `app/leben/EntrySheet.jsx:194`.
35. Status-LEDs je Liste verschieden („Verschenkt“ `ink` gegen `on`, „Geplant“ wie „Idee“) – `app/leben/shared.jsx:2-13`.

## F · Nummern und Signaturen (Regel 12a)

36. „01 Archiv“ ist der einzige Abschnitt mit Kopf (`app/mehr/PlansPage.jsx:54`); Einstellungen nummeriert zwei von vier Gruppen (`SettingsPage.jsx:15-17,32-34`); Mehr hat zwei Gruppen, nur eine betitelt.
37. Mehr als zwei Signaturen im Blickfeld: Fortschritt Alltag (Zifferblatt, Strichliste, Nummern, Pegel, Messstrecken), Training (Nummern, Satz-Tasten, Skala, Pfeil-Zelle), Kalender-Liste (Tagesskala und Tagespanel-Skala für denselben Wert 02 / 08), Planeditor (dazu Doppellinie unter dem Kopf). Jede accent-Taste im Sheet bringt eine Pfeil-Zelle mit, die keine Richtung zeigt.

## G · Kalender (Regel 11)

38. ‹ Heute › fehlt in Liste und Woche (`app/kalender/CalBar.jsx:24-59`); die Zeile über dem Titel wechselt je Ansicht („KW 42 · …“ gegen „Kalender · 2026“).
39. Woche kodiert heute anders (Ziffer + hellere Spalte statt Graphit-Quadrat mit `current`-Strich) – `CalWeekBody.jsx:176` ohne `value`, Spalte aus `NordhausUI/…/CalendarWeek.css:210`.
40. „KW“ im Monat 10 px – nicht von der Freigabe gedeckt (`NordhausUI/…/CalendarMonth.css:54-58`).
41. Dunkel: Training (wine) und Geburtstage (rose) als Striche kaum zu trennen.

## H · Feinschliff

- Heute: Karten „Einkauf · Samstag“ gegen „Training · Sa / 11:00“ (Label bricht, Werte auf ungleicher Höhe), „Kraft B“ als Kennzahl; `TodayBody.jsx:136` Höhe als Literal.
- Detail-Sheets: Kopfzeile mal Datum, mal „Samstag · vorgezogen · 11:00“, mal „Kraft B · 11:00–12:00“ (`TrainingSheet.jsx:47`, `TrainingDoneSheet.jsx:29`); Tafeln in Tafeln (Einkauf, Abschluss) gegen offene Listen (Detail, Mahlzeit).
- Einkauf: Filterreihe klebt an der Beschreibung (`ShoppingSheet.jsx:67`). Neue Quest: „Ohne Uhrzeit“ klebt an Beginn/Ende (`NewQuestSheet.jsx:90-98`). Pflicht-Stern immer `danger` (Kern `TextField.css:15`).
- Mahlzeit: Makrobalken endet bei 96 % ohne Rest-Segment (`NutritionPanel.jsx:35`).
- Gesundheit: Legende „Training“ rot, gezeichnet schwarz (`HealthBody.jsx:66,80`); „72,4 kg heute“ doppelt; + im Kopf (Unterseite) gegen „+ Messung“ (Register).
- Messung: Werte unter „Zuletzt“ fluchten nicht; Titel „Gewicht“ statt „Gewicht erfassen“.
- Ausgaben: „Oktober · 5“ über „Oktober · bezahlt“ über „Alle 5“.
- Pläne: Beschreibung des Finanzplans bricht mit „Ziele“ allein um. Import: Dateiname doppelt, Auszug in Mono.
- Finanzplan: Fristen als Geburtstagszeile (rose Kante, Betrag über der Titelzeile); „Wohnen“ teilt Icon und Ton mit „Einkauf & Haushalt“.
- Planeditor: „Vorkoc…“ gekürzt; Unterstriche der Übungsfelder ungleich lang; Legende nur über Farbe (F06) und auch ohne Änderungen sichtbar (`PlanPreviewWeek.jsx:43-47`).
- Leben: Werkzeugleisten der drei Register verschieden (Anlegen nur bei Geburtstagen); „Planen“ `key`, „Termin“ `secondary`; Vorhaben tragen alle die Teal-Kennmarke „Arbeit“ (`LifeRow.jsx:18-19`); Datumsformat „Sa, 24. Okt.“ gegen „Mi., 11. November“.
- Eintrag: Erinnerung fest „7 Tage vorher“.
- Einstellungen: Kalenderdateien hier „Import & Export (.ics)“ ohne Pfeil; Wochenbeginn und Aktuelle Woche ohne Bedienung; Dunkel-Miniatur ohne Rahmen.
- Dunkel: Avatar „T“ ist die hellste Fläche in Mehr; erledigte Satz-Tasten sehr laut.

## Doku hinter dem Stand

`docs/screens/Kalender.md` (heute + gewählt als `current`-Fläche, erledigt mit Haken), `Heute.md` („01 Übungen“), `Mehr.md` („System“, „Nicht gesichert“). Regel 10 nennt für Unterseiten `TopBar nav`; tatsächlich trägt die erste Ebene (Pläne, Gesundheit, Einstellungen) den großen Titel mit Zurück, die zweite (Finanzplan, Editor) `nav` – konsistent, aber so in Regel 10 festhalten.

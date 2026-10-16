# Questi UI

App-Schicht der Quest-App auf Nordhaus UI: Fachbausteine, Datenstand, 32 Screens und die durchklickbare App. Start: `npm run dev` → http://localhost:61001. Nach jeder Änderung `npm run lint` (Nordhaus-Lint im App-Modus, Regeln in `lint.config.json`).
Nordhaus kommt aus dem Nachbarordner `../NordhausUI` (`nordhaus-ui`, direkt aus den Quellen) – Änderungen dort erscheinen hier sofort.

## Aufbau
- `src/components/<Name>/` – Fachbausteine (Zeilen, Training, Ernährung, Finanzen, Pläne) und `Phone` (Geräterahmen, nur Vorschau). Je Ordner `<Name>.jsx`, `.stories.jsx`, `README.md`, `<Name>.png` (Bild der ersten Story, Hell und Dunkel nebeneinander) und `.css`, sobald der Baustein eigene Klassen hat (eine reine `ListItem`-Zeile wie `EventRow` braucht keins). Unterbausteine liegen wie in Nordhaus im Ordner ihrer Hauptkomponente und stehen in deren Story und README: `QuestList` in `QuestRow/`, `AgendaDay` in `DayPanel/`, `PlanItemRow` in `PlanRow/`, `IngredientList` in `NutritionPanel/`, `HistoryGroup` in `ExpenseRow/`, `FeelingPicker` in `TrainingSummary/`, `ThemePicker` in `DayModePicker/`.
- `src/data/demo.js` – der eine Datenstand (`demo.get/use/act/select`). Jede Zahl auf einem Screen kommt daraus, jede Handlung geht über `demo.act`.
- `src/app/` – die App: `shared.jsx` (Navigation `useNav`, Kopfleisten, Helfer), je Tab ein Ordner (`heute/`, `kalender/`, `leben/`, `fortschritt/`, `mehr/`) mit einer Datei je Screen oder Sheet (`<Name>.jsx`) und ggf. `shared.jsx` für Konstanten und Helfer des Tabs; `<tab>.jsx` daneben ist nur das Barrel mit den Exporten. `App.jsx` (Routen, `App`, `ScreenCard`, `Prototype`); der Screen-Inhalt liegt in `main`, die Aktionsleiste in einer `section` „Aktionen“. Stories: `app/<tab>.stories.jsx` je Screen, `App.stories.jsx` für den ganzen Ablauf. Bilder: `app/screens/<Screen>.png` je Screen-Story, `app/App.png`, `app/Cover.png` – vor dem Bearbeiten ansehen, sie zeigen den Ist-Stand.
- `src/categories.js` – die acht Lebensbereiche (`setCategories`). `src/index.js` / `src/index.d.ts` – Schnittstelle.
- `docs/AppFlow.md` – jeder Screen mit Einstieg, Form und Weg weiter. `docs/Inventar.md` – welcher Baustein welche App-Komponente abdeckt. `docs/screens/` – Beschreibung je Screen.

## Effizient arbeiten
- Arbeitsweise: Skill `ponytail` (kleinste vollständige Änderung, Antwort in einem Durchgang lesbar); Runden an Durchsicht, Fixes oder Ausbau mit Skill `designsystem-runde`.
- Umgebung wie in Nordhaus (`../NordhausUI/CLAUDE.md`, Effizient arbeiten): Bilder nur in der Linux-Sandbox oder Cloud rendern, nie unter Windows; `lint` läuft überall.
- Eine Runde: ändern → `npm run lint` (Sekunden) → am Ende einmal `npm run check` (Lint → nur veraltete Bilder, parallel → Lint). Einzeln: `npm run shots -- <Name>`, `--changed` nur veraltete, `--no-build` mit vorhandenem Build, `--parallel=N` (Standard Kerne − 2, höchstens 12).
- Veraltet heißt: Bild älter als der eigene Ordner (Baustein) bzw. `src/app` (Screen), oder als `src/data`, `src/styles`, `src/categories.js`, `.ladle` oder `../NordhausUI/src`. Eine Nordhaus-Änderung rendert hier also alles neu – gewollt, die Bilder sind byte-gleich, wenn sich nichts geändert hat, und `git status` zeigt nur echte Änderungen.
- Ansehen: `npm run bogen -- --git` legt alle seit dem letzten Commit neu gerenderten Bilder (Bausteine und Screens) auf Bögen in `build/bogen/`; gezielt `npm run bogen -- HeuteScreen QuestRow`.
- Git wie in Nordhaus: jede Runde ein Commit, vor dem Start `git status` sauber.

## Regeln
- Alles Allgemeine ist Nordhaus. Fehlt ein allgemeiner Baustein, wird er in `../NordhausUI` gebaut (mit dessen Regeln), nicht hier.
- Hier nur Fachliches: Bausteine, die das Datenmodell kennen, Screens, Abläufe. Keine eigenen Tokens, keine eigenen Farben – nur Nordhaus-Variablen (einzige Aliase: `--macro-*` und die Töne `nh-c--protein|carbs|fat` in `src/styles/shared.css`).
- Klassen mit Präfix `qs-` (Modifier `qs-<name>--<variante>`, Zustände `is-…`). `nh-`-Klassen nur als scoped Override unter einer `qs-`-Elternklasse (z. B. `.qs-exercise .nh-setkeys`) – nie als eigener Baustein; der Lint meldet beides. Die Grundregeln aus Nordhaus `base.css` (Box-Modell, tabellarische Ziffern, Schrift der Bedienelemente, Fokus, reduzierte Bewegung) gelten für `qs-` über denselben Block in `src/styles/shared.css`.
- Abweichungen von den Gestaltungsregeln (z. B. Radien des Geräterahmens) stehen als Freigabe in `lint.config.json` und im Ausnahmeregister von Nordhaus.
- Neuer Screen: Datei in `app/<tab>/`, Export im Barrel `app/<tab>.jsx`, Route in `ROUTES` (`App.jsx`), Story in `app/<tab>.stories.jsx`, Zeile in `docs/AppFlow.md`.
- Code wie in Nordhaus: `const`/`let`, Pfeilfunktionen, destrukturierte Props (`props` nur, wo normalisiert oder weitergereicht wird), `.prettierrc`.
- Barrierefreiheit: Stand und offene Geräteabnahme in `docs/Barrierefreiheit.md`.
- Darstellungsformen nach Nordhaus-Gestaltungsregeln Abschnitt 10 (Tab, Register, Unterseite, Formular-Sheet, Detail-Sheet, Dialog).
- Sprache: Deutsch, Du-Form; Aufgaben heißen Quests.
- Story-Titel ohne Nummer und ohne `&`/Komma; Gruppenreihenfolge in `.ladle/config.mjs`.
- Nach jeder Änderung an Baustein, Screen, Daten oder Story müssen die Bilder stimmen. Skript: `scripts/shots.mjs`, 470 pt breit (430-pt-Gerät samt Phone-Rahmen), @2x; Werkzeuge aus `../NordhausUI/scripts/katalog.mjs`.
- Keine weiteren Abhängigkeiten oder Build-Konfiguration ohne Rückfrage. Einzige Werkzeug-Abhängigkeit: Playwright für `npm run shots` (einmalig `npx playwright install chromium`).

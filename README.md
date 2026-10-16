# Questi UI 2.5

Die Questi-App zum Durchspielen: 32 Screens in fünf Tabs, ein Datenstand, echte Navigation – gebaut aus Nordhaus UI.

## Starten

Beide Ordner liegen nebeneinander:

```
Code/
  NordhausUI/   Komponenten, Tokens, Regeln
  QuestiUI/     dieses Projekt
```

```
cd QuestiUI
npm install
npm run dev      # Katalog unter http://localhost:61001
npm run shots    # ein Bild je Baustein und Screen (Hell · Dunkel), parallel; -- --changed nur veraltete; einmalig: npx playwright install chromium
npm run lint     # Nordhaus-Gestaltungsregeln im App-Modus prüfen (Exit 1 bei Befunden)
npm run check    # Lint → nur veraltete Bilder → Lint (vor jedem Commit)
npm run bogen    # Kontaktbögen in build/bogen/; -- --git nur seit dem letzten Commit neu gerenderte Bilder
```

Nordhaus (`npm run dev` dort) läuft auf Port 61000, Questi auf 61001 – beide können gleichzeitig offen sein. Änderungen an Nordhaus erscheinen in Questi sofort, ohne Neuladen. Die Schriften (Hanken Grotesk, JetBrains Mono) kommen lokal aus Nordhaus (`nordhaus-ui/src/fonts.css`) – Katalog und Bilder brauchen kein Netz; `npm run shots` bricht ab, wenn die Schrift fehlt.

## Im Katalog

- **App › Ablauf** – die ganze App mit Gerätewahl (430 · 375 · 320 pt) und „Neu starten“.
- **Screens** – jeder Screen einzeln; jeder ist ein Einstieg in dieselbe App und von dort weiter bedienbar.
- **Zeilen, Training, Ernährung und Finanzen, Pläne und Import** – die Fachbausteine.

## Herkunft

Übernommen aus der Artefakt-Mappe „Questi UI“ (Stand 2.2, 15. Oktober 2026). Jede Karte und jeder Screen wurde gegen das Original gerendert und ist in Hell und Dunkel pixelgleich. Die gespiegelte Nordhaus-Kopie und `werkzeug/build.mjs` entfallen – Nordhaus wird direkt aus `../NordhausUI` geladen. Die Prüfskripte der Mappe (`pruefung/`) sind nicht übernommen.

## Änderungen

### 2.5 · Ein Satz genügt (16. Oktober 2026)

- **Neue Quest:** ein Satz statt Formular – Tag, Uhrzeit, Rhythmus und Bereich werden erkannt (`app/heute/quickParse.js`) und als Zellen bestätigt (Nordhaus `TokenField`); Enter legt an. Der Tag als Messstrecke (`DayScale`) mit Überschneidung und „Auf … legen“; „Wieder anlegen“ bzw. „Aus Vorhaben“ bei leerem Feld; alle Felder unter „Details“.
- **Funktion:** Gewicht im Training, Verschieben, Finanzplan fortsetzen, Schritte je Schritt gemerkt, Geburtstage aus Leben im Kalender, Suche in Notizen; doppelte Taste „Später“ entfernt.

### 2.4 · Durchsicht der 32 Screens (16. Oktober 2026)

- **Auf Nordhaus 6.6.3:** Faltkopf (Statusleiste mit Fläche, kompakte Glasleiste, Reiter und Ansichtswahl kleben), Zählwerk überall über `frac`/`idx`, Beträge nie gerundet, Zweitzeilen brechen um.
- **Eine Quelle:** Geschenke und Wünsche lesen ihr Ausgegebenes aus dem Ausgabenbuch (`ref`); Abschluss, Ø-Werte, Messung, Kalenderabgleich und Planvorschau rechnen aus den Daten.
- **Bausteine:** FilterChips, Schnellwahl, DateField und Abhak-Ring statt Segment und Checkbox; `SettingsRow` in Mehr; `ItemSheet` für „+ Vorhaben“ und „+ Wunsch“.
- **Zustände und Begriffe:** Wieder öffnen, Kalenderblock gestrichelt, Pause im Finanzplan, eine Taste beim Speicherfehler; ein Wort je Handlung (Sichern, Entfällt, Mittagsportion, Krank & Urlaub).
- Alle Befunde, Stand und bewusste Ausnahmen: `docs/Durchsicht.md`.

### 2.3 · Nordhaus 6.3 übernommen (16. Oktober 2026)

- **Brüche nachgezogen** (Nordhaus `docs/Aenderungen.md` 6.3): `FileDrop` hat keinen Vorgabe-Hinweis mehr – der Planimport nennt seine Grenzen selbst (`hint`, `accept`). Status-LEDs nur noch mit gültigen Zuständen (`LedState` in `index.d.ts` um `positive`, `muted`, Rollen ergänzt). Keine Questi-Overrides auf `aria-pressed`, `nh-dist-*`, `nh-cal-legend`, Zähler, `nh-line-suffix` oder `:disabled` – nichts weiter zu ändern.
- **Raster:** alle Abstände der App-Schicht (CSS und Inline-Styles der Screens) aus `space-*`/`gutter`, Geometrie als `calc()`, Haarlinien als `hairline`; Werte neben dem 4-pt-Raster gerundet. Lint 0 Befunde.
- **Maße:** `PlanItemRow` und `ShoppingRow` stehen auf `row-h` (56) wie jede Fahrplan-Zeile; die Sonderhöhe der `QuestRow` und der Kopf-Abstand der `AgendaDay` entfallen (Nordhaus macht beides jetzt selbst). Zutaten- und Nährwertzeilen bleiben 44 hoch (Ablesetabellen, keine Tasten).
- **Zustände:** die Haken-Taste der `ShoppingRow` folgt dem Kanon (Zeigen = Unterkante 2 pt, Drücken 1 pt tiefer, nie umfärben).
- **Planeditor:** „Übernehmen“ ist die eine `accent`-Taste der Aktionsleiste (vorher Graphit – Nordhaus meldete eine `ActionBar` ohne `accent`-Taste).
- **Titelblatt:** Klassen `qs-cover-*`, Farben über die Rollen `action`/`marker` statt `signal`.
- **Katalog:** Schriften lokal; Prototyp fluchtet auf `gutter`; die Phone-Vorschau bricht das zweite Gerät um, statt beide zu stauchen.


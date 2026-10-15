# Barrierefreiheit

Stand 16. Oktober 2026 (Questi UI 2.3 auf Nordhaus UI 6.3). Was im Browser geprüft wurde, was dabei geändert wurde und was nur am Gerät geht.

## Geprüft im Browser

- **axe-core 4.14** (wcag2a/aa, wcag21a/aa, wcag22aa, best-practice) über alle 32 Screens, den Ablauf und alle Fachbausteine, jeweils Hell und Dunkel, 470 pt breit. Ergebnis nach den Korrekturen: 0 Befunde an den Screens. Offen bleibt nur `region` auf dem Titelblatt (`Cover`) und in Karten einzelner Bausteine – dort gibt es keine Landmarken, in der App liegt alles in `main`, `header`, `nav`, `section`.
- **Tastatur-Sweep** über alle 32 Screens: 379 Tab-Stopps, jeder mit zugänglichem Namen und sichtbarem Fokus (2-pt-Ring, 2-pt-Feldlinie bei `DateField`/`TimeField`, Ring der runden Tasten). Die 1 × 1 pt großen Stopps sind die visuell versteckten Checkbox-Inputs, deren Beschriftung die 44-pt-Trefferfläche trägt.
- **Bedienabläufe** per Playwright: Tabs, Neue Quest mit Fehlerfall (Fokus springt ins Feld, `role="alert"`), Abhaken mit Toast, Training-Sheet mit Satz-Tasten; in Nordhaus Monatsraster per Pfeil-/Bild-Tasten, Zifferblatt per Tastatur.

## Geändert dafür

- Screen-Inhalt liegt in `main` (`.qs-screen-scroll`), die Aktionsleiste in `section` „Aktionen“, die Vorschau-Werkzeuge in `section` „Vorschau-Einstellungen“ – damit hat jeder Inhalt eine Landmarke.
- Überschriften ohne Sprung: `HistoryGroup` und `DayPanel` tragen `h2` (vorher `h3` direkt unter `h1`).
- In Nordhaus (siehe dort `docs/Aenderungen.md` 6.2.1): Namen beginnen mit dem sichtbaren Text (WCAG 2.5.3), `ActionBar`-Stand und `ProgressBar` haben Namen, `Sheet`-Inhalt ist per Tastatur scrollbar, `Popover`-Einträge mit Zustand sind `menuitemradio`, `Count` ist `role="img"`.
- Mit Nordhaus 6.3 (dort `docs/Aenderungen.md` 6.3): Einfachauswahl in `FilterChips` (Einkauf, Ausgaben) und die Wochenleiste auf Heute sind `radiogroup` mit einem Tab-Stopp und Pfeiltasten; die Zeilen der Verteilungsbalken (Fortschritt, Finanzplan) sind `ProgressBar`; der Zähler eines Feldes hängt über `aria-describedby` am Feld; `IconButton` trägt kein `title` mehr (Name über `aria-label`). Der Tastatur-Sweep und axe sind mit 6.3 nicht neu gezählt – die Zahlen oben sind der Stand 2.2.

## Offen: Abnahme am Gerät

Das lässt sich nur auf dem iPhone prüfen – je Punkt mit Gerät, Datum, Ergebnis (Vorlage aus Nordhaus `docs/Pruefliste.md`, „Geräteabnahme“):

| Prüfung | Wie | Bestanden, wenn |
| --- | --- | --- |
| VoiceOver | Heute, Kalender (Liste, Woche, Monat), Neue Quest, Training, Planeditor vollständig per Wischen | Jedes Element hat den Namen aus der Komponente; Ring, Dial und Satz-Tasten melden Stand und Zustand; Reihenfolge folgt dem Bild |
| Dynamic Type bis AX5 | Einstellungen › Anzeige › Textgröße, dieselben Screens | Nichts überlagert, Abschlusstasten erreichbar, Zahlen brechen nicht um |
| Touch | jede Taste mit dem Daumen, einhändig | 44-pt-Ziele treffen ohne Fehlgriff; Ausnahmen über ihre Alternative erreichbar |
| Safe Areas | SE (Home-Taste), Mini, Pro Max, quer | Statusleiste, Insel und Home-Leiste verdecken nichts |
| Haarlinie @3x | `line`, `line-strong` auf Hell und Dunkel | Linie sichtbar, nicht verwaschen |
| Haptik | Abhaken, Stepper, Satz-Taste, Verwerfen | `.success`, `.selection`, `.warning` wie in `iOS-Uebergabe.md` |
| Full Keyboard Access | Tab durch alle Screens | Fokusrahmen 2 pt an jedem Stopp |

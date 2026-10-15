# Inventar

Jede Komponente aus dem Questi-Bestand und der Baustein, der sie abdeckt. `N` = `nordhaus-ui` (6.3), `Q` = `questi-ui` (2.3).

## Struktur & Navigation

| Questi-Komponente | Baustein |
| --- | --- |
| Hauptnavigation iPhone · iPad hochkant · iPad quer/Desktop | `N.TabBar` · `N.NavigationRail` · `N.Sidebar` |
| Kopfzeile, Seitenüberschrift, Werkzeugleiste, Aktionsleiste | `N.TopBar` (`large` · `nav` · `small` · `variant="toolbar"`) |
| Zurück, Schließen, Hinzufügen | `N.BackButton`, `N.CloseButton`, `N.AddButton` |
| Breadcrumbs, Wortmarke, Benutzerbereich, Footer, Abschnittsüberschrift | `N.Breadcrumbs`, `N.Wordmark`, `N.UserChip`, `N.Footer`, `N.SectionHeader` |
| Geräterahmen der Screens | `Q.Phone` (nur Vorschau; `device`: `pro-max` 430 × 932 · `se` 375 × 667 · `small` 320 × 568) |
| Die App: Navigation, Sheets, Dialoge, Rückmeldung | `Q.App` (`start`, `device`), `Q.ScreenCard`, `Q.Prototype`, `Q.useNav` |
| Datenstand und Handlungen | `Q.demo` (`get`, `use`, `act`, `select`) |

## Aktionen & Auswahl

| Questi-Komponente | Baustein |
| --- | --- |
| Primär, Sekundär, Text, Löschen, Abschluss, vollbreit | `N.Button` (`primary` · `secondary` · `text` · `danger` · `accent` · `block`) |
| Iconbutton | `N.IconButton` |
| Abhaken-Button · Satz-Button · Satz-Checkliste | `N.ToggleButton` (`ring` · `key`) · `N.ToggleRow` |
| Link / Dokumentlink | `Q.DocLink` |
| Tabs (mit Zählern), segmentierte Auswahl, Filterbuttons | `N.Tabs`, `N.SegmentedControl`, `N.FilterChips`, `N.Chip` |
| Auswahlzeile mit Icon, Beschreibung, Pfeil · Schnellwahl | `N.ChoiceRow` · `N.ChoiceRow.Quick` |
| Theme-Auswahl · Tagesmodus | `Q.ThemePicker`, `Q.DayModePicker` (beide `N.SegmentedControl variant="tiles"`) |

## Eingaben

| Questi-Komponente | Baustein |
| --- | --- |
| Text, Zahl, Geld, mehrzeilig, Suche | `N.TextField` (`kind`), `N.TextArea`, `N.SearchField` (Suche über die Woche) |
| Datum, Uhrzeit | `N.DateField`, `N.TimeField` – in allen Formularen, 24 Stunden, Monat und Zifferblatt unter der Zeile |
| Dropdown, Status-Dropdown, Mehrfachauswahl, Vorschläge | `N.Select`, `N.StatusSelect`, `N.MultiSelect`, `N.Autocomplete` |
| Checkbox, Radio, Switch, Stepper, Regler | `N.Checkbox`, `N.RadioGroup`, `N.Switch`, `N.Stepper`, `N.RangeSlider` |
| Wochentage, Menge mit Einheit, Feldpaar, Dateiauswahl | `N.WeekdayPicker`, `N.QuantityField`, `N.FieldRow`, `N.FileDrop` (Grenzen über `hint` – ohne Vorgabe) |
| Bearbeitbare Liste, Reihenfolge | `N.EditableList`, `N.ReorderControls` (Taste „Verschieben“ mit Menü) |

## Overlays & Rückmeldung

| Questi-Komponente | Baustein |
| --- | --- |
| Detail-Sheet, Formular-Sheet, Aktionsleiste | `N.Sheet` (`mode`), `N.ActionBar` |
| Dialog, ungesicherte Änderungen, Menü, Hinweisschild | `N.Dialog`, `N.UnsavedDialog`, `N.Popover`, `N.Tooltip` |
| Toast, Rückgängig, Speicher- und Verbindungsstatus, Hinweisfläche | `N.Toast`, `N.UndoNotice`, `N.SaveStatus`, `N.SyncStatus`, `N.Notice` |
| Leerzustand, Laden | `N.EmptyState`, `N.Skeleton`, `N.Spinner` |
| Accordion | `N.Accordion` |

## Status & Kennzahlen

| Questi-Komponente | Baustein |
| --- | --- |
| Badge, Zähler, Datumsbadge, Serie | `N.Badge` (`text` · `count` · `date` · `streak`), `N.Count` |
| Kategorie-Icon, Kategorie-Wort | `N.CategoryIcon`, `N.CategoryTag` |
| Budgetlabel | `Q.BudgetLabel` |
| Fortschrittsbalken, Fortschrittsring | `N.ProgressBar`, `N.Dial` |
| Kennzahl, Kennzahlenkarte, Veränderung, Schlüssel-Wert | `N.Metric`, `N.MetricCard`, `N.ChangeIndicator`, `N.KeyValue` |
| Wochenzusammenfassung | `Q.WeekSummary` |

## Listen & Inhalte

| Questi-Komponente | Baustein |
| --- | --- |
| Aufgabenzeile, gruppierte Aufgabenliste | `Q.QuestRow` (ListItem mit Ring, Kennmarke, Flags), `Q.QuestList` |
| Terminzeile, Tagesdetail, Agenda-Tag | `Q.EventRow` (ListItem mit Zeit und Fahrplan-Linie), `Q.DayPanel`, `Q.AgendaDay` |
| Planzeile, Plan-Inhaltszeile | `Q.PlanRow` (ListItem), `Q.PlanItemRow` |
| Geburtstag-, Wunsch-, Vorhaben-Zeile | `Q.LifeRow` (ListItem mit Datumsfenster, Budget, Statuswahl) |
| Ausgabenzeile, Messwertzeile | `Q.ExpenseRow`, `Q.MeasurementRow` (ListItem mit Wert, Veränderung, Bearbeiten) |
| Einkaufszeile, Einkaufsliste, Zutaten, Nährwerte | `Q.ShoppingRow`, `Q.ShoppingList`, `Q.IngredientList`, `Q.NutritionPanel` |
| Finanzübersicht, nach Datum gruppierter Verlauf | `Q.FinanceSummary`, `Q.HistoryGroup` |
| Schritt-/Checkliste, Tabelle, Karte, Karussell, Seiten | `N.StepList`, `N.DataTable`, `N.Card`, `N.Carousel`, `N.Pagination` |

## Training

| Questi-Komponente | Baustein |
| --- | --- |
| Übungszeile, Illustration, Gewicht, Satz-Checkliste | `Q.ExerciseRow`, `Q.ExerciseFigure`, `Q.WeightDisplay`, `N.ToggleRow` |
| Trainingszusammenfassung, Trainingsgefühl | `Q.TrainingSummary`, `Q.FeelingPicker` |

## Kalender & Diagramme

| Questi-Komponente | Baustein |
| --- | --- |
| Wochenleiste, Wochenliste, Wochenkalender, Monatskalender | `N.CalendarWeek` (`strip` · `list` · `grid`), `N.CalendarMonth` |
| Terminblock, ganztägig, Jetzt-Linie, Legende | `N.EventBlock`, `N.AllDayEvent`, in `CalendarWeek`, `N.CalendarLegend` |
| Balken, gestapelt, Verteilung, Linie, Mini-Verlauf, Legende | `N.BarChart` (`values`, `orientation="horizontal"`, `table`), `N.LineChart` (`compact`), `N.ChartLegend` |
| Änderungsliste, Wochenvorschau, Importvorschau | `Q.ChangeList`, `Q.PlanPreviewWeek`, `Q.ImportPreview` |

## Einstellungen

| Questi-Komponente | Baustein |
| --- | --- |
| Einstellungszeile, Gruppe | `N.SettingsRow`, `N.SettingsGroup` |

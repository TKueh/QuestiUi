# DeinTagScreen
Mehr → Krank & Urlaub (auch über Einstellungen → Tagesmodus). Tagesmodus Normal · Krank · Urlaub mit LED, Zeitraum, welche Pläne pausieren, und die Serie, die ab dem Zeitraum neutral zählt. Die Taste trägt die Handlung („Urlaub eintragen“, „Krank melden“); danach zeigt Heute den Modus. Geburtstage und Fristen bleiben immer aktiv – das steht in der Beschreibung, nicht in einer Warnung.

# EinstellungenScreen
Mehr → Einstellungen. Darstellung als Kacheln (Automatisch · Hell · Dunkel) und „Kontrast erhöhen“ wirken sofort auf das Gerät; Tagesmodus Normal/Krank/Urlaub wie in „Krank & Urlaub“; Verbindungen mit LED-Status. Vier gleichrangige Gruppen ohne Nummern – keine Folge, wie in Mehr.

# FinanzplanScreen
Meine Pläne → Finanzplan (pausiert). Unterseite mit Zurück und Titel, darunter die Meldung „Pausiert“ mit „Fortsetzen“, und den Registern Übersicht · Verträge · Ziele. Eine Vertragsliste ist die Quelle: Übersicht (Monatssumme, frei verfügbar, Verteilung), Gruppe „Versicherungen“ und Register „Verträge“ rechnen daraus; Ziele als Messstrecken. Nächste Fristen mit Datumsfenster, die nächste in `danger` mit „Prüfen“.

# HealthScreen
Mehr → Gesundheit (auch Fortschritt → Gesundheit). Zeitraum, Gewicht als Kennzahl mit neutraler Veränderung und Liniendiagramm (Trainings als Striche an der Achse), Ruhepuls und Schritte als Kennzahlenkarten mit Mini-Verlauf, Krafttraining-Zusammenfassung. **+** öffnet „Gewicht“ (`MessungScreen`); eine neue Messung erscheint sofort in Kennzahl und Verlauf.

# KalenderAbgleichScreen
Mehr → Daten → Kalenderdateien → Datei wählen. Die Importvorschau nennt Datei, Zeitraum und Zahlen; die Änderungsliste zeigt jede Änderung mit Art (Neu · Geändert · Entfällt · Konflikt), alt → neu und Grund. Konflikte sind nicht vorausgewählt. Die Aktionsleiste zählt die Auswahl und übernimmt genau diese.

# MehrScreen
Tab Mehr – der Verteiler zu allem, was nicht täglich gebraucht wird: Gesundheit, Meine Pläne (Anzahl aus dem Datenstand), Krank & Urlaub, Einstellungen. Darunter der Datenstand mit LEDs (lokal, importiert) und der Export der Sicherung. Ein Name, ein Satz zum Speicherort.

# MessungScreen
Gesundheit → **+**. Kompaktes Formular-Sheet: Gewicht groß mit Einheit, Hinweis zur Vorrangregel, Datum und optionale Uhrzeit, darunter die letzten Messungen mit Quelle und Veränderung (neutral – gemessen, nicht bewertet). Sichern prüft den Bereich 30–250 kg und meldet den Fehler am Feld.

# PlaeneScreen
Mehr → Meine Pläne. Jeder Plan als Zeile mit Bereich, Inhalt, Anzahl und letzter Änderung; pausierte und archivierte Pläne sind entsättigt und benannt. Oben „Importieren“ (PDF, Text, JSON). Der Trainingsplan öffnet den Planeditor, der Finanzplan seine Übersicht.

# PlanEditorScreen
Meine Pläne → Trainingsplan. Übungen umbenennen, verschieben (Taste „Verschieben“), entfernen; Rhythmus (A/B, Wochentage); Sieben-Tage-Vorschau aus Rhythmus und Wochentagen, Änderungen mit + ~ −. Die feste Leiste zählt die Änderungen („1 Änderung“) und bietet „Verwerfen · Sichern“. Zurück mit Änderungen fragt (`UngesichertScreen`); ein fehlgeschlagenes Sichern zeigt `SpeicherfehlerScreen`.

# PlanImportScreen
Meine Pläne → Importieren. Datei (PDF, Text, Questi-JSON) mit Name und Größe, die Importvorschau mit Zahlen und Auszug, ein Prüfhinweis für unklare Mengen in `danger` (Handlungsbedarf), der Name des neuen Plans und das Gültigkeitsdatum in der Aktionsleiste. „Plan übernehmen“ fügt ihn zu „Meine Pläne“ hinzu.

# SpeicherfehlerScreen
Planeditor nach einem fehlgeschlagenen Sichern. Oben rechts „Ungesichert“ mit LED, darunter eine Meldung in `danger`, die sagt, was passiert ist und dass der Entwurf erhalten bleibt. „Erneut versuchen“ ist die accent-Taste der Leiste – eine Handlung, eine Taste. Die Leiste zählt die Änderungen weiter; Zurück fragt wie immer nach.

# UngesichertScreen
Planeditor → Zurück mit ungesicherten Änderungen. Der Dialog nennt die Anzahl der Änderungen und bietet drei gestapelte Wege: Sichern (Graphit), Verwerfen (`danger`, Kontur), Weiter bearbeiten (Text). Escape und Tipp neben den Dialog entsprechen „Weiter bearbeiten“ – nichts geht ungefragt verloren. Sichern und Verwerfen führen zurück zu „Meine Pläne“.

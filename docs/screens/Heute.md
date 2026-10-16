# EinkaufScreen
Einkaufsliste als großes Sheet: Filter Alle/Offen/Gekauft (filtert), Gruppen nach Einkaufsbereich mit Zählern, Mengen rechts tabellarisch. Fortschritt unten als Skala; der letzte Haken oder „Alles abhaken“ schließt die Quest ab – Heute und Kalender zeigen es sofort.

# HeuteScreen
Der Tag auf einen Blick: Kopf mit Wortmarke, Suche und **+** (Neue Quest), großer Titel „Heute“ mit Zähler, Wochenleiste, Status-Filter, die offenen Quests – erledigte kompakt darunter, aufklappbar. Danach Einkauf und Training als direkte Einstiege und die Serie.
- Alle Zahlen kommen aus `Questi.demo`: Zähler, Wochenleiste und Filter zeigen immer denselben Stand; Abhaken und Wiederöffnen ändern alle drei, dazu Kalender und Fortschritt.
- Offenes zuerst, nach Uhrzeit; erledigte Quests stehen eingeklappt unter „Erledigt“. Der Filter „Offen“ / „Erledigt“ filtert wirklich.
- Die Liste folgt dem Wochentag: welche Quests heute stehen, bestimmen die Pläne.

# MahlzeitScreen
Mahlzeit als kompaktes Sheet: Energie groß und leicht, Makro-Balken nach Energieanteil (Eiweiß · Kohlenhydrate · Fett), Grammwerte, Zutaten mit Mengen. Abhaken unten.

# NeueQuestFehlerScreen
„Neue Quest“ nach einem Hinzufügen mit fehlendem Titel und Ende vor Beginn. Beide Fehler stehen am Feld (Linie und Satz in `danger`, LED, `role="alert"`), der Satz sagt, was zu tun ist. Hinzufügen bleibt wirkungslos und setzt den Fokus auf das erste fehlerhafte Feld, bis beides stimmt.

# NeueQuestScreen
Eigene Quest anlegen – die **+**-Taste im Kopf jedes Tabs bedeutet überall „Neue Quest“. Formular-Sheet „Abbrechen · Neue Quest · Hinzufügen“, **ein Satz genügt**: „Judo-Tasche packen morgen 18:30 jeden Di“ – Tag, Uhrzeit (auch „18–19 Uhr“, ganztägig), Rhythmus (täglich, werktags, jeden Di, dienstags, alle zwei Wochen, monatlich, jährlich) und Bereich (aus Wörtern wie Judo, Einkauf, Steuer) erscheinen als Zellen (`TokenField`); antippen öffnet die Details, ✕ verwirft die Erkennung und lässt das Wort im Titel. Enter legt an. Darunter der Tag als Messstrecke (`DayScale`): Belegtes, die gewählte Zeit, bei Überschneidung ein Satz mit „Auf … legen“ (nächste freie Zeit gleicher Dauer). Bei leerem Feld „Wieder anlegen“ (eigene Quests) bzw. „Aus Vorhaben“. „Details“ klappt Datum, Zeit (Uhrzeit · Ganztägig · Ohne), Wiederholung, Erinnerung, Bereich, Schritte und Notiz auf; selbst Gewähltes geht vor Erkanntem, neu Getipptes ersetzt es wieder.
- Hinzufügen prüft: fehlender Titel, Ende vor Beginn. Der Fehler steht am Feld, der Fokus springt dorthin, das Sheet bleibt offen (`NeueQuestFehlerScreen`).
- Mit Eingaben fragt Abbrechen nach (`dirty`). Nach dem Hinzufügen steht die Quest in Heute, im Kalender und im Fortschritt; ein Toast bestätigt.

# QuestDetailScreen
Heute → Quest öffnen. Das Detail-Sheet ist der gemeinsame Rahmen aller Quests: Kontext (Bereich, Originalplan, Schließen), Datum, Titel, Beschreibung, dann der Inhalt – hier die Schrittliste mit Uhrzeiten –, darunter Wiederholung, Erinnerung und Herkunft. Die Aktionsleiste zeigt den Stand und genau eine Hauptaktion in `action` („Alles abhaken“ bzw. „Abhaken“); erledigt wird daraus „Wieder öffnen“. Jeder Schritt zählt sofort in Heute.

# TrainingAbschlussScreen
Training → abschließen. Zusammenfassung aus den erledigten Sätzen (Sätze, Last, Dauer), das Trainingsgefühl in fünf Stufen, offene Sätze als sachlicher Hinweis, eine optionale Notiz. Eine Hauptaktion: „Training sichern“ – hakt die Quest ab, schließt das Sheet, zurück auf Heute mit Bestätigung. Kein Lob, keine Wertung.

# TrainingScreen
Heute → Training (das nächste Krafttraining; liegt es nicht heute, steht „vorgezogen“ im Kopf). Detail-Sheet mit Bereich, Link zum Trainingsplan und Schließen; „01 Übungen“ mit Nummer, Name, Vorgabe, Gewicht und den Satz-Tasten (64 × 52 pt). Aufwärmen und Steigerungsregel aufklappbar. Unten fest: „8 von 24 Sätzen“, die Skala und „Training abschließen“ – verriegelt, bis ein Satz erledigt ist.

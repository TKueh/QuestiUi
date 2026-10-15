# AusgabeScreen
Fortschritt → Ausgaben → „+“ (oder aus einem Geburtstag/Wunsch heraus). Eingabe-Sheet „Abbrechen · Ausgabe erfassen · Sichern“ mit Pflichtfeldern, Betragsfeld (Dezimaltastatur, €, rechtsbündig), Datum, Bereich, Zahlungsart als Schnellwahl und optionaler Zuordnung. Gezeigt ist der Fehlerzustand: fehlender Betrag – rote Linie, LED, Meldung als `role="alert"`.

# AusgabenScreen
Fortschritt → Ausgaben. Der laufende Monat: bezahlte Summe als Messwert mit neutraler Veränderung zum Vormonat (mehr ausgeben ist nicht per se schlecht, `changeNeutral`), der größte Posten, sechs Monate als Säulen (aktueller Monat hervorgehoben), Filter nach Bereich, das Ausgabenbuch nach Tagen mit Tagessumme. „+ Ausgabe“ in der Werkzeugleiste öffnet „Ausgabe erfassen“, eine Zeile öffnet sie zum Bearbeiten; Löschen lässt sich rückgängig machen. Summe, Säule und Filterzahlen rechnen aus demselben Ausgabenbuch.

# FortschrittScreen
Alltag-Statistik der laufenden Woche: Zifferblatt mit einem Strich pro Quest, Erfüllungsrate (erledigt / fällig bis gestern), Serie (vollständige Tage bis gestern), Tag für Tag als Wochenpegel und die Verteilung nach Bereich. Alle Zahlen kommen aus `Questi.demo` – dieselben Quests wie Heute und Kalender; Abhaken irgendwo ändert sie hier.

# GeschenkeWuenscheScreen
Fortschritt → Geschenke & Wünsche, für das laufende Jahr. Zwei Messwerte (bezahlt, darunter geplant bzw. Budget), dann je Geschenk und je Wunsch eine Messstrecke „bezahlt / geplant“ im Datenton. Die Zahlen sind dieselben wie in Leben (Geburtstage, Wünsche) und in Ausgaben: Diese Ansicht rechnet nur zusammen, bearbeitet wird dort.

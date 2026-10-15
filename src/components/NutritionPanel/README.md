# NutritionPanel

Nährwertanzeige: Energie groß und leicht, darunter ein **Messstreifen** nach Energieanteil – 4-pt-Segmente mit Lücke (Eiweiß, Kohlenhydrate, Fett), Endanschläge und Viertel-Teilung mit 25 · 50 · 75. Darunter die Legende als Ablesetabelle: je Zeile 12 × 2-pt-Strich in Segmentfarbe, Name, Energieanteil in %, Gramm – Zahlen rechtsbündig in einer Spalte, Ballaststoffe als letzte Zeile ohne Strich. Keine über die Breite verteilten Spalten: die stünden nicht unter ihren Segmenten. Nicht aufgeschlüsselte Energie bleibt neutral.

- `NutritionPanel`: `kcal`, `macros` (`{ protein, carbs, fat }` in g), `fiber` (letzte Tabellenzeile), `note`. Fehlende Makros werden nicht ergänzt.
- `IngredientList`: `title`, `portions`, `items` (`{ name, note, quantity }`).

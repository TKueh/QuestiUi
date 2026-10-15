# ShoppingList

Einkaufszeile mit Checkbox und Mengenangabe (rechts, tabellarisch) und gruppierte Einkaufsliste nach Einkaufsbereichen mit Zähler pro Gruppe.

- `ShoppingRow`: `name`, `note`, `quantity`, `checked` / `defaultChecked`, `onChange`, `pantry`. Zeile 56 pt (`row-h`); die Haken-Taste zeigt Zeigen und Drücken wie die Nordhaus-Checkbox.
- `ShoppingList`: `groups` (`[{ title, pantry, items }]`), `value` / `defaultValue` (je Gruppe ein Array von Booleans: abgehakt je Zeile), `onChange`. Vorrat steht separat und zählt nicht als Einkauf. Die Zähler im Gruppenkopf folgen dem Abhaken.
- Eine vollständige Liste schließt die Einkaufsquest ab.

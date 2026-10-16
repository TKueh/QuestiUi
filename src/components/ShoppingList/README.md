# ShoppingList

Einkaufszeile mit Abhak-Ring und Mengenangabe (rechts, tabellarisch) und gruppierte Einkaufsliste nach Einkaufsbereichen mit Zähler pro Gruppe.

- `ShoppingRow`: `name`, `note`, `quantity`, `checked` / `defaultChecked`, `onChange`, `pantry`. Eine `ListItem`-Zeile mit `check` (Ring wie Quests, Grundsätze „Wann welche“); abgehakt durchgestrichen, Vorrat als „· Vorrat“ an der Menge.
- `ShoppingList`: `groups` (`[{ title, pantry, items }]`), `value` / `defaultValue` (je Gruppe ein Array von Booleans: abgehakt je Zeile), `onChange`. Vorrat steht separat und zählt nicht als Einkauf. Die Zähler im Gruppenkopf folgen dem Abhaken.
- Eine vollständige Liste schließt die Einkaufsquest ab.

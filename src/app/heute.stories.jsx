import React from 'react';
import { ScreenCard } from '../index.js';

export default { title: 'Screens / Heute' };

/* Jeder Screen startet die App an seiner Stelle – von dort ist alles weiter bedienbar. Einordnung: docs/AppFlow.md */
export const EinkaufScreen = () => <ScreenCard name="EinkaufScreen" />;
export const HeuteScreen = () => <ScreenCard name="HeuteScreen" />;
export const MahlzeitScreen = () => <ScreenCard name="MahlzeitScreen" />;
export const NeueQuestFehlerScreen = () => <ScreenCard name="NeueQuestFehlerScreen" />;
export const NeueQuestScreen = () => <ScreenCard name="NeueQuestScreen" />;
export const QuestDetailScreen = () => <ScreenCard name="QuestDetailScreen" />;
export const TrainingAbschlussScreen = () => <ScreenCard name="TrainingAbschlussScreen" />;
export const TrainingScreen = () => <ScreenCard name="TrainingScreen" />;

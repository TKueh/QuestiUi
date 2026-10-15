import React from 'react';
import { ScreenCard } from '../index.js';

export default { title: 'Screens / Fortschritt' };

/* Jeder Screen startet die App an seiner Stelle – von dort ist alles weiter bedienbar. Einordnung: docs/AppFlow.md */
export const AusgabeScreen = () => <ScreenCard name="AusgabeScreen" />;
export const AusgabenScreen = () => <ScreenCard name="AusgabenScreen" />;
export const FortschrittScreen = () => <ScreenCard name="FortschrittScreen" />;
export const GeschenkeWuenscheScreen = () => <ScreenCard name="GeschenkeWuenscheScreen" />;

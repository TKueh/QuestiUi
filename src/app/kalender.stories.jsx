import React from 'react';
import { ScreenCard } from '../index.js';

export default { title: 'Screens / Kalender' };

/* Jeder Screen startet die App an seiner Stelle – von dort ist alles weiter bedienbar. Einordnung: docs/AppFlow.md */
export const KalenderMonatScreen = () => <ScreenCard name="KalenderMonatScreen" />;
export const KalenderScreen = () => <ScreenCard name="KalenderScreen" />;
export const KalenderWocheScreen = () => <ScreenCard name="KalenderWocheScreen" />;
export const TerminScreen = () => <ScreenCard name="TerminScreen" />;

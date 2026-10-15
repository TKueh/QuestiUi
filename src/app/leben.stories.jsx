import React from 'react';
import { ScreenCard } from '../index.js';

export default { title: 'Screens / Leben' };

/* Jeder Screen startet die App an seiner Stelle – von dort ist alles weiter bedienbar. Einordnung: docs/AppFlow.md */
export const EintragScreen = () => <ScreenCard name="EintragScreen" />;
export const LebenBacklogScreen = () => <ScreenCard name="LebenBacklogScreen" />;
export const LebenScreen = () => <ScreenCard name="LebenScreen" />;
export const LebenWuenscheScreen = () => <ScreenCard name="LebenWuenscheScreen" />;

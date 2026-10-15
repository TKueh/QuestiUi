import React from 'react';
import { ScreenCard } from '../index.js';

export default { title: 'Screens / Mehr' };

/* Jeder Screen startet die App an seiner Stelle – von dort ist alles weiter bedienbar. Einordnung: docs/AppFlow.md */
export const DeinTagScreen = () => <ScreenCard name="DeinTagScreen" />;
export const EinstellungenScreen = () => <ScreenCard name="EinstellungenScreen" />;
export const FinanzplanScreen = () => <ScreenCard name="FinanzplanScreen" />;
export const HealthScreen = () => <ScreenCard name="HealthScreen" />;
export const KalenderAbgleichScreen = () => <ScreenCard name="KalenderAbgleichScreen" />;
export const MehrScreen = () => <ScreenCard name="MehrScreen" />;
export const MessungScreen = () => <ScreenCard name="MessungScreen" />;
export const PlaeneScreen = () => <ScreenCard name="PlaeneScreen" />;
export const PlanEditorScreen = () => <ScreenCard name="PlanEditorScreen" />;
export const PlanImportScreen = () => <ScreenCard name="PlanImportScreen" />;
export const SpeicherfehlerScreen = () => <ScreenCard name="SpeicherfehlerScreen" />;
export const UngesichertScreen = () => <ScreenCard name="UngesichertScreen" />;

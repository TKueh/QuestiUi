import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { MainBar, S, col, useNav } from '../shared.jsx';

const { iso } = N.utils;

/* ---------- 5 · Mehr ---------- */
function MehrBody() {
  const s = demo.use();
  const nav = useNav();
  const pl = S.plansInUse(s);
  return (
    <Fragment>
      <MainBar title="Mehr" eyebrow="Dein Bereich" />
      <div className="qs-mehr" style={col(8, '0 var(--gutter) var(--space-8)')}>
        <N.UserChip name="Tobias" subtitle="Persönlicher Bereich · lokal gespeichert" size={44} />
        <N.SettingsGroup title="Bereiche">
          <N.SettingsRow
            icon="heart"
            label="Gesundheit"
            description="Gewicht, Ruhepuls, Schritte und Training"
            onClick={() => {
              nav.go('health');
            }}
          />
          <N.SettingsRow
            icon="note"
            label="Meine Pläne"
            description="Inhalte, Wiederholungen und eigene Pläne"
            value={N.utils.idx(pl.inUse)}
            onClick={() => {
              nav.go('plans');
            }}
          />
          <N.SettingsRow
            icon="thermometer"
            label="Krank & Urlaub"
            description={
              s.mode.value === 'normal'
                ? 'Pläne passend pausieren'
                : s.mode.value === 'sick'
                  ? 'Krank gemeldet'
                  : 'Urlaub eingetragen'
            }
            onClick={() => {
              nav.open('dayMode');
            }}
          />
          <N.SettingsRow
            icon="settings"
            label="Einstellungen"
            description="Darstellung, Woche, Verbindungen"
            onClick={() => {
              nav.go('settings');
            }}
          />
        </N.SettingsGroup>
        <N.SettingsGroup
          title="Daten"
          footer="Alles bleibt auf diesem Gerät. Kalender und Apple Health werden als Datei abgeglichen."
        >
          <N.SettingsRow
            icon="calendar"
            label="Kalenderdateien"
            description={s.calendarImport.applied ? 'abgeglichen heute' : 'zuletzt heute 09:12'}
            led={s.calendarImport.applied ? 'on' : 'off'}
            value="Lokal"
            onClick={() => {
              nav.open('calImport');
            }}
          />
          <N.SettingsRow
            icon="heart"
            label="Apple Health"
            description="export.xml · 211 Messungen"
            led="on"
            value="Importiert"
            onClick={() => {
              nav.go('health');
            }}
          />
          <N.SettingsRow
            icon="download"
            label="Sicherung exportieren"
            control="chevron"
            onClick={() => {
              nav.toast({ message: `Sicherung „questi-${iso(new Date())}.json“ erstellt.` });
            }}
          />
        </N.SettingsGroup>
        <N.Footer brand="questi">Version 1.0 · Deine persönlichen Pläne</N.Footer>
      </div>
    </Fragment>
  );
}

export { MehrBody };

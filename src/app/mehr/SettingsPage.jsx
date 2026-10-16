import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { DayModePicker } from '../../components/DayModePicker/DayModePicker.jsx';
import { ThemePicker } from '../../components/DayModePicker/ThemePicker.jsx';
import { demo } from '../../data/demo.js';
import { SubBar, col, weekAB } from '../shared.jsx';

const { iso } = N.utils;

function SettingsPage() {
  const s = demo.use();
  return (
    <Fragment>
      <SubBar nav={true} large={true} backLabel="Mehr" title="Einstellungen" />
      <div style={col(8, '0 var(--gutter) var(--space-8)')}>
        <div className="nh-field">
          <span className="nh-label">Darstellung</span>
          <ThemePicker value={s.theme} onChange={demo.act.setTheme} />
        </div>
        <N.SettingsGroup index={1} title="Allgemein">
          <N.SettingsRow
            icon="contrast"
            label="Kontrast erhöhen"
            description="Kräftigere Texte und Trennlinien"
            control="switch"
            checked={s.contrast}
            onChange={demo.act.setContrast}
          />
          <N.SettingsRow icon="calendar" label="Wochenbeginn" value="Montag" />
          <N.SettingsRow icon="repeat" label="Aktuelle Woche" value={weekAB().replace('Woche ', '')} />
        </N.SettingsGroup>
        <div className="nh-field">
          <span className="nh-label">Tagesmodus</span>
          <DayModePicker
            value={s.mode.value}
            onChange={(v) => {
              demo.act.setMode({ value: v, from: iso(new Date()) });
            }}
          />
        </div>
        <N.SettingsGroup
          index={2}
          title="Verbindungen"
          footer="Alles bleibt lokal. Live-Abgleich braucht die native App mit EventKit und HealthKit."
        >
          <N.SettingsRow
            icon="calendar"
            label="Kalenderdateien"
            description="Import & Export (.ics)"
            led={s.calendarImport.applied ? 'on' : 'off'}
            value="Lokal"
          />
          <N.SettingsRow
            icon="heart"
            label="Apple Health"
            description="export.xml · 211 Messungen"
            led="on"
            value="Importiert"
          />
        </N.SettingsGroup>
      </div>
    </Fragment>
  );
}

export { SettingsPage };

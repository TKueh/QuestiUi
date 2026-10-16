import React, { useState } from 'react';
import N, { Badge, Button } from 'nordhaus-ui/src/bare.js';
import { DayModePicker } from '../../components/DayModePicker/DayModePicker.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav, weekAB } from '../shared.jsx';

const { addDays, iso } = N.utils;

function DayModeSheet() {
  const s = demo.use();
  const nav = useNav();
  const m = useState(s.mode.value === 'normal' ? 'vacation' : s.mode.value);
  const from = useState(iso(addDays(new Date(), 3)));
  const to = useState(iso(addDays(new Date(), 10)));
  /* was pausiert – gesteuert, geht mit in setMode; Essen folgt dem Modus, bis man es selbst ändert */
  const pause = useState({ training: true, food: m[0] === 'vacation', household: false });
  const pick = (v) => {
    m[1](v);
    pause[1]((p) => Object.assign({}, p, { food: v === 'vacation' }));
  };
  const set = (k) => (v) => {
    pause[1]((p) => Object.assign({}, p, { [k]: v }));
  };
  const start = m[0] === 'vacation' ? from[0] : iso(new Date());
  const label = m[0] === 'normal' ? 'Normal fortsetzen' : m[0] === 'sick' ? 'Krank melden' : 'Urlaub eintragen';
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      context={<Badge>Dein Tag</Badge>}
      eyebrow={`${dateLong(iso(new Date()))} · ${weekAB()}`}
      title="Tag anpassen"
      description="Wenn du krank oder im Urlaub bist, pausieren die passenden Pläne. Pausierte Tage zählen für die Serie neutral."
      actions={
        <Button
          variant="accent"
          arrow={true}
          onClick={() => {
            demo.act.setMode({ value: m[0], from: start, to: to[0], pause: pause[0] });
            nav.close();
            nav.toast({
              message:
                m[0] === 'normal'
                  ? 'Alle Pläne laufen wieder.'
                  : m[0] === 'sick'
                    ? 'Gute Besserung – Training und Bewegung pausieren.'
                    : 'Urlaub eingetragen – die Pläne pausieren.',
            });
          }}
        >
          {label}
        </Button>
      }
    >
      <DayModePicker value={m[0]} onChange={pick} />
      {m[0] !== 'normal' ? (
        <N.FieldRow>
          <N.DateField label="Von" value={from[0]} onChange={from[1]} quick={false} />
          <N.DateField label="Bis" value={to[0]} onChange={to[1]} min={from[0]} quick={false} />
        </N.FieldRow>
      ) : null}
      {m[0] !== 'normal' ? (
        <div>
          <N.Checkbox
            label="Training & Bewegung pausieren"
            description="Kraft, Judo, Fußball, Bewegungspausen"
            checked={pause[0].training}
            onChange={set('training')}
          />
          <N.Checkbox
            label="Essensplan pausieren"
            description="Einkauf und Vorkochen entfallen"
            checked={pause[0].food}
            onChange={set('food')}
          />
          <N.Checkbox
            label="Haushalt pausieren"
            description="Geburtstage und Fristen bleiben immer aktiv"
            checked={pause[0].household}
            onChange={set('household')}
          />
        </div>
      ) : null}
      <Badge variant="streak" label="Serie" {...S.streak(s)} paused={m[0] !== 'normal' && start <= iso(new Date())} />
    </N.Sheet>
  );
}

export { DayModeSheet };

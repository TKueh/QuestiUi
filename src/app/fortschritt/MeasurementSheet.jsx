import React, { useState } from 'react';
import N, { List } from 'nordhaus-ui/src/bare.js';
import { MeasurementRow } from '../../components/MeasurementRow/MeasurementRow.jsx';
import { demo } from '../../data/demo.js';
import { dateShort, useNav } from '../shared.jsx';

const { addDays, iso, num } = N.utils;

function MeasurementSheet() {
  const s = demo.use();
  const nav = useNav();
  const v = useState(num(s.weights[s.weights.length - 1], 1));
  const tried = useState(false);
  const val = parseFloat(String(v[0]).replace(',', '.'));
  const bad = tried[0] && !(val > 30 && val < 250) ? 'Gib ein Gewicht zwischen 30 und 250 kg ein.' : null;
  function save() {
    tried[1](true);
    if (!(val > 30 && val < 250)) return;
    demo.act.addMeasurement(Math.round(val * 10) / 10);
    nav.close();
    nav.toast({ tone: 'success', message: `Gewicht ${num(val, 1)} kg gesichert.` });
  }
  return (
    <N.Sheet
      inline={true}
      size="compact"
      open={true}
      title="Gewicht erfassen"
      onCancel={nav.close}
      onDone={save}
      doneLabel="Sichern"
    >
      <N.TextField
        label="Gewicht"
        kind="number"
        size="lg"
        value={v[0]}
        onChange={v[1]}
        suffix="kg"
        error={bad}
        hint={bad ? undefined : 'Ein Wert pro Tag. Deine Messung hat Vorrang vor dem Apple-Health-Import.'}
      />
      <N.FieldRow>
        <N.DateField label="Datum" defaultValue={iso(new Date())} max={iso(new Date())} quick={false} />
        <N.TimeField label="Uhrzeit" defaultValue="07:10" optional={true} />
      </N.FieldRow>
      <div>
        <N.SectionHeader title="Zuletzt" rule={false} />
        <List>
          {s.measurements.slice(0, 3).map((m, i) => {
            const prev = s.measurements[i + 1];
            return (
              <MeasurementRow
                key={m.id}
                date={dateShort(iso(addDays(new Date(), m.d)))}
                source={m.source}
                value={num(m.value, 1)}
                unit="kg"
                change={prev ? +(m.value - prev.value).toFixed(1) : undefined}
                decimals={1}
                onEdit={
                  m.own
                    ? () => {
                        v[1](num(m.value, 1));
                      }
                    : undefined
                }
              />
            );
          })}
        </List>
      </div>
    </N.Sheet>
  );
}

export { MeasurementSheet };

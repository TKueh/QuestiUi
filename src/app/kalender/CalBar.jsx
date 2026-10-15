import React, { Fragment } from 'react';
import N, { Button, IconButton } from 'nordhaus-ui';
import { demo } from '../../data/demo.js';
import { MainBar, rangeLabel, useNav } from '../shared.jsx';

const { iso, parse } = N.utils;

/* ---------- 2 · Kalender ---------- */
/* Kalenderkopf: der Monat als Titel. Der Monat blättert mit ‹ Heute ›; Liste und Woche zeigen die laufende Woche (die Vorschau führt eine Woche Daten) und haben keine Blättertasten. */
function CalBar(props) {
  const s = demo.use();
  const nav = useNav();
  const M = props.month ? parse(props.month) : new Date();
  const cur = iso(new Date()).slice(0, 7) === (props.month || iso(new Date())).slice(0, 7);
  const label = props.mode === 'month' ? 'Monat' : 'Woche';
  const month = props.mode === 'month';
  return (
    <Fragment>
      <MainBar
        title={M.toLocaleDateString('de-DE', { month: 'long' })}
        eyebrow={month ? `Kalender · ${M.getFullYear()}` : rangeLabel(s)}
        toolsLabel="Zeitraum"
        addParams={{ date: props.day }}
        tools={
          month
            ? [
                <IconButton
                  key="p"
                  icon="chevron-left"
                  label="Vorheriger Monat"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    props.onMonth(-1);
                  }}
                />,
                <Button
                  key="t"
                  variant="key"
                  size="sm"
                  disabled={cur}
                  onClick={() => {
                    props.onMonth(0);
                  }}
                >
                  Heute
                </Button>,
                <IconButton
                  key="n"
                  icon="chevron-right"
                  label="Nächster Monat"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    props.onMonth(1);
                  }}
                />,
              ]
            : null
        }
      />
      <div style={{ padding: '0 var(--gutter) var(--space-3)' }}>
        <N.SegmentedControl
          block={true}
          label="Ansicht"
          value={props.mode}
          onChange={(v) => {
            nav.view('cal', v);
          }}
          options={[
            { value: 'list', label: 'Liste' },
            { value: 'week', label: 'Woche' },
            { value: 'month', label: 'Monat' },
          ]}
        />
      </div>
    </Fragment>
  );
}

export { CalBar };

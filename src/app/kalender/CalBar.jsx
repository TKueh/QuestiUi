import React, { Fragment } from 'react';
import N, { Button, IconButton } from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { FoldUnder, MainBar, rangeLabel, useNav } from '../shared.jsx';

const { iso, parse } = N.utils;

/* ---------- 2 · Kalender ---------- */
/* Kalenderkopf (Regel 11): der Monat als Titel, rechts ‹ Heute › in jeder Ansicht. Der Monat blättert; Liste und Woche zeigen die laufende Woche
   (die Vorschau führt eine Woche Daten) – dort stehen die Tasten verriegelt. Über dem Titel immer der Wochenbereich in derselben Form. */
function CalBar(props) {
  const s = demo.use();
  const nav = useNav();
  const M = props.month ? parse(props.month) : new Date();
  const cur = iso(new Date()).slice(0, 7) === (props.month || iso(new Date())).slice(0, 7);
  const label = props.mode === 'month' ? 'Monat' : 'Woche';
  const month = props.mode === 'month';
  const last = new Date(M.getFullYear(), M.getMonth() + 1, 0);
  const kw = `KW ${N.utils.isoWeek(new Date(M.getFullYear(), M.getMonth(), 1))}–${N.utils.isoWeek(last)} · ${M.getFullYear()}`;
  return (
    <Fragment>
      <MainBar
        title={M.toLocaleDateString('de-DE', { month: 'long' })}
        eyebrow={month ? kw : rangeLabel(s)}
        toolsLabel="Zeitraum"
        addParams={{ date: props.day }}
        tools={[
          <IconButton
            key="p"
            icon="chevron-left"
            label="Vorheriger Monat"
            size="sm"
            variant="outline"
            disabled={!month}
            onClick={() => {
              props.onMonth(-1);
            }}
          />,
          <Button
            key="t"
            variant="key"
            size="sm"
            disabled={!month || cur}
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
            disabled={!month}
            onClick={() => {
              props.onMonth(1);
            }}
          />,
        ]}
      />
      <FoldUnder>
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
      </FoldUnder>
    </Fragment>
  );
}

export { CalBar };

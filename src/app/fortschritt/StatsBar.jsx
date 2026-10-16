import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { MainBar, rangeLabel, useNav } from '../shared.jsx';

/* ---------- 4 · Fortschritt ---------- */
function StatsBar(props) {
  const s = demo.use();
  const nav = useNav();
  return (
    <Fragment>
      <MainBar title="Fortschritt" eyebrow={rangeLabel(s)} />
      <N.Tabs
        label="Bereich"
        value={props.tab}
        onChange={(v) => {
          nav.view('stats', v);
        }}
        items={[
          { id: 'a', label: 'Alltag' },
          { id: 'h', label: 'Gesundheit' },
          { id: 'p', label: 'Geschenke & Wünsche' },
          { id: 's', label: 'Ausgaben' },
        ]}
      />
    </Fragment>
  );
}

export { StatsBar };

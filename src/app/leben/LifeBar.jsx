import React, { Fragment } from 'react';
import N from 'nordhaus-ui';
import { demo } from '../../data/demo.js';
import { MainBar, S, useNav } from '../shared.jsx';

function LifeBar(props) {
  const s = demo.use();
  const nav = useNav();
  const c = S.lifeCounts(s);
  return (
    <Fragment>
      <MainBar title="Leben" eyebrow={`${c.birthdays} Geburtstage · ${c.projects} Vorhaben · ${c.wishes} Wünsche`} />
      <N.Tabs
        label="Leben"
        value={props.tab}
        onChange={(v) => {
          nav.view('life', v);
        }}
        items={[
          { id: 'b', label: 'Geburtstage', count: c.birthdays },
          { id: 'l', label: 'Vorhaben', count: c.projects },
          { id: 'w', label: 'Wünsche', count: c.wishes },
        ]}
      />
    </Fragment>
  );
}

export { LifeBar };

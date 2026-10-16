import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { FoldUnder, MainBar, S, useNav } from '../shared.jsx';

function LifeBar(props) {
  const s = demo.use();
  const nav = useNav();
  const c = S.lifeCounts(s);
  return (
    <Fragment>
      <MainBar
        title="Leben"
        eyebrow={`Geburtstage ${N.utils.idx(c.birthdays)} · Vorhaben ${N.utils.idx(c.projects)} · Wünsche ${N.utils.idx(c.wishes)}`}
      />
      <FoldUnder>
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
      </FoldUnder>
    </Fragment>
  );
}

export { LifeBar };

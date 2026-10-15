import React, { Fragment, useState } from 'react';
import N from 'nordhaus-ui';
import { demo } from '../../data/demo.js';
import { S, useNav } from '../shared.jsx';
import { CalBar } from './CalBar.jsx';
import { DayPanelFor } from './DayPanelFor.jsx';

function CalListBody() {
  const s = demo.use();
  const nav = useNav();
  const day = useState(nav.route.day || S.today(s).date);
  return (
    <Fragment>
      <CalBar mode="list" day={day[0]} />
      <N.CalendarWeek variant="list" days={S.weekDays(s)} value={day[0]} onChange={day[1]} />
      <div style={{ padding: 'var(--space-6) var(--gutter) var(--space-8)' }}>
        <DayPanelFor date={day[0]} />
      </div>
    </Fragment>
  );
}

export { CalListBody };

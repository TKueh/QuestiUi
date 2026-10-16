import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { S, useNav } from '../shared.jsx';
import { CalBar } from './CalBar.jsx';

function CalWeekBody() {
  const s = demo.use();
  const nav = useNav();
  return (
    <Fragment>
      <CalBar mode="week" />
      <div style={{ flex: 1, minHeight: 0, display: 'flex', padding: '0 var(--space-1)' }}>
        <N.CalendarWeek
          events={S.weekEvents(s)}
          hours={[6, 23]}
          hourHeight={46}
          scrollTo={7.5}
          now={demo.NOW_H}
          height="100%"
          className="nh-grow"
          onEventClick={(e) => {
            nav.open('termin', { date: e.date, title: e.title });
          }}
          onDayClick={(d) => {
            nav.view('cal', 'list', { day: d });
          }}
        />
      </div>
    </Fragment>
  );
}

export { CalWeekBody };

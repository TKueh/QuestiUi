import React, { Fragment, useState } from 'react';
import N from 'nordhaus-ui';
import { demo } from '../../data/demo.js';
import { G, S, dateLong } from '../shared.jsx';
import { CalBar } from './CalBar.jsx';
import { DayPanelFor } from './DayPanelFor.jsx';

const { iso, parse } = N.utils;

function CalMonthBody() {
  const s = demo.use();
  const day = useState(S.today(s).date);
  const month = useState(`${iso(new Date()).slice(0, 8)}01`);
  function go(d) {
    if (!d) {
      month[1](`${iso(new Date()).slice(0, 8)}01`);
      day[1](S.today(s).date);
      return;
    }
    const m = parse(month[0]);
    month[1](iso(new Date(m.getFullYear(), m.getMonth() + d, 1)));
  }
  const inWeek = s.week.some((x) => x.date === day[0]);
  return (
    <Fragment>
      <CalBar mode="month" day={day[0]} month={month[0]} onMonth={go} />
      <div style={G}>
        <N.CalendarMonth
          events={S.monthEvents(s, month[0])}
          header={false}
          month={month[0]}
          onMonthChange={(m) => {
            month[1](m);
          }}
          value={day[0]}
          onChange={(v) => {
            day[1](v);
            if (v.slice(0, 7) !== month[0].slice(0, 7)) month[1](`${v.slice(0, 8)}01`);
          }}
        />
        <div style={{ paddingTop: 'var(--space-3)' }}>
          <N.CalendarLegend categories={['training', 'movement', 'household', 'birthday', 'finance']} />
        </div>
      </div>
      <div style={{ padding: 'var(--space-6) var(--gutter) var(--space-8)' }}>
        {inWeek ? (
          <DayPanelFor date={day[0]} />
        ) : (
          <N.Notice icon="calendar" title={dateLong(day[0])}>
            Die Vorschau führt Tagesdetails für die laufende Woche. Im Monat zeigen Striche und Stand, was geplant ist.
          </N.Notice>
        )}
      </div>
    </Fragment>
  );
}

export { CalMonthBody };

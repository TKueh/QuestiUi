import N from 'nordhaus-ui';
import React from 'react';
import { DayPanel } from '../../components/DayPanel/DayPanel.jsx';
import { demo } from '../../data/demo.js';
import { S, useNav } from '../shared.jsx';

const { iso } = N.utils;

function DayPanelFor({ date }) {
  const s = demo.use();
  const nav = useNav();

  const d = s.week.filter((x) => x.date === date)[0] || S.today(s);

  const st = S.dayStats(d);
  return (
    <DayPanel
      addLabel="Quest"
      date={d.date}
      today={d.date === iso(new Date())}
      done={st.done}
      total={st.total}
      onAdd={() => {
        nav.open('newQuest', { date: d.date });
      }}
      events={S.dayEvents(d).map((e) =>
        Object.assign({}, e, {
          onClick: () => {
            nav.open('termin', { date: d.date, title: e.title });
          },
        }),
      )}
    />
  );
}

export { DayPanelFor };

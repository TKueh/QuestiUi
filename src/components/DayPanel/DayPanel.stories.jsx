import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Zeilen / DayPanel' };

const useState = React.useState;
const F = React.Fragment;
const U = N.utils;
const TODAY = U.iso(new Date());
function day(n) {
  return U.iso(U.addDays(new Date(), n));
}
function wk(n) {
  return U.iso(U.addDays(U.weekStartOf(new Date(), 1), n));
}
function cap(i, t) {
  return (
    <p className="nh-demo-cap">
      <span>{(i < 10 ? '0' : '') + i}</span>
      {t}
    </p>
  );
}
function Demo() {
  return (
    <div className="nh-demo">
      <div className="nh-demo-w" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <Q.DayPanel
          date={TODAY}
          today={true}
          done={3}
          total={10}
          onAdd={() => {}}
          events={[
            { start: '12:30', end: '13:00', title: 'Mittagsbox B', category: 'food', done: true },
            { start: '19:00', end: '20:30', title: 'Judo', category: 'training' },
          ]}
        />
        <div>
          <Q.AgendaDay
            date={day(1)}
            events={[
              { start: '18:00', end: '19:00', title: 'Kraft A', category: 'training' },
              { start: '20:00', end: '21:30', title: 'Fußball', category: 'training' },
            ]}
          />
          <Q.AgendaDay
            date={day(2)}
            defaultOpen={false}
            done={0}
            events={[{ start: '17:30', end: '18:15', title: 'Frischeinkauf', category: 'household' }]}
          />
        </div>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

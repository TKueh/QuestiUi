import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Pläne und Import / PlanPreviewWeek' };

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
  const S = (t, s) => ({
    title: t,
    short: t,
    state: s,
  });
  return (
    <div className="nh-demo">
      <div className="nh-demo-w">
        <Q.PlanPreviewWeek
          from="Mo, 20. Okt"
          days={[
            { items: [S('Kraft A'), S('Mittag A')] },
            { items: [S('Judo'), S('Mittag A'), S('Wraps', 'remove')] },
            { items: [S('Mittag C', 'add'), S('Einkauf')] },
            { items: [S('Kraft A', 'change'), S('Judo')] },
            { items: [S('Fußball'), S('Mittag B')] },
            { items: [S('Kraft B'), S('Mittag C', 'add')] },
            { items: [S('Meal-Prep')] },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

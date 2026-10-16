import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Ernährung und Finanzen / WeekSummary' };

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
/* Die Demo läuft mit dem echten Wochentag: davor erledigt, heute im Gange, danach offen; der Samstag pausiert. */
const TI = (new Date().getDay() + 6) % 7;
function days() {
  return [9, 9, 10, 10, 8, 0, 6].map((t, i) =>
    i === 5
      ? { done: 0, total: 0, paused: true }
      : { done: i < TI ? t : i === TI ? Math.round(t * 0.3) : 0, total: t, today: i === TI },
  );
}
function Demo() {
  return (
    <div className="nh-demo">
      <div className="nh-demo-w">
        <Q.WeekSummary days={days()} />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

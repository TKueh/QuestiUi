import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Pläne und Import / DayModePicker' };

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
      {cap(1, 'Tagesmodus – Normal · Krank · Urlaub')}
      <div className="nh-demo-w">
        <Q.DayModePicker defaultValue="normal" />
      </div>
      {cap(2, 'ThemePicker – System · Hell · Dunkel mit Theme-Miniaturen')}
      <div className="nh-demo-w">
        <Q.ThemePicker defaultValue="system" />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

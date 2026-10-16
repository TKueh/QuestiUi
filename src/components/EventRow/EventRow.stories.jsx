import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Zeilen / EventRow' };

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
      <div className="nh-demo-w nh-list nh-rows--boxed">
        <Q.EventRow allDay={true} title="Lena hat Geburtstag" category="birthday" />
        <Q.EventRow start="08:00" end="12:00" title="Arbeit" category="work" context={true} />
        <Q.EventRow start="12:30" end="13:00" title="Mittagsbox B essen" category="food" done={true} />
        <Q.EventRow start="19:00" end="20:30" title="Judo" subtitle="Verein · Halle 2" category="training" />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

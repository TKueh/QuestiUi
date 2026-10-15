import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Pläne und Import / DocLink' };

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
      <div className="nh-demo-row" style={{ gap: 'var(--space-5)' }}>
        <Q.DocLink external={true}>Trainingsplan.pdf</Q.DocLink>
        <Q.DocLink variant="chip" icon={false}>
          Originalplan
        </Q.DocLink>
        <Q.DocLink icon="link">Apple: Kalender importieren</Q.DocLink>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

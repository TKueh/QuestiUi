import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Training / TrainingSummary' };

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
        <Q.TrainingSummary setsDone={18} setsTotal={24} load={4280} duration={62} />
        <div className="nh-field">
          <span className="nh-label">Wie war das Training?</span>
          <Q.FeelingPicker defaultValue={4} />
        </div>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

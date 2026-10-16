import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Ernährung und Finanzen / BudgetLabel' };

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
      <div className="nh-demo-row" style={{ gap: 'var(--space-6)' }}>
        <Q.BudgetLabel amount={65} />
        <Q.BudgetLabel amount={120} spent={89.9} />
        <Q.BudgetLabel amount={50} spent={62} />
        <Q.BudgetLabel amount={63.77} label="Quartal" />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

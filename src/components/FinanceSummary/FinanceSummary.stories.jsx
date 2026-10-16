import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Ernährung und Finanzen / FinanceSummary' };

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
      <div className="nh-demo-w">
        <Q.FinanceSummary
          total={1284.5}
          free={812}
          caption="27 Verträge und Sparposten"
          rows={[
            { label: 'Wohnen', amount: 720, tone: 'household' },
            { label: 'Versicherungen', amount: 184.2, tone: 'finance' },
            { label: 'Sport', amount: 89, tone: 'training' },
            { label: 'Sparen', amount: 250, tone: 'personal' },
            { label: 'Abos', amount: 41.3, tone: 'work' },
          ]}
        />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

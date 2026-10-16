import React from 'react';
import N from 'nordhaus-ui/src/bare.js';
import Q from '../../index.js';

export default { title: 'Zeilen / ExpenseRow' };

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
      <div className="nh-demo-w" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Q.HistoryGroup date="Mittwoch, 14. Oktober" summary="−89,40 €">
          <Q.ExpenseRow
            category="birthday"
            title="Konzertkarten"
            date="14.10."
            method="Karte"
            payee="für Mara"
            amount={70}
          />
          <Q.ExpenseRow category="household" title="Frischeinkauf" date="14.10." method="Karte" amount={19.4} />
        </Q.HistoryGroup>
        <Q.HistoryGroup date="Montag, 12. Oktober" summary="−12,90 €">
          <Q.ExpenseRow category="training" title="Judo-Gürtel" date="12.10." method="Bar" amount={12.9} />
        </Q.HistoryGroup>
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

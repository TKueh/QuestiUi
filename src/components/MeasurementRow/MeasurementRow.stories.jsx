import React from 'react';
import N from 'nordhaus-ui';
import Q from '../../index.js';

export default { title: 'Zeilen / MeasurementRow' };

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
        <Q.MeasurementRow
          date="14.10."
          source="Eigene Messung"
          value="72,4"
          unit="kg"
          change={-0.3}
          decimals={1}
          onEdit={() => {}}
        />
        <Q.MeasurementRow date="13.10." source="Apple Health" value="72,7" unit="kg" change={0.1} decimals={1} />
        <Q.MeasurementRow date="12.10." source="Apple Health" value="72,6" unit="kg" change={-0.2} decimals={1} />
      </div>
    </div>
  );
}

export const Vorschau = () => <Demo />;

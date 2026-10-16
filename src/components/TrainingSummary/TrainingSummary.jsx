import React from 'react';
import N, { Metric } from 'nordhaus-ui/src/bare.js';

const { cx, num } = N.utils;

/* flat: im Sheet ohne eigene Tafel – das Sheet ist schon die Einheit (Grundsatz 1) */
function TrainingSummary({ className, setsDone, setsTotal, load, duration, feeling, flat }) {
  return (
    <div className={cx('qs-trainsum', flat && 'qs-trainsum--flat', className)}>
      <Metric label="Sätze" value={N.utils.frac(setsDone, setsTotal)} size="sm" />
      <Metric label="Last" value={num(load, 0)} unit="kg" size="sm" />
      <Metric label="Dauer" value={duration} unit="min" size="sm" />
      {feeling ? <Metric label="Gefühl" value={feeling} size="sm" /> : null}
    </div>
  );
}

export { TrainingSummary };

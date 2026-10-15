import React from 'react';
import N, { Metric } from 'nordhaus-ui';

const { cx, num } = N.utils;

function TrainingSummary({ className, setsDone, setsTotal, load, duration, feeling }) {
  return (
    <div className={cx('qs-trainsum', className)}>
      <Metric label="Sätze" value={`${setsDone}/${setsTotal}`} size="sm" />
      <Metric label="Last" value={num(load, 0)} unit="kg" size="sm" />
      <Metric label="Dauer" value={duration} unit="min" size="sm" />
      {feeling ? <Metric label="Gefühl" value={feeling} size="sm" /> : null}
    </div>
  );
}

export { TrainingSummary };

import React from 'react';
import N, { SegmentedControl } from 'nordhaus-ui/src/bare.js';

const { cx, useCtl } = N.utils;

const FEEL = [
  { v: 1, l: 'Schwer' },
  { v: 2, l: 'Zäh' },
  { v: 3, l: 'Okay' },
  { v: 4, l: 'Gut' },
  { v: 5, l: 'Stark' },
];
/* FeelingPicker: a five-step selector scale, Schwer … Stark */
function FeelingPicker({ value, defaultValue, onChange, className, label }) {
  const st = useCtl(value, defaultValue == null ? null : defaultValue, onChange);
  return (
    <SegmentedControl
      className={cx('qs-feel', className)}
      block={true}
      label={label || 'Trainingsgefühl'}
      value={st[0]}
      onChange={st[1]}
      options={FEEL.map((f) => ({
        value: f.v,
        label: f.l,
      }))}
    />
  );
}

export { FeelingPicker };

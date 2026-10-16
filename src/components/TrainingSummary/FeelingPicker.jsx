import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx, useCtl } = N.utils;

const FEEL = [
  { v: 1, l: 'Schwer' },
  { v: 2, l: 'Zäh' },
  { v: 3, l: 'Okay' },
  { v: 4, l: 'Gut' },
  { v: 5, l: 'Stark' },
];
/* FeelingPicker: Trainingsgefühl in fünf Stufen, Schwer … Stark – ein Formularwert, daher Schnellwahl (ChoiceRow.Quick), kein Segment */
function FeelingPicker({ value, defaultValue, onChange, className, label }) {
  const st = useCtl(value, defaultValue == null ? null : defaultValue, onChange);
  return (
    <N.ChoiceRow.Quick
      className={cx('qs-feel', className)}
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

import React from 'react';
import { SegmentedControl } from 'nordhaus-ui/src/bare.js';

/* Darstellung Automatisch · Hell · Dunkel – Kartentasten mit Theme-Miniaturen, ohne Icon (Regel 10) */
function ThemePicker({ className, label, value, defaultValue, onChange }) {
  return (
    <SegmentedControl
      variant="tiles"
      className={className}
      label={label || 'Darstellung'}
      value={value}
      defaultValue={defaultValue || 'system'}
      onChange={onChange}
      options={[
        { value: 'system', label: 'Automatisch', swatch: 'system' },
        { value: 'light', label: 'Hell', swatch: 'light' },
        { value: 'dark', label: 'Dunkel', swatch: 'dark' },
      ]}
    />
  );
}

export { ThemePicker };

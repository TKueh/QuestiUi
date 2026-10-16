import React from 'react';
import { SegmentedControl } from 'nordhaus-ui/src/bare.js';

/* Darstellung System · Hell · Dunkel – Kartentasten mit Theme-Miniaturen */
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
        { value: 'system', label: 'System', icon: 'phone', swatch: 'system' },
        { value: 'light', label: 'Hell', icon: 'sun', swatch: 'light' },
        { value: 'dark', label: 'Dunkel', icon: 'moon', swatch: 'dark' },
      ]}
    />
  );
}

export { ThemePicker };

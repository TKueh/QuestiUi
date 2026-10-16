import React from 'react';
import { SegmentedControl } from 'nordhaus-ui/src/bare.js';

const MODES = [
  { value: 'normal', label: 'Normal', description: 'Alle Pläne aktiv', icon: 'sun' },
  { value: 'sick', label: 'Krank', description: 'Training & Bewegung pausieren', icon: 'thermometer', led: 'ink' },
  { value: 'vacation', label: 'Urlaub', description: 'Pläne pausieren, Serie neutral', icon: 'plane', led: 'ink' },
];
/* Betriebsartenschalter Normal · Krank · Urlaub – Kartentasten der SegmentedControl */
function DayModePicker({ className, label, value, defaultValue, onChange }) {
  return (
    <SegmentedControl
      variant="tiles"
      className={className}
      label={label || 'Tagesmodus'}
      value={value}
      defaultValue={defaultValue || 'normal'}
      onChange={onChange}
      options={MODES}
    />
  );
}

export { DayModePicker };

import React from 'react';
import N, { ListItem } from 'nordhaus-ui';

const { cx } = N.utils;

/* Messwertzeile: Datum und Quelle, Wert mit Einheit, Veränderung neutral, Bearbeiten für eigene Messungen */
function MeasurementRow({ className, date, source, value, unit, decimals, change, onEdit }) {
  return (
    <ListItem
      className={cx('qs-measure', className)}
      title={date}
      description={source}
      value={value}
      unit={unit}
      decimals={decimals}
      change={change != null ? { value: change, unit: unit, decimals: decimals } : undefined}
      onEdit={onEdit}
    />
  );
}

export { MeasurementRow };

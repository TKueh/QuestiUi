import React from 'react';
import N, { ListItem } from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* Ausgabenzeile: Kennmarke, Titel, Datum · Zahlungsart · Empfänger, Betrag rechts mit Minus */
function ExpenseRow(props) {
  const amount = props.amountCents != null ? props.amountCents / 100 : props.amount;
  return (
    <ListItem
      className={cx('qs-expense', props.className)}
      category={props.category}
      title={props.title}
      description={[props.date, props.method, props.payee].filter(Boolean).join(' · ')}
      value={-Math.abs(amount)}
      unit="€"
      decimals={2}
      trailing={props.onClick ? 'chevron' : undefined}
      onClick={props.onClick}
    />
  );
}

export { ExpenseRow };

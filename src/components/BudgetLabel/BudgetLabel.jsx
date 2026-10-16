import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx, eur } = N.utils;
/* glatte Beträge ohne Cent, alle anderen mit – nie gerundet */
const glatt = (v) => eur(v, { maximumFractionDigits: v % 1 ? 2 : 0 });

function BudgetLabel({ spent, amount, className, label }) {
  const over = spent != null && amount != null && spent > amount;
  return (
    <span className={cx('qs-budget', over && 'is-over', className)}>
      {spent != null ? (
        <Fragment>
          <b>{glatt(spent)}</b>
          <span>{` / ${glatt(amount)}`}</span>
        </Fragment>
      ) : (
        <b>{glatt(amount)}</b>
      )}
      {over ? <span className="qs-budget-over">überschritten</span> : null}
      {label ? <small>{label}</small> : null}
    </span>
  );
}

export { BudgetLabel };

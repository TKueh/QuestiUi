import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx, eur } = N.utils;

function BudgetLabel({ spent, amount, className, label }) {
  const over = spent != null && amount != null && spent > amount;
  return (
    <span className={cx('qs-budget', over && 'is-over', className)}>
      {spent != null ? (
        <Fragment>
          <b>{eur(spent, { maximumFractionDigits: 0 })}</b>
          <span>{` / ${eur(amount, { maximumFractionDigits: 0 })}`}</span>
        </Fragment>
      ) : (
        <b>{eur(amount, { maximumFractionDigits: amount % 1 ? 2 : 0 })}</b>
      )}
      {over ? <span className="qs-budget-over">überschritten</span> : null}
      {label ? <small>{label}</small> : null}
    </span>
  );
}

export { BudgetLabel };

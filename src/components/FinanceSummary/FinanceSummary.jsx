import React from 'react';
import N, { BarChart, Metric } from 'nordhaus-ui/src/bare.js';

const { cx, eur } = N.utils;

/* ---------- Finanzen ---------- */

function FinanceSummary(props) {
  const rows = props.rows || [];
  return (
    <div className={cx('qs-finance', props.className)}>
      <div className="qs-finance-top">
        <Metric
          label={props.label || 'Monatlich fix'}
          value={eur(props.total, { maximumFractionDigits: props.total % 1 ? 2 : 0 }).replace(/\s?€/, '')}
          unit="€"
          caption={props.caption}
        />
        {props.free != null ? (
          <Metric
            label="Frei verfügbar"
            value={eur(props.free, { maximumFractionDigits: props.free % 1 ? 2 : 0 }).replace(/\s?€/, '')}
            unit="€"
            size="sm"
          />
        ) : null}
      </div>
      <BarChart
        orientation="horizontal"
        data={rows.map((r) => ({
          label: r.label,
          value: r.amount,
          tone: r.tone,
          icon: r.icon,
          display: eur(r.amount, { maximumFractionDigits: r.amount % 1 ? 2 : 0 }),
        }))}
      />
    </div>
  );
}

export { FinanceSummary };

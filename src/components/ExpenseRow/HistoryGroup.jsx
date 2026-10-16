import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* ---------- Pläne, Import, Prüfung ---------- */

/* Nach Datum gruppierter Verlauf */
function HistoryGroup({ className, date, summary, children }) {
  return (
    <section className={cx('qs-hist', className)}>
      <div className="qs-hist-head">
        <h2>{date}</h2>
        {summary ? <span>{summary}</span> : null}
      </div>
      <div className="qs-hist-items">{children}</div>
    </section>
  );
}

export { HistoryGroup };

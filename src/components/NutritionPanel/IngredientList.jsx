import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* ---------- Ernährung und Einkauf ---------- */

function IngredientList({ className, title, portions, items }) {
  return (
    <div className={cx('qs-ingr', className)}>
      {title || portions ? (
        <div className="nh-lgroup-head">
          <h3>{title || 'Zutaten'}</h3>
          {portions ? <span>{portions + (portions === 1 ? ' Portion' : ' Portionen')}</span> : null}
        </div>
      ) : null}
      <dl>
        {(items || []).map((it, i) => (
          <div key={i} className="qs-ingr-row">
            <dt>
              {it.name}
              {it.note ? <small>{it.note}</small> : null}
            </dt>
            <dd>{it.quantity}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export { IngredientList };

import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx, num } = N.utils;

/* Nährwertanzeige: Energie groß, Makro-Balken nach Energieanteil */
function NutritionPanel(props) {
  const m = props.macros || {};
  const kcal = { protein: (m.protein || 0) * 4, carbs: (m.carbs || 0) * 4, fat: (m.fat || 0) * 9 };
  const sum = kcal.protein + kcal.carbs + kcal.fat;
  const total = Math.max(props.kcal || 0, sum);
  const keys = [
    ['protein', 'Eiweiß'],
    ['carbs', 'Kohlenhydrate'],
    ['fat', 'Fett'],
  ];
  return (
    <div className={cx('qs-nutri', props.className)}>
      <div className="qs-nutri-head">
        <span className="qs-nutri-kcal">
          <small>{'≈ '}</small>
          {num(total, 0)}
          <small>{' kcal'}</small>
        </span>
        <span className="qs-nutri-note">{props.note || 'Pro Portion · Richtwerte'}</span>
      </div>
      <div
        className="qs-nutri-bar"
        role="img"
        aria-label={keys.map((k) => `${k[1]} ${num(m[k[0]] || 0, 0)} g`).join(', ')}
      >
        {keys.map((k) =>
          kcal[k[0]] ? <i key={k[0]} className={`nh-c--${k[0]}`} style={{ flexGrow: kcal[k[0]] }} /> : null,
        )}
        {total > sum + 1 ? <i className="nh-c--rest" style={{ flexGrow: total - sum }} /> : null}
      </div>
      <div className="qs-nutri-ticks" aria-hidden={true}>
        {[0, 25, 50, 75, 100].map((g) => (
          <span key={g} style={{ left: `${g}%` }}>
            {g === 0 || g === 100 ? null : <small>{g}</small>}
          </span>
        ))}
      </div>
      {
        /* Legende als Ablesetabelle: Strich in Segmentfarbe, Name, Energieanteil, Gramm – Zahlen rechtsbündig in einer Spalte */
        <dl className="qs-nutri-macros">
          {keys.map((k) => {
            const share = sum ? Math.round((kcal[k[0]] / total) * 100) : null;
            return (
              <div key={k[0]} className={`qs-nutri-row nh-c--${k[0]}`}>
                <dt>
                  <i aria-hidden={true} />
                  {k[1]}
                </dt>
                <dd>
                  <span className="qs-nutri-share" aria-label={share != null ? `${share} % der Energie` : undefined}>
                    {share != null ? `${share} %` : ''}
                  </span>
                  <b>
                    {m[k[0]] != null ? num(m[k[0]], 0) : '–'}
                    <small>{' g'}</small>
                  </b>
                </dd>
              </div>
            );
          })}
          {props.fiber != null ? (
            <div className="qs-nutri-row is-plain">
              <dt>
                <i aria-hidden={true} />
                Ballaststoffe
              </dt>
              <dd>
                <span className="qs-nutri-share" />
                <b>
                  {num(props.fiber, 0)}
                  <small>{' g'}</small>
                </b>
              </dd>
            </div>
          ) : null}
        </dl>
      }
    </div>
  );
}

export { NutritionPanel };

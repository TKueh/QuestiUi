import React from 'react';
import N from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* ---------- Woche und Tagesmodus ---------- */
/* Wochenzusammenfassung: 7 Tage als Säulen-Skala */
function WeekSummary(props) {
  const days = props.days || [];
  const labels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const full = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  return (
    <div className={cx('qs-weeksum', props.className)}>
      <div className="qs-weeksum-cols">
        {days.map((d, i) => {
          const n = Math.min(d.total || 0, 12);
          const on = d.total ? Math.round((d.done / d.total) * n) : 0;
          return (
            <div
              key={i}
              role="img"
              className={cx(
                'qs-weeksum-col',
                d.today && 'is-today',
                d.paused && 'is-paused',
                d.total && d.done >= d.total && 'is-full',
              )}
              aria-label={`${
                full[i] + (d.today ? ', heute' : '')
              }: ${d.paused ? 'pausiert' : d.total ? `${d.done} von ${d.total} erledigt` : 'nichts geplant'}`}
            >
              <span className="qs-weeksum-val">
                {d.paused ? 'Pause' : d.total ? N.utils.frac(d.done, d.total) : '–'}
              </span>
              <span className="qs-weeksum-bar" aria-hidden={true}>
                {Array.from({ length: n }, (_, k) => (
                  <i key={k} className={k < on ? 'is-on' : ''} />
                ))}
              </span>
              <span className="qs-weeksum-day" aria-hidden={true}>
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { WeekSummary };

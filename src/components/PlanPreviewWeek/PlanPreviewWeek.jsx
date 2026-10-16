import React from 'react';
import N, { ChartLegend } from 'nordhaus-ui/src/bare.js';

const { cx } = N.utils;

/* Wochenvorschau für Planänderungen: 7 Spalten, alt/neu */
function PlanPreviewWeek(props) {
  const days = props.days || [];
  const labels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  return (
    <div className={cx('qs-planprev', props.className)}>
      <div className="qs-planprev-head">
        <span className="nh-label">{props.title || 'Vorschau 7 Tage'}</span>
        {props.from ? <span>{`gilt ab ${props.from}`}</span> : null}
      </div>
      <div className="qs-planprev-grid">
        {days.map((d, i) => (
          <div key={i} className="qs-planprev-day">
            <span className="qs-planprev-wd">{labels[i]}</span>
            {(d.items || []).map((it, j) => {
              const stt = it.state || 'same';
              return (
                <span key={j} className={cx('qs-planprev-item', `is-${stt}`)} title={it.title}>
                  <b aria-hidden={true}>{stt === 'add' ? '+' : stt === 'remove' ? '−' : stt === 'change' ? '~' : ''}</b>
                  <span aria-hidden={it.short && it.short !== it.title ? true : undefined}>{it.short || it.title}</span>
                  {it.short && it.short !== it.title ? <span className="nh-vh">{it.title}</span> : null}
                  {stt !== 'same' ? (
                    <span className="nh-vh">
                      {stt === 'add' ? ', neu' : stt === 'remove' ? ', entfällt' : ', geändert'}
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <ChartLegend
        items={[
          { label: 'Neu', kind: 'line', tone: 'positive' },
          { label: 'Geändert', kind: 'line', tone: 'ink' },
          { label: 'Entfällt', kind: 'line', tone: 'muted' },
        ]}
      />
    </div>
  );
}

export { PlanPreviewWeek };

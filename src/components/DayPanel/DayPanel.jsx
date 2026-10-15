import React from 'react';
import N, { Badge, Button, EmptyState, ProgressBar } from 'nordhaus-ui';
import { EventRow } from '../EventRow/EventRow.jsx';

const { cx, parse } = N.utils;

function DayPanel({ date, className, today, total, done, onAdd, addLabel, events }) {
  const d = parse(date);
  return (
    <section className={cx('qs-daypanel', className)}>
      <div className="qs-daypanel-head">
        <div>
          <p className="nh-label">{today ? 'Heute' : d.toLocaleDateString('de-DE', { weekday: 'long' })}</p>
          <h2>{d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}</h2>
        </div>
        {total ? (
          <span className="qs-daypanel-prog">
            <Badge variant="count" done={done} total={total} label="erledigt" />
            <ProgressBar
              value={(done / total) * 100}
              segments={total}
              compact={true}
              label={`${done} von ${total} erledigt`}
            />
          </span>
        ) : null}
        {onAdd ? (
          <Button variant="key" size="sm" icon="plus" onClick={onAdd}>
            {addLabel || 'Hinzufügen'}
          </Button>
        ) : null}
      </div>
      {(events || []).length ? (
        <div className="qs-daypanel-list">
          {events.map((e, i) => (
            <EventRow key={i} {...e} />
          ))}
        </div>
      ) : (
        <EmptyState compact={true} figure="0" title="Frei" text="Für diesen Tag ist nichts geplant." />
      )}
    </section>
  );
}

export { DayPanel };

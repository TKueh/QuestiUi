import React from 'react';
import N, { Accordion, Badge } from 'nordhaus-ui/src/bare.js';
import { EventRow } from '../EventRow/EventRow.jsx';

const { cx, parse } = N.utils;

function AgendaDay({ date, today, defaultOpen, done, events }) {
  const d = parse(date);
  return (
    <Accordion
      className={cx('qs-agenda', today && 'is-today')}
      defaultOpen={defaultOpen}
      title={React.createElement(
        'span',
        { className: 'qs-agenda-title' },
        <b>{d.getDate()}</b>,
        <span>
          {d.toLocaleDateString('de-DE', { weekday: 'long' })}
          <small>{d.toLocaleDateString('de-DE', { month: 'long' })}</small>
        </span>,
      )}
      meta={React.createElement(Badge, { variant: 'count', done: done || 0, total: (events || []).length })}
    >
      <div className="qs-agenda-list">
        {(events || []).map((e, i) => (
          <EventRow key={i} {...e} />
        ))}
      </div>
    </Accordion>
  );
}

export { AgendaDay };

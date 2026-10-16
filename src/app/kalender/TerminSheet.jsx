import React from 'react';
import N, { Button, KeyValue, List } from 'nordhaus-ui/src/bare.js';
import { CATEGORIES } from '../../categories.js';
import { DocLink } from '../../components/DocLink/DocLink.jsx';
import { EventRow } from '../../components/EventRow/EventRow.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

const { iso } = N.utils;

function TerminSheet({ date, title }) {
  const s = demo.use();
  const nav = useNav();

  const d = s.week.filter((x) => x.date === date)[0] || S.today(s);

  const evs = S.dayEvents(d);
  const e = evs.filter((x) => x.title === title)[0] || evs.filter((x) => x.questId).slice(-1)[0] || evs[0];
  const q = e && e.questId ? S.findQuest(s, e.questId) : null;
  const rest = evs.filter((x) => x !== e && !x.allDay && x.start >= '12:00');
  const actions = q
    ? [
        <Button
          key="m"
          variant="secondary"
          icon="clock"
          onClick={() => {
            nav.close();
            nav.toast({ message: 'Verschieben folgt in der App – im Kalender per Ziehen.' });
          }}
        >
          Verschieben
        </Button>,
        q.workout ? (
          <Button
            key="s"
            variant="accent"
            arrow={true}
            onClick={() => {
              nav.open('training', { id: q.id });
            }}
          >
            Starten
          </Button>
        ) : (
          <Button
            key="s"
            variant="accent"
            arrow={true}
            disabled={S.qDone(q)}
            onClick={() => {
              demo.act.toggle(q.id, true);
              nav.close();
            }}
          >
            {S.qDone(q) ? 'Erledigt' : 'Abhaken'}
          </Button>
        ),
      ]
    : null;
  return (
    <N.Sheet
      inline={true}
      size="compact"
      open={true}
      onClose={nav.close}
      category={e.category}
      tools={
        q && q.workout ? (
          <DocLink
            variant="chip"
            icon={false}
            onClick={(ev) => {
              ev.preventDefault();
              nav.close();
              nav.tab('more', { stack: ['plans', 'editor'] });
            }}
          >
            Trainingsplan
          </DocLink>
        ) : null
      }
      eyebrow={
        (d.date === iso(new Date()) ? 'Heute' : dateLong(d.date)) +
        (e.allDay ? ' · ganztägig' : ` · ${e.start}–${e.end}`)
      }
      title={e.title}
      description={
        q
          ? q.description
          : e.context
            ? 'Kalenderblock aus Arbeit.ics – nur zur Orientierung.'
            : (CATEGORIES[e.category] || {}).label
      }
      actions={actions}
    >
      <div>
        <KeyValue
          label="Wiederholung"
          value={q && q.workout ? 'Mo, Mi und Sa · A/B im Wechsel' : e.context ? 'Werktags' : 'Laut Plan'}
        />
        <KeyValue label="Erinnerung" value={e.context ? 'Keine' : '30 Minuten vorher'} />
      </div>
      {rest.length ? (
        <div>
          <N.SectionHeader title="Am selben Tag" count={rest.length} />
          <List>
            {rest.map((x, i) => (
              <EventRow
                key={i}
                {...x}
                onClick={() => {
                  nav.open('termin', { date: d.date, title: x.title });
                }}
              />
            ))}
          </List>
        </div>
      ) : null}
    </N.Sheet>
  );
}

export { TerminSheet };

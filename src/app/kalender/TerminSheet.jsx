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
  const rest = evs.filter((x) => x !== e && !x.allDay);
  /* Verschieben: Tag und Beginn im Sheet wählen, die Dauer bleibt */
  const moving = React.useState(false);
  const to = React.useState({ date: d.date, time: e.start });
  const actions =
    q && moving[0]
      ? [
          <Button
            key="c"
            variant="secondary"
            onClick={() => {
              moving[1](false);
            }}
          >
            Abbrechen
          </Button>,
          <Button
            key="v"
            variant="accent"
            onClick={() => {
              demo.act.moveQuest(q.id, to[0].date, to[0].time);
              nav.close();
              nav.toast({
                tone: 'success',
                message: `„${e.title}“ liegt jetzt ${to[0].date === iso(new Date()) ? 'heute' : dateLong(to[0].date)} um ${to[0].time}.`,
              });
            }}
          >
            Verschieben
          </Button>,
        ]
      : q
        ? [
            <Button
              key="m"
              variant="secondary"
              icon="clock"
              onClick={() => {
                moving[1](true);
              }}
            >
              Verschieben
            </Button>,
            q.workout ? (
              <Button
                key="s"
                variant="accent"
                onClick={() => {
                  nav.open('training', { id: q.id });
                }}
              >
                Starten
              </Button>
            ) : S.qDone(q) ? (
              /* erledigt: nichts mehr abzuschließen – der Rückweg ohne accent (Regel 10) */
              <Button
                key="s"
                variant="secondary"
                onClick={() => {
                  demo.act.toggle(q.id, false);
                }}
              >
                Wieder öffnen
              </Button>
            ) : (
              <Button
                key="s"
                variant="accent"
                onClick={() => {
                  demo.act.toggle(q.id, true);
                  nav.close();
                }}
              >
                Abhaken
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
      {q && moving[0] ? (
        <N.FieldRow>
          <N.DateField
            label="Tag"
            value={to[0].date}
            min={iso(new Date())}
            max={s.week[6].date}
            onChange={(v) => {
              to[1]((x) => Object.assign({}, x, { date: v }));
            }}
          />
          <N.TimeField
            label="Beginn"
            value={to[0].time}
            minuteStep={5}
            onChange={(v) => {
              to[1]((x) => Object.assign({}, x, { time: v }));
            }}
          />
        </N.FieldRow>
      ) : null}
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

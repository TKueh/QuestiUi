import React, { Fragment } from 'react';
import N, { Badge, Button, List } from 'nordhaus-ui/src/bare.js';
import { BudgetLabel } from '../../components/BudgetLabel/BudgetLabel.jsx';
import { LifeRow } from '../../components/LifeRow/LifeRow.jsx';
import { demo } from '../../data/demo.js';
import { S, col, relDays, useNav } from '../shared.jsx';
import { LifeBar } from './LifeBar.jsx';
import { GIFT, WISH } from './shared.jsx';

function LifeBody() {
  const s = demo.use();
  const nav = useNav();
  const tab = nav.route.view || 'b';
  const c = S.lifeCounts(s);
  let body;
  if (tab === 'b')
    body = (
      <Fragment>
        <N.TopBar
          variant="toolbar"
          leading={React.createElement('span', { className: 'nh-label' }, 'Ab dieser Woche · 60 Tage')}
        >
          <Button variant="text" size="sm" disabled={true}>
            {`Archiv ${N.utils.idx(s.archive.birthdays)}`}
          </Button>
          <Button
            variant="key"
            size="sm"
            icon="plus"
            onClick={() => {
              nav.open('entry', { id: null });
            }}
          >
            Geburtstag
          </Button>
        </N.TopBar>
        <List>
          {s.birthdays.map((b) => (
            <LifeRow
              key={b.id}
              kind="birthday"
              date={b.date}
              title={b.name}
              meta={relDays(b.date) + (b.age ? ` · ${b.age} Jahre` : '') + (b.rel ? ` · ${b.rel}` : '')}
              gift={b.gift}
              amount={b.amount}
              spent={b.spent || undefined}
              status={b.status}
              statusOptions={b.gift ? GIFT : undefined}
              onStatus={(v) => {
                demo.act.setStatus('birthdays', b.id, v);
              }}
              onOpen={() => {
                nav.open('entry', { id: b.id });
              }}
            />
          ))}
        </List>
        <N.Notice
          icon="clock"
          title="Freie Zeit am Samstag 14–16 Uhr"
          action={React.createElement(
            Button,
            {
              variant: 'key',
              size: 'sm',
              onClick: () => {
                nav.open('newQuest', {
                  title: 'Konzertkarten für Mara besorgen',
                  date: s.week[5].date,
                  category: 'birthday',
                });
              },
            },
            'Geschenk besorgen einplanen',
          )}
        >
          Der Kalenderabgleich schlägt Zeit für „Konzertkarten für Mara besorgen“ vor.
        </N.Notice>
      </Fragment>
    );
  else if (tab === 'l')
    body = (
      <Fragment>
        <N.TopBar
          variant="toolbar"
          leading={React.createElement(
            'span',
            { className: 'nh-label' },
            `Offen ${N.utils.idx(c.projects)} · Erledigt ${N.utils.idx(c.projectsDone)}`,
          )}
        >
          <Button variant="text" size="sm" disabled={true}>
            {`Archiv ${N.utils.idx(s.archive.projects)}`}
          </Button>
          <Button
            variant="key"
            size="sm"
            icon="plus"
            onClick={() => {
              nav.open('item', { kind: 'project' });
            }}
          >
            Vorhaben
          </Button>
        </N.TopBar>
        <List>
          {s.projects.map((x) => (
            <LifeRow
              key={x.id}
              kind="project"
              title={x.title}
              done={x.done}
              meta={x.meta}
              onOpen={
                x.done
                  ? undefined
                  : () => {
                      if (x.planned) nav.tab('cal', { view: 'month' });
                      else nav.open('newQuest', { title: x.title, date: 'tomorrow', category: 'personal' });
                    }
              }
              action={
                x.done ? (
                  <Badge tone="positive" led={true}>
                    Erledigt
                  </Badge>
                ) : x.planned ? (
                  <Button
                    variant="key"
                    size="sm"
                    icon="calendar"
                    onClick={() => {
                      nav.tab('cal', { view: 'month' });
                    }}
                  >
                    Termin
                  </Button>
                ) : (
                  <Button
                    variant="key"
                    size="sm"
                    icon="calendar"
                    onClick={() => {
                      nav.open('newQuest', { title: x.title, date: 'tomorrow', category: 'personal' });
                    }}
                  >
                    Planen
                  </Button>
                )
              }
            />
          ))}
        </List>
      </Fragment>
    );
  else
    body = (
      <Fragment>
        <N.TopBar
          variant="toolbar"
          leading={React.createElement(BudgetLabel, {
            spent: s.wishes.reduce((a, w) => a + (w.spent || 0), 0),
            amount: s.wishes.reduce((a, w) => a + w.amount, 0),
            label: 'Budget',
          })}
        >
          <Button
            variant="key"
            size="sm"
            icon="plus"
            onClick={() => {
              nav.open('item', { kind: 'wish' });
            }}
          >
            Wunsch
          </Button>
        </N.TopBar>
        <List>
          {s.wishes.map((w) => (
            <LifeRow
              key={w.id}
              kind="wish"
              title={w.title}
              meta={w.meta}
              amount={w.amount}
              spent={w.spent || undefined}
              status={w.status}
              statusOptions={WISH}
              onStatus={(v) => {
                demo.act.setStatus('wishes', w.id, v);
              }}
            />
          ))}
        </List>
        <N.Notice icon="info">Bezahlte Wünsche erscheinen automatisch unter Fortschritt → Ausgaben.</N.Notice>
      </Fragment>
    );
  return (
    <Fragment>
      <LifeBar tab={tab} />
      <div style={col(4)}>{body}</div>
    </Fragment>
  );
}

export { LifeBody };

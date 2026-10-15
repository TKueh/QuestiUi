import React, { Fragment, useState } from 'react';
import N, { Badge, EmptyState } from 'nordhaus-ui';
import { WD_LONG, demo } from '../../data/demo.js';
import { G, MainBar, QuestRows, S, dateLong, useNav, weekAB } from '../shared.jsx';

const { parse } = N.utils;

function TodayBody() {
  const s = demo.use();
  const nav = useNav();
  const d = S.today(s);
  const st = S.dayStats(d);
  const filter = useState(nav.route.filter || 'all');
  const open = d.quests.filter((q) => !S.qDone(q));
  const done = d.quests.filter(S.qDone);
  const shopQ = S.nextQuest(s, (q) => q.shopping);
  const gymQ = S.nextQuest(s, (q) => !!q.workout);
  const shop = S.shopStats(s);
  const showDone = useState(false);
  return (
    <Fragment>
      <MainBar
        eyebrow={`${dateLong(d.date)} · ${weekAB()}`}
        title="Heute"
        aside={React.createElement(Badge, {
          variant: 'count',
          done: st.done,
          total: st.total,
          size: 'lg',
          label: 'erledigt',
        })}
      />
      {s.mode.value !== 'normal' ? (
        <div style={{ padding: '0 var(--gutter) var(--space-3)' }}>
          <N.Notice
            icon={s.mode.value === 'sick' ? 'thermometer' : 'plane'}
            title={s.mode.value === 'sick' ? 'Krank gemeldet' : 'Urlaub eingetragen'}
          >
            {`Passende Pläne pausieren ${s.mode.from ? `ab ${dateLong(s.mode.from)}` : 'ab heute'}. Die Serie zählt neutral.`}
          </N.Notice>
        </div>
      ) : null}
      <N.CalendarWeek
        variant="strip"
        events={S.stripEvents(s)}
        value={d.date}
        onChange={(v) => {
          nav.tab('cal', { day: v });
        }}
      />
      <div style={{ padding: 'var(--space-3) var(--gutter)' }}>
        <N.SegmentedControl
          block={true}
          label="Status"
          value={filter[0]}
          onChange={filter[1]}
          options={[
            { value: 'all', label: `Alle · ${st.total}` },
            { value: 'open', label: `Offen · ${st.open}` },
            { value: 'done', label: `Erledigt · ${st.done}` },
          ]}
        />
      </div>
      <div style={G}>
        {filter[0] === 'done' ? (
          done.length ? (
            <QuestRows items={done} />
          ) : (
            <EmptyState compact={true} figure="0" title="Noch nichts erledigt" text="Abgehakte Quests stehen hier." />
          )
        ) : open.length ? (
          <QuestRows items={open} />
        ) : (
          <EmptyState
            compact={true}
            figure={String(st.total)}
            title="Alles erledigt"
            text="Für heute ist nichts mehr offen."
          />
        )}
        {filter[0] === 'all' && done.length ? (
          <div className="qs-done">
            <N.Accordion title="Erledigt" meta={String(done.length)} open={showDone[0]} onToggle={showDone[1]}>
              <QuestRows items={done} />
            </N.Accordion>
          </div>
        ) : null}
      </div>
      <div
        style={{
          padding: 'var(--space-6) var(--gutter) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        <N.SectionHeader title="Direkt erreichbar" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
            gap: 'var(--space-3)',
          }}
        >
          {shopQ ? (
            <N.MetricCard
              label={`Einkauf · ${
                shopQ.date === d.date
                  ? 'heute'
                  : WD_LONG[parse(shopQ.date).getDay() === 0 ? 6 : parse(shopQ.date).getDay() - 1]
              }`}
              value={S.qDone(shopQ) ? 'erledigt' : `${shop.done}/${shop.total}`}
              size="sm"
              onClick={() => {
                nav.open('shopping', { id: shopQ.id });
              }}
            />
          ) : null}
          {gymQ ? (
            <N.MetricCard
              label={`Training · ${
                gymQ.date === d.date
                  ? gymQ.time
                  : `${WD_LONG[(parse(gymQ.date).getDay() + 6) % 7].slice(0, 2)} ${gymQ.time}`
              }`}
              value={gymQ.title.replace(' trainieren', '')}
              size="sm"
              onClick={() => {
                nav.open(S.qDone(gymQ) ? 'trainingDone' : 'training', { id: gymQ.id });
              }}
            />
          ) : null}
        </div>
        <Badge variant="streak" label="Serie" {...S.streak(s)} />
      </div>
      <div style={{ height: 40 }} />
    </Fragment>
  );
}

export { TodayBody };

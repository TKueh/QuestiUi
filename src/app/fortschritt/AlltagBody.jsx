import React from 'react';
import N, { Badge, BarChart, Metric } from 'nordhaus-ui/src/bare.js';
import { CATEGORIES } from '../../categories.js';
import { WeekSummary } from '../../components/WeekSummary/WeekSummary.jsx';
import { demo } from '../../data/demo.js';
import { S, col } from '../shared.jsx';

function AlltagBody() {
  const s = demo.use();
  const w = S.weekTotals(s);
  const ti = demo.todayIndex();
  const order = ['food', 'training', 'movement', 'household', 'birthday', 'personal'];
  return (
    <div style={col(8, 'var(--space-5) var(--gutter) var(--space-8)')}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <N.Dial done={w.done} total={w.total} size={112} label={`${w.done} von ${w.total} Quests dieser Woche`}>
          <div>
            <div className="nh-dial-value">{String(w.done)}</div>
            <div className="nh-label" style={{ marginTop: 'var(--space-1)' }}>
              {`von ${w.total}`}
            </div>
          </div>
        </N.Dial>
        <div style={{ flex: 1, minWidth: 150, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Metric
            size="sm"
            label="Erfüllungsrate"
            value={String(w.rate)}
            unit="%"
            caption="erledigt / fällig bis gestern"
          />
          <Badge variant="streak" label="Serie" {...S.streak(s)} />
        </div>
      </div>
      <div>
        <N.SectionHeader index={1} title="Tag für Tag" count="erledigt / geplant" />
        <div style={{ height: 'var(--space-2)' }} />
        <WeekSummary
          days={s.week.map((d, i) => {
            const st = S.dayStats(d);
            return { done: st.done, total: st.total, today: i === ti };
          })}
        />
      </div>
      <div>
        <N.SectionHeader index={2} title="Nach Bereich" count="erledigt / geplant" />
        <BarChart
          orientation="horizontal"
          data={order
            .filter((c) => w.by[c])
            .map((c) => ({
              label: CATEGORIES[c].label,
              value: w.by[c].done,
              total: w.by[c].total,
              tone: c,
            }))}
        />
      </div>
    </div>
  );
}

export { AlltagBody };

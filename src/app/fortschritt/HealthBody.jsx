import React, { useState } from 'react';
import N, { Button, Metric } from 'nordhaus-ui';
import { TrainingSummary } from '../../components/TrainingSummary/TrainingSummary.jsx';
import { demo } from '../../data/demo.js';
import { S, col, useNav } from '../shared.jsx';

const { num } = N.utils;

function HealthBody({ register }) {
  const s = demo.use();
  const nav = useNav();
  const range = useState('90');
  const all = s.weights;
  const last = all[all.length - 1];
  /* 13 Wochenwerte = 90 Tage; 30 Tage = die letzten 5; Jahr: davor 39 ruhige Wochen aus dem Import */
  const year = Array.from(
    { length: 39 },
    (_, i) => Math.round((74.6 - i * 0.03 + (i % 4 === 1 ? 0.2 : i % 4 === 3 ? -0.15 : 0)) * 10) / 10,
  ).concat(all);
  const v = range[0] === '30' ? all.slice(-5) : range[0] === 'y' ? year : all;
  const span = range[0] === '30' ? '30 Tagen' : range[0] === 'y' ? 'einem Jahr' : '90 Tagen';
  return (
    <div style={col(6, register ? 'var(--space-4) var(--gutter) var(--space-8)' : '0 var(--gutter) var(--space-8)')}>
      {register ? (
        <N.TopBar
          variant="toolbar"
          leading={React.createElement('span', { className: 'nh-label' }, 'Gemessen · ohne Bewertung')}
        >
          <Button
            variant="key"
            size="sm"
            icon="plus"
            onClick={() => {
              nav.open('measurement');
            }}
          >
            Messung
          </Button>
        </N.TopBar>
      ) : null}
      <N.SegmentedControl
        block={true}
        label="Zeitraum"
        value={range[0]}
        onChange={range[1]}
        options={[
          { value: '30', label: '30 Tage' },
          { value: '90', label: '90 Tage' },
          { value: 'y', label: 'Jahr' },
        ]}
      />
      <div>
        <Metric
          label={`Gewicht · ${new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}`}
          value={num(last, 1)}
          unit="kg"
          change={+(last - v[0]).toFixed(1)}
          changeUnit="kg"
          period={`seit ${span}`}
          changeNeutral={true}
          decimals={1}
        />
        <div style={{ height: 'var(--space-3)' }} />
        <N.LineChart
          key={range[0]}
          label={`Gewicht, letzte ${span.replace('einem ', '')}`}
          unit="kg"
          decimals={1}
          marks={range[0] === '90' ? [1, 3, 5, 6, 9, 11] : range[0] === '30' ? [1, 3] : [40, 42, 44, 45, 48, 50]}
          points={v.map((y, i) => ({
            y,

            label:
              i === v.length - 1 ? 'heute' : `vor ${v.length - 1 - i}${v.length - 1 - i === 1 ? ' Woche' : ' Wochen'}`,
          }))}
        />
        <N.ChartLegend
          items={[
            { label: 'Gewicht', kind: 'line' },
            { label: 'Training', kind: 'line', tone: 'training' },
          ]}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        <N.MetricCard label="Ruhepuls · Ø" value="54" unit="bpm" size="sm" spark={[57, 56, 58, 55, 54, 55, 54]} />
        <N.MetricCard
          label="Schritte · Ø"
          value="8.412"
          size="sm"
          spark={[6200, 9100, 7400, 8800, 10200, 5300, 8412]}
        />
      </div>
      <div>
        <N.SectionHeader title="Krafttraining" />
        <TrainingSummary
          setsDone={186 + (s.training.saved ? S.trainingStats(s).done : 0)}
          setsTotal={210 + (s.training.saved ? 24 : 0)}
          load={38420}
          duration={61}
        />
      </div>
    </div>
  );
}

export { HealthBody };

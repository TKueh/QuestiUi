import React from 'react';
import N, { BarChart, Metric } from 'nordhaus-ui/src/bare.js';
import { demo } from '../../data/demo.js';
import { col, money } from '../shared.jsx';

const { num } = N.utils;

function GiftsBody() {
  const s = demo.use();
  const gifts = s.birthdays.filter((b) => b.gift && b.amount);
  function sum(a, k) {
    return a.reduce((x, y) => x + (y[k] || 0), 0);
  }
  function bar(label, x, tone) {
    return {
      label,
      value: x.spent || 0,
      total: x.amount,
      tone,
      display: `${money(x.spent || 0)} / ${money(x.amount)}`,
    };
  }
  return (
    <div style={col(8)}>
      <p className="nh-label" style={{ margin: 0 }}>
        {`Dieses Jahr · ${new Date().getFullYear()}`}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        <Metric
          size="sm"
          label="Geschenke · bezahlt"
          value={num(sum(gifts, 'spent'), 2)}
          unit="€"
          caption={`von ${money(sum(gifts, 'amount'))} geplant`}
        />
        <Metric
          size="sm"
          label="Wünsche · bezahlt"
          value={num(sum(s.wishes, 'spent'), 2)}
          unit="€"
          caption={`von ${money(sum(s.wishes, 'amount'))} Budget`}
        />
      </div>
      <div>
        <N.SectionHeader
          index={1}
          title="Geschenke"
          count={`${gifts.filter((g) => g.status === 'bought' || g.status === 'given').length} von ${gifts.length} besorgt`}
        />
        <BarChart orientation="horizontal" data={gifts.map((g) => bar(`${g.name} · ${g.gift}`, g, 'birthday'))} />
      </div>
      <div>
        <N.SectionHeader
          index={2}
          title="Wünsche"
          count={`${s.wishes.filter((w) => w.spent).length} von ${s.wishes.length} gekauft`}
        />
        <BarChart orientation="horizontal" data={s.wishes.map((w) => bar(w.title, w, 'personal'))} />
      </div>
      <N.Notice icon="info">
        Geplant kommt aus Leben, bezahlt aus Fortschritt → Ausgaben. Ändern lässt sich beides dort.
      </N.Notice>
    </div>
  );
}

export { GiftsBody };

import React, { useState } from 'react';
import N, { BarChart, Button, Metric } from 'nordhaus-ui/src/bare.js';
import { ExpenseRow } from '../../components/ExpenseRow/ExpenseRow.jsx';
import { HistoryGroup } from '../../components/ExpenseRow/HistoryGroup.jsx';
import { demo } from '../../data/demo.js';
import { S, col, dateShort, useNav } from '../shared.jsx';

const { addDays, eur, iso, num } = N.utils;

function ExpensesBody() {
  const s = demo.use();
  const nav = useNav();
  const f = useState('all');
  const GROUP = { birthday: 'g', personal: 'w' };
  const list = s.expenses.filter((e) => f[0] === 'all' || (GROUP[e.category] || 'o') === f[0]);
  const groups = {};
  list.forEach((e) => {
    (groups[e.d] = groups[e.d] || []).push(e);
  });
  const total = S.expenseSum(s);
  const prev = s.expenseMonths[4];
  const NOW = new Date();
  const months = [-5, -4, -3, -2, -1, 0].map((k) =>
    new Date(NOW.getFullYear(), NOW.getMonth() + k, 1).toLocaleDateString('de-DE', { month: 'short' }).replace('.', ''),
  );
  const big = s.expenses.reduce((a, e) => (e.amount > a ? e.amount : a), 0);
  function cnt(k) {
    return s.expenses.filter((e) => k === 'all' || (GROUP[e.category] || 'o') === k).length;
  }
  return (
    <div style={col(8)}>
      <N.TopBar variant="toolbar" leading={React.createElement('span', { className: 'nh-label' }, 'Ausgabenbuch')}>
        <Button
          variant="key"
          size="sm"
          icon="plus"
          onClick={() => {
            nav.open('expense');
          }}
        >
          Ausgabe
        </Button>
      </N.TopBar>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
        }}
      >
        <Metric
          label={`${NOW.toLocaleDateString('de-DE', { month: 'long' })} · bezahlt`}
          value={num(total, 2)}
          unit="€"
          change={Math.round(((total - prev) / prev) * 100)}
          changeUnit="%"
          period="zum Vormonat"
          changeNeutral={true}
          decimals={0}
        />
        <Metric label="Größter Posten" value={num(big, 2)} unit="€" size="sm" />
      </div>
      <BarChart
        label="Bezahlte Beträge, letzte 6 Monate"
        height={120}
        format={(v) => `${Math.round(v)} €`}
        data={months.map((m, i) => ({
          label: m,
          value: i === 5 ? total : s.expenseMonths[i],
          today: i === 5,
        }))}
      />
      <N.FilterChips
        wrap={true}
        label="Bereich"
        value={f[0]}
        onChange={f[1]}
        items={[
          { id: 'all', label: 'Alle', count: cnt('all') },
          { id: 'g', label: 'Geschenke', tone: 'birthday', count: cnt('g') },
          { id: 'w', label: 'Wünsche', tone: 'personal', count: cnt('w') },
          { id: 'o', label: 'Sonstiges', count: cnt('o') },
        ]}
      />
      {s.removed ? (
        <N.UndoNotice onUndo={demo.act.restoreExpense}>{`Ausgabe „${s.removed.title}“ gelöscht.`}</N.UndoNotice>
      ) : null}
      {Object.keys(groups)
        .sort((a, b) => b - a)
        .map((k) => {
          const d = addDays(new Date(), +k);
          const sum = groups[k].reduce((a, e) => a + e.amount, 0);
          return (
            <HistoryGroup
              key={k}
              date={d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
              summary={`−${eur(sum)}`}
            >
              {groups[k].map((e) => (
                <ExpenseRow
                  key={e.id}
                  category={e.category}
                  title={e.title}
                  date={dateShort(iso(d))}
                  method={e.method}
                  payee={e.payee}
                  amount={e.amount}
                  onClick={() => {
                    nav.open('expense', { id: e.id });
                  }}
                />
              ))}
            </HistoryGroup>
          );
        })}
    </div>
  );
}

export { ExpensesBody };

import React, { Fragment, useState } from 'react';
import N, { Badge, BarChart, IconButton, List, ListItem } from 'nordhaus-ui/src/bare.js';
import { FinanceSummary } from '../../components/FinanceSummary/FinanceSummary.jsx';
import { LifeRow } from '../../components/LifeRow/LifeRow.jsx';
import { FoldUnder, SubBar, col, money } from '../shared.jsx';
import { CONTRACTS, GOALS } from './shared.jsx';

const { addDays, eur, iso, parse } = N.utils;

function FinancePage() {
  const tab = useState('o');
  const groups = {};
  const order = [];
  CONTRACTS.forEach((x) => {
    if (!groups[x[3]]) {
      groups[x[3]] = { amount: 0, tone: x[2], n: 0 };
      order.push(x[3]);
    }
    groups[x[3]].amount += x[1];
    groups[x[3]].n++;
  });
  const total = CONTRACTS.reduce((a, x) => a + x[1], 0);
  const ins = CONTRACTS.filter((x) => x[3] === 'Versicherungen');
  const body =
    tab[0] === 'c' ? (
      <List>
        {CONTRACTS.map((x) => (
          <ListItem key={x[0]} category={x[2]} title={x[0]} description={x[3]} value={x[1]} unit="€" decimals={2} />
        ))}
      </List>
    ) : tab[0] === 'g' ? (
      <BarChart
        orientation="horizontal"
        data={GOALS.map((g) => Object.assign({}, g, { display: `${money(g.value)} / ${money(g.total)}` }))}
      />
    ) : (
      <Fragment>
        <FinanceSummary
          total={total}
          free={2100 - total}
          caption={`${CONTRACTS.length} Verträge und Sparposten · Netto 2.100 €`}
          rows={order.map((k) => ({
            label: k,
            amount: groups[k].amount,
            tone: groups[k].tone,
            icon: k === 'Wohnen' ? 'home' : undefined,
          }))}
        />
        <div>
          <N.SectionHeader title="Nächste Fristen" count={2} />
          <List>
            <LifeRow
              kind="birthday"
              tone="finance"
              date={iso(addDays(new Date(), 9))}
              title="Kfz-Versicherung"
              meta={`${eur(46.8)} · Kündigung bis ${parse(iso(addDays(new Date(), 9))).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}`}
              action={
                <Badge tone="danger" led={true}>
                  Prüfen
                </Badge>
              }
            />
            <LifeRow
              kind="birthday"
              tone="finance"
              date={iso(addDays(new Date(), 17))}
              title="Handyvertrag"
              meta={`${eur(24.99)} · Mindestlaufzeit endet`}
            />
          </List>
        </div>
        <N.Accordion
          variant="boxed"
          icon="coin"
          title="Versicherungen"
          subtitle={`${ins.length} Verträge`}
          meta={eur(groups.Versicherungen.amount)}
        >
          <List>
            {ins.map((x) => (
              <ListItem key={x[0]} title={x[0]} value={x[1]} unit="€" decimals={2} />
            ))}
          </List>
        </N.Accordion>
      </Fragment>
    );
  return (
    <Fragment>
      <SubBar
        nav={true}
        backLabel="Pläne"
        title="Finanzplan"
        actions={
          /* pausiert: Bearbeiten ist verriegelt (gestrichelt, sichtbar – Regel 6) */
          <IconButton icon="edit" label="Plan bearbeiten" disabled={true} />
        }
      />
      <FoldUnder>
        <N.Tabs
          label="Finanzen"
          value={tab[0]}
          onChange={tab[1]}
          items={[
            { id: 'o', label: 'Übersicht' },
            { id: 'c', label: 'Verträge', count: CONTRACTS.length },
            { id: 'g', label: 'Ziele', count: GOALS.length },
          ]}
        />
      </FoldUnder>
      <div style={col(8)}>
        <N.Notice icon="pause" eyebrow="Pausiert" title="Der Finanzplan ruht">
          Fristen und Beträge bleiben sichtbar; neue Quests entstehen erst, wenn du ihn fortsetzt.
        </N.Notice>
        {body}
      </div>
    </Fragment>
  );
}

export { FinancePage };

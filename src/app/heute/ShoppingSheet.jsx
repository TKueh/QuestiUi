import React, { useState } from 'react';
import N, { Button, EmptyState, List } from 'nordhaus-ui';
import { DocLink } from '../../components/DocLink/DocLink.jsx';
import { ShoppingRow } from '../../components/ShoppingList/ShoppingList.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

function ShoppingSheet({ id }) {
  const s = demo.use();
  const nav = useNav();

  const q = S.findQuest(s, id) || S.nextQuest(s, (x) => x.shopping);

  const st = S.shopStats(s);
  const f = useState('all');
  const groups = s.shopping
    .map((g, gi) => ({
      title: g.title,

      items: g.items
        .map((x, ii) => Object.assign({ gi, ii }, x))
        .filter((x) => f[0] === 'all' || (f[0] === 'open' ? !x.checked : x.checked)),
    }))
    .filter((g) => g.items.length);
  function finish() {
    demo.act.shopAll(q.id);
    nav.close();
    nav.toast({ message: 'Einkauf erledigt – die Quest ist abgehakt.' });
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      category="household"
      tools={React.createElement(
        DocLink,
        {
          variant: 'chip',
          icon: false,
          onClick: (e) => {
            e.preventDefault();
            nav.close();
            nav.tab('more', { stack: ['plans'] });
          },
        },
        'Einkaufsplan',
      )}
      eyebrow={dateLong(q.date)}
      title={q.title.replace(' erledigen', '')}
      description={`${q.description}.`}
      status={`${st.done} / ${st.total} eingekauft`}
      progress={st.done / st.total}
      actions={
        S.qDone(q) ? (
          <Button variant="secondary" onClick={nav.close}>
            Schließen
          </Button>
        ) : (
          <Button variant="accent" arrow={true} onClick={finish}>
            {st.done === st.total ? 'Einkauf abschließen' : 'Alles abhaken'}
          </Button>
        )
      }
    >
      <div style={{ margin: 'calc(var(--space-2) * -1) calc(var(--gutter) * -1) 0' }}>
        <N.FilterChips
          label="Filter"
          value={f[0]}
          onChange={f[1]}
          items={[
            { id: 'all', label: 'Alle', count: st.total },
            { id: 'open', label: 'Offen', count: st.total - st.done },
            { id: 'done', label: 'Gekauft', count: st.done },
          ]}
        />
      </div>
      {groups.length ? (
        groups.map((g) => (
          <section key={g.title} className="qs-shopgroup" aria-label={g.title}>
            <div className="nh-lgroup-head">
              <h3>{g.title}</h3>
              <span>{`${g.items.filter((x) => x.checked).length}/${g.items.length}`}</span>
            </div>
            <List>
              {g.items.map((x) => (
                <ShoppingRow
                  key={x.name}
                  name={x.name}
                  quantity={x.quantity}
                  checked={!!x.checked}
                  onChange={(v) => {
                    demo.act.shop(x.gi, x.ii, v);
                    if (v && S.shopStats(demo.get()).done === S.shopStats(demo.get()).total)
                      demo.act.toggle(q.id, true);
                  }}
                />
              ))}
            </List>
          </section>
        ))
      ) : (
        <EmptyState
          compact={true}
          figure="0"
          title={f[0] === 'open' ? 'Alles im Korb' : 'Noch nichts gekauft'}
          text={f[0] === 'open' ? 'Die Liste ist vollständig.' : 'Abgehakte Artikel stehen hier.'}
        />
      )}
    </N.Sheet>
  );
}

export { ShoppingSheet };

import React from 'react';
import N, { List, ListItem } from 'nordhaus-ui/src/bare.js';

const { cx, useCtl } = N.utils;

/* Einkaufszeile: Abhak-Ring wie jede Aufgabe (Grundsätze „Wann welche“), Artikel, Menge rechts; abgehakt durchgestrichen */
function ShoppingRow({ checked, defaultChecked, onChange, pantry, className, name, note, quantity }) {
  const st = useCtl(checked, !!defaultChecked, onChange);
  return (
    <ListItem
      className={cx('qs-shop', pantry && 'is-pantry', className)}
      title={name}
      description={note}
      done={st[0]}
      meta={pantry ? `${quantity} · Vorrat` : quantity}
      check={{ pressed: st[0], onChange: st[1], label: name }}
    />
  );
}
function ShoppingList(props) {
  const groups = props.groups || [];
  const st = useCtl(
    props.value,
    props.defaultValue || groups.map((g) => g.items.map((x) => !!x.checked)),
    props.onChange,
  );
  return (
    <div className={cx('qs-shoplist', props.className)}>
      {groups.map((g, gi) => {
        const vals = st[0][gi] || [];
        const done = vals.filter(Boolean).length;
        return (
          <section key={gi} className="qs-shopgroup" aria-label={g.title}>
            <div className="nh-lgroup-head">
              <h3>{g.title}</h3>
              <span aria-label={`${done} von ${g.items.length} im Korb`}>{N.utils.frac(done, g.items.length)}</span>
            </div>
            <List>
              {g.items.map((it, i) => (
                <ShoppingRow
                  key={it.id || i}
                  name={it.name}
                  note={it.note}
                  quantity={it.quantity}
                  pantry={g.pantry}
                  checked={!!vals[i]}
                  onChange={(v) => {
                    const n = st[0].map((a) => a.slice());
                    n[gi] = n[gi] || [];
                    n[gi][i] = v;
                    st[1](n);
                  }}
                />
              ))}
            </List>
          </section>
        );
      })}
    </div>
  );
}

export { ShoppingRow, ShoppingList };

import React from 'react';
import N, { List } from 'nordhaus-ui/src/bare.js';
import { QuestRow } from './QuestRow.jsx';

const { cx, useCtl } = N.utils;

/* QuestList: der Gruppenstand folgt dem Abhaken – eine Quelle für Zeile und Zähler */
function QuestList(props) {
  const groups = props.groups || [{ items: props.items || [] }];
  const st = useCtl(props.value, props.defaultValue || groups.map((g) => g.items.map((x) => !!x.done)), props.onChange);
  return (
    <div className={cx('qs-questlist', props.className)}>
      {groups.map((g, gi) => {
        const vals = st[0][gi] || [];
        const done = vals.filter(Boolean).length;
        return (
          <section key={gi} className="qs-questgroup" aria-label={g.title}>
            {g.title ? (
              <div className="nh-lgroup-head">
                <h3>{g.title}</h3>
                <span aria-label={`${done} von ${g.items.length} erledigt`}>{`${done}/${g.items.length}`}</span>
              </div>
            ) : null}
            <List>
              {g.items.map((q, i) => (
                <QuestRow
                  key={q.id || i}
                  {...q}
                  done={!!vals[i]}
                  defaultDone={undefined}
                  onToggle={(v) => {
                    const n = st[0].map((a) => a.slice());
                    n[gi] = n[gi] || [];
                    n[gi][i] = v;
                    st[1](n);
                    if (q.onToggle) q.onToggle(v);
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

export { QuestList };

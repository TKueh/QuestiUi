import React from 'react';
import N, { Checkbox, Icon } from 'nordhaus-ui/src/bare.js';

const { cx, useCtl } = N.utils;

/* Änderungsliste zur Prüfung (Plan-/Kalenderimport) */
const CHG = {
  add: ['plus', 'Neu'],
  change: ['edit', 'Geändert'],
  remove: ['minus', 'Entfernt'],
  conflict: ['alert', 'Konflikt'],
};
function ChangeList(props) {
  const items = props.items || [];
  const st = useCtl(props.value, props.defaultValue || items.map((it) => it.type !== 'conflict'), props.onChange);
  return (
    <ul className={cx('qs-changes', props.className)}>
      {items.map((it, i) => {
        const c = CHG[it.type] || CHG.change;
        return (
          <li key={i} className={`is-${it.type}`}>
            <Checkbox
              checked={!!st[0][i]}
              ariaLabel={`Übernehmen: ${it.title}`}
              onChange={(v) => {
                const n = st[0].slice();
                n[i] = v;
                st[1](n);
              }}
            />
            <span className="qs-changes-kind">
              <Icon name={c[0]} size={12} />
              {c[1]}
            </span>
            <span className="qs-changes-text">
              <b>{it.title}</b>
              {it.before || it.after ? (
                <span className="qs-changes-diff">
                  {it.before ? <del>{it.before}</del> : null}
                  {it.before && it.after ? <Icon name="arrow-right" size={12} label="wird zu" /> : null}
                  {it.after ? <ins>{it.after}</ins> : null}
                </span>
              ) : null}
              {it.note ? <small>{it.note}</small> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export { ChangeList };

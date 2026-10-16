import React from 'react';
import N, { ListItem } from 'nordhaus-ui/src/bare.js';

const { cx, useCtl } = N.utils;

/* ---------- Zeilen: Fachzeilen als ListItem mit anderen Zellen ---------- */
/* Aufgabenzeile: Abhak-Ring, Kennmarke, Titel, Beschreibung, Schritte, Flags „Verpasst“/„Pausiert“, Pfeil */
function QuestRow(props) {
  const st = useCtl(props.done, !!props.defaultDone, props.onToggle);
  const status = props.status || (st[0] ? 'done' : 'open');
  const flags = [];
  if (status === 'missed') flags.push({ label: 'Verpasst', tone: 'danger' });
  if (props.paused) flags.push({ label: 'Pausiert' });
  return (
    <ListItem
      className={cx('qs-quest', props.className)}
      category={props.category}
      title={props.title}
      description={props.description}
      flags={flags}
      done={st[0]}
      paused={props.paused}
      meta={
        props.steps && !st[0] && props.steps[0] > 0
          ? N.utils.frac(props.steps[0], props.steps[1])
          : props.time || undefined
      }
      check={{
        pressed: st[0],
        onChange: st[1],
        label: props.title,
        progress: props.steps ? props.steps[0] / props.steps[1] : 0,
        progressText: props.steps ? `${props.steps[0]} von ${props.steps[1]} Schritten` : undefined,
      }}
      trailing="chevron"
      onClick={props.onOpen}
    />
  );
}

export { QuestRow };

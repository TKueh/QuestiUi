import React from 'react';
import N, { ListItem } from 'nordhaus-ui';
import { CATEGORIES } from '../../categories.js';

const { cx } = N.utils;

/* Terminzeile: Zeitspalte, Fahrplan-Linie in Kategoriefarbe, Titel und Kategorie bzw. „Erledigt“/„Kalenderblock“ */
function EventRow(props) {
  const done = !!props.done && !props.context;
  const cat = (CATEGORIES[props.category] || {}).label;
  const sub = props.context ? 'Kalenderblock' : done ? 'Erledigt' : props.subtitle || cat;
  return (
    <ListItem
      className={cx('qs-event', props.context && 'is-context', props.className)}
      time={props.allDay ? 'Tag' : props.start}
      timeEnd={props.allDay ? undefined : props.end}
      title={props.title}
      subtitle={sub}
      rule={props.category || 'personal'}
      done={done}
      trailing={done ? 'check' : props.onClick ? 'chevron' : undefined}
      onClick={props.onClick}
    />
  );
}

export { EventRow };

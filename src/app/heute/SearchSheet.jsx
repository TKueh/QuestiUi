import React, { useState } from 'react';
import N, { Badge, EmptyState, List, ListItem } from 'nordhaus-ui';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

function SearchSheet() {
  const s = demo.use();
  const nav = useNav();
  const q = useState('');
  const all = [].concat.apply(
    [],
    s.week.map((d) => d.quests),
  );
  const hits =
    q[0].trim().length < 2
      ? []
      : all
          .filter((x) =>
            x.title
              .replace(/\u00AD/g, '')
              .toLowerCase()
              .includes(q[0].trim().toLowerCase()),
          )
          .slice(0, 12);
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      context={React.createElement(Badge, null, 'Suche')}
      title="Quests dieser Woche"
    >
      <N.SearchField
        label="Suchen"
        value={q[0]}
        onChange={q[1]}
        placeholder="z. B. Judo, Einkauf"
        count={q[0].trim().length >= 2 ? hits.length : undefined}
        autoFocus={true}
      />
      {hits.length ? (
        <List>
          {hits.map((x) => (
            <ListItem
              key={x.id}
              category={x.category}
              title={x.title}
              description={dateLong(x.date) + (x.time ? ` · ${x.time}` : '')}
              done={S.qDone(x)}
              trailing="chevron"
              onClick={() => {
                nav.open(x.workout ? 'training' : x.shopping ? 'shopping' : 'questDetail', { id: x.id });
              }}
            />
          ))}
        </List>
      ) : (
        <EmptyState
          compact={true}
          icon="search"
          title={q[0].trim().length < 2 ? 'Wonach suchst du?' : 'Nichts gefunden'}
          text={
            q[0].trim().length < 2
              ? 'Ab zwei Zeichen durchsucht Questi alle Quests der Woche.'
              : `Keine Quest dieser Woche passt zu „${q[0].trim()}“.`
          }
        />
      )}
    </N.Sheet>
  );
}

export { SearchSheet };

import React, { useState } from 'react';
import N, { Badge, Button } from 'nordhaus-ui/src/bare.js';
import { ChangeList } from '../../components/ChangeList/ChangeList.jsx';
import { ImportPreview } from '../../components/ImportPreview/ImportPreview.jsx';
import { demo } from '../../data/demo.js';
import { useNav } from '../shared.jsx';

function CalImportSheet() {
  const s = demo.use();
  const nav = useNav();
  const items = [
    { type: 'add', title: 'Teammeeting', after: 'Do 09:00–10:00', note: 'Neu aus Arbeit.ics' },
    { type: 'change', title: 'Arbeit', before: 'Fr 08:00', after: 'Fr 07:30' },
    { type: 'conflict', title: 'Zahnarzt', after: 'Di 19:00', note: 'Überschneidet sich mit Judo' },
    { type: 'remove', title: 'Planungsrunde', before: 'Mo 14:00' },
  ];

  const sel = useState(items.map((it) => it.type !== 'conflict'));

  const n = sel[0].filter(Boolean).length;
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      context={<Badge>Kalenderdatei</Badge>}
      eyebrow="Import · .ics"
      title="Kalender abgleichen"
      description="Prüfe die Änderungen. Konflikte übernimmst du nur, wenn du sie ausdrücklich auswählst."
      status={`${n} von ${items.length} ausgewählt`}
      actions={
        <Button
          variant="accent"
          disabled={!n || s.calendarImport.applied}
          onClick={() => {
            demo.act.applyCalendar();
            nav.close();
            nav.toast({ tone: 'success', message: `${n} Änderungen übernommen – der Kalender ist aktuell.` });
          }}
        >
          {s.calendarImport.applied ? 'Übernommen' : `${n} übernehmen`}
        </Button>
      }
    >
      <ImportPreview
        file="Arbeit.ics"
        meta="42 Termine · nächste zwei Wochen"
        stats={[
          ['add', 'Neu'],
          ['change', 'Geändert'],
          ['remove', 'Entfällt'],
          ['conflict', 'Konflikt'],
        ].map(([t, label]) => ({ label, value: N.utils.idx(items.filter((it) => it.type === t).length) }))}
      />
      <ChangeList items={items} value={sel[0]} onChange={sel[1]} />
    </N.Sheet>
  );
}

export { CalImportSheet };

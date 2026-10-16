import React, { useState } from 'react';
import N, { Badge, Button } from 'nordhaus-ui/src/bare.js';
import { ImportPreview } from '../../components/ImportPreview/ImportPreview.jsx';
import { demo } from '../../data/demo.js';
import { S, useNav } from '../shared.jsx';

function PlanImportSheet() {
  const s = demo.use();
  const nav = useNav();
  const name = useState('Essensplan Herbst');
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      context={<Badge>Neuer Plan</Badge>}
      eyebrow="Import · PDF"
      title="Plan importieren"
      description="Questi liest den Plan und zeigt dir jede erkannte Aufgabe, bevor sie in deinen Alltag geht."
      status={`Gilt ab ${S.dshort(S.nextMonday())}`}
      actions={
        <Button
          variant="accent"
          arrow={true}
          disabled={s.imported}
          onClick={() => {
            demo.act.importPlan();
            nav.close();
            nav.toast({ tone: 'success', message: `„${name[0]}“ übernommen – gilt ab Montag.` });
          }}
        >
          {s.imported ? 'Übernommen' : 'Plan übernehmen'}
        </Button>
      }
    >
      <N.FileDrop
        label="Plandatei"
        accept=".pdf,.txt,.json,application/pdf,text/plain,application/json"
        hint="PDF, Text oder Questi-JSON · bis 3 MB"
        maxSize={3 * 1024 * 1024}
        file={{ name: 'Essensplan Herbst.pdf', size: 186400 }}
      />
      <ImportPreview
        file="Essensplan Herbst.pdf"
        meta="4 Seiten · gelesen"
        stats={[
          { label: 'Bausteine', value: '13' },
          { label: 'Termine', value: '21' },
          { label: 'Prüfen', value: '2' },
        ]}
        excerpt={'Mittag A · Mo/Di/Do/So\nKartoffeln 500 g, Hähnchen 200 g, Gemüse 285 g …'}
      >
        <N.Notice tone="danger" title="2 Mengen unklar">
          „eine Handvoll Nüsse“ und „etwas Öl“ bleiben mit Prüfhinweis sichtbar.
        </N.Notice>
      </ImportPreview>
      <N.TextField label="Name des Plans" value={name[0]} onChange={name[1]} />
    </N.Sheet>
  );
}

export { PlanImportSheet };

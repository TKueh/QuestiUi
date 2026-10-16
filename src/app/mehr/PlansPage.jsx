import React, { Fragment } from 'react';
import N, { Button, List } from 'nordhaus-ui/src/bare.js';
import { PlanRow } from '../../components/PlanRow/PlanRow.jsx';
import { demo } from '../../data/demo.js';
import { S, SubBar, col, useNav } from '../shared.jsx';

function PlansPage() {
  const s = demo.use();
  const nav = useNav();
  const pl = S.plansInUse(s);
  const live = s.plans.filter((x) => x.status !== 'archived');
  const arch = s.plans.filter((x) => x.status === 'archived');
  function open(x) {
    if (x.id === 'train') nav.go('editor');
    else if (x.id === 'finance') nav.go('finance');
    else
      nav.toast({
        message: `„${x.title}“ öffnet im Planeditor – in dieser Vorschau ist der Trainingsplan bearbeitbar.`,
      });
  }
  return (
    <Fragment>
      <SubBar
        large={true}
        backLabel="Mehr"
        title="Meine Pläne"
        eyebrow={`${pl.active} aktiv · ${pl.paused} pausiert · ${pl.archived} archiviert`}
      />
      <div style={col(8, '0 var(--gutter) var(--space-8)')}>
        <N.TopBar variant="toolbar" leading={<span className="nh-label">PDF · Text · Questi-JSON</span>}>
          <Button
            variant="key"
            size="sm"
            icon="upload"
            collapse={true}
            onClick={() => {
              nav.open('planImport');
            }}
          >
            Importieren
          </Button>
        </N.TopBar>
        <List>
          {live.map((x) => (
            <PlanRow
              key={x.id}
              {...x}
              onClick={() => {
                open(x);
              }}
            />
          ))}
        </List>
        <div>
          <N.SectionHeader title="Archiv" count={arch.length} />
          <List>
            {arch.map((x) => (
              <PlanRow
                key={x.id}
                {...x}
                onClick={() => {
                  nav.toast({ message: 'Archivierte Pläne sind schreibgeschützt.' });
                }}
              />
            ))}
          </List>
        </div>
      </div>
    </Fragment>
  );
}

export { PlansPage };

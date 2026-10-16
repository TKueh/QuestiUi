import React from 'react';
import N, { Button, KeyValue } from 'nordhaus-ui/src/bare.js';
import { DocLink } from '../../components/DocLink/DocLink.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

function QuestDetailSheet({ id }) {
  const s = demo.use();
  const nav = useNav();
  const q = S.findQuest(s, id) || S.today(s).quests[0];
  const steps = q.steps ? Array.from({ length: q.steps }, (_, i) => i < q.stepsDone) : null;
  const STEP = [
    ['Erste', '10:30'],
    ['Zweite', '13:30'],
    ['Dritte', '16:00'],
  ];
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      category={q.category}
      tools={
        q.own ? null : (
          <DocLink
            variant="chip"
            icon={false}
            onClick={(e) => {
              e.preventDefault();
              nav.close();
              nav.tab('more', { stack: ['plans'] });
            }}
          >
            Originalplan
          </DocLink>
        )
      }
      eyebrow={dateLong(q.date)}
      title={q.title}
      description={q.description}
      status={q.steps ? `${N.utils.frac(q.stepsDone, q.steps)} Schritte erledigt` : S.qDone(q) ? 'Erledigt' : 'Offen'}
      progress={q.steps ? q.stepsDone / q.steps : undefined}
      actions={
        S.qDone(q) ? (
          <Button
            variant="secondary"
            onClick={() => {
              demo.act.toggle(q.id, false);
            }}
          >
            Wieder öffnen
          </Button>
        ) : (
          [
            q.steps ? (
              <Button key="s" variant="secondary" onClick={nav.close}>
                Später
              </Button>
            ) : null,
            <Button
              key="a"
              variant="accent"
              onClick={() => {
                demo.act.toggle(q.id, true);
                nav.close();
                nav.toast({
                  message: `„${q.title}“ erledigt.`,
                  action: {
                    label: 'Widerrufen',
                    onClick: () => {
                      demo.act.toggle(q.id, false);
                    },
                  },
                });
              }}
            >
              {q.steps ? 'Alles abhaken' : 'Abhaken'}
            </Button>,
          ]
        )
      }
    >
      {steps ? (
        <N.StepList
          value={steps}
          onChange={(v) => {
            demo.act.setSteps(q.id, v);
          }}
          items={STEP.slice(0, q.steps).map((x) => ({
            title: `${x[0]} Bewegungspause`,
            description: '2 Minuten locker rudern oder gehen.',
            time: x[1],
          }))}
        />
      ) : null}
      <div>
        <KeyValue
          label="Wiederholung"
          value={q.own ? 'Einmalig' : q.steps ? 'Werktags · Woche A und B' : 'Laut Plan'}
        />
        <KeyValue label="Erinnerung" value={q.steps ? 'Zu jedem Schritt' : q.time ? '30 Minuten vorher' : 'Keine'} />
        <KeyValue
          label="Herkunft"
          value={
            q.own
              ? 'Eigene Quest'
              : q.category === 'food'
                ? 'Essensplan'
                : q.category === 'training'
                  ? 'Trainingsplan'
                  : 'Wochenzeitplan'
          }
        />
      </div>
    </N.Sheet>
  );
}

export { QuestDetailSheet };

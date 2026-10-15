import React from 'react';
import N, { Button } from 'nordhaus-ui';
import { FeelingPicker } from '../../components/TrainingSummary/FeelingPicker.jsx';
import { TrainingSummary } from '../../components/TrainingSummary/TrainingSummary.jsx';
import { demo } from '../../data/demo.js';
import { S, useNav } from '../shared.jsx';

function TrainingDoneSheet({ id, preset }) {
  const s = demo.use();
  const nav = useNav();

  const q = S.findQuest(s, id) || S.nextQuest(s, (x) => !!x.workout);

  let st = S.trainingStats(s, q);
  const ex = S.workout(q);
  const sets = s.training.sets || [];
  let open = ex.map((e, i) => [e, (sets[i] || []).filter((v) => !v).length]).filter((x) => x[1] > 0);
  if (preset && !s.training.sets) {
    st = { done: 22, total: 24, load: 4280 };
    open = [[ex[2], 2]];
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      category="training"
      eyebrow={`${q.title.replace(' trainieren', '')} · ${q.time}–${q.end}`}
      title="Training abschließen"
      description={`${st.done} von ${st.total} Sätzen erledigt. Die Werte gehen in den Verlauf unter Gesundheit.`}
      status="Wird lokal gesichert"
      actions={React.createElement(
        Button,
        {
          variant: 'accent',
          arrow: true,
          onClick: () => {
            demo.act.saveTraining(q.id);
            nav.close();
            nav.tab('today');
            nav.toast({
              tone: 'success',
              message: `Training gesichert – ${q.title.replace(' trainieren', '')} ist abgehakt.`,
            });
          },
        },
        'Training sichern',
      )}
    >
      <TrainingSummary setsDone={st.done} setsTotal={st.total} load={st.load} duration={62} />
      <div className="nh-field">
        <span className="nh-label">Wie war das Training?</span>
        <FeelingPicker value={s.training.feeling} onChange={demo.act.feeling} />
      </div>
      {open.length ? (
        <N.Notice
          icon="info"
          title={open
            .map((x) => `${x[0].name}: ${x[1]}${x[1] === 1 ? ' Satz' : ' Sätze'} offen`)
            .slice(0, 2)
            .join(' · ')}
        >
          Beim nächsten Mal bleibt das Gewicht gleich. Steigerung erst, wenn alle Sätze sauber gelingen.
        </N.Notice>
      ) : null}
      <N.TextArea label="Notiz" optional={true} rows={2} placeholder="Wie hat sich der Rücken angefühlt?" />
    </N.Sheet>
  );
}

export { TrainingDoneSheet };

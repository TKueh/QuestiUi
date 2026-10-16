import React from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { FeelingPicker } from '../../components/TrainingSummary/FeelingPicker.jsx';
import { TrainingSummary } from '../../components/TrainingSummary/TrainingSummary.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

function TrainingDoneSheet({ id, preset }) {
  const s = demo.use();
  const nav = useNav();

  const q = S.findQuest(s, id) || S.nextQuest(s, (x) => !!x.workout);

  const ex = S.workout(q);
  /* Vorschau: alle Sätze bis auf die letzten zwei der dritten Übung – gerechnet wie im Training, nicht eingetragen */
  const sets =
    s.training.sets ||
    (preset ? ex.map((e, i) => Array.from({ length: e.sets }, (_, k) => !(i === 2 && k >= e.sets - 2))) : []);
  const st = S.trainingStats(s, q, !s.training.sets && preset ? sets : undefined);
  const open = ex.map((e, i) => [e, (sets[i] || []).filter((v) => !v).length]).filter((x) => x[1] > 0);
  const hm = (t) => +t.slice(0, 2) * 60 + +t.slice(3, 5);
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      category="training"
      eyebrow={`${dateLong(q.date)} · ${q.time}–${q.end}`}
      title="Training abschließen"
      description={`${st.done} von ${st.total} Sätzen erledigt. Die Werte gehen in den Verlauf unter Gesundheit.`}
      status="Wird lokal gesichert"
      actions={React.createElement(
        Button,
        {
          variant: 'accent',
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
      <TrainingSummary setsDone={st.done} setsTotal={st.total} load={st.load} duration={hm(q.end) - hm(q.time)} />
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

import React, { useEffect } from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { DocLink } from '../../components/DocLink/DocLink.jsx';
import { ExerciseRow } from '../../components/ExerciseRow/ExerciseRow.jsx';
import { demo } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

const { iso } = N.utils;

function TrainingSheet({ id, preset }) {
  const s = demo.use();
  const nav = useNav();

  const q = S.findQuest(s, id) || S.nextQuest(s, (x) => !!x.workout);

  const ex = S.workout(q);
  /* welche Übung gerade ihr Gewicht zeigt (Stepper unter der Übung) */
  const editing = React.useState(null);

  const sets =
    s.training.sets ||
    ex.map((e, i) => Array.from({ length: e.sets }, (_, k) => !!preset && (i < 2 || (i === 2 && k === 0))));

  useEffect(() => {
    if (!s.training.sets) demo.act.setSets(sets);
  }, []);
  const st = S.trainingStats(s, q, sets);
  const early = q.date !== iso(new Date());
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      onClose={nav.close}
      category="training"
      tools={React.createElement(
        DocLink,
        {
          variant: 'chip',
          icon: false,
          onClick: (e) => {
            e.preventDefault();
            nav.close();
            nav.tab('more', { stack: ['plans', 'editor'] });
          },
        },
        'Trainingsplan',
      )}
      eyebrow={`${dateLong(q.date)} · ${q.time}${early ? ' · vorgezogen' : ''}`}
      title={q.title}
      description={`${ex.length} Übungen · Startgewichte aus dem Trainingsplan.`}
      status={`${N.utils.frac(st.done, st.total)} Sätze`}
      progress={st.total ? st.done / st.total : 0}
      actions={React.createElement(
        Button,
        {
          variant: 'accent',
          disabled: !st.done,
          onClick: () => {
            nav.open('trainingDone', { id: q.id });
          },
        },
        'Training abschließen',
      )}
    >
      <section>
        <N.SectionHeader title="Übungen" meta={N.utils.frac(st.exercisesDone, st.exercises)} />
        <div>
          {ex.map((e, i) => (
            <ExerciseRow
              key={e.name}
              index={e.index}
              name={e.name}
              reps={e.reps}
              sets={e.sets}
              rest={e.rest}
              weight={e.weight == null ? undefined : e.weight === 0 ? 'KG' : e.weight}
              planned={e.planned}
              note={e.note}
              onEditWeight={() => {
                editing[1](editing[0] === i ? null : i);
              }}
              editor={
                editing[0] === i && typeof e.weight === 'number' ? (
                  <N.Stepper
                    label={`Gewicht ${e.name}`}
                    value={e.weight}
                    min={0}
                    step={e.weight >= 20 ? 2.5 : 1}
                    unit="kg"
                    onChange={(v) => {
                      demo.act.setWeight(e.name, v);
                    }}
                  />
                ) : null
              }
              doneSets={(sets[i] || []).filter(Boolean).length}
              setsValue={sets[i]}
              onSets={(v) => {
                const n = (demo.get().training.sets || sets).map((a) => a.slice());
                n[i] = v;
                demo.act.setSets(n);
              }}
            />
          ))}
        </div>
      </section>
      <div>
        <N.Accordion title="Aufwärmen" meta="5 min">
          <p className="qs-note">5 Minuten Rudern, dann zwei leichte Sätze der ersten Übung.</p>
        </N.Accordion>
        <N.Accordion title="Steigerungsregel" meta="+ 2,5 kg">
          <p className="qs-note">Gelingen alle Sätze sauber, steigt das Gewicht beim nächsten Training um 2,5 kg.</p>
        </N.Accordion>
      </div>
    </N.Sheet>
  );
}

export { TrainingSheet };

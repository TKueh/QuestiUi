import React, { Fragment } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { PlanPreviewWeek } from '../../components/PlanPreviewWeek/PlanPreviewWeek.jsx';
import { demo } from '../../data/demo.js';
import { S, SubBar, col, useNav } from '../shared.jsx';
import { diffCount } from './shared.jsx';

/* Planeditor: Entwurf lokal; Zurück mit Änderungen fragt (UnsavedDialog), Sichern sichert. saveError zeigt den Speicherfehler-Zustand. */
function PlanEditorPage({ editor, setEditor }) {
  const s = demo.use();
  const nav = useNav();
  const ed = editor;
  const set = setEditor;
  const items = ed.items || s.planA;
  const changes = ed.items ? diffCount(s.planA, ed.items) : 0;
  const S2 = (t, st, short) => ({
    title: t,
    short: short || t,
    state: st,
  });
  /* Vorschau aus Rhythmus und Trainingstagen: A/B wechseln sich ab, Wöchentlich ist immer A; feste Termine bleiben */
  const rhythm = React.useState('A/B im Wechsel');
  const wdays = React.useState([0, 2, 5]);
  const FIX = [[], [S2('Judo')], [], [S2('Judo')], [S2('Fußball')], [], [S2('Vorkochen', 'same', 'Kochen')]];
  let k = 0;
  const preview = FIX.map((fix, i) => {
    if (!wdays[0].includes(i)) return { items: fix };
    const n = k++;
    const w = rhythm[0] === 'A/B im Wechsel' && n % 2 ? 'Kraft B' : 'Kraft A';
    return { items: [S2(w, w === 'Kraft A' && changes ? 'change' : 'same')].concat(fix) };
  });
  return (
    <Fragment>
      <SubBar
        nav={true}
        backLabel="Pläne"
        title="Trainingsplan"
        onBack={() => {
          if (changes) nav.dialog('unsaved');
          else nav.back();
        }}
        actions={
          <N.SaveStatus
            state={ed.error ? 'error' : changes ? 'dirty' : 'saved'}
            label={ed.error ? 'Ungesichert' : changes ? 'Entwurf' : 'Gesichert'}
          />
        }
      />
      <div style={col(8)}>
        {ed.error ? (
          /* eine Handlung, eine Taste: erneut versucht wird unten in der Leiste (accent) */
          <N.Notice tone="danger" title="Nicht gesichert">
            {`Der Speicher des Geräts war nicht erreichbar. Deine ${changes}${changes === 1 ? ' Änderung bleibt' : ' Änderungen bleiben'} im Entwurf erhalten – versuch es unten erneut.`}
          </N.Notice>
        ) : null}
        <div>
          <N.SectionHeader index={1} title="Kraft A · Übungen" count={items.length} />
          <N.EditableList
            value={items}
            onChange={(v) => {
              set({ items: v, error: ed.error });
            }}
            addLabel="Übung hinzufügen"
          />
        </div>
        <div>
          <N.SectionHeader index={2} title="Rhythmus" />
          <N.Select
            label="Wiederholen"
            options={['Wöchentlich', 'A/B im Wechsel']}
            value={rhythm[0]}
            onChange={rhythm[1]}
          />
          <div style={{ height: 'var(--space-4)' }} />
          <N.WeekdayPicker value={wdays[0]} onChange={wdays[1]} />
        </div>
        <PlanPreviewWeek from={S.dshort(S.nextMonday())} days={preview} />
      </div>
      <div style={{ height: 96 }} />
    </Fragment>
  );
}

export { PlanEditorPage };

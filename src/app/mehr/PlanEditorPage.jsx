import React, { Fragment } from 'react';
import N, { Button } from 'nordhaus-ui/src/bare.js';
import { PlanPreviewWeek } from '../../components/PlanPreviewWeek/PlanPreviewWeek.jsx';
import { demo } from '../../data/demo.js';
import { S, SubBar, col, useNav } from '../shared.jsx';
import { diffCount } from './shared.jsx';

/* Planeditor: Entwurf lokal; Zurück mit Änderungen fragt (UnsavedDialog), Übernehmen sichert. saveError zeigt den Speicherfehler-Zustand. */
function PlanEditorPage({ editor, setEditor }) {
  const s = demo.use();
  const nav = useNav();
  const ed = editor;
  const set = setEditor;
  const items = ed.items || s.planA;
  const changes = ed.items ? diffCount(s.planA, ed.items) : 0;
  const S2 = (t, st) => ({
    title: t,
    short: t,
    state: st,
  });
  function save() {
    demo.act.savePlan(items);
    set({ items: null });
    nav.toast({ tone: 'success', message: `Trainingsplan übernommen – gilt ab ${S.dshort(S.nextMonday())}.` });
  }
  return (
    <Fragment>
      <SubBar
        nav={true}
        border={true}
        backLabel="Pläne"
        title="Trainingsplan"
        onBack={() => {
          if (changes) nav.dialog('unsaved');
          else nav.back();
        }}
        actions={
          <N.SaveStatus
            state={ed.error ? 'error' : changes ? 'dirty' : 'saved'}
            label={ed.error ? 'Fehler' : changes ? 'Entwurf' : 'Übernommen'}
          />
        }
      />
      <div style={col(6)}>
        {ed.error ? (
          <N.Notice
            tone="danger"
            title="Nicht gesichert"
            action={
              <Button variant="key" size="sm" icon="repeat" onClick={save}>
                Erneut versuchen
              </Button>
            }
          >
            {`Der Speicher des Geräts war nicht erreichbar. Deine ${changes}${changes === 1 ? ' Änderung bleibt' : ' Änderungen bleiben'} im Entwurf erhalten.`}
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
          <N.Select label="Wiederholen" options={['Wöchentlich', 'A/B im Wechsel']} defaultValue="A/B im Wechsel" />
          <div style={{ height: 'var(--space-4)' }} />
          <N.WeekdayPicker defaultValue={[0, 2, 5]} />
        </div>
        <PlanPreviewWeek
          from={S.dshort(S.nextMonday())}
          days={[
            { items: [S2('Kraft A', changes ? 'change' : 'same')] },
            { items: [S2('Judo')] },
            { items: [S2('Kraft A', changes ? 'change' : 'same')] },
            { items: [S2('Judo')] },
            { items: [S2('Fußball')] },
            { items: [S2('Kraft B')] },
            { items: [S2('Vorkochen')] },
          ]}
        />
      </div>
      <div style={{ height: 96 }} />
    </Fragment>
  );
}

export { PlanEditorPage };

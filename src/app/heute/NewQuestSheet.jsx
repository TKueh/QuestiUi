import React, { useState } from 'react';
import N from 'nordhaus-ui/src/bare.js';
import { CATEGORIES } from '../../categories.js';
import { demo, hmn } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

const { addDays, iso, parse } = N.utils;

/* Neue Quest – Pflichtfeld und Zeitprüfung beim Hinzufügen; mit Eingaben fragt Abbrechen nach */
/* Rhythmen einer Quest – das Auswahlfeld wächst mit, die Zeile bleibt eine */
const REPEAT = [
  { value: 'once', label: 'Einmalig' },
  { value: 'daily', label: 'Täglich' },
  { value: 'workdays', label: 'Werktags' },
  { value: 'weekly', label: 'Wöchentlich' },
  { value: 'biweekly', label: 'Alle zwei Wochen' },
  { value: 'monthly', label: 'Monatlich' },
  { value: 'yearly', label: 'Jährlich' },
];
/* Erinnerung: mit Uhrzeit relativ zum Beginn, ganztägig und ohne Uhrzeit am Morgen oder am Vortag */
const REMIND_TIME = ['Keine', 'Zum Beginn', '15 Minuten vorher', '30 Minuten vorher', '1 Stunde vorher', 'Am Vortag'];
const REMIND_DAY = ['Keine', 'Am Morgen', 'Am Vortag'];
function NewQuestSheet(props) {
  const nav = useNav();
  const s = demo.use();
  const t = S.today(s);
  const title = useState(props.title != null ? props.title : props.invalid ? '' : 'Judo-Tasche packen');
  const date = useState(props.date || 'today');
  const mode = useState('time'); // time · allday · none
  const noTime = [mode[0] !== 'time'];
  const note = useState('');
  const steps = useState([]);
  const remind = useState('Keine');
  const start = useState(props.invalid ? '19:00' : '18:30');
  const end = useState(props.invalid ? '18:30' : '18:45');
  const rep = useState('once');
  const days = useState(() => [
    (parse(date[0] === 'today' || date[0] === 'tomorrow' ? t.date : date[0]).getDay() + 6) % 7,
  ]);
  const cat = useState(props.category || 'personal');
  const tried = useState(!!props.invalid);
  const iDate = date[0] === 'today' ? t.date : date[0] === 'tomorrow' ? iso(addDays(parse(t.date), 1)) : date[0];
  const D = parse(iDate);
  const repHint =
    rep[0] === 'monthly'
      ? `Jeden Monat am ${D.getDate()}.`
      : rep[0] === 'yearly'
        ? `Jedes Jahr am ${D.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}`
        : rep[0] === 'workdays'
          ? 'Montag bis Freitag'
          : undefined;
  const errTitle = tried[0] && !title[0].trim() ? 'Gib der Quest einen Namen.' : null;
  const errTime =
    tried[0] && !noTime[0] && start[0] && end[0] && hmn(end[0]) <= hmn(start[0])
      ? 'Das Ende liegt vor dem Beginn – wähle eine spätere Uhrzeit.'
      : null;
  const errDate =
    iDate > s.week[6].date ? `Diese Vorschau kennt nur die laufende Woche bis ${dateLong(s.week[6].date)}.` : null;
  const dirty =
    title[0] !== (props.title != null ? props.title : 'Judo-Tasche packen') || date[0] !== (props.date || 'today');
  function add() {
    tried[1](true);
    if (!title[0].trim() || (!noTime[0] && hmn(end[0]) <= hmn(start[0])) || errDate) {
      setTimeout(() => {
        const el = document.getElementById(!title[0].trim() ? 'qs-nq-title' : 'qs-nq-end');
        if (el) el.focus();
      }, 0);
      return;
    }
    demo.act.addQuest({
      title: title[0].trim(),
      date: iDate,
      time: noTime[0] ? null : start[0],
      end: noTime[0] ? null : end[0],
      allDay: mode[0] === 'allday',
      note: note[0].trim() || undefined,
      steps: steps[0].map((x) => x.title),
      reminder: remind[0] !== 'Keine' ? remind[0] : undefined,
      repeat: rep[0],
      days: rep[0] === 'weekly' || rep[0] === 'biweekly' ? days[0] : undefined,
      category: cat[0],
    });
    nav.close();
    nav.toast({
      tone: 'success',
      message: `„${title[0].trim()}“ steht ${iDate === t.date ? 'heute' : `am ${dateLong(iDate)}`} auf der Liste.`,
    });
  }
  return (
    <N.Sheet
      inline={true}
      size="large"
      open={true}
      title="Neue Quest"
      onCancel={nav.close}
      onDone={add}
      doneLabel="Hinzufügen"
      dirty={dirty && !props.invalid}
    >
      <N.TextField
        id="qs-nq-title"
        label="Quest"
        size="lg"
        required={true}
        placeholder="z. B. Judo-Tasche packen"
        value={title[0]}
        onChange={title[1]}
        error={errTitle}
      />
      <N.DateField label="Datum" value={iDate} onChange={date[1]} min={t.date} />
      {errDate ? (
        <N.Notice tone="danger" title="Datum außerhalb der Woche">
          {errDate}
        </N.Notice>
      ) : null}
      {/* Zeit: drei kurze Werte – Schnellwahl; Uhrzeiten nur, wenn es eine gibt */}
      <div className="nh-field">
        <span className="nh-label">Zeit</span>
        <N.ChoiceRow.Quick
          label="Zeit"
          value={mode[0]}
          onChange={(v) => {
            mode[1](v);
            remind[1]('Keine');
          }}
          options={[
            { value: 'time', label: 'Uhrzeit' },
            { value: 'allday', label: 'Ganztägig' },
            { value: 'none', label: 'Ohne Uhrzeit' },
          ]}
        />
      </div>
      {!noTime[0] ? (
        <N.FieldRow>
          <N.TimeField label="Beginn" value={start[0]} onChange={start[1]} minuteStep={5} />
          <N.TimeField id="qs-nq-end" label="Ende" value={end[0]} onChange={end[1]} minuteStep={5} error={errTime} />
        </N.FieldRow>
      ) : null}
      {/* Wiederholung als Auswahlfeld: eine Zeile für beliebig viele Rhythmen; das Detail erscheint nur, wo es etwas zu wählen gibt */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <N.Select label="Wiederholung" value={rep[0]} onChange={rep[1]} options={REPEAT} hint={repHint} />
        {rep[0] === 'weekly' || rep[0] === 'biweekly' ? (
          <N.WeekdayPicker label="An diesen Tagen" value={days[0]} onChange={days[1]} />
        ) : null}
      </div>
      <N.Select
        label="Erinnerung"
        value={remind[0]}
        onChange={remind[1]}
        options={mode[0] === 'time' ? REMIND_TIME : REMIND_DAY}
      />
      <N.Select
        label="Bereich"
        value={cat[0]}
        onChange={cat[1]}
        options={Object.keys(CATEGORIES).map((k) => ({
          value: k,
          label: CATEGORIES[k].label,
        }))}
        hint={
          cat[0] === 'birthday'
            ? 'Den Geburtstag selbst legst du in Leben an („+ Geburtstag“) – hier entsteht eine Aufgabe dazu, z. B. „Geschenk besorgen“.'
            : undefined
        }
      />
      {/* Teilaufgaben: jede Zeile ein Schritt; daraus entstehen Zählwerk und Schrittliste im Detail */}
      <div className="nh-field">
        <span className="nh-label">
          Schritte <span className="nh-opt">· optional</span>
        </span>
        <N.EditableList
          value={steps[0]}
          onChange={steps[1]}
          addLabel="Schritt hinzufügen"
          placeholder="Schritt beschreiben"
        />
      </div>
      <N.TextArea label="Notiz" optional={true} value={note[0]} onChange={note[1]} placeholder="Was gehört dazu?" />
    </N.Sheet>
  );
}

export { NewQuestSheet };

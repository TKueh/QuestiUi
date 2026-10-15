import React, { useState } from 'react';
import N from 'nordhaus-ui';
import { CATEGORIES } from '../../categories.js';
import { demo, hmn } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';

const { addDays, iso, parse } = N.utils;

/* Neue Quest – Pflichtfeld und Zeitprüfung beim Hinzufügen; mit Eingaben fragt Abbrechen nach */
function NewQuestSheet(props) {
  const nav = useNav();
  const s = demo.use();
  const t = S.today(s);
  const title = useState(props.title != null ? props.title : props.invalid ? '' : 'Judo-Tasche packen');
  const date = useState(props.date || 'today');
  const noTime = useState(false);
  const start = useState(props.invalid ? '19:00' : '18:30');
  const end = useState(props.invalid ? '18:30' : '18:45');
  const rep = useState('once');
  const days = useState([1, 3]);
  const cat = useState(props.category || 'personal');
  const tried = useState(!!props.invalid);
  const dates = [
    { value: 'today', label: 'Heute' },
    { value: 'tomorrow', label: 'Morgen' },
  ];
  const iDate = date[0] === 'today' ? t.date : date[0] === 'tomorrow' ? iso(addDays(parse(t.date), 1)) : date[0];
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
      repeat: rep[0],
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
      <div className="nh-field">
        <span className="nh-label">Datum</span>
        <N.ChoiceRow.Quick label="Datum" value={date[0]} onChange={date[1]} options={dates} />
      </div>
      {errDate ? (
        <N.Notice tone="danger" title="Datum außerhalb der Woche">
          {errDate}
        </N.Notice>
      ) : null}
      <div>
        <N.Checkbox label="Ohne Uhrzeit" checked={noTime[0]} onChange={noTime[1]} />
        {!noTime[0] ? (
          <N.FieldRow>
            <N.TimeField label="Beginn" value={start[0]} onChange={start[1]} minuteStep={5} />
            <N.TimeField id="qs-nq-end" label="Ende" value={end[0]} onChange={end[1]} minuteStep={5} error={errTime} />
          </N.FieldRow>
        ) : null}
      </div>
      <div className="nh-field">
        <span className="nh-label">Wiederholung</span>
        <N.SegmentedControl
          block={true}
          label="Wiederholung"
          value={rep[0]}
          onChange={rep[1]}
          options={[
            { value: 'once', label: 'Einmalig' },
            { value: 'daily', label: 'Täglich' },
            { value: 'weekly', label: 'Wöchentlich' },
          ]}
        />
        {rep[0] === 'weekly' ? (
          <div style={{ marginTop: 'var(--space-3)' }}>
            <N.WeekdayPicker value={days[0]} onChange={days[1]} />
          </div>
        ) : null}
      </div>
      <N.Select
        label="Bereich"
        value={cat[0]}
        onChange={cat[1]}
        options={Object.keys(CATEGORIES).map((k) => ({
          value: k,
          label: CATEGORIES[k].label,
        }))}
      />
    </N.Sheet>
  );
}

export { NewQuestSheet };

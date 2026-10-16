import React, { useState } from 'react';
import N, { Button, Chip } from 'nordhaus-ui/src/bare.js';
import { CATEGORIES } from '../../categories.js';
import { REPEAT_LABEL, demo, hmn } from '../../data/demo.js';
import { S, dateLong, useNav } from '../shared.jsx';
import { addDays, parseQuest, wdOf } from './quickParse.js';

const { parse } = N.utils;

/* Neue Quest – „Ein Satz genügt“: Der Satz ist die Quest; was darin steht (Tag, Uhrzeit, Rhythmus, Bereich), erscheint als
   Zellen und lässt sich antippen (Details) oder verwerfen. Darunter der Kontext des Tages: freie Zeit, Überschneidung,
   „Wieder anlegen“. Die Details (Zeit, Wiederholung, Erinnerung, Bereich, Schritte, Notiz) sind da, aber nicht im Weg.
   Mit Eingaben fragt Abbrechen nach. */
const REPEAT = Object.entries(REPEAT_LABEL).map(([value, label]) => ({ value, label }));
const REMIND_TIME = ['Keine', 'Zum Beginn', '15 Minuten vorher', '30 Minuten vorher', '1 Stunde vorher', 'Am Vortag'];
const REMIND_DAY = ['Keine', 'Am Morgen', 'Am Vortag'];
const WD2 = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const clock = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.round((h % 1) * 60)).padStart(2, '0')}`;
const DEMO = 'Judo-Tasche packen morgen 18:30';

function NewQuestSheet(props) {
  const nav = useNav();
  const s = demo.use();
  const today = S.today(s).date;
  /* Vorbelegung aus dem Aufruf (Leben → Planen, Tagespanel): Titel als Satz, Tag und Bereich als eigene Wahl */
  const pre = {};
  if (props.date === 'tomorrow') pre.date = addDays(today, 1);
  else if (props.date && props.date !== 'today') pre.date = props.date;
  if (props.category) pre.category = props.category;
  if (props.invalid) Object.assign(pre, { mode: 'time', time: '19:00', end: '18:30' });
  const text = useState(props.title != null ? props.title : props.invalid ? '' : DEMO);
  const ignored = useState(() => new Set());
  const manual = useState(pre);
  const open = useState(!!props.invalid);
  const steps = useState([]);
  const note = useState('');
  const remind = useState('Keine');
  const tried = useState(!!props.invalid);

  /* Erkannt + selbst gewählt = was angelegt wird; Selbstgewähltes geht vor */
  const p = parseQuest(text[0], today, ignored[0]);
  const m = manual[0];
  const date = m.date || p.date || today;
  const mode = m.mode || (p.allDay ? 'allday' : p.time ? 'time' : 'none');
  const start = m.time || p.time || '18:00';
  const end = m.end || p.end || clock(Math.min(23.75, hmn(start) + 0.5));
  const repeat = m.repeat || p.repeat || 'once';
  const days = m.days || p.days || [wdOf(date)];
  const cat = m.category || p.category || 'personal';
  const title = p.title;
  const set = (o) => manual[1]((x) => Object.assign({}, x, o));

  /* Kontext des Tages: Belegtes aus dem Kalender, Überschneidung, nächste freie Zeit gleicher Dauer */
  const day = s.week.filter((d) => d.date === date)[0];
  const busy = day
    ? S.dayEvents(day)
        .filter((e) => !e.allDay && e.start && e.end)
        .map((e) => ({ start: e.start, end: e.end, label: e.title }))
    : [];
  const len = hmn(end) - hmn(start);
  const hits = mode === 'time' ? busy.filter((b) => hmn(b.start) < hmn(end) && hmn(b.end) > hmn(start)) : [];
  let free = null;
  if (hits.length) {
    let h = Math.max(...hits.map((b) => hmn(b.end)));
    for (let k = 0; k < 8 && busy.some((b) => hmn(b.start) < h + len && hmn(b.end) > h); k++)
      h = Math.max(...busy.filter((b) => hmn(b.start) < h + len && hmn(b.end) > h).map((b) => hmn(b.end)));
    if (h + len <= 23.75) free = h;
  }
  /* Wieder anlegen: zuletzt eigene Quests, sonst offene Vorhaben aus Leben */
  const own = [];
  s.week.forEach((d) =>
    d.quests.forEach((q) => {
      if (q.own && !own.includes(q.title)) own.push(q.title);
    }),
  );
  const again = own.length
    ? { label: 'Wieder anlegen', items: own.slice(-3).reverse() }
    : {
        label: 'Aus Vorhaben',
        items: s.projects
          .filter((x) => !x.done && !x.planned)
          .map((x) => x.title)
          .slice(0, 3),
      };

  /* Zellen: was erkannt oder gewählt ist; der Tag steht immer (als Vorgabe ohne Entfernen) */
  const dLabel =
    date === today
      ? 'Heute'
      : date === addDays(today, 1)
        ? `Morgen · ${parse(date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric' }).replace('.,', '')}`
        : parse(date)
            .toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
            .replace('.,', ',');
  const tokens = [{ id: 'date', label: dLabel, icon: 'calendar', fixed: !p.hits.date && !m.date }];
  if (mode === 'time') tokens.push({ id: 'time', label: `${start}–${end}`, icon: 'clock' });
  if (mode === 'allday') tokens.push({ id: 'allDay', label: 'Ganztägig', icon: 'clock' });
  if (repeat !== 'once')
    tokens.push({
      id: 'repeat',
      label:
        repeat === 'weekly' || repeat === 'biweekly'
          ? `${REPEAT_LABEL[repeat]} · ${days.map((i) => WD2[i]).join(', ')}`
          : REPEAT_LABEL[repeat],
      icon: 'repeat',
    });
  if (p.hits.category || m.category)
    tokens.push({ id: 'category', label: (CATEGORIES[cat] || {}).label || cat, tone: cat });

  const errTitle = tried[0] && !title ? 'Schreib, was zu tun ist – z. B. „Judo-Tasche packen morgen 18:30“.' : null;
  const errTime =
    tried[0] && mode === 'time' && hmn(end) <= hmn(start)
      ? 'Das Ende liegt vor dem Beginn – wähle eine spätere Uhrzeit.'
      : null;
  const errDate =
    date > s.week[6].date ? `Diese Vorschau kennt nur die laufende Woche bis ${dateLong(s.week[6].date)}.` : null;
  const dirty =
    text[0] !== (props.title != null ? props.title : DEMO) || Object.keys(m).length > Object.keys(pre).length;

  function add() {
    tried[1](true);
    if (!title || errDate || (mode === 'time' && hmn(end) <= hmn(start))) {
      if (title && !errDate) open[1](true);
      setTimeout(() => {
        const el = document.getElementById(!title ? 'qs-nq-title' : 'qs-nq-end');
        if (el) el.focus();
      }, 0);
      return;
    }
    demo.act.addQuest({
      title,
      date,
      time: mode === 'time' ? start : null,
      end: mode === 'time' ? end : null,
      allDay: mode === 'allday',
      note: note[0].trim() || undefined,
      steps: steps[0].map((x) => x.title),
      reminder: remind[0] !== 'Keine' ? remind[0] : undefined,
      repeat,
      days: repeat === 'weekly' || repeat === 'biweekly' ? days : undefined,
      category: cat,
    });
    nav.close();
    nav.toast({
      tone: 'success',
      message: `„${title}“ steht ${date === today ? 'heute' : `am ${dateLong(date)}`} auf der Liste.`,
    });
  }
  const remove = (id) => {
    /* Erkennung verwerfen: das Wort bleibt im Titel; Selbstgewähltes fällt zurück */
    const kind = id === 'allDay' ? 'allDay' : id;
    ignored[1]((x) => new Set(x).add(kind === 'allDay' ? 'allDay' : kind));
    const o = Object.assign({}, m);
    if (id === 'time' || id === 'allDay') delete o.mode;
    if (id === 'time') {
      delete o.time;
      delete o.end;
    }
    if (id === 'repeat') {
      delete o.repeat;
      delete o.days;
    }
    if (id === 'date') delete o.date;
    if (id === 'category') delete o.category;
    manual[1](o);
  };
  const repHint =
    repeat === 'monthly'
      ? `Jeden Monat am ${parse(date).getDate()}.`
      : repeat === 'yearly'
        ? `Jedes Jahr am ${parse(date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}`
        : repeat === 'workdays'
          ? 'Montag bis Freitag'
          : undefined;

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
      <N.TokenField
        id="qs-nq-title"
        label="Quest"
        size="lg"
        required={true}
        placeholder="z. B. Judo-Tasche packen morgen 18:30"
        value={text[0]}
        onChange={(v) => {
          text[1](v);
          if (!v.trim()) ignored[1](new Set());
          /* neu Getipptes gewinnt: was der Satz jetzt nennt, ersetzt die frühere eigene Wahl derselben Art */
          const np = parseQuest(v, today, ignored[0]);
          const o = Object.assign({}, m);
          if (np.hits.time || np.hits.allDay) ['mode', 'time', 'end'].forEach((k) => delete o[k]);
          if (np.hits.date) delete o.date;
          if (np.hits.repeat) ['repeat', 'days'].forEach((k) => delete o[k]);
          if (np.hits.category) delete o.category;
          if (Object.keys(o).length !== Object.keys(m).length) manual[1](o);
        }}
        onSubmit={add}
        error={errTitle}
        tokens={title || text[0].trim() ? tokens : []}
        tokensLabel="Erkannt und gewählt"
        onTokenClick={() => {
          open[1](true);
        }}
        onTokenRemove={remove}
      />
      {!text[0].trim() && again.items.length ? (
        <div className="nh-field">
          <span className="nh-label">{again.label}</span>
          <div className="qs-nq-again">
            {again.items.map((x) => (
              <Chip
                key={x}
                label={x}
                onClick={() => {
                  text[1](x);
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
      {errDate ? (
        <N.Notice tone="danger" title="Datum außerhalb der Woche">
          {errDate}
        </N.Notice>
      ) : null}
      {/* Der Tag als Messstrecke: freie Zeit lesen, bevor man festlegt; Überschneidung als Satz mit Ausweg */}
      {day && mode !== 'allday' ? (
        <div className="nh-field">
          <span className="nh-label">{`Dein ${date === today ? 'Tag' : parse(date).toLocaleDateString('de-DE', { weekday: 'long' })}`}</span>
          <N.DayScale
            busy={busy}
            value={mode === 'time' ? { start, end } : null}
            now={date === today ? demo.NOW_H : undefined}
          />
          {hits.length ? (
            <p className="qs-nq-conflict" role="status">
              <N.Led state="danger" />
              <span>
                {`Überschneidet sich mit ${hits.map((b) => `${b.label} ${b.start}–${b.end}`).join(' und ')}.`}
              </span>
              {free != null ? (
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => {
                    set({ mode: 'time', time: clock(free), end: clock(free + len) });
                  }}
                >
                  {`Auf ${clock(free)} legen`}
                </Button>
              ) : null}
            </p>
          ) : null}
        </div>
      ) : null}
      <N.Accordion
        title="Details"
        meta={open[0] ? undefined : 'Zeit, Wiederholung, Schritte, Notiz'}
        open={open[0]}
        onToggle={open[1]}
      >
        <div className="qs-nq-details">
          <N.DateField
            label="Datum"
            value={date}
            onChange={(v) => {
              set({ date: v });
            }}
            min={today}
          />
          <div className="nh-field">
            <span className="nh-label">Zeit</span>
            <N.ChoiceRow.Quick
              label="Zeit"
              value={mode}
              onChange={(v) => {
                set({ mode: v });
                remind[1]('Keine');
              }}
              options={[
                { value: 'time', label: 'Uhrzeit' },
                { value: 'allday', label: 'Ganztägig' },
                { value: 'none', label: 'Ohne Uhrzeit' },
              ]}
            />
          </div>
          {mode === 'time' ? (
            <N.FieldRow>
              <N.TimeField
                label="Beginn"
                value={start}
                onChange={(v) => {
                  set({ mode: 'time', time: v, end: clock(Math.min(23.75, hmn(v) + Math.max(len, 0.25))) });
                }}
                minuteStep={5}
              />
              <N.TimeField
                id="qs-nq-end"
                label="Ende"
                value={end}
                onChange={(v) => {
                  set({ mode: 'time', time: start, end: v });
                }}
                minuteStep={5}
                error={errTime}
              />
            </N.FieldRow>
          ) : null}
          <N.Select
            label="Wiederholung"
            value={repeat}
            onChange={(v) => {
              set({ repeat: v });
            }}
            options={REPEAT}
            hint={repHint}
          />
          {repeat === 'weekly' || repeat === 'biweekly' ? (
            <N.WeekdayPicker
              label="An diesen Tagen"
              value={days}
              onChange={(v) => {
                set({ days: v });
              }}
            />
          ) : null}
          <N.Select
            label="Erinnerung"
            value={remind[0]}
            onChange={remind[1]}
            options={mode === 'time' ? REMIND_TIME : REMIND_DAY}
          />
          <N.Select
            label="Bereich"
            value={cat}
            onChange={(v) => {
              set({ category: v });
            }}
            options={Object.keys(CATEGORIES).map((k) => ({ value: k, label: CATEGORIES[k].label }))}
            hint={
              cat === 'birthday'
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
        </div>
      </N.Accordion>
    </N.Sheet>
  );
}

export { NewQuestSheet };

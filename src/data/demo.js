import React, { useEffect, useState } from 'react';
import N from 'nordhaus-ui/src/bare.js';

const U = N.utils;
const { addDays, iso, pad, parse } = N.utils;

/* ================= Ein Datenstand für alle Screens =================
   Questi.demo ist die einzige Quelle der Vorschau: eine Woche aus Plänen (Vorlagen je Wochentag), daraus Quests und Termine.
   Jede Zahl auf einem Screen wird hier berechnet – Tageszähler, Wochenleiste, Kalender, Fortschritt, Filter. Nichts ist fest eingetragen.
   Die Woche hängt am echten Datum; der Tagesstand ist ein fester Schnappschuss um 15:24 Uhr, damit Abnahmebilder vergleichbar bleiben. */

const NOW_H = 15.4; /* Demo-Uhrzeit 15:24 – Jetzt-Linie und Stand „heute“ */
const WD_LONG = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
function hmn(s) {
  const p = String(s).split(':');
  return +p[0] + (+p[1] || 0) / 60;
}
function clock(x) {
  const hh = Math.floor(x);
  const mm = Math.round((x - hh) * 60);
  return `${pad(hh)}:${pad(mm)}`;
}
function food(i) {
  const A = [0, 1, 3, 6].includes(i);
  const nextA = [0, 1, 3, 6].includes((i + 1) % 7);
  return [
    {
      k: 'snack1',
      category: 'food',
      slot: 10,
      title: 'Vormittags\u00ADsnack essen',
      description: 'Eiweißbrot mit Käse und Guacamole',
    },
    {
      k: 'lunch',
      category: 'food',
      slot: 12.5,
      title: `Mittags\u00ADportion ${A ? 'A' : 'B'} essen`,
      description: A ? 'Reis, Linsen-Curry und Gurke' : 'Kartoffeln, Hähnchen und Gemüse',
      meal: A ? 'A' : 'B',
    },
    {
      k: 'snack2',
      category: 'food',
      slot: 15.5,
      title: 'Nachmittags\u00ADsnack essen',
      description: 'Eine Banane und 150 g Skyr',
    },
    {
      k: 'dinner',
      category: 'food',
      slot: 20.5,
      title: 'Abend\u00ADessen zubereiten und essen',
      description: '400 g Kartoffeln mit frischem Kräuterdip',
    },
    {
      k: 'thaw',
      category: 'food',
      slot: 21.5,
      title: 'Mittags\u00ADbox für morgen auftauen',
      description: `${nextA ? 'A' : 'B'}-Box vom Tiefkühler in den Kühlschrank`,
    },
  ];
}
const PAUSES = {
  k: 'pauses',
  category: 'movement',
  slot: 9,
  title: 'Bewegungs\u00ADpausen machen',
  description: 'Drei kurze Pausen, jeweils 2 Minuten',
  steps: 3,
};
const TIDY = {
  k: 'tidy',
  category: 'household',
  slot: 13,
  title: 'Kurz aufräumen',
  description: '10 Minuten aufräumen; Wäsche und Spülmaschine',
};
const WORK = { start: '08:00', end: '12:00', title: 'Arbeit', category: 'work', context: true };
/* Vorlagen je Wochentag – so stehen sie in Tobias' Plänen (Training Mo/Mi/Sa Kraft, Di/Do Judo, Fr Fußball; Einkauf Mi/Sa; Vorkochen So) */
const TEMPLATES = [
  {
    hl: 'Kraft A trainieren',
    extra: [WORK],
    quests: [
      PAUSES,
      {
        k: 'gym',
        category: 'training',
        title: 'Kraft A trainieren',
        description: '7 Übungen · 24 Sätze',
        time: '18:00',
        end: '19:00',
        workout: 'A',
      },
    ],
  },
  {
    hl: 'Judo',
    extra: [WORK],
    quests: [
      PAUSES,
      TIDY,
      { k: 'judo', category: 'training', title: 'Judo', description: 'Verein · Halle 2', time: '19:00', end: '20:30' },
    ],
  },
  {
    hl: 'Frischeinkauf · Kraft A',
    extra: [WORK],
    quests: [
      PAUSES,
      TIDY,
      {
        k: 'shop',
        category: 'household',
        title: 'Frisch\u00ADeinkauf erledigen',
        description: '10 Artikel für Donnerstag bis Samstag',
        time: '17:30',
        end: '18:15',
        shopping: true,
      },
      {
        k: 'gym',
        category: 'training',
        title: 'Kraft A trainieren',
        description: '7 Übungen · 24 Sätze',
        time: '18:30',
        end: '19:30',
        workout: 'A',
      },
    ],
  },
  {
    hl: 'Judo · Lena hat Geburtstag',
    extra: [WORK],
    quests: [
      PAUSES,
      {
        k: 'lena',
        category: 'birthday',
        slot: 9.5,
        title: 'Lena gratulieren',
        description: 'Anrufen; Geschenk liegt bereit',
      },
      { k: 'judo', category: 'training', title: 'Judo', description: 'Verein · Halle 2', time: '19:00', end: '20:30' },
    ],
  },
  {
    hl: 'Fußball spielen',
    extra: [WORK],
    quests: [
      PAUSES,
      TIDY,
      {
        k: 'ball',
        category: 'movement',
        title: 'Fußball spielen',
        description: 'Hobbyliga · Kunstrasen',
        time: '18:00',
        end: '19:30',
      },
    ],
  },
  {
    hl: 'Kraft B · Einkauf',
    extra: [],
    quests: [
      TIDY,
      {
        k: 'gym',
        category: 'training',
        title: 'Kraft B trainieren',
        description: '7 Übungen · 24 Sätze',
        time: '11:00',
        end: '12:00',
        workout: 'B',
      },
      {
        k: 'shop',
        category: 'household',
        title: 'Einkauf erledigen',
        description: '10 Artikel für Sonntag bis Mittwoch',
        time: '17:00',
        end: '17:45',
        shopping: true,
      },
    ],
  },
  {
    hl: 'Vorkochen für die Woche',
    extra: [{ start: '18:00', end: '18:30', title: 'Woche planen', category: 'personal' }],
    quests: [
      {
        k: 'prep',
        category: 'household',
        title: 'Vorkochen für die Woche',
        description: 'Mittagsboxen A und B, je vier Portionen',
        time: '10:00',
        end: '12:00',
      },
    ],
  },
];
function dayDate(offsetWeeks, i) {
  return iso(addDays(U.weekStartOf(new Date(), 1), offsetWeeks * 7 + i));
}
function todayIndex() {
  return (new Date().getDay() + 6) % 7;
}
function buildDay(i, offsetWeeks) {
  const t = TEMPLATES[i];
  const date = dayDate(offsetWeeks || 0, i);
  const today = iso(new Date());
  const past = date < today;
  const isToday = date === today;
  const list = food(i)
    .concat(t.quests)
    .map((q) => Object.assign({}, q, { slot: q.slot != null ? q.slot : hmn(q.time) }));
  list.sort((a, b) => a.slot - b.slot);
  const quests = list.map((q) => {
    const id = `${date}:${q.k}`;
    let done = false;
    let stepsDone = 0;
    if (past) {
      done = !(i === 0 && q.k === 'pauses');
      stepsDone = q.steps && done ? q.steps : 0;
    } else if (isToday) {
      if (q.steps) stepsDone = 1;
      else done = (q.end ? hmn(q.end) : q.slot + 0.5) <= 13.1;
    }
    return Object.assign({}, q, { id, date, done, stepsDone, missed: past && !done });
  });
  return { date, index: i, hl: t.hl, quests, extra: t.extra.slice(), allDay: t.allDay || null };
}
/* Geburtstage, Wünsche, Vorhaben, Ausgaben, Pläne – dieselben Werte in Leben, Kalender, Fortschritt und Mehr */
function rel(n) {
  return iso(addDays(new Date(), n));
}
function dshort(d) {
  return parse(d).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\.,/, ',');
}
function nextMonday() {
  return dayDate(1, 0);
}
const SHOP = [
  {
    title: 'Obst & Gemüse',
    items: [
      { name: 'Bananen', quantity: '5 Stück', checked: true },
      { name: 'Kiwis', quantity: '6 Stück', checked: true },
      { name: 'Gurke', quantity: '350 g' },
      { name: 'Tomaten', quantity: '200 g' },
    ],
  },
  {
    title: 'Kühlregal',
    items: [
      { name: 'Skyr', quantity: '3 × 150 g', checked: true },
      { name: 'Körniger Frischkäse', quantity: '2 × 200 g' },
      { name: 'Käse', quantity: '120 g' },
      { name: 'Tofu natur', quantity: '200 g' },
    ],
  },
  {
    title: 'Brot',
    items: [
      { name: 'Eiweißbrot', quantity: '1 Laib' },
      { name: 'Vollkornbrot', quantity: '500 g' },
    ],
  },
];

function buildState() {
  const week = [0, 1, 2, 3, 4, 5, 6].map((i) => buildDay(i, 0));
  return {
    v: 0,
    week,
    added: 0,
    mode: { value: 'normal' },
    theme: 'system',
    contrast: false,
    birthdays: [
      {
        id: 'lena',
        name: 'Lena',
        date: dayDate(0, 3),
        age: 33,
        rel: 'Freundin',
        gift: 'Keramik-Workshop',
        amount: 65,
        status: 'bought',
      },
      {
        id: 'papa',
        name: 'Papa',
        date: rel(12),
        age: 61,
        rel: 'Familie',
        gift: 'Kochbuch',
        amount: 75,
        status: 'bought',
      },
      {
        id: 'mara',
        name: 'Mara',
        date: rel(26),
        age: 30,
        rel: 'Freundin',
        gift: 'Konzertkarten',
        amount: 90,
        status: 'idea',
        year: '1996',
        reminder: '7 Tage vorher',
      },
      { id: 'jonas', name: 'Jonas', date: rel(41), age: 35, rel: 'Kollege' },
    ],
    wishes: [
      {
        id: 'w1',
        title: 'Kamera-Objektiv 35 mm',
        meta: 'Noch nicht eingeplant',
        amount: 450,
        status: 'idea',
      },
      {
        id: 'w2',
        title: 'Laufschuhe',
        meta: `Gekauft am ${addDays(new Date(), -2).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}`,
        amount: 140,
        status: 'bought',
      },
      {
        id: 'w3',
        title: 'Kochkurs',
        meta: `Termin · ${dshort(dayDate(3, 5))}`,
        amount: 90,
        status: 'planned',
      },
    ],
    projects: [
      { id: 'p1', title: 'Fahrrad zur Inspektion', meta: 'Noch nicht eingeplant · ca. 1 h' },
      { id: 'p2', title: 'Steuererklärung 2025', meta: `Termin · ${dshort(dayDate(1, 5))}`, planned: dayDate(1, 5) },
      { id: 'p3', title: 'Fotobuch Sommer', meta: 'Noch nicht eingeplant' },
      {
        id: 'p4',
        title: 'Keller aufräumen',
        meta: `Erledigt am ${parse(rel(-4)).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' })}`,
        done: true,
      },
    ],
    archive: { projects: 2, birthdays: 1 },
    expenses: [
      {
        id: 'e1',
        d: 0,
        category: 'birthday',
        title: 'Keramik-Workshop',
        method: 'Karte',
        payee: 'für Lena',
        ref: 'lena',
        amount: 65,
      },
      { id: 'e2', d: 0, category: 'household', title: 'Frischeinkauf', method: 'Karte', amount: 38.4 },
      { id: 'e3', d: -2, category: 'training', title: 'Judo-Gürtel', method: 'Bar', amount: 12.9 },
      {
        id: 'e4',
        d: -2,
        category: 'personal',
        title: 'Laufschuhe',
        method: 'PayPal',
        payee: 'Wunsch',
        ref: 'w2',
        amount: 139.9,
      },
      {
        id: 'e5',
        d: -5,
        category: 'birthday',
        title: 'Kochbuch',
        method: 'Karte',
        payee: 'für Papa',
        ref: 'papa',
        amount: 34.9,
      },
    ],
    expenseMonths: [182, 240, 96, 310, 205],
    weights: [73.4, 73.2, 73.3, 73.0, 72.9, 73.1, 72.8, 72.7, 72.9, 72.6, 72.5, 72.7, 72.4],
    measurements: [
      { id: 'm0', d: 0, source: 'Apple Health', value: 72.4 },
      { id: 'm1', d: -1, source: 'Apple Health', value: 72.7 },
      { id: 'm2', d: -2, source: 'Eigene Messung', value: 72.6, own: true },
    ],
    plans: [
      {
        id: 'week',
        category: 'personal',
        icon: 'calendar',
        title: 'Wochenzeitplan',
        description: 'Arbeit, feste Sporttermine, Bewegungspausen',
        count: 18,
        updated: 'geändert 10.10.',
        status: 'active',
      },
      {
        id: 'train',
        category: 'training',
        title: 'Trainingsplan',
        description: 'Kraft A/B im Wechsel, Judo, Fußball',
        count: 14,
        updated: 'geändert 13.10.',
        status: 'active',
      },
      {
        id: 'food',
        category: 'food',
        title: 'Essensplan',
        description: 'Mittag A/B, Snacks, Abendessen',
        count: 21,
        status: 'active',
      },
      {
        id: 'house',
        category: 'household',
        title: 'Einkauf & Haushalt',
        description: 'Frischeinkauf Mi, Einkauf Sa, Vorkochen So',
        count: 9,
        status: 'active',
      },
      {
        id: 'finance',
        category: 'finance',
        title: 'Finanzplan',
        description: '7 Verträge, 2 Ziele',
        count: 9,
        status: 'paused',
      },
      {
        id: 'a1',
        category: 'training',
        title: 'Sommerplan Laufen',
        description: 'Juni bis August',
        count: 12,
        status: 'archived',
      },
      { id: 'a2', category: 'food', title: 'Essensplan Sommer', count: 19, status: 'archived' },
    ],
    planA: [
      { id: 'a', title: 'Kreuzheben · Langhantel', detail: '3 × 8' },
      { id: 'b', title: 'Kniebeugen · Langhantel', detail: '4 × 8' },
      { id: 'c', title: 'Rudern · einarmig', detail: '3 × 10' },
    ],
    shopping: SHOP.map((g) => ({
      title: g.title,
      items: g.items.map((x) => Object.assign({}, x)),
    })),
    training: { sets: null, feeling: 4, saved: false },
    calendarImport: { applied: false },
    imported: false,
    health: { saved: 0 },
  };
}
const WORKOUTS = {
  A: [
    ['Kreuzheben', 3, 8, '2 min', 60, 'Langhantel · zwei Vorbereitungssätze'],
    ['Kniebeugen', 4, 8, '2 min', 50, 'Langhantel'],
    ['Rudern einarmig', 3, 10, '90 s', 22.5, 'Kurzhantel · Wiederholungen je Seite', true],
    ['Schulterdrücken', 3, 10, '90 s', 14, 'Kurzhanteln, sitzend'],
    ['Klimmzüge', 4, 6, '2 min', 0, 'Körpergewicht'],
    ['Ausfallschritte', 4, 10, '90 s', 12, 'Kurzhanteln · je Seite'],
    ['Unterarmstütz', 3, '45 s', '60 s', null, 'Auf Zeit'],
  ],
  B: [
    ['Bankdrücken', 4, 10, '90 s', 42.5, 'Langhantel'],
    ['Rumänisches Kreuzheben', 3, 10, '2 min', 50, 'Langhantel'],
    ['Rudern vorgebeugt', 3, 10, '90 s', 40, 'Langhantel'],
    ['Beinpresse', 4, 12, '90 s', 90, 'Maschine'],
    ['Seitheben', 3, 12, '60 s', 6, 'Kurzhanteln'],
    ['Bizepscurls', 4, 10, '60 s', 10, 'Kurzhanteln'],
    ['Seitstütz', 3, '30 s', '60 s', null, 'Je Seite'],
  ],
};

const REPEAT_LABEL = {
  once: 'Einmalig',
  daily: 'Täglich',
  workdays: 'Werktags',
  weekly: 'Wöchentlich',
  biweekly: 'Alle zwei Wochen',
  monthly: 'Monatlich',
  yearly: 'Jährlich',
};

/* ---------- Speicher: eine Quelle, alle Screens hören mit ---------- */
/* Ausgegeben je Geschenk und Wunsch kommt aus dem Ausgabenbuch (ref) – eine Quelle, gleiche Zahl in Leben, Fortschritt, Ausgaben */
function withSpent(st) {
  const spent = (id) =>
    st.expenses.filter((e) => e.ref === id).reduce((a, e) => Math.round((a + e.amount) * 100) / 100, 0);
  return Object.assign({}, st, {
    birthdays: st.birthdays.map((b) => (b.amount != null ? Object.assign({}, b, { spent: spent(b.id) }) : b)),
    wishes: st.wishes.map((w) => Object.assign({}, w, { spent: spent(w.id) })),
  });
}
/* Ganztägig je Tag: Geburtstage aus Leben (Monat und Tag) und ganztägige Quests – Kalender, Woche, Monat, Heute lesen dasselbe */
function allDaysFor(st, d) {
  const md = d.date.slice(5);
  return st.birthdays
    .filter((b) => b.date && b.date.slice(5) === md)
    .map((b) => ({ title: `${b.name} hat Geburtstag`, category: 'birthday', birthday: b.id }))
    .concat(d.quests.filter((q) => q.allDay).map((q) => ({ title: q.title, category: q.category, questId: q.id })));
}
function derive(st) {
  const x = withSpent(st);
  return Object.assign(x, {
    week: x.week.map((d) => {
      const all = allDaysFor(x, d);
      return Object.assign({}, d, { allDays: all, allDay: all[0] || null });
    }),
  });
}
let STATE = derive(buildState());

let SUBS = [];
function getState() {
  return STATE;
}
function setState(fn) {
  STATE = derive(Object.assign({}, STATE, fn(STATE), { v: STATE.v + 1 }));
  SUBS.slice().forEach((f) => {
    f();
  });
}
function subscribe(f) {
  SUBS.push(f);
  return () => {
    SUBS = SUBS.filter((x) => x !== f);
  };
}
function useQuesti() {
  const t = useState(0);
  useEffect(
    () =>
      subscribe(() => {
        t[1]((x) => x + 1);
      }),
    [],
  );
  return STATE;
}
/* ---------- Abgeleitete Werte: jede Summe nur hier ---------- */
function qDone(q) {
  return q.steps ? q.stepsDone >= q.steps : q.done;
}
function dayStats(d) {
  const done = d.quests.filter(qDone).length;
  return { done, total: d.quests.length, open: d.quests.length - done };
}
function dayCats(d) {
  const c = {};
  const order = [];
  d.quests.forEach((q) => {
    if (!c[q.category]) {
      c[q.category] = 0;
      order.push(q.category);
    }
    c[q.category]++;
  });
  return order.map((k) => [k, c[k]]);
}
function dayEvents(d) {
  const out = (d.allDays || (d.allDay ? [d.allDay] : [])).map((a) =>
    Object.assign({ allDay: true }, a, {
      done: a.questId ? qDone(d.quests.filter((q) => q.id === a.questId)[0] || {}) : false,
    }),
  );
  d.extra.forEach((e) => {
    out.push(
      Object.assign(
        { done: !e.context && (d.date < iso(new Date()) || (d.date === iso(new Date()) && hmn(e.end) <= NOW_H)) },
        e,
        { subtitle: e.context ? 'Kalenderblock' : e.subtitle },
      ),
    );
  });
  d.quests.forEach((q) => {
    if (q.time && !q.allDay)
      out.push({
        start: q.time,
        end: q.end,
        title: q.title.replace(/ (trainieren|erledigen|spielen)$/, ''),
        category: q.category,
        done: qDone(q),
        questId: q.id,
      });
  });
  return out.sort((a, b) => (a.allDay ? -1 : b.allDay ? 1 : hmn(a.start) - hmn(b.start)));
}
function weekEvents(s) {
  const out = [];
  s.week.forEach((d) => {
    dayEvents(d).forEach((e) => {
      out.push(Object.assign({ date: d.date }, e));
    });
  });
  return out;
}
function weekDays(s) {
  return s.week.map((d) => {
    const st = dayStats(d);
    return {
      date: d.date,
      done: st.done,
      total: st.total,
      highlight: d.hl,
      cats: dayCats(d)
        .filter((c) => c[0] !== 'food')
        .concat([
          [
            'food',
            dayCats(d)
              .filter((c) => c[0] === 'food')
              .reduce((a, c) => a + c[1], 0),
          ],
        ])
        .filter((c) => c[1]),
    };
  });
}
function stripEvents(s) {
  const ev = {};
  s.week.forEach((d) => {
    const st = dayStats(d);
    ev[d.date] = {
      done: st.done,
      total: st.total,
      cats: dayCats(d).map((c) => c[0]),
    };
  });
  return ev;
}
function monthEvents(s, month) {
  const NOW = new Date();
  const M = month ? parse(month) : NOW;
  const EV = {};
  const first = new Date(M.getFullYear(), M.getMonth(), 1);
  const n = new Date(M.getFullYear(), M.getMonth() + 1, 0).getDate();
  const today = iso(NOW);
  const weekStart = s.week[0].date;
  const weekEnd = s.week[6].date;
  for (let k = -7; k < n + 7; k++) {
    const dt = addDays(first, k);
    const key = iso(dt);
    if (key >= weekStart && key <= weekEnd) continue;
    const day = buildDay((dt.getDay() + 6) % 7, Math.round((U.weekStartOf(dt, 1) - U.weekStartOf(NOW, 1)) / 6048e5));
    const st = dayStats(day);
    EV[key] = {
      cats: dayCats(day)
        .map((c) => c[0])
        .filter((c) => c !== 'food'),
      total: st.total,
      done: key < today ? st.done : 0,
    };
    /* Geburtstage aus Leben auch außerhalb der laufenden Woche */
    const b = s.birthdays.filter((x) => x.date && x.date.slice(5) === key.slice(5))[0];
    if (b) Object.assign(EV[key], { milestone: 'birthday', preview: b.name, tone: 'birthday' });
  }
  s.week.forEach((d) => {
    const st = dayStats(d);
    EV[d.date] = {
      cats: dayCats(d)
        .map((c) => c[0])
        .filter((c) => c !== 'food'),
      total: st.total,
      done: st.done,
    };
    if (d.allDay) {
      EV[d.date].milestone = d.allDay.category;
      EV[d.date].preview = d.allDay.title.split(' ')[0];
      EV[d.date].tone = d.allDay.category;
    }
  });
  const fr = s.week[4];
  if (fr && !EV[fr.date].preview) EV[fr.date].preview = 'Fußball';
  const due = iso(addDays(NOW, 9));
  if (EV[due]) {
    EV[due].milestone = 'finance';
    EV[due].preview = 'Kündigen';
    EV[due].tone = 'finance';
  }
  return EV;
}
function weekTotals(s) {
  const ti = todayIndex();
  let total = 0;
  let done = 0;
  let due = 0;
  let dueDone = 0;
  const by = {};
  s.week.forEach((d, i) => {
    const st = dayStats(d);
    total += st.total;
    done += st.done;
    if (i < ti) {
      due += st.total;
      dueDone += st.done;
    }
    d.quests.forEach((q) => {
      const b = by[q.category] || (by[q.category] = { total: 0, done: 0 });
      b.total++;
      if (qDone(q)) b.done++;
    });
  });
  return { total, done, rate: due ? Math.round((dueDone / due) * 100) : 100, by };
}
function today(s) {
  return s.week[todayIndex()];
}
function findQuest(s, id) {
  for (let i = 0; i < s.week.length; i++)
    for (let j = 0; j < s.week[i].quests.length; j++) if (s.week[i].quests[j].id === id) return s.week[i].quests[j];
  return null;
}
function nextQuest(s, pred) {
  const ti = todayIndex();
  for (let i = ti; i < 7; i++) {
    const q = s.week[i].quests.filter(pred)[0];
    if (q) return q;
  }
  return null;
}
function shopStats(s) {
  const all = [].concat.apply(
    [],
    s.shopping.map((g) => g.items),
  );
  const n = all.filter((x) => x.checked).length;
  return { done: n, total: all.length };
}
/* Gewichte, die im Training geändert wurden – gelten für Anzeige, Last und Abschluss */
let WEIGHTS = {};
function workout(q) {
  const w = WORKOUTS[(q && q.workout) || 'A'];
  return w.map((e, i) => ({
    index: i + 1,
    name: e[0],
    sets: e[1],
    reps: e[2],
    rest: e[3],
    weight: WEIGHTS[e[0]] != null ? WEIGHTS[e[0]] : e[4],
    note: e[5],
    planned: !!e[6],
  }));
}
function trainingSets(s, q) {
  const ex = workout(q);
  return s.training.sets || ex.map((e) => Array.from({ length: e.sets }, () => false));
}
function trainingStats(s, q, override) {
  const ex = workout(q);
  const sets = override || trainingSets(s, q);
  let done = 0;
  let total = 0;
  let load = 0;
  ex.forEach((e, i) => {
    (sets[i] || []).forEach((v) => {
      total++;
      if (v) {
        done++;
        if (typeof e.reps === 'number' && e.weight) load += e.reps * e.weight;
      }
    });
  });
  return {
    done,
    total,
    load,
    exercisesDone: ex.filter((e, i) => (sets[i] || []).every(Boolean)).length,
    exercises: ex.length,
  };
}
function streak(s) {
  const NOW = new Date();
  const hist = [];
  for (let k = 14; k >= 1; k--) {
    const dt = addDays(NOW, -k);
    const key = iso(dt);
    const wd = (dt.getDay() + 6) % 7;
    const inWeek = s.week.filter((x) => x.date === key)[0];
    const day = inWeek || buildDay(wd, Math.round((U.weekStartOf(dt, 1) - U.weekStartOf(NOW, 1)) / 6048e5));
    const st = dayStats(day);
    hist.push(s.mode.value !== 'normal' && s.mode.from && key >= s.mode.from ? 'pause' : st.done >= st.total);
  }
  let n = 0;
  for (let i = hist.length - 1; i >= 0 && hist[i] !== false; i--) if (hist[i] === true) n++;
  return { days: n, history: hist };
}
function lifeCounts(s) {
  return {
    birthdays: s.birthdays.length,
    projects: s.projects.filter((props) => !props.done).length,
    projectsDone: s.projects.filter((props) => props.done).length,
    wishes: s.wishes.length,
  };
}
function plansInUse(s) {
  const a = s.plans.filter(({ status }) => status === 'active').length;
  const pz = s.plans.filter(({ status }) => status === 'paused').length;
  const ar = s.plans.filter(({ status }) => status === 'archived').length;
  return { active: a, paused: pz, archived: ar, inUse: a + pz };
}
function expenseSum(s) {
  return s.expenses.reduce((a, e) => a + e.amount, 0);
}
/* ---------- Handlungen: jede ändert den einen Stand ---------- */
function mapQuest(s, id, fn) {
  return {
    week: s.week.map((d) =>
      d.quests.some((q) => q.id === id)
        ? Object.assign({}, d, {
            quests: d.quests.map((q) => (q.id === id ? Object.assign({}, q, fn(q)) : q)),
          })
        : d,
    ),
  };
}
const act = {
  toggle: (id, v) => {
    setState((s) =>
      mapQuest(s, id, (q) => {
        const on = v == null ? !qDone(q) : v;
        return q.steps
          ? {
              stepsDone: on ? q.steps : 0,
              stepsState: Array.from({ length: q.steps }, () => on),
              done: on,
              missed: false,
            }
          : { done: on, missed: false };
      }),
    );
  },
  /* Quest auf einen anderen Tag oder eine andere Zeit legen; die Dauer bleibt */
  moveQuest: (id, date, time) => {
    setState((s) => {
      const q = s.week.flatMap((d) => d.quests).filter((x) => x.id === id)[0];
      if (!q) return {};
      const len = q.time && q.end ? hmn(q.end) - hmn(q.time) : 0;
      const clock = (h) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;
      const moved = Object.assign({}, q, {
        id: q.id.replace(/^[^:]+/, date),
        date,
        time: time || q.time,
        end: time && len ? clock(hmn(time) + len) : q.end,
        slot: time ? hmn(time) : q.slot,
      });
      return {
        week: s.week.map((d) => {
          const rest = d.quests.filter((x) => x.id !== id);
          return d.date === date
            ? Object.assign({}, d, { quests: rest.concat([moved]).sort((a, b) => a.slot - b.slot) })
            : rest.length !== d.quests.length
              ? Object.assign({}, d, { quests: rest })
              : d;
        }),
      };
    });
  },
  setPlanStatus: (id, status) => {
    setState((s) => ({ plans: s.plans.map((p) => (p.id === id ? Object.assign({}, p, { status }) : p)) }));
  },
  setWeight: (name, v) => {
    WEIGHTS = Object.assign({}, WEIGHTS, { [name]: v });
    setState((s) => ({ training: Object.assign({}, s.training, { weights: WEIGHTS }) }));
  },
  setSteps: (id, arr) => {
    setState((s) =>
      mapQuest(s, id, (q) => {
        const n = arr.filter(Boolean).length;
        return { stepsDone: n, stepsState: arr.slice(), done: n >= q.steps };
      }),
    );
  },
  /* Eigene Quest: Schritte, Notiz, ganztägig, Erinnerung; die Wiederholung legt sie an jedem passenden Tag ab dem Datum an
     (die Vorschau kennt die laufende Woche; monatlich und jährlich treffen hier nur das Datum selbst) */
  addQuest: (q) => {
    setState((s) => {
      const n = s.added + 1;
      const from = s.week.findIndex((d) => d.date === q.date);
      const hits = (i) =>
        i === from ||
        (i > from &&
          (q.repeat === 'daily' ||
            (q.repeat === 'workdays' && i < 5) ||
            ((q.repeat === 'weekly' || q.repeat === 'biweekly') && (q.days || []).includes(i))));
      const steps = (q.steps || []).filter((x) => x && x.trim());
      const item = (d) => ({
        id: `${d.date}:neu${n}`,
        k: `neu${n}`,
        date: d.date,
        category: q.category || 'personal',
        title: q.title,
        description:
          q.note || (q.repeat && q.repeat !== 'once' ? REPEAT_LABEL[q.repeat] || 'Wiederkehrend' : 'Eigene Quest'),
        note: q.note || undefined,
        time: q.allDay ? undefined : q.time || undefined,
        end: q.allDay ? undefined : q.end || undefined,
        allDay: !!q.allDay,
        slot: q.allDay ? -1 : q.time ? hmn(q.time) : 23,
        steps: steps.length || undefined,
        stepItems: steps.length ? steps : undefined,
        stepsState: steps.length ? steps.map(() => false) : undefined,
        repeat: q.repeat || 'once',
        days: q.days,
        reminder: q.reminder,
        done: false,
        stepsDone: 0,
        own: true,
      });
      return {
        added: n,
        week: s.week.map((d, i) =>
          (from < 0 ? i === 0 : hits(i))
            ? Object.assign({}, d, { quests: d.quests.concat([item(d)]).sort((a, b) => a.slot - b.slot) })
            : d,
        ),
      };
    });
  },
  shop: (gi, ii, v) => {
    setState((s) => ({
      shopping: s.shopping.map((g, a) =>
        a !== gi
          ? g
          : {
              title: g.title,
              items: g.items.map((x, b) => (b === ii ? Object.assign({}, x, { checked: v }) : x)),
            },
      ),
    }));
  },
  shopAll: (qid) => {
    setState((s) => {
      const r = mapQuest(s, qid, () => ({
        done: true,
      }));
      r.shopping = s.shopping.map((g) => ({
        title: g.title,
        items: g.items.map((x) => Object.assign({}, x, { checked: true })),
      }));
      return r;
    });
  },
  setSets: (sets) => {
    setState(() => ({
      training: Object.assign({}, STATE.training, { sets }),
    }));
  },
  feeling: (v) => {
    setState((s) => ({
      training: Object.assign({}, s.training, { feeling: v }),
    }));
  },
  saveTraining: (qid) => {
    setState((s) => {
      const r = mapQuest(s, qid, () => ({
        done: true,
      }));
      r.training = Object.assign({}, s.training, { saved: true });
      return r;
    });
  },
  savePlan: (items) => {
    setState((s) => ({
      planA: items,
      plans: s.plans.map((props) =>
        props.id === 'train' ? Object.assign({}, props, { updated: 'geändert heute' }) : props,
      ),
    }));
  },
  addExpense: (e) => {
    setState((s) => ({
      expenses: [Object.assign({ id: `e${s.expenses.length + 1}`, d: 0 }, e)].concat(s.expenses),
    }));
  },
  removeExpense: (id) => {
    setState((s) => ({
      expenses: s.expenses.filter((e) => e.id !== id),
      removed: s.expenses.filter((e) => e.id === id)[0],
    }));
  },
  restoreExpense: () => {
    setState((s) => (s.removed ? { expenses: [s.removed].concat(s.expenses), removed: null } : {}));
  },
  saveBirthday: (b) => {
    setState((s) => {
      const has = s.birthdays.some((x) => x.id === b.id);
      return {
        birthdays: (has
          ? s.birthdays.map((x) => (x.id === b.id ? Object.assign({}, x, b) : x))
          : s.birthdays.concat([b])
        ).sort((a, c) => (a.date < c.date ? -1 : 1)),
      };
    });
  },
  addLifeItem: (list, item) => {
    setState((s) => {
      const o = {};
      o[list] = s[list].concat([Object.assign({ id: `${list[0]}${Date.now()}` }, item)]);
      return o;
    });
  },
  setStatus: (list, id, v) => {
    setState((s) => {
      const o = {};
      o[list] = s[list].map((x) => (x.id === id ? Object.assign({}, x, { status: v }) : x));
      return o;
    });
  },
  addMeasurement: (v) => {
    setState((s) => ({
      measurements: [
        { id: `m${s.measurements.length + 1}`, d: 0, source: 'Eigene Messung', value: v, own: true },
      ].concat(s.measurements),

      weights: s.weights.slice(0, -1).concat([v]),
    }));
  },
  importPlan: () => {
    setState((s) =>
      s.imported
        ? {}
        : {
            imported: true,
            plans: s.plans.slice(0, 5).concat(
              [
                {
                  id: 'herbst',
                  category: 'food',
                  title: 'Essensplan Herbst',
                  description: `Gilt ab ${dshort(nextMonday())} · 13 Bausteine`,
                  count: 13,
                  updated: 'neu heute',
                  status: 'active',
                },
              ],
              s.plans.slice(5),
            ),
          },
    );
  },
  applyCalendar: () => {
    setState((s) => {
      if (s.calendarImport.applied) return {};
      return {
        calendarImport: { applied: true },
        week: s.week.map((d, i) =>
          i === 3
            ? Object.assign({}, d, {
                extra: d.extra.concat([
                  { start: '09:00', end: '10:00', title: 'Teammeeting', category: 'work', context: true },
                ]),
              })
            : i === 4
              ? Object.assign({}, d, {
                  extra: d.extra.map((e) => (e.title === 'Arbeit' ? Object.assign({}, e, { start: '07:30' }) : e)),
                })
              : d,
        ),
      };
    });
  },
  setMode: (m) => {
    setState(() => ({
      mode: m,
    }));
  },
  setTheme: (t) => {
    setState(() => ({
      theme: t,
    }));
  },
  setContrast: (v) => {
    setState(() => ({
      contrast: v,
    }));
  },
  reset: () => {
    WEIGHTS = {};
    STATE = derive(buildState());
    SUBS.slice().forEach((f) => {
      f();
    });
  },
};
const demo = {
  get: getState,
  use: useQuesti,
  subscribe,
  act,
  NOW_H,
  todayIndex,
  select: {
    dayStats,
    dayCats,
    dayEvents,
    weekEvents,
    weekDays,
    stripEvents,
    monthEvents,
    weekTotals,
    today,
    findQuest,
    nextQuest,
    shopStats,
    workout,
    trainingStats,
    streak,
    nextMonday,
    dshort,
    lifeCounts,
    plansInUse,
    expenseSum,
    qDone,
  },
};

export { REPEAT_LABEL, demo, WD_LONG, hmn, setState };

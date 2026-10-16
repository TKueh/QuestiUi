/* Erkennung für „Ein Satz genügt“: liest aus einer deutschen Zeile Tag, Uhrzeit, ganztägig, Rhythmus und Bereich.
   Was erkannt ist, verschwindet aus dem Titel; ignore (Set der Arten) lässt eine verworfene Erkennung im Text stehen.
   Reine Funktion ohne React – die Sheets zeigen das Ergebnis als Zellen (Nordhaus TokenField). */

const WD = ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag', 'sonntag'];
const WD2 = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'];
const DAY = `(?:${WD.join('|')}|${WD2.join('|')})`;
const dayIndex = (w) => {
  const k = w.toLowerCase().replace(/s$/, '');
  const i = WD.indexOf(k);
  return i >= 0 ? i : WD2.indexOf(k.slice(0, 2));
};
/* Bereich aus Wörtern – die Schlüssel sind die Bereiche der App (categories.js) */
const AREA = [
  ['training', /(?:^|[\s-])(judo|kraft|training|trainieren|fußball|fussball|gym|laufen|joggen|schwimmen|yoga|sport)/i],
  ['birthday', /(?:^|[\s-])(geburtstag|geschenk)/i],
  [
    'household',
    /(?:^|[\s-])(einkauf|einkaufen|putzen|aufräumen|wäsche|staubsaugen|müll|haushalt|spülmaschine|keller)/i,
  ],
  ['food', /(?:^|[\s-])(essen|kochen|vorkochen|mittag|frühstück|abendessen|snack|rezept|auftauen)/i],
  ['finance', /(?:^|[\s-])(rechnung|überweis|steuer|versicherung|kündig|bezahlen|zahlen|vertrag|bank)/i],
  ['movement', /(?:^|[\s-])(spazier|bewegung|dehnen|radfahren|rad\b|wandern)/i],
  ['work', /(?:^|[\s-])(arbeit|meeting|büro|präsentation|kunde|projekt)/i],
];
const pad = (n) => String(n).padStart(2, '0');
const clock = (h, m) => `${pad(Math.min(23, +h))}:${pad(m ? +m : 0)}`;
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (s, n) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const wdOf = (s) => (new Date(`${s}T12:00:00`).getDay() + 6) % 7;

function parseQuest(text, today, ignore) {
  const skip = ignore || new Set();
  let t = ` ${text || ''} `;
  const out = { hits: {} };
  const take = (kind, re, fn) => {
    if (skip.has(kind)) return false;
    const m = re.exec(t);
    if (!m) return false;
    fn(m);
    t = t.slice(0, m.index) + ' ' + t.slice(m.index + m[0].length);
    out.hits[kind] = true;
    return true;
  };
  // Rhythmus zuerst – „jeden Di“ ist kein Datum
  take('repeat', /\s(?:jeden\s+tag|täglich)(?=\s)/i, () => (out.repeat = 'daily')) ||
    take('repeat', /\s(?:werktags|unter\s+der\s+woche)(?=\s)/i, () => (out.repeat = 'workdays')) ||
    take('repeat', /\s(?:monatlich|jeden\s+monat)(?=\s)/i, () => (out.repeat = 'monthly')) ||
    take('repeat', /\s(?:jährlich|jedes\s+jahr)(?=\s)/i, () => (out.repeat = 'yearly')) ||
    take(
      'repeat',
      new RegExp(`\\s(alle\\s+(?:zwei|2)\\s+wochen|jede[ns]?)\\s+(${DAY}(?:\\s*(?:,|und|&)\\s*${DAY})*)(?=\\s)`, 'i'),
      (m) => {
        out.repeat = /alle/i.test(m[1]) ? 'biweekly' : 'weekly';
        out.days = m[2].split(/\s*(?:,|und|&)\s*/).map(dayIndex);
      },
    ) ||
    take(
      'repeat',
      new RegExp(`\\s((?:${WD.join('|')})s(?:\\s*(?:,|und)\\s*(?:${WD.join('|')})s)*)(?=\\s)`, 'i'),
      (m) => {
        out.repeat = 'weekly';
        out.days = m[1].split(/\s*(?:,|und)\s*/).map(dayIndex);
      },
    ) ||
    take('repeat', /\s(?:alle\s+(?:zwei|2)\s+wochen|14-tägig)(?=\s)/i, () => (out.repeat = 'biweekly')) ||
    take('repeat', /\s(?:wöchentlich|jede\s+woche)(?=\s)/i, () => (out.repeat = 'weekly'));
  // Tag
  take('date', /\s(heute|übermorgen|morgen)(?=\s)/i, (m) => {
    const w = m[1].toLowerCase();
    out.date = addDays(today, w === 'heute' ? 0 : w === 'morgen' ? 1 : 2);
  }) ||
    take('date', /\s(?:am\s+)?(\d{1,2})\.(\d{1,2})\.(?:\d{2,4})?(?=\s)/, (m) => {
      const y = +today.slice(0, 4);
      let d = `${y}-${pad(m[2])}-${pad(m[1])}`;
      if (d < today) d = `${y + 1}-${pad(m[2])}-${pad(m[1])}`;
      out.date = d;
    }) ||
    take('date', new RegExp(`\\s(?:am\\s+|nächsten\\s+|kommenden\\s+)?(${DAY})(?=\\s)`, 'i'), (m) => {
      const want = dayIndex(m[1]);
      out.date = addDays(today, (want - wdOf(today) + 7) % 7);
    });
  // Zeit
  take('allDay', /\s(?:ganztägig|ganztags|den\s+ganzen\s+tag)(?=\s)/i, () => (out.allDay = true)) ||
    take(
      'time',
      /\s(?:von\s+)?(\d{1,2})(?:[:.](\d{2}))?\s*(?:–|-|bis)\s*(\d{1,2})(?:[:.](\d{2}))?(?:\s*uhr)?(?=\s)/i,
      (m) => {
        out.time = clock(m[1], m[2]);
        out.end = clock(m[3], m[4]);
      },
    ) ||
    take('time', /\s(?:um\s+|ab\s+)?(\d{1,2})[:.](\d{2})(?:\s*uhr)?(?=\s)/i, (m) => (out.time = clock(m[1], m[2]))) ||
    take('time', /\s(?:um\s+|ab\s+)?(\d{1,2})\s*uhr(?=\s)/i, (m) => (out.time = clock(m[1], 0)));
  // Rhythmus ohne eigene Tage: der Wochentag des Datums
  if ((out.repeat === 'weekly' || out.repeat === 'biweekly') && !out.days) out.days = [wdOf(out.date || today)];
  // Titel: Rest ohne Füllwörter am Ende
  let title = t.replace(/\s+/g, ' ').trim();
  for (let k = 0; k < 3; k++) title = title.replace(/(?:^|\s)(?:am|um|ab|von|bis|und|jeden|,)$/i, '').trim();
  out.title = title;
  if (!skip.has('category')) {
    const a = AREA.find(([, re]) => re.test(title));
    if (a) {
      out.category = a[0];
      out.hits.category = true;
    }
  }
  return out;
}

export { parseQuest, addDays, wdOf };

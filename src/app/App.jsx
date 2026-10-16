import React, { useRef, useState } from 'react';
import N, { Button, SegmentedControl } from 'nordhaus-ui/src/bare.js';
import { DEVICES, Phone, deviceFromQuery } from '../components/Phone/Phone.jsx';
import { ExpenseSheet, HealthPage, MeasurementSheet, StatsBody } from './fortschritt.jsx';
import {
  MealSheet,
  NewQuestSheet,
  QuestDetailSheet,
  SearchSheet,
  ShoppingSheet,
  TodayBody,
  TrainingDoneSheet,
  TrainingSheet,
} from './heute.jsx';
import { CalListBody, CalMonthBody, CalWeekBody, TerminSheet } from './kalender.jsx';
import { EntrySheet, ItemSheet, LifeBody } from './leben.jsx';
import {
  CalImportSheet,
  DayModeSheet,
  FinancePage,
  MehrBody,
  PlanEditorPage,
  PlanImportSheet,
  PlansPage,
  SettingsPage,
  diffCount,
} from './mehr.jsx';
import { FoldCtx, NavCtx, S, TABS } from './shared.jsx';
import { demo } from '../data/demo.js';

/* ================= Die App: ein Ablauf aus allen Screens =================
   Navigation wie auf dem iPhone: fünf Tabs mit eigenem Verlauf, Register je Tab, Unterseiten (Mehr), Sheets und Dialoge darüber.
   Jede Screen-Karte startet diese App an ihrer Stelle (start); von dort ist alles weiter bedienbar. */

function first(arr, pred) {
  for (let i = 0; i < arr.length; i++) if (pred(arr[i])) return arr[i];
  return null;
}
function todayPick(s, pred) {
  return (
    first(S.today(s).quests, pred) ||
    first(
      [].concat.apply(
        [],
        s.week.map((d) => d.quests),
      ),
      pred,
    )
  );
}
const EDITED = (s) => [
  s.planA[1],
  s.planA[0],
  { id: 'c', title: 'Rudern · einarmig', detail: '4 × 10' },
  { id: 'd', title: 'Klimmzüge · Körpergewicht', detail: '4 × 6' },
];
/* Start je Screen-Karte – Name der Karte → Tab, Register, Unterseiten, Sheet, Dialog */
const ROUTES = {
  HeuteScreen: { tab: 'today' },
  QuestDetailScreen: {
    tab: 'today',
    sheet: (s) => {
      const q = todayPick(s, (x) => x.steps) || S.today(s).quests[0];
      return ['questDetail', { id: q.id }];
    },
  },
  MahlzeitScreen: {
    tab: 'today',
    sheet: (s) => {
      return [
        'meal',
        {
          id: (todayPick(s, (x) => x.meal) || {}).id,
        },
      ];
    },
  },
  EinkaufScreen: {
    tab: 'today',
    sheet: (s) => {
      return [
        'shopping',
        {
          id: (S.nextQuest(s, (x) => x.shopping) || todayPick(s, (x) => x.shopping) || {}).id,
        },
      ];
    },
  },
  TrainingScreen: {
    tab: 'today',
    sheet: (s) => {
      return [
        'training',
        {
          id: (S.nextQuest(s, (x) => !!x.workout) || todayPick(s, (x) => !!x.workout) || {}).id,
          preset: true,
        },
      ];
    },
  },
  TrainingAbschlussScreen: {
    tab: 'today',
    sheet: (s) => {
      return [
        'trainingDone',
        {
          id: (S.nextQuest(s, (x) => !!x.workout) || todayPick(s, (x) => !!x.workout) || {}).id,
          preset: true,
        },
      ];
    },
  },
  NeueQuestScreen: { tab: 'today', sheet: ['newQuest', {}] },
  NeueQuestFehlerScreen: { tab: 'today', sheet: ['newQuest', { invalid: true }] },
  KalenderScreen: { tab: 'cal', view: 'list' },
  KalenderWocheScreen: { tab: 'cal', view: 'week' },
  KalenderMonatScreen: { tab: 'cal', view: 'month' },
  TerminScreen: {
    tab: 'cal',
    view: 'week',
    sheet: (s) => {
      const d = S.today(s);

      const e = first(S.dayEvents(d).slice().reverse(), (x) => x.questId) || S.dayEvents(d)[0];

      return ['termin', { date: d.date, title: e && e.title }];
    },
  },
  LebenScreen: { tab: 'life', view: 'b' },
  LebenBacklogScreen: { tab: 'life', view: 'l' },
  LebenWuenscheScreen: { tab: 'life', view: 'w' },
  EintragScreen: { tab: 'life', view: 'b', sheet: ['entry', { id: 'mara' }] },
  FortschrittScreen: { tab: 'stats', view: 'a' },
  HealthScreen: { tab: 'more', stack: ['health'] },
  GeschenkeWuenscheScreen: { tab: 'stats', view: 'p' },
  AusgabenScreen: { tab: 'stats', view: 's' },
  AusgabeScreen: { tab: 'stats', view: 's', sheet: ['expense', { showErrors: true }] },
  MehrScreen: { tab: 'more' },
  DeinTagScreen: { tab: 'more', sheet: ['dayMode', {}] },
  KalenderAbgleichScreen: { tab: 'more', sheet: ['calImport', {}] },
  MessungScreen: { tab: 'more', stack: ['health'], sheet: ['measurement', {}] },
  PlaeneScreen: { tab: 'more', stack: ['plans'] },
  PlanEditorScreen: { tab: 'more', stack: ['plans', 'editor'] },
  UngesichertScreen: {
    tab: 'more',
    stack: ['plans', 'editor'],
    editor: (s) => {
      return { items: EDITED(s) };
    },
    dialog: 'unsaved',
  },
  SpeicherfehlerScreen: {
    tab: 'more',
    stack: ['plans', 'editor'],
    editor: (s) => {
      return { items: EDITED(s), error: true };
    },
  },
  PlanImportScreen: { tab: 'more', stack: ['plans'], sheet: ['planImport', {}] },
  FinanzplanScreen: { tab: 'more', stack: ['plans', 'finance'] },
  EinstellungenScreen: { tab: 'more', stack: ['settings'] },
};
const SHEETS = {
  questDetail: QuestDetailSheet,
  meal: MealSheet,
  shopping: ShoppingSheet,
  training: TrainingSheet,
  trainingDone: TrainingDoneSheet,
  newQuest: NewQuestSheet,
  search: SearchSheet,
  termin: TerminSheet,
  entry: EntrySheet,
  item: ItemSheet,
  measurement: MeasurementSheet,
  expense: ExpenseSheet,
  dayMode: DayModeSheet,
  calImport: CalImportSheet,
  planImport: PlanImportSheet,
};
const PAGES = { health: HealthPage, plans: PlansPage, finance: FinancePage, settings: SettingsPage };
function initRoute(def, s) {
  const sh = typeof def.sheet === 'function' ? def.sheet(s) : def.sheet;
  const views = { cal: 'list', life: 'b', stats: 'a' };
  if (def.view) views[def.tab] = def.view;
  return {
    tab: def.tab,
    views,
    stack: def.stack ? def.stack.slice() : [],
    sheet: sh ? { name: sh[0], params: sh[1] || {} } : null,
    dialog: def.dialog || null,
    extra: {},
  };
}
/* ein Satz für dasselbe Sichern – Leiste, Dialog, Editor */
const planSaved = () => `Trainingsplan gesichert – gilt ab ${S.dshort(S.nextMonday())}.`;
function App(props) {
  const s = demo.use();
  const def = ROUTES[props.start] || ROUTES.HeuteScreen;
  const r = useState(() => initRoute(def, demo.get()));
  const route = r[0];
  const ed = useState(() => (def.editor ? def.editor(demo.get()) : { items: null }));
  const toast = useState(null);
  const scrollRef = useRef(null);
  const toastKey = useRef(0);
  function set(patch) {
    r[1]((x) => Object.assign({}, x, typeof patch === 'function' ? patch(x) : patch));
  }
  const nav = {
    route: { view: route.views[route.tab], day: route.extra.day, filter: route.extra.filter },
    go: (page) => {
      set((x) => ({
        stack: x.stack.concat([page]),
        sheet: null,
      }));
    },
    back: () => {
      set((x) => ({
        stack: x.stack.slice(0, -1),
        dialog: null,
      }));
    },
    open: (name, params) => {
      set({ sheet: { name, params: params || {} } });
    },
    close: () => {
      set({ sheet: null });
    },
    tab: (id, o = {}) => {
      set((x) => {
        const v = Object.assign({}, x.views);
        if (o.view) v[id] = o.view;
        if (id === 'cal' && o.day && !o.view) v.cal = 'list';
        return {
          tab: id,
          views: v,
          stack: o.stack ? o.stack : id === x.tab ? [] : id === 'more' ? x.stack : [],
          sheet: null,
          dialog: null,
          extra: { day: o.day },
        };
      });
    },
    view: (tabId, v, o) => {
      set((x) => {
        const vs = Object.assign({}, x.views);
        vs[tabId] = v;
        return { views: vs, extra: Object.assign({}, x.extra, o || {}) };
      });
    },
    toast: (t) => {
      toastKey.current++;
      toast[1](Object.assign({ key: toastKey.current }, t));
    },
    dialog: (name) => {
      set({ dialog: name });
    },
  };
  const top = route.tab === 'more' ? route.stack[route.stack.length - 1] : null;
  let body;
  let footer = null;
  let flex = false;
  if (route.tab === 'today') body = <TodayBody />;
  else if (route.tab === 'cal') {
    const v = route.views.cal;
    body = v === 'week' ? <CalWeekBody /> : v === 'month' ? <CalMonthBody /> : <CalListBody />;
    flex = v === 'week';
  } else if (route.tab === 'life') body = <LifeBody />;
  else if (route.tab === 'stats') body = <StatsBody />;
  else if (top === 'editor') {
    const changes = ed[0].items ? diffCount(s.planA, ed[0].items) : 0;
    body = <PlanEditorPage editor={ed[0]} setEditor={ed[1]} />;
    footer = (
      <N.ActionBar
        status={changes ? changes + (changes === 1 ? ' Änderung' : ' Änderungen') : 'Keine Änderungen'}
        className="nh-actionbar--screen"
      >
        <Button
          variant="secondary"
          disabled={!changes}
          onClick={() => {
            ed[1]({ items: null });
          }}
        >
          Verwerfen
        </Button>
        <Button
          variant="accent"
          disabled={!changes}
          onClick={() => {
            demo.act.savePlan(ed[0].items);
            ed[1]({ items: null });
            nav.toast({ tone: 'success', message: planSaved() });
          }}
        >
          {ed[0].error ? 'Erneut versuchen' : 'Sichern'}
        </Button>
      </N.ActionBar>
    );
  } else if (top && PAGES[top]) body = React.createElement(PAGES[top]);
  else body = <MehrBody />;
  const Sheet = route.sheet && SHEETS[route.sheet.name];
  const theme =
    s.theme === 'system'
      ? s.contrast
        ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark-hc'
          : 'light-hc'
        : props.theme
      : s.theme + (s.contrast ? '-hc' : '');
  const scrollKey = `${route.tab}/${route.views[route.tab] || ''}/${route.stack.join('/')}`;
  // Unterseite: vom linken Rand zurückziehen (Touch) – wie die Zurück-Taste; der Editor fragt bei Änderungen
  const edDirty = top === 'editor' && !!ed[0].items && diffCount(s.planA, ed[0].items) > 0;
  const back = top ? (edDirty ? () => nav.dialog('unsaved') : nav.back) : undefined;
  // darunter die vorige Seite des Stapels (inert, nur zu sehen, solange gezogen wird)
  const prev = top ? route.stack[route.stack.length - 2] : undefined;
  const behind = top ? (
    <div className="qs-screen-scroll">
      <FoldCtx.Provider value={null}>
        {prev === 'editor' ? (
          <PlanEditorPage editor={ed[0]} setEditor={ed[1]} />
        ) : prev && PAGES[prev] ? (
          React.createElement(PAGES[prev])
        ) : (
          <MehrBody />
        )}
      </FoldCtx.Provider>
    </div>
  ) : null;
  return (
    <Phone device={props.device} theme={theme} className="qs-app">
      <NavCtx.Provider value={nav}>
        <FoldCtx.Provider value={scrollRef}>
          <N.SwipeBack key={scrollKey} onBack={back} dirty={edDirty} behind={behind}>
            <main
              ref={scrollRef}
              className="qs-screen-scroll"
              style={flex ? { display: 'flex', flexDirection: 'column', overflow: 'hidden' } : null}
            >
              {body}
            </main>
            {footer ? <section aria-label="Aktionen">{footer}</section> : null}
          </N.SwipeBack>
          <N.TabBar
            value={route.tab}
            onChange={(id) => {
              nav.tab(id);
            }}
            items={TABS}
            glass={true}
            safeArea={true}
          />
          {Sheet ? (
            <Sheet key={route.sheet.name + JSON.stringify(route.sheet.params || {})} {...route.sheet.params} />
          ) : null}
          {route.dialog === 'unsaved' ? (
            <N.UnsavedDialog
              open={true}
              inline={true}
              count={ed[0].items ? diffCount(s.planA, ed[0].items) : 0}
              onSave={() => {
                if (ed[0].items) demo.act.savePlan(ed[0].items);
                ed[1]({ items: null });
                nav.back();
                nav.toast({ tone: 'success', message: planSaved() });
              }}
              onDiscard={() => {
                ed[1]({ items: null });
                nav.back();
              }}
              onCancel={() => {
                set({ dialog: null });
              }}
            >
              Wenn du zurückgehst, gehen deine Änderungen verloren.
            </N.UnsavedDialog>
          ) : null}
          {toast[0] ? (
            <div className="qs-toast" key={toast[0].key}>
              <N.Toast
                tone={toast[0].tone || 'neutral'}
                message={toast[0].message}
                action={
                  toast[0].action
                    ? {
                        label: toast[0].action.label,
                        onClick: () => {
                          toast[0].action.onClick();
                          toast[1](null);
                        },
                      }
                    : undefined
                }
                timer={5000}
                timerKey={toast[0].key}
                onExpire={() => {
                  toast[1](null);
                }}
                onClose={() => {
                  toast[1](null);
                }}
              />
            </div>
          ) : null}
        </FoldCtx.Provider>
      </NavCtx.Provider>
    </Phone>
  );
}
/* Vorschau einer Screen-Karte: dieselbe App, gestartet am Screen; ?device=se|small wählt das Gerät */
function ScreenCard(props) {
  return <App start={props.name} device={props.device || deviceFromQuery()} />;
}
/* Prototyp mit Gerätewahl und Neustart – die Abnahme der Abläufe */
function Prototype(props) {
  const dev = useState(props.device || deviceFromQuery() || 'pro-max');
  const start = useState(props.start || 'HeuteScreen');
  const run = useState(0);
  const FLOWS = [
    { value: 'HeuteScreen', label: 'Heute' },
    { value: 'TrainingScreen', label: 'Training' },
    { value: 'PlaeneScreen', label: 'Pläne' },
  ];
  return (
    <div className="qs-proto">
      <section className="qs-proto-tools" aria-label="Vorschau-Einstellungen">
        <div className="nh-field">
          <span className="nh-label">Gerät</span>
          <SegmentedControl
            label="Gerät"
            value={dev[0]}
            onChange={dev[1]}
            options={[
              { value: 'pro-max', label: '430' },
              { value: 'se', label: '375' },
              { value: 'small', label: '320' },
            ]}
          />
        </div>
        <div className="nh-field">
          <span className="nh-label">Start</span>
          <SegmentedControl
            label="Start"
            value={start[0]}
            onChange={(v) => {
              start[1](v);
              demo.act.reset();
              run[1](run[0] + 1);
            }}
            options={FLOWS}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon="undo"
          onClick={() => {
            demo.act.reset();
            run[1](run[0] + 1);
          }}
        >
          Neu starten
        </Button>
        <p className="qs-proto-note">{DEVICES[dev[0]].label}</p>
      </section>
      <App key={run[0] + start[0]} start={start[0]} device={dev[0]} />
    </div>
  );
}

export { ROUTES, App, ScreenCard, Prototype };

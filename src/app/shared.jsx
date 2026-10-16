import React from 'react';
import N, { IconButton, List } from 'nordhaus-ui/src/bare.js';
import { QuestRow } from '../components/QuestRow/QuestRow.jsx';
import { demo } from '../data/demo.js';

const U = N.utils;
const { cx, eur, iso, omit, parse } = N.utils;

/* ================= Screens =================
   Jeder Screen ist eine Komponente, die aus demo liest und über die Navigation (useNav) weiterführt.
   Die App (Questi.App) setzt sie zu einem durchspielbaren Ablauf zusammen; jede Screen-Karte startet dieselbe App an ihrer Stelle.
   Sprachregel: deutsche Begriffe; Eigennamen (Apple Health, Questi) und der Produktbegriff „Quest“ bleiben. */

const S = demo.select;
const NavCtx = React.createContext(null);
const NOOP = () => {};
const NAV0 = {
  go: NOOP,
  back: NOOP,
  open: NOOP,
  close: NOOP,
  tab: NOOP,
  view: NOOP,
  toast: NOOP,
  dialog: NOOP,
  route: {},
};
function useNav() {
  return React.useContext(NavCtx) || NAV0;
}
const TABS = [
  { id: 'today', label: 'Heute', icon: 'sun' },
  { id: 'cal', label: 'Kalender', icon: 'calendar' },
  { id: 'life', label: 'Leben', icon: 'life' },
  { id: 'stats', label: 'Fortschritt', icon: 'stats' },
  { id: 'more', label: 'Mehr', icon: 'more' },
];
/* Abstände nur aus Nordhaus-Tokens (Raster 4 pt): G = Rand des Screens, col(n) = Spalte mit Abstand space-n */
const G = { padding: '0 var(--gutter)' };
function col(step, pad) {
  return {
    padding: pad || 'var(--space-4) var(--gutter) var(--space-8)',
    display: 'flex',
    flexDirection: 'column',
    gap: `var(--space-${step})`,
  };
}
function dateLong(d) {
  return parse(d).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}
function dateShort(d) {
  return parse(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}
function weekAB() {
  return U.isoWeek(new Date()) % 2 ? 'Woche A' : 'Woche B';
}
function rangeLabel(s) {
  const a = parse(s.week[0].date);
  const b = parse(s.week[6].date);
  return `KW ${U.isoWeek(new Date())} · ${a.getDate()}.–${b.getDate()}. ${b.toLocaleDateString('de-DE', { month: 'long' })} · ${weekAB()}`;
}
function relDays(d) {
  const n = Math.round((parse(d) - parse(iso(new Date()))) / 864e5);
  return n === 0 ? 'Heute' : n === 1 ? 'Morgen' : n === -1 ? 'Gestern' : n > 1 ? `In ${n} Tagen` : `Vor ${-n} Tagen`;
}
/* Beträge: glatte ohne Cent, alle anderen mit – „75 €“, „34,90 €“; nie gerundet (gleiche Daten, gleiche Zahl) */
function money(v) {
  return eur(v, { maximumFractionDigits: v % 1 ? 2 : 0 });
}
/* Faltkopf (Regel 11): FoldCtx trägt den Scrollbereich des Screens. Die Statusleiste hat immer eine Fläche; ist der Screen
   gescrollt (großer Titel ab 104 pt aus dem Blick), steht darunter die kompakte Leiste (Glas) mit Titel und Aktionen. Reiter und Ansichtswahl kleben in FoldUnder darunter. */
const FoldCtx = React.createContext(null);
function Fold({ bar, threshold }) {
  const on = N.useScrolled(React.useContext(FoldCtx), threshold);
  return <div className={cx('qs-fold', on && 'is-on')}>{on ? bar : null}</div>;
}
const FoldUnder = ({ children }) => <div className="qs-fold-under">{children}</div>;
/* Kopf eines Hauptbereichs: Wortmarke, Suche, + (Neue Quest – in jedem Tab dieselbe Bedeutung) */
function MainBar(props) {
  const nav = useNav();
  const actions = [
    <IconButton
      key="s"
      icon="search"
      label="Suchen"
      onClick={() => {
        nav.open('search');
      }}
    />,
    <N.AddButton
      key="a"
      label="Neue Quest"
      onClick={() => {
        nav.open('newQuest', props.addParams || {});
      }}
    />,
  ];
  return (
    <React.Fragment>
      <Fold
        threshold={104}
        bar={
          <N.TopBar
            large={true}
            collapsed={true}
            glass={true}
            title={props.title}
            tools={props.tools}
            toolsLabel={props.toolsLabel}
            actions={actions}
          />
        }
      />
      <N.TopBar large={true} brand="questi" actions={actions} {...omit(props, ['addParams'])} />
    </React.Fragment>
  );
}
function SubBar(props) {
  const nav = useNav();
  const back = () => React.createElement(N.BackButton, { label: props.backLabel, onClick: props.onBack || nav.back });
  return (
    <React.Fragment>
      <Fold
        threshold={props.large ? 104 : 1}
        bar={
          <N.TopBar
            nav={true}
            glass={true}
            border={true}
            leading={back()}
            title={props.title}
            actions={props.actions}
          />
        }
      />
      <N.TopBar leading={back()} {...omit(props, ['backLabel', 'onBack'])} />
    </React.Fragment>
  );
}
/* ---------- 1 · Heute ---------- */
function QuestRows({ items }) {
  const nav = useNav();
  return (
    <List>
      {items.map((q) => (
        <QuestRow
          key={q.id}
          category={q.category}
          title={q.title}
          description={q.description}
          time={q.time}
          steps={q.steps ? [q.stepsDone, q.steps] : undefined}
          status={q.missed ? 'missed' : undefined}
          done={S.qDone(q)}
          onToggle={(v) => {
            demo.act.toggle(q.id, v);
          }}
          onOpen={() => {
            nav.open(q.workout ? 'training' : q.shopping ? 'shopping' : q.meal ? 'meal' : 'questDetail', {
              id: q.id,
            });
          }}
        />
      ))}
    </List>
  );
}

export {
  S,
  useNav,
  G,
  dateLong,
  weekAB,
  MainBar,
  QuestRows,
  rangeLabel,
  col,
  relDays,
  SubBar,
  dateShort,
  money,
  NavCtx,
  FoldCtx,
  FoldUnder,
  TABS,
};

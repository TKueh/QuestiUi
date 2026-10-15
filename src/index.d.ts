/**
 * Questi UI 2.3 – Typen für src/index.js (benannte Exporte, Default-Export Questi = früher window.Questi). Die App-Schicht der Quest-App auf Nordhaus UI 6.3:
 * Fachbausteine, Geräterahmen, ein Datenstand (demo) und die App aus allen Screens. Alles Allgemeine kommt aus 'nordhaus-ui' (../NordhausUI).
 */
import type * as React from 'react';

/* ================= Grundtypen ================= */

/** ISO-Datum JJJJ-MM-TT, z. B. "2026-10-14" */
export type ISODate = string;
/** Uhrzeit HH:MM im 24-Stunden-Format */
export type Clock = string;
/** Die acht Lebensbereiche der Quest-App; Questi setzt sie beim Laden mit Nordhaus.setCategories(). */
export type Category =
  'food' | 'training' | 'movement' | 'household' | 'finance' | 'personal' | 'birthday' | 'work' | (string & {});
/**
 * Farbtöne in Komponenten. `action` Hauptaktion · `danger` Fehler · `positive` erledigt/an ·
 * `ink`, `steel`, `moss`, `muted` neutrale Serien · sonst eine Kategorie.
 * Gleichbedeutend: `signal`, `accent` (→ action) sowie `alert`, `error` (→ danger) – alle in der einen Akzentfarbe.
 */
export type Tone =
  | 'ink'
  | 'action'
  | 'danger'
  | 'positive'
  | 'steel'
  | 'moss'
  | 'muted'
  | Category
  | 'signal'
  | 'accent'
  | 'alert'
  | 'error';
/** Status-LED wie Nordhaus 6.3: `on` (= `positive`) gesichert/verbunden · `danger` Fehler · `ink` läuft · `muted` pausiert/neutral · `off` aus (Ring) · eine Rolle.
 *  `signal` ist gleichbedeutend mit danger. Unbekannte Werte zeigen ink-muted (vor 6.3: Grün) – nur diese Werte verwenden. */
export type LedState =
  'on' | 'positive' | 'ink' | 'muted' | 'off' | 'action' | 'current' | 'marker' | 'danger' | 'signal';
/** Name eines Icons aus Nordhaus.Icon.names */
export type IconName =
  | 'home'
  | 'calendar'
  | 'check'
  | 'plus'
  | 'minus'
  | 'search'
  | 'sliders'
  | 'user'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'close'
  | 'bell'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up-right'
  | 'sun'
  | 'moon'
  | 'lock'
  | 'globe'
  | 'clock'
  | 'flag'
  | 'list'
  | 'grid'
  | 'trash'
  | 'edit'
  | 'info'
  | 'alert'
  | 'logout'
  | 'target'
  | 'bolt'
  | 'location'
  | 'repeat'
  | 'share'
  | 'eye'
  | 'contrast'
  | 'timer'
  | 'note'
  | 'download'
  | 'life'
  | 'stats'
  | 'arrow-up'
  | 'arrow-down'
  | 'undo'
  | 'settings'
  | 'leaf'
  | 'dumbbell'
  | 'walk'
  | 'basket'
  | 'coin'
  | 'gift'
  | 'briefcase'
  | 'heart'
  | 'pulse'
  | 'scale'
  | 'footsteps'
  | 'flame'
  | 'thermometer'
  | 'plane'
  | 'upload'
  | 'file'
  | 'link'
  | 'sync'
  | 'cloud'
  | 'phone'
  | 'grip'
  | 'filter'
  | 'copy'
  | 'archive'
  | 'pause'
  | 'play'
  | 'star'
  | 'box'
  | 'snow'
  | 'more';
/** Ein Icon-Name oder ein eigenes Element */
export type IconLike = IconName | React.ReactElement;
export type Size = 'sm' | 'md' | 'lg';
interface Base {
  className?: string;
  style?: React.CSSProperties;
}
/** Gemeinsames Muster für kontrollierte und unkontrollierte Werte */
interface Controlled<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
type Option<V = string> =
  | V
  | {
      value: V;
      label: React.ReactNode;
      icon?: IconLike;
      description?: React.ReactNode;
      disabled?: boolean;
      sub?: React.ReactNode;
      led?: LedState;
    };
type Result = React.ReactElement | null;

/* ================= Fachbausteine ================= */

/** Die Fachzeilen (QuestRow, EventRow, PlanRow, LifeRow, ExpenseRow, MeasurementRow) sind ListItems aus Nordhaus mit anderen Zellen. */

export interface DocLinkProps extends Base {
  href?: string;
  external?: boolean;
  /** Icon-Name oder false */ icon?: IconName | false;
  variant?: 'inline' | 'chip';
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export declare function DocLink(props: DocLinkProps): Result;
export type Device = 'pro-max' | 'se' | 'small';
export interface PhoneProps extends Base {
  /** pro-max 430 × 932 (Standard) · se 375 × 667 · small 320 × 568 – setzt Bildschirm und Safe Areas */ device?: Device;
  /** data-theme nur im Gerät */ theme?: string;
  /** Statusleiste, Standard 9:41 */ time?: string;
  homeIndicator?: boolean;
  children?: React.ReactNode;
}
export declare function Phone(props: PhoneProps): Result;
export declare function StatusBar(props: { time?: string }): Result;
export declare function HomeIndicator(): Result;
export interface ThemePickerProps extends Base, Controlled<'system' | 'light' | 'dark'> {
  /** Name der Gruppe, Standard „Erscheinungsbild“ */ label?: string;
}
export declare function ThemePicker(props: ThemePickerProps): Result;
export interface EventRowProps extends Base {
  start?: Clock;
  end?: Clock;
  allDay?: boolean;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  category?: Tone;
  done?: boolean;
  context?: boolean;
  onClick?: () => void;
}
export declare function EventRow(props: EventRowProps): Result;
export interface DayPanelProps extends Base {
  date: ISODate;
  today?: boolean;
  done?: number;
  total?: number;
  events?: EventRowProps[];
  onAdd?: () => void;
  addLabel?: string;
}
export declare function DayPanel(props: DayPanelProps): Result;
export interface AgendaDayProps {
  date: ISODate;
  events?: EventRowProps[];
  done?: number;
  today?: boolean;
  defaultOpen?: boolean;
}
export declare function AgendaDay(props: AgendaDayProps): Result;
export interface WeekSummaryProps extends Base {
  /** Mo–So */ days: { done: number; total: number; today?: boolean; paused?: boolean }[];
}
export declare function WeekSummary(props: WeekSummaryProps): Result;
export interface QuestRowProps extends Base {
  title: string;
  description?: React.ReactNode;
  category?: Category;
  time?: Clock;
  done?: boolean;
  defaultDone?: boolean;
  onToggle?: (done: boolean) => void;
  onOpen?: () => void;
  /** [erledigt, gesamt] – Teilfortschritt im Ring */ steps?: [number, number];
  status?: 'open' | 'done' | 'missed';
  paused?: boolean;
}
export declare function QuestRow(props: QuestRowProps): Result;
export interface QuestListProps extends Base {
  groups?: { title?: React.ReactNode; items: QuestRowProps[] }[];
  items?: QuestRowProps[];
  /** Erledigt je Gruppe und Zeile – kontrolliert; die Zähler im Gruppenkopf folgen */ value?: boolean[][];
  defaultValue?: boolean[][];
  onChange?: (value: boolean[][]) => void;
}
export declare function QuestList(props: QuestListProps): Result;
export interface PlanRowProps extends Base {
  category?: Category;
  icon?: IconLike;
  title: React.ReactNode;
  description?: React.ReactNode;
  count?: number;
  updated?: React.ReactNode;
  status?: 'active' | 'paused' | 'archived';
  onClick?: () => void;
}
export declare function PlanRow(props: PlanRowProps): Result;
export interface PlanItemRowProps extends Base {
  icon?: IconLike;
  title: React.ReactNode;
  schedule?: React.ReactNode;
  detail?: React.ReactNode;
  onEdit?: () => void;
  trailing?: React.ReactNode;
}
export declare function PlanItemRow(props: PlanItemRowProps): Result;
export interface ChangeItem {
  type: 'add' | 'change' | 'remove' | 'conflict';
  title: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  note?: React.ReactNode;
}
export interface ChangeListProps extends Base, Controlled<boolean[]> {
  items: ChangeItem[];
}
export declare function ChangeList(props: ChangeListProps): Result;
export interface ImportPreviewProps extends Base {
  file: React.ReactNode;
  meta?: React.ReactNode;
  error?: boolean;
  stats?: { label: React.ReactNode; value: React.ReactNode }[];
  excerpt?: string;
  children?: React.ReactNode;
}
export declare function ImportPreview(props: ImportPreviewProps): Result;
export interface PlanPreviewWeekProps extends Base {
  days: { items?: { title: string; short?: string; state?: 'same' | 'add' | 'change' | 'remove' }[] }[];
  from?: React.ReactNode;
  title?: React.ReactNode;
}
export declare function PlanPreviewWeek(props: PlanPreviewWeekProps): Result;
export interface DayModePickerProps extends Base, Controlled<'normal' | 'sick' | 'vacation'> {
  /** Name der Gruppe, Standard „Tagesmodus“ */ label?: string;
}
export declare function DayModePicker(props: DayModePickerProps): Result;
export interface WeightDisplayProps extends Base {
  value: number | string;
  unit?: string;
  planned?: boolean;
  tag?: React.ReactNode;
  onEdit?: () => void;
}
export declare function WeightDisplay(props: WeightDisplayProps): Result;
export interface ExerciseFigureProps extends Base {
  src?: string;
  alt?: string;
  index?: number;
}
export declare function ExerciseFigure(props: ExerciseFigureProps): Result;
export interface ExerciseRowProps extends Base {
  index?: number;
  name: React.ReactNode;
  sets?: number;
  reps: React.ReactNode;
  rest?: React.ReactNode;
  note?: React.ReactNode;
  image?: string;
  weight?: number | string;
  planned?: boolean;
  onEditWeight?: () => void;
  setValues?: React.ReactNode[];
  deviations?: boolean[];
  doneSets?: number;
  /** Sätze kontrolliert: Zustand je Satz und Rückmeldung */ setsValue?: boolean[];
  onSets?: (sets: boolean[]) => void;
}
export declare function ExerciseRow(props: ExerciseRowProps): Result;
export interface TrainingSummaryProps extends Base {
  setsDone: number;
  setsTotal: number;
  load: number;
  duration: React.ReactNode;
  feeling?: React.ReactNode;
}
export declare function TrainingSummary(props: TrainingSummaryProps): Result;
export interface FeelingPickerProps extends Base, Controlled<1 | 2 | 3 | 4 | 5 | null> {
  label?: string;
}
export declare function FeelingPicker(props: FeelingPickerProps): Result;
export interface ShoppingRowProps extends Base {
  name: React.ReactNode;
  note?: React.ReactNode;
  quantity?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  pantry?: boolean;
}
export declare function ShoppingRow(props: ShoppingRowProps): Result;
export interface ShoppingListProps extends Base {
  groups: {
    title: React.ReactNode;
    pantry?: boolean;
    items: { name: React.ReactNode; note?: React.ReactNode; quantity?: React.ReactNode; checked?: boolean }[];
  }[];
  /** Abgehakt je Gruppe und Zeile – kontrolliert; die Zähler im Gruppenkopf folgen */ value?: boolean[][];
  defaultValue?: boolean[][];
  onChange?: (value: boolean[][]) => void;
}
export declare function ShoppingList(props: ShoppingListProps): Result;
export interface IngredientListProps extends Base {
  title?: React.ReactNode;
  portions?: number;
  items: { name: React.ReactNode; note?: React.ReactNode; quantity?: React.ReactNode }[];
}
export declare function IngredientList(props: IngredientListProps): Result;
export interface NutritionPanelProps extends Base {
  kcal?: number;
  macros?: { protein?: number; carbs?: number; fat?: number };
  fiber?: number;
  note?: React.ReactNode;
}
export declare function NutritionPanel(props: NutritionPanelProps): Result;
export interface ExpenseRowProps extends Base {
  category?: Category;
  title: React.ReactNode;
  date?: React.ReactNode;
  method?: string;
  payee?: string;
  amount: number;
  onClick?: () => void;
  /** Betrag in Cent (Ganzzahl), Vorrang vor amount; Anzeige immer in Euro */ amountCents?: number;
}
export declare function ExpenseRow(props: ExpenseRowProps): Result;
export interface HistoryGroupProps extends Base {
  date: React.ReactNode;
  summary?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function HistoryGroup(props: HistoryGroupProps): Result;
export interface BudgetLabelProps extends Base {
  amount: number;
  spent?: number;
  label?: React.ReactNode;
}
export declare function BudgetLabel(props: BudgetLabelProps): Result;
export interface FinanceSummaryProps extends Base {
  total: number;
  free?: number;
  label?: React.ReactNode;
  caption?: React.ReactNode;
  rows?: { label: React.ReactNode; amount: number; tone?: Tone }[];
}
export declare function FinanceSummary(props: FinanceSummaryProps): Result;
export interface LifeRowProps extends Base {
  kind?: 'birthday' | 'wish' | 'project';
  date?: ISODate;
  title: React.ReactNode;
  meta?: React.ReactNode;
  gift?: React.ReactNode;
  amount?: number;
  spent?: number;
  status?: string;
  statusOptions?: Option<string>[];
  /** Statuswahl kontrolliert */ onStatus?: (status: string) => void;
  action?: React.ReactNode;
  /** ohne onOpen ist die Zeile keine Taste */ onOpen?: () => void;
}
export declare function LifeRow(props: LifeRowProps): Result;
export interface MeasurementRowProps extends Base {
  date: React.ReactNode;
  source?: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  change?: number;
  decimals?: number;
  onEdit?: () => void;
}
export declare function MeasurementRow(props: MeasurementRowProps): Result;
/* ================= Datenstand und App ================= */

export interface DemoQuest {
  id: string;
  date: ISODate;
  category: Category;
  title: string;
  description?: string;
  time?: Clock;
  end?: Clock;
  steps?: number;
  stepsDone: number;
  done: boolean;
  missed?: boolean;
  workout?: 'A' | 'B';
  shopping?: boolean;
  meal?: 'A' | 'B';
  own?: boolean;
}
export interface DemoDay {
  date: ISODate;
  index: number;
  hl: string;
  quests: DemoQuest[];
  extra: { start: Clock; end: Clock; title: string; category: Category; context?: boolean }[];
  allDay: { title: string; category: Category } | null;
}
/** Ein Datenstand für alle Screens. Jede Summe wird mit select berechnet; jede Handlung (act) ändert den Stand, alle Screens folgen. */
export declare const demo: {
  get(): { week: DemoDay[]; [key: string]: any };
  use(): ReturnType<typeof demo.get>;
  subscribe(f: () => void): () => void;
  NOW_H: number;
  todayIndex(): number;
  act: {
    toggle(id: string, done?: boolean): void;
    setSteps(id: string, steps: boolean[]): void;
    addQuest(q: {
      title: string;
      date: ISODate;
      time?: Clock | null;
      end?: Clock | null;
      repeat?: string;
      category?: Category;
    }): void;
    shop(group: number, item: number, checked: boolean): void;
    shopAll(questId: string): void;
    setSets(sets: boolean[][]): void;
    feeling(v: number): void;
    saveTraining(questId: string): void;
    savePlan(items: EditableItemLike[]): void;
    addExpense(e: object): void;
    removeExpense(id: string): void;
    restoreExpense(): void;
    saveBirthday(b: object): void;
    setStatus(list: string, id: string, v: string): void;
    addMeasurement(v: number): void;
    importPlan(): void;
    applyCalendar(): void;
    setMode(m: { value: 'normal' | 'sick' | 'vacation'; from?: ISODate; to?: ISODate }): void;
    setTheme(t: string): void;
    setContrast(v: boolean): void;
    reset(): void;
  };
  select: {
    dayStats(d: DemoDay): { done: number; total: number; open: number };
    weekTotals(s: object): {
      total: number;
      done: number;
      rate: number;
      by: Record<string, { total: number; done: number }>;
    };
    today(s: object): DemoDay;
    findQuest(s: object, id: string): DemoQuest | null;
    qDone(q: DemoQuest): boolean;
    [name: string]: (...a: any[]) => any;
  };
};
interface EditableItemLike {
  id?: string;
  title: string;
  detail?: React.ReactNode;
}
/** Die App aus allen Screens: fünf Tabs mit Verlauf, Register, Unterseiten, Sheets, Dialoge, Toast. start = Name einer Screen-Karte (routes). */
export interface AppProps {
  start?: string;
  device?: Device;
  theme?: string;
}
export declare function App(props: AppProps): Result;
/** Vorschau einer Screen-Karte: App, gestartet an diesem Screen; ?device=se|small wählt das Gerät */
export declare function ScreenCard(props: { name: string; device?: Device }): Result;
/** App mit Gerätewahl, Startpunkt und Neustart */
export declare function Prototype(props: { start?: string; device?: Device }): Result;
export declare const routes: string[];
export declare const DEVICES: Record<
  Device,
  { w: number; h: number; top: number; bottom: number; radius: number; island: boolean; label: string }
>;

/* ================= Namensraum ================= */
export declare const version: '2.3.0';
/** Version der gespiegelten Nordhaus-Basis */
export declare const nordhaus: string;

/** Default-Export: alle Bausteine, demo und App in einem Objekt, wie früher window.Questi */
declare const Questi: typeof import('./index.js');
export default Questi;

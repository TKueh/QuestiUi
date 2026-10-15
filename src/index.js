// Questi UI – öffentliche Schnittstelle. Benannte Exporte, Default-Export = früheres window.Questi.
import N from 'nordhaus-ui';
import './categories.js';
import './styles.css';
import { AgendaDay } from './components/DayPanel/AgendaDay.jsx';
import { BudgetLabel } from './components/BudgetLabel/BudgetLabel.jsx';
import { ChangeList } from './components/ChangeList/ChangeList.jsx';
import { DayModePicker } from './components/DayModePicker/DayModePicker.jsx';
import { DayPanel } from './components/DayPanel/DayPanel.jsx';
import { DocLink } from './components/DocLink/DocLink.jsx';
import { EventRow } from './components/EventRow/EventRow.jsx';
import { ExerciseFigure, ExerciseRow, WeightDisplay } from './components/ExerciseRow/ExerciseRow.jsx';
import { ExpenseRow } from './components/ExpenseRow/ExpenseRow.jsx';
import { FeelingPicker } from './components/TrainingSummary/FeelingPicker.jsx';
import { FinanceSummary } from './components/FinanceSummary/FinanceSummary.jsx';
import { HistoryGroup } from './components/ExpenseRow/HistoryGroup.jsx';
import { ImportPreview } from './components/ImportPreview/ImportPreview.jsx';
import { IngredientList } from './components/NutritionPanel/IngredientList.jsx';
import { LifeRow } from './components/LifeRow/LifeRow.jsx';
import { MeasurementRow } from './components/MeasurementRow/MeasurementRow.jsx';
import { NutritionPanel } from './components/NutritionPanel/NutritionPanel.jsx';
import { DEVICES, HomeIndicator, Phone, StatusBar, deviceFromQuery } from './components/Phone/Phone.jsx';
import { PlanItemRow } from './components/PlanRow/PlanItemRow.jsx';
import { PlanPreviewWeek } from './components/PlanPreviewWeek/PlanPreviewWeek.jsx';
import { PlanRow } from './components/PlanRow/PlanRow.jsx';
import { QuestList } from './components/QuestRow/QuestList.jsx';
import { QuestRow } from './components/QuestRow/QuestRow.jsx';
import { ShoppingList, ShoppingRow } from './components/ShoppingList/ShoppingList.jsx';
import { ThemePicker } from './components/DayModePicker/ThemePicker.jsx';
import { TrainingSummary } from './components/TrainingSummary/TrainingSummary.jsx';
import { WeekSummary } from './components/WeekSummary/WeekSummary.jsx';
import { App, Prototype, ROUTES, ScreenCard } from './app/App.jsx';
import { useNav } from './app/shared.jsx';
import { demo } from './data/demo.js';

const Questi = {
  version: '2.3.0',
  nordhaus: N.version,
  /* Vorschau */ Phone,
  StatusBar,
  HomeIndicator,
  DocLink,
  DEVICES,
  deviceFromQuery,
  /* Zeilen */ QuestRow,
  QuestList,
  EventRow,
  DayPanel,
  AgendaDay,
  PlanRow,
  PlanItemRow,
  LifeRow,
  ExpenseRow,
  MeasurementRow,
  /* Training */ ExerciseRow,
  ExerciseFigure,
  WeightDisplay,
  TrainingSummary,
  FeelingPicker,
  /* Ernährung, Einkauf, Finanzen */ IngredientList,
  NutritionPanel,
  ShoppingRow,
  ShoppingList,
  FinanceSummary,
  BudgetLabel,
  /* Woche, Einstellungen */ WeekSummary,
  DayModePicker,
  ThemePicker,
  /* Pläne */ HistoryGroup,
  ChangeList,
  PlanPreviewWeek,
  ImportPreview,
  /* App */ demo,
  App,
  ScreenCard,
  Prototype,
  routes: Object.keys(ROUTES),
  useNav,
};

export const routes = Questi.routes;
export {
  AgendaDay,
  App,
  BudgetLabel,
  ChangeList,
  DEVICES,
  DayModePicker,
  DayPanel,
  DocLink,
  EventRow,
  ExerciseFigure,
  ExerciseRow,
  ExpenseRow,
  FeelingPicker,
  FinanceSummary,
  HistoryGroup,
  HomeIndicator,
  ImportPreview,
  IngredientList,
  LifeRow,
  MeasurementRow,
  NutritionPanel,
  Phone,
  PlanItemRow,
  PlanPreviewWeek,
  PlanRow,
  Prototype,
  QuestList,
  QuestRow,
  ScreenCard,
  ShoppingList,
  ShoppingRow,
  StatusBar,
  ThemePicker,
  TrainingSummary,
  WeekSummary,
  WeightDisplay,
  demo,
  deviceFromQuery,
  useNav,
};
export default Questi;

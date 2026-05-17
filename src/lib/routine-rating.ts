/**
 * Routine rating + insights — re-exported from routine-analysis (single source).
 */
export type {
  CrossDayTip,
  ActiveLoadAlert,
  ProductRoutineInsight,
  RoutineInsights,
  RoutineRating,
  SessionPairingAlert,
} from "./routine-analysis";
export {
  buildRoutineInsights,
  buildRoutineScorecard,
  computeRoutineRating,
  inferIngredientSignals,
} from "./routine-analysis";

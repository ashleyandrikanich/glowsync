/**
 * Routine rating + insights — re-exported from routine-analysis (single source).
 */
export type {
  CrossDayTip,
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

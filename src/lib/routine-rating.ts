import type { RoutineProduct } from "./routine";

export type RoutineRating = {
  /** 0–100 completeness score */
  score: number;
  /** Filled stars 0–5 (derived from score) */
  stars: number;
  /** Short tier name */
  tier: string;
  /** One-line context */
  blurb: string;
};

/**
 * Score grows with product count; small bonuses for day/night balance and notes.
 * For motivation only — not a judgment of skin quality.
 */
export function computeRoutineRating(products: RoutineProduct[]): RoutineRating {
  const n = products.length;
  const hasAm = products.some((p) => p.slot === "am" || p.slot === "both");
  const hasPm = products.some((p) => p.slot === "pm" || p.slot === "both");
  const withNotes = products.filter((p) => p.notes.trim().length > 0).length;

  let raw = 0;
  raw += n * 14;
  if (hasAm && hasPm) raw += 14;
  if (n >= 4) raw += 8;
  raw += Math.min(18, withNotes * 4);

  const score = Math.min(100, Math.round(raw));
  const stars = score <= 0 ? 0 : Math.min(5, Math.max(1, Math.ceil(score / 20)));

  let tier = "Not started";
  let blurb = "Add products to see your routine rating climb.";

  if (n === 0) {
    return { score: 0, stars: 0, tier, blurb };
  }

  if (score < 28) {
    tier = "Starter shelf";
    blurb = "Nice start — try mapping both morning and evening when you can.";
  } else if (score < 48) {
    tier = "Taking shape";
    blurb = "Your routine is filling in. Notes help you remember why each step is there.";
  } else if (score < 68) {
    tier = "Balanced cadence";
    blurb = "Solid coverage. Revisit the safety checker if you add strong actives.";
  } else if (score < 88) {
    tier = "Dedicated ritual";
    blurb = "Impressive shelf memory — keep edits honest when products change.";
  } else {
    tier = "Full ritualist";
    blurb = "Top tier for this tracker — clarity beats complexity for skin.";
  }

  return { score, stars, tier, blurb };
}

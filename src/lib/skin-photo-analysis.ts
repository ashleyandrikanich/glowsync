import {
  MAX_QUIZ_PRIORITIES,
  buildQuizResult,
  type Concern,
  type QuizAnswers,
  type QuizResult,
  type QuizSkinProfile,
  type Sensitivity,
  type SpfHabit,
} from "./skin-quiz";

/** Structured output we ask the vision model to return (JSON). */
export type SkinPhotoAnalysis = {
  skinProfile: QuizSkinProfile;
  concerns: Concern[];
  sensitivity: Sensitivity;
  spfHabit: SpfHabit;
  observations: string[];
  confidence: "low" | "medium" | "high";
};

const PROFILES = new Set<QuizSkinProfile>([
  "oily_tzone",
  "oily_allover",
  "oily_dehydrated",
  "dry_tight",
  "dry_flaky",
  "combo_classic",
  "combo_reverse",
  "balanced_steady",
]);

const CONCERNS = new Set<Concern>([
  "breakouts",
  "hormonal_acne",
  "congestion",
  "pores",
  "texture",
  "redness",
  "barrier",
  "lines",
  "tone",
  "dehydration",
]);

const SENSITIVITY = new Set<Sensitivity>([
  "burns_easily",
  "often_stings",
  "mixed",
  "usually_fine",
  "iron_barrier",
]);

const SPF = new Set<SpfHabit>(["always", "most_days", "sometimes", "rare", "never"]);

export const SKIN_SCAN_ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type SkinScanMime = (typeof SKIN_SCAN_ALLOWED_MIME)[number];

export const SKIN_SCAN_MAX_BYTES = 4 * 1024 * 1024;

export function isAllowedSkinScanMime(mime: string): mime is SkinScanMime {
  return (SKIN_SCAN_ALLOWED_MIME as readonly string[]).includes(mime);
}

export function validateSkinPhotoAnalysis(raw: unknown): SkinPhotoAnalysis | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const skinProfile = o.skinProfile;
  if (typeof skinProfile !== "string" || !PROFILES.has(skinProfile as QuizSkinProfile)) {
    return null;
  }

  const concernsRaw = o.concerns;
  if (!Array.isArray(concernsRaw)) return null;
  const concerns = concernsRaw
    .filter((c): c is Concern => typeof c === "string" && CONCERNS.has(c as Concern))
    .slice(0, MAX_QUIZ_PRIORITIES);
  if (concerns.length === 0) return null;

  const sensitivity = o.sensitivity;
  if (typeof sensitivity !== "string" || !SENSITIVITY.has(sensitivity as Sensitivity)) {
    return null;
  }

  const spfHabit = o.spfHabit;
  if (typeof spfHabit !== "string" || !SPF.has(spfHabit as SpfHabit)) {
    return null;
  }

  const observations = Array.isArray(o.observations)
    ? o.observations
        .filter((x): x is string => typeof x === "string" && x.trim().length > 0)
        .slice(0, 6)
    : [];

  const confidence = o.confidence;
  if (confidence !== "low" && confidence !== "medium" && confidence !== "high") {
    return null;
  }

  return {
    skinProfile: skinProfile as QuizSkinProfile,
    concerns,
    sensitivity: sensitivity as Sensitivity,
    spfHabit: spfHabit as SpfHabit,
    observations,
    confidence,
  };
}

export function mapAnalysisToQuizAnswers(
  analysis: SkinPhotoAnalysis,
  favoriteBrands: string[] = []
): QuizAnswers {
  return {
    skinProfile: analysis.skinProfile,
    concerns: analysis.concerns,
    sensitivity: analysis.sensitivity,
    spfHabit: analysis.spfHabit,
    favoriteBrands,
  };
}

export function buildScanQuizResult(analysis: SkinPhotoAnalysis): QuizResult | null {
  return buildQuizResult(mapAnalysisToQuizAnswers(analysis));
}

export const VISION_ANALYSIS_PROMPT = `You are assisting a skincare education app (not a doctor). Analyze this face photo for visible skin patterns only. Do not diagnose diseases. Return JSON only with this exact shape:
{
  "skinProfile": one of oily_tzone | oily_allover | oily_dehydrated | dry_tight | dry_flaky | combo_classic | combo_reverse | balanced_steady,
  "concerns": array of 1-3 from breakouts | hormonal_acne | congestion | pores | texture | redness | barrier | lines | tone | dehydration,
  "sensitivity": one of burns_easily | often_stings | mixed | usually_fine | iron_barrier,
  "spfHabit": one of always | most_days | sometimes | rare | never (guess from photo only if unclear use sometimes),
  "observations": array of 2-5 short plain-language strings describing what you see (no medical claims),
  "confidence": low | medium | high
}
Be conservative when lighting is poor or the face is partially hidden.`;

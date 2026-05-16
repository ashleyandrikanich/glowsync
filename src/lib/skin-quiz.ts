/**
 * Skin profile quiz → illustrative product picks from the local catalog + routine ideas.
 * Not diagnostic; for education and exploration only.
 *
 * `SkinFeel` (four buckets) stays aligned with the routine guide + coach UI.
 * `QuizSkinProfile` adds finer quiz-only options that tune picks and copy.
 */

import {
  getCatalogProductById,
  PRODUCT_CATALOG,
  type CatalogProduct,
} from "./product-catalog";
import { buildQuizRoutineSteps, expandProductPool } from "./quiz-routine-steps";
import type { QuizRoutineStep } from "./quiz-routine-steps";

/** Four buckets — shared with routine guide & coach picker */
export type SkinFeel = "oily" | "dry" | "combo" | "balanced";

/** Finer skin description used only in the quiz flow */
export type QuizSkinProfile =
  | "oily_tzone"
  | "oily_allover"
  | "oily_dehydrated"
  | "dry_tight"
  | "dry_flaky"
  | "combo_classic"
  | "combo_reverse"
  | "balanced_steady";

export type Concern =
  | "breakouts"
  | "hormonal_acne"
  | "congestion"
  | "pores"
  | "texture"
  | "redness"
  | "barrier"
  | "lines"
  | "tone"
  | "dehydration";

export type Sensitivity =
  | "burns_easily"
  | "often_stings"
  | "mixed"
  | "usually_fine"
  | "iron_barrier";

export type SpfHabit = "always" | "most_days" | "sometimes" | "rare" | "never";

/** Max priorities selectable on the quiz concern step */
export const MAX_QUIZ_PRIORITIES = 3;

/** Max favorite brands on the quiz (optional step) */
export const MAX_FAVORITE_BRANDS = 5;

export type QuizAnswers = {
  skinProfile: QuizSkinProfile | null;
  /** One to three top priorities, in pick order */
  concerns: Concern[];
  sensitivity: Sensitivity | null;
  spfHabit: SpfHabit | null;
  /** Optional — biases catalog picks toward these brands */
  favoriteBrands: string[];
};

export type QuizCatalogPick = {
  productId: string;
  /** Plain-language ties to quiz steps (why this SKU surfaced) */
  reasons: string[];
};

export type QuizActionCard = {
  title: string;
  body: string;
};

export type QuizResult = {
  profileTitle: string;
  profileBody: string;
  actionCards: QuizActionCard[];
  routineAm: string[];
  routinePm: string[];
  /** Step-by-step AM/PM plan with a catalog product per step */
  routineSteps: QuizRoutineStep[];
  catalogPicks: QuizCatalogPick[];
};

export type { QuizRoutineStep } from "./quiz-routine-steps";

export const SKIN_FEEL_OPTIONS: {
  value: SkinFeel;
  label: string;
  hint: string;
}[] = [
  { value: "oily", label: "Shiny / slick", hint: "T-zone or all-over oil by midday" },
  { value: "dry", label: "Tight or flaky", hint: "Needs richer cream; can look dull" },
  { value: "combo", label: "Mixed zones", hint: "Oily T-zone, drier cheeks" },
  { value: "balanced", label: "Fairly even", hint: "Few extremes; seasonal shifts" },
];

export const QUIZ_SKIN_PROFILE_OPTIONS: {
  value: QuizSkinProfile;
  label: string;
  hint: string;
}[] = [
  {
    value: "oily_tzone",
    label: "Oily mostly in the T-zone",
    hint: "Forehead/nose shine; cheeks feel more normal",
  },
  {
    value: "oily_allover",
    label: "Oil all over by midday",
    hint: "Sheen or slip on cheeks too, not just the center",
  },
  {
    value: "oily_dehydrated",
    label: "Oily yet tight or thirsty",
    hint: "Surface oil but products absorb fast or sting",
  },
  {
    value: "dry_tight",
    label: "Dry — tight, not much flaking",
    hint: "Needs cream; flakes are rare",
  },
  {
    value: "dry_flaky",
    label: "Dry — visible flakes or rough patches",
    hint: "Peeling around nose/mouth or after cleansing",
  },
  {
    value: "combo_classic",
    label: "Combination — oily T-zone, drier cheeks",
    hint: "The usual “split personality” map",
  },
  {
    value: "combo_reverse",
    label: "Combination — dry or normal T-zone, oilier cheeks",
    hint: "Less common pattern; still treat zones separately",
  },
  {
    value: "balanced_steady",
    label: "Mostly balanced day to day",
    hint: "Minor shifts with weather or stress only",
  },
];

export const CONCERN_OPTIONS: {
  value: Concern;
  label: string;
  hint: string;
}[] = [
  { value: "breakouts", label: "Active breakouts", hint: "Inflamed spots or new pimples often" },
  {
    value: "hormonal_acne",
    label: "Hormonal / jawline pattern",
    hint: "Flares with cycle, stress, or masks along jaw or chin",
  },
  {
    value: "congestion",
    label: "Clogged pores & texture bumps",
    hint: "Blackheads, closed comedones, not always inflamed",
  },
  { value: "pores", label: "Visible / enlarged pores", hint: "Oil magnifies pore look in certain zones" },
  { value: "texture", label: "Rough texture or dullness", hint: "Not smooth to touch; uneven glow" },
  { value: "redness", label: "Redness or flushing", hint: "Persistent pink, reactive heat, or rosacea-prone" },
  {
    value: "barrier",
    label: "Barrier feels fragile",
    hint: "Stings easily, burns with wind, or “everything irritates me” phases",
  },
  { value: "lines", label: "Fine lines / firmness", hint: "Crepiness, less bounce, expression lines" },
  { value: "tone", label: "Dark spots or uneven tone", hint: "PIH, sun spots, or patchy color" },
  { value: "dehydration", label: "Dehydration", hint: "Water loss — tight but can be any skin type" },
];

export const SENSITIVITY_OPTIONS: {
  value: Sensitivity;
  label: string;
  hint: string;
}[] = [
  {
    value: "burns_easily",
    label: "Burns or flares very easily",
    hint: "Many products sting; redness shows up fast",
  },
  {
    value: "often_stings",
    label: "Often reactive with new actives",
    hint: "Need slow ramps; patch tests are non-negotiable",
  },
  {
    value: "mixed",
    label: "Sometimes fine, sometimes not",
    hint: "Depends on season, stress, or stacking too much",
  },
  {
    value: "usually_fine",
    label: "Usually tolerates new products",
    hint: "Rare hiccups if I overdo acids or retinoids",
  },
  {
    value: "iron_barrier",
    label: "Rarely irritated",
    hint: "Can layer more without drama — still not invincible",
  },
];

export const SPF_OPTIONS: {
  value: SpfHabit;
  label: string;
  hint: string;
}[] = [
  { value: "always", label: "Every day, year-round", hint: "Indoors too; it’s a default step" },
  { value: "most_days", label: "Most days (5+ per week)", hint: "Miss occasionally but generally consistent" },
  { value: "sometimes", label: "Sometimes / seasonally", hint: "Sunny days, summer, or when outdoors" },
  { value: "rare", label: "Rarely", hint: "A few times a month or less" },
  { value: "never", label: "Almost never", hint: "Honest baseline — we will emphasize SPF picks" },
];

const STRONG_ACTIVES = new Set([
  "to-retinol-squalane",
  "to-glycolic-toner",
  "to-vitamin-c-suspension",
  "differin-gel",
  "sunday-good-genes",
  "sunday-luna",
  "murad-retinol-serum",
  "murad-aha-bha-cleanser",
  "kate-exfolikate",
  "tretinoin-generic",
  "de-framboos",
  "de-cfirma",
  "glamglow-supermud",
]);

export function quizProfileToGuideFeel(profile: QuizSkinProfile): SkinFeel {
  switch (profile) {
    case "oily_tzone":
    case "oily_allover":
    case "oily_dehydrated":
      return "oily";
    case "dry_tight":
    case "dry_flaky":
      return "dry";
    case "combo_classic":
    case "combo_reverse":
      return "combo";
    default:
      return "balanced";
  }
}

function isHighSensitivity(s: Sensitivity): boolean {
  return s === "burns_easily" || s === "often_stings";
}

function isLowSensitivity(s: Sensitivity): boolean {
  return s === "usually_fine" || s === "iron_barrier";
}

function baseByFeel(feel: SkinFeel): string[] {
  switch (feel) {
    case "oily":
      return [
        "tula-cleanser",
        "paula-bha",
        "to-niacinamide",
        "neutrogena-hydro-boost",
        "la-roche-anthelios",
      ];
    case "dry":
      return [
        "philosophy-purity",
        "anua-heartleaf-toner",
        "cosrx-snail",
        "cerave-moisturizing-cream",
        "paula-omega",
        "laneige-water-mask",
      ];
    case "combo":
      return [
        "yttp-superfood-cleanser",
        "anua-heartleaf-toner",
        "fenty-fat-water",
        "cerave-pm",
        "la-roche-toleriane",
        "supergoop-unseen",
      ];
    case "balanced":
    default:
      return [
        "fresh-soy",
        "kiehls-ultra-facial",
        "ole-banana-bright",
        "supergoop-unseen",
        "tower28-sos",
      ];
  }
}

/** Tune catalog picks from the finer skin profile */
function profileProductBoost(profile: QuizSkinProfile): string[] {
  switch (profile) {
    case "oily_dehydrated":
      return ["cosrx-snail", "fab-ultra-repair", "anua-heartleaf-toner", "laneige-cream-skin"];
    case "oily_tzone":
      return ["paula-bha", "to-niacinamide", "neutrogena-hydro-boost"];
    case "oily_allover":
      return ["tula-cleanser", "glamglow-supermud", "to-niacinamide"];
    case "dry_flaky":
      return ["cerave-moisturizing-cream", "paula-omega", "vanicream-gentle", "fab-ultra-repair"];
    case "dry_tight":
      return ["anua-heartleaf-toner", "cerave-moisturizing-cream", "kiehls-ultra-facial"];
    case "combo_reverse":
      return ["fenty-fat-water", "cerave-pm", "anua-heartleaf-toner", "la-roche-toleriane"];
    case "combo_classic":
      return ["yttp-superfood-cleanser", "fenty-fat-water", "cerave-pm"];
    default:
      return ["fresh-soy", "kiehls-ultra-facial", "supergoop-unseen"];
  }
}

function concernBoost(concern: Concern): string[] {
  switch (concern) {
    case "breakouts":
      return ["differin-gel", "paula-bha", "to-niacinamide", "glamglow-supermud"];
    case "hormonal_acne":
      return ["differin-gel", "to-niacinamide", "paula-bha", "origins-mega-mushroom"];
    case "congestion":
      return ["paula-bha", "glamglow-supermud", "to-glycolic-toner", "to-niacinamide"];
    case "pores":
      return ["paula-bha", "to-niacinamide", "glamglow-supermud", "fenty-fat-water"];
    case "texture":
      return ["to-glycolic-toner", "dermalogica-daily-microfoliant", "sunday-good-genes"];
    case "redness":
      return [
        "anua-heartleaf-toner",
        "origins-mega-mushroom",
        "drjart-cicapair",
        "tower28-sos",
        "vanicream-gentle",
      ];
    case "barrier":
      return [
        "vanicream-gentle",
        "cerave-moisturizing-cream",
        "la-roche-toleriane",
        "anua-heartleaf-toner",
        "tower28-sos",
      ];
    case "lines":
      return ["el-anr", "murad-retinol-serum", "de-protini", "itc-confidence-cream"];
    case "tone":
      return [
        "anua-niacinamide-serum",
        "caudalie-vinoperfect",
        "to-vitamin-c-suspension",
        "ole-banana-bright",
        "glow-dew-drops",
      ];
    case "dehydration":
    default:
      return [
        "anua-heartleaf-toner",
        "fab-ultra-repair",
        "ptr-water-drench",
        "laneige-cream-skin",
        "cosrx-snail",
      ];
  }
}

const PROFILE_LABEL: Record<QuizSkinProfile, string> = {
  oily_tzone: "Oil-forward T-zone",
  oily_allover: "Oil-forward all over",
  oily_dehydrated: "Oily-dehydrated skin",
  dry_tight: "Dry (tight) skin",
  dry_flaky: "Dry (flaky) skin",
  combo_classic: "Classic combination skin",
  combo_reverse: "Combination (reverse pattern)",
  balanced_steady: "Mostly balanced skin",
};

function concernDisplayLabel(c: Concern): string {
  return CONCERN_OPTIONS.find((o) => o.value === c)?.label ?? c;
}

function skinFeelDisplayLabel(feel: SkinFeel): string {
  return SKIN_FEEL_OPTIONS.find((o) => o.value === feel)?.label ?? feel;
}

function quizProfileDisplayLabel(profile: QuizSkinProfile): string {
  return QUIZ_SKIN_PROFILE_OPTIONS.find((o) => o.value === profile)?.label ?? profile;
}

function sortPickReasons(reasons: string[]): string[] {
  const stepRank = (s: string) => {
    const m = /^Step (\d)/.exec(s);
    return m ? parseInt(m[1]!, 10) : 99;
  };
  return [...reasons].sort((a, b) => stepRank(a) - stepRank(b) || a.localeCompare(b));
}

function normalizeBrandKey(brand: string): string {
  return brand.trim().toLowerCase();
}

function productMatchesFavoriteBrands(
  productId: string,
  favoriteBrands: readonly string[]
): boolean {
  if (favoriteBrands.length === 0) return false;
  const p = getCatalogProductById(productId);
  if (!p) return false;
  const key = normalizeBrandKey(p.brand);
  return favoriteBrands.some((b) => normalizeBrandKey(b) === key);
}

function relevantCatalogIdsForQuiz(
  skinProfile: QuizSkinProfile,
  concerns: Concern[],
  coarseFeel: SkinFeel,
  spfHabit: SpfHabit
): Set<string> {
  const ids = new Set<string>();
  const add = (arr: readonly string[]) => {
    for (const id of arr) {
      if (getCatalogProductById(id)) ids.add(id);
    }
  };
  add(baseByFeel(coarseFeel));
  add(profileProductBoost(skinProfile));
  for (const c of concerns) add(concernBoost(c));
  if (spfHabit === "rare" || spfHabit === "never" || spfHabit === "sometimes") {
    add(["supergoop-unseen", "la-roche-anthelios", "fenty-hydra-vizor"]);
  }
  return ids;
}

function prioritizeByFavoriteBrands(
  order: string[],
  favoriteBrands: readonly string[]
): string[] {
  if (favoriteBrands.length === 0) return order;
  const fav: string[] = [];
  const rest: string[] = [];
  for (const id of order) {
    if (productMatchesFavoriteBrands(id, favoriteBrands)) fav.push(id);
    else rest.push(id);
  }
  return [...fav, ...rest];
}

function formatFavoriteBrandsReason(brands: readonly string[]): string {
  const list =
    brands.length <= 3
      ? brands.join(", ")
      : `${brands.slice(0, 3).join(", ")} +${brands.length - 3} more`;
  return `Step 5 — Favorite brands: we prioritized ${list} where they fit your profile`;
}

const CONCERN_LABEL: Record<Concern, string> = {
  breakouts: "active breakouts",
  hormonal_acne: "hormonal or jawline breakouts",
  congestion: "congestion and clogged pores",
  pores: "visible pores",
  texture: "texture or dullness",
  redness: "redness or flushing",
  barrier: "a fragile barrier",
  lines: "fine lines or firmness",
  tone: "tone or post-blemish marks",
  dehydration: "dehydration or water loss",
};

function formatConcernPhrase(concerns: Concern[]): string {
  const bits = concerns.map((c) => CONCERN_LABEL[c]);
  if (bits.length === 1) return bits[0]!;
  if (bits.length === 2) return `${bits[0]} and ${bits[1]}`;
  return `${bits.slice(0, -1).join(", ")}, and ${bits[bits.length - 1]}`;
}

function profileCopy(
  profile: QuizSkinProfile,
  concerns: Concern[]
): { title: string; body: string } {
  const titleBits = concerns.map((c) => CONCERN_LABEL[c]).join(" · ");
  return {
    title: `${PROFILE_LABEL[profile]} · ${titleBits}`,
    body: `You chose ${PROFILE_LABEL[profile].toLowerCase()} with ${formatConcernPhrase(concerns)} as your top ${concerns.length === 1 ? "focus" : "focuses"}. The routine lines and catalog picks below blend those priorities—patch test, add one new product at a time, and adjust with a professional if you use prescriptions.`,
  };
}

function sensitivityAction(sensitivity: Sensitivity): string {
  if (isHighSensitivity(sensitivity)) {
    return "Keep changes slow: one new product at a time, more recovery nights, and avoid stacking exfoliants with retinoids early.";
  }
  if (sensitivity === "mixed") {
    return "Use a steady ramp: try new treatments a few nights weekly before making them daily.";
  }
  return "Your answers suggest more tolerance, but strong actives still work best when introduced gradually.";
}

function spfAction(spfHabit: SpfHabit): string {
  if (spfHabit === "always" || spfHabit === "most_days") {
    return "Your SPF habit supports brighter-tone and texture goals, so the routine can focus on consistency and smart active timing.";
  }
  if (spfHabit === "sometimes") {
    return "Make SPF the easiest morning step first; tone, texture, and retinoid goals depend on that baseline.";
  }
  return "Start with an SPF texture you actually like before adding ambitious brightening or resurfacing steps.";
}

function buildActionCards(answers: {
  skinProfile: QuizSkinProfile;
  sensitivity: Sensitivity;
  spfHabit: SpfHabit;
  concerns: Concern[];
  favoriteBrands: string[];
}): QuizActionCard[] {
  const topConcern = answers.concerns[0]!;
  const favoriteCopy =
    answers.favoriteBrands.length > 0
      ? ` Favorite brands were used as a tie-breaker where they matched your skin goals.`
      : "";

  return [
    {
      title: "What We Heard",
      body: `${quizProfileDisplayLabel(answers.skinProfile)} with ${formatConcernPhrase(
        answers.concerns
      )} as your main focus.${favoriteCopy}`,
    },
    {
      title: "Start Here",
      body: `${concernDisplayLabel(
        topConcern
      )} is your first priority, so save the matching routine steps before adding extras.`,
    },
    {
      title: "Go Slow With",
      body: `${sensitivityAction(answers.sensitivity)} ${spfAction(answers.spfHabit)}`,
    },
  ];
}

function pmLinesForConcern(concern: Concern): string[] {
  switch (concern) {
    case "breakouts":
    case "hormonal_acne":
      return [
        "Double cleanse if using SPF/makeup",
        "Treatment (BHA or adapalene where appropriate)—avoid stacking two strong actives night one",
        "Barrier moisturizer; spot treat inflamed areas",
      ];
    case "congestion":
    case "pores":
      return [
        "Oil cleanse or balm only if sunscreen/makeup needs it",
        "Salicylic on congested zones a few nights per week",
        "Repair cream on nights off acids",
      ];
    case "texture":
      return [
        "Cleanse",
        "Exfoliant 2–3×/week only (not nightly at first)",
        "Repair cream",
      ];
    case "redness":
    case "barrier":
      return [
        "Fragrance-free cleanse",
        "Soothing serum or lotion",
        "Occlusive or balm on irritated nights",
      ];
    case "lines":
      return [
        "Cleanse",
        "Peptide or retinoid night (if tolerated)",
        "Nourishing cream",
      ];
    case "tone":
      return [
        "Cleanse",
        "Vitamin C or pigment serum (AM) / gentle renewer (PM)",
        "Moisturizer",
      ];
    case "dehydration":
    default:
      return ["Cleanse", "Layer humectant then cream", "Seal with balm if very dry"];
  }
}

function mergePmLines(concerns: Concern[]): string[] {
  const out: string[] = [];
  for (const c of concerns) {
    for (const line of pmLinesForConcern(c)) {
      if (!out.includes(line)) out.push(line);
    }
  }
  return out.slice(0, 6);
}

function routineLines(
  profile: QuizSkinProfile,
  concerns: Concern[],
  spf: SpfHabit
): { am: string[]; pm: string[] } {
  const spfLine =
    spf === "never" || spf === "rare"
      ? "SPF every day is the biggest upgrade—try 2–3 textures until one feels wearable daily."
      : spf === "sometimes"
        ? "Aim for daily SPF; reapply on active outdoor days."
        : spf === "most_days"
          ? "You are close—closing the gap to daily SPF protects tone and any retinoid work."
          : "Keep your consistent SPF—it protects tone and supports any treatment steps.";

  const coarse = quizProfileToGuideFeel(profile);

  let amCore: string[];
  if (coarse === "oily") {
    amCore =
      profile === "oily_dehydrated"
        ? [
            "Gentle low-foam cleanser",
            "Humectant toner or essence (no alcohol splash)",
            "Gel-cream hydrator—oil is not the same as water",
            "SPF 30+ (gel or fluid often layers best)",
          ]
        : profile === "oily_tzone"
          ? [
              "Gel cleanser; lighter massage on dry cheeks",
              "BHA or niacinamide on oily zones only at first",
              "Zone-friendly moisturizer (lighter center, richer cheeks if needed)",
              "SPF 30+",
            ]
          : [
              "Gentle gel cleanser",
              "BHA or niacinamide (not both at first)",
              "Oil-free hydrator",
              "SPF 30+",
            ];
  } else if (coarse === "dry") {
    amCore =
      profile === "dry_flaky"
        ? [
            "Cream or balm cleanser",
            "Hydrating essence or serum on damp skin",
            "Rich cream with ceramides or occlusives as needed",
            "SPF 30+ (cream or tinted mineral if flakes show through)",
          ]
        : [
            "Cream or milk cleanser",
            "Hydrating essence or serum",
            "Rich cream",
            "SPF 30+",
          ];
  } else if (coarse === "combo") {
    amCore =
      profile === "combo_reverse"
        ? [
            "Mild cleanser",
            "Hydrating serum first; oil-control only where cheeks need it",
            "Split moisturizer strategy if zones disagree",
            "SPF 30+",
          ]
        : [
            "Mild cleanser",
            "Light humectant toner or serum",
            "Zone-friendly moisturizer",
            "SPF 30+",
          ];
  } else {
    amCore = [
      "Simple cleanser",
      "Antioxidant serum optional",
      "Moisturizer you enjoy",
      "SPF 30+",
    ];
  }

  const pmBase = mergePmLines(concerns);

  return {
    am: [...amCore.slice(0, 3), spfLine],
    pm: pmBase,
  };
}

export function buildQuizResult(answers: QuizAnswers): QuizResult | null {
  const { skinProfile, concerns, sensitivity, spfHabit, favoriteBrands } = answers;
  if (
    !skinProfile ||
    concerns.length === 0 ||
    concerns.length > MAX_QUIZ_PRIORITIES ||
    !sensitivity ||
    !spfHabit
  ) {
    return null;
  }

  const { title, body } = profileCopy(skinProfile, concerns);
  const actionCards = buildActionCards({
    skinProfile,
    concerns,
    sensitivity,
    spfHabit,
    favoriteBrands,
  });
  const { am, pm } = routineLines(skinProfile, concerns, spfHabit);
  const coarseFeel = quizProfileToGuideFeel(skinProfile);

  const pickReasons = new Map<string, Set<string>>();
  const order: string[] = [];

  const touch = (id: string, reason: string) => {
    if (!getCatalogProductById(id)) return;
    if (!pickReasons.has(id)) {
      pickReasons.set(id, new Set());
      order.push(id);
    }
    pickReasons.get(id)!.add(reason);
  };

  const touchMany = (ids: readonly string[], reason: string) => {
    for (const id of ids) touch(id, reason);
  };

  const rSkinBase = `Step 1 — How your skin feels: base ideas for ${skinFeelDisplayLabel(coarseFeel)} skin`;
  const rSkinDetail = `Step 1 — How your skin feels: tuned for “${quizProfileDisplayLabel(skinProfile)}”`;

  touchMany(baseByFeel(coarseFeel), rSkinBase);
  touchMany(profileProductBoost(skinProfile), rSkinDetail);

  for (const c of concerns) {
    touchMany(
      concernBoost(c),
      `Step 2 — What you want help with: ${concernDisplayLabel(c)}`
    );
  }

  if (spfHabit === "rare" || spfHabit === "never" || spfHabit === "sometimes") {
    touchMany(
      ["supergoop-unseen", "la-roche-anthelios", "fenty-hydra-vizor"],
      "Step 4 — SPF habit: added sunscreen textures to try (per your answers)"
    );
  }

  if (isHighSensitivity(sensitivity)) {
    const nextOrder = order.filter((id) => !STRONG_ACTIVES.has(id));
    order.length = 0;
    order.push(...nextOrder);
    for (const id of Array.from(pickReasons.keys())) {
      if (STRONG_ACTIVES.has(id)) pickReasons.delete(id);
    }
    touchMany(
      [
        "anua-heartleaf-toner",
        "vanicream-gentle",
        "la-roche-toleriane",
        "tower28-sos",
        "origins-mega-mushroom",
      ],
      "Step 3 — Reactions to new actives: gentler picks after a reactive-skin pass"
    );
  }

  if (sensitivity === "burns_easily") {
    touchMany(
      ["drjart-cicapair", "vanicream-gentle"],
      "Step 3 — Reactions to new actives: extra soothing for very reactive skin"
    );
  }

  if (
    isLowSensitivity(sensitivity) &&
    concerns.some((c) => c === "texture" || c === "congestion")
  ) {
    touchMany(
      ["to-glycolic-toner", "sunday-good-genes"],
      "Step 3 — Reactions to new actives: you tolerate more — optional stronger renewers"
    );
  }

  if (favoriteBrands.length > 0) {
    const brandReason = formatFavoriteBrandsReason(favoriteBrands);
    const relevant = relevantCatalogIdsForQuiz(
      skinProfile,
      concerns,
      coarseFeel,
      spfHabit
    );
    for (const brand of favoriteBrands) {
      const brandKey = normalizeBrandKey(brand);
      const candidates = PRODUCT_CATALOG.filter(
        (p) =>
          normalizeBrandKey(p.brand) === brandKey &&
          relevant.has(p.id) &&
          (!isHighSensitivity(sensitivity) || !STRONG_ACTIVES.has(p.id))
      );
      let added = 0;
      for (const p of candidates) {
        if (added >= 2) break;
        if (!order.includes(p.id)) {
          touch(p.id, brandReason);
          added++;
        }
      }
    }

    for (let i = 0; i < order.length; i++) {
      const id = order[i]!;
      if (productMatchesFavoriteBrands(id, favoriteBrands)) {
        pickReasons.get(id)?.add(brandReason);
      }
    }

    const prioritized = prioritizeByFavoriteBrands(order, favoriteBrands);
    order.length = 0;
    order.push(...prioritized);
  }

  const productPool = expandProductPool(order, answers);
  const routineSteps = buildQuizRoutineSteps(am, pm, productPool, favoriteBrands);

  const catalogPicks: QuizCatalogPick[] = order.slice(0, 8).map((productId) => ({
    productId,
    reasons: sortPickReasons([...(pickReasons.get(productId) ?? [])]),
  }));

  return {
    profileTitle: title,
    profileBody: body,
    actionCards,
    routineAm: am,
    routinePm: pm,
    routineSteps,
    catalogPicks,
  };
}

export function resolveQuizProducts(ids: string[]): CatalogProduct[] {
  return ids
    .map((id) => getCatalogProductById(id))
    .filter((p): p is CatalogProduct => p !== undefined);
}

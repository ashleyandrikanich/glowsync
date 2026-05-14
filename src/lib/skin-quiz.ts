/**
 * Skin profile quiz → illustrative product picks from the local catalog + routine ideas.
 * Not diagnostic; for education and exploration only.
 */

import { getCatalogProductById, type CatalogProduct } from "./product-catalog";

export type SkinFeel = "oily" | "dry" | "combo" | "balanced";
export type Concern =
  | "breakouts"
  | "texture"
  | "redness"
  | "lines"
  | "tone"
  | "dehydration";
export type Sensitivity = "high" | "medium" | "low";
export type SpfHabit = "always" | "sometimes" | "rare";

export type QuizAnswers = {
  skinFeel: SkinFeel | null;
  concern: Concern | null;
  sensitivity: Sensitivity | null;
  spfHabit: SpfHabit | null;
};

export type QuizResult = {
  profileTitle: string;
  profileBody: string;
  routineAm: string[];
  routinePm: string[];
  productIds: string[];
};

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

export const CONCERN_OPTIONS: {
  value: Concern;
  label: string;
  hint: string;
}[] = [
  { value: "breakouts", label: "Breakouts", hint: "Clogs, spots, or texture from oil" },
  { value: "texture", label: "Texture / dullness", hint: "Roughness or lack of glow" },
  { value: "redness", label: "Redness / reactive", hint: "Flushes, stings, or irritation" },
  { value: "lines", label: "Lines / firmness", hint: "Fine lines or less bounce" },
  { value: "tone", label: "Tone / marks", hint: "Spots, PIH, or uneven color" },
  { value: "dehydration", label: "Dehydration", hint: "Water loss — tight but can be any type" },
];

export const SENSITIVITY_OPTIONS: {
  value: Sensitivity;
  label: string;
  hint: string;
}[] = [
  { value: "high", label: "Very reactive", hint: "Often stings or flares with new actives" },
  { value: "medium", label: "Sometimes", hint: "Occasional irritation if I rush" },
  { value: "low", label: "Pretty resilient", hint: "Usually tolerates actives" },
];

export const SPF_OPTIONS: {
  value: SpfHabit;
  label: string;
  hint: string;
}[] = [
  { value: "always", label: "Daily habit", hint: "Most mornings, year-round" },
  { value: "sometimes", label: "On and off", hint: "Mostly sunny days or summer" },
  { value: "rare", label: "Rarely", hint: "Working on building the habit" },
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
        "cosrx-snail",
        "cerave-moisturizing-cream",
        "paula-omega",
        "laneige-water-mask",
      ];
    case "combo":
      return [
        "yttp-superfood-cleanser",
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

function concernBoost(concern: Concern): string[] {
  switch (concern) {
    case "breakouts":
      return ["differin-gel", "paula-bha", "to-niacinamide", "glamglow-supermud"];
    case "texture":
      return ["to-glycolic-toner", "dermalogica-daily-microfoliant", "sunday-good-genes"];
    case "redness":
      return ["origins-mega-mushroom", "drjart-cicapair", "tower28-sos", "vanicream-gentle"];
    case "lines":
      return ["el-anr", "murad-retinol-serum", "de-protini", "itc-confidence-cream"];
    case "tone":
      return ["caudalie-vinoperfect", "to-vitamin-c-suspension", "ole-banana-bright", "glow-dew-drops"];
    case "dehydration":
    default:
      return ["fab-ultra-repair", "ptr-water-drench", "laneige-cream-skin", "cosrx-snail"];
  }
}

function profileCopy(feel: SkinFeel, concern: Concern): { title: string; body: string } {
  const feelLabel: Record<SkinFeel, string> = {
    oily: "Oil-forward skin",
    dry: "Dry or tight skin",
    combo: "Combination skin",
    balanced: "Mostly balanced skin",
  };
  const concernLabel: Record<Concern, string> = {
    breakouts: "congestion or breakouts",
    texture: "texture or dullness",
    redness: "redness or reactivity",
    lines: "fine lines or firmness",
    tone: "tone or post-blemish marks",
    dehydration: "dehydration or barrier dryness",
  };
  return {
    title: `${feelLabel[feel]} · ${concernLabel[concern]}`,
    body: `You told us your skin leans ${feelLabel[feel].toLowerCase()} with ${concernLabel[concern]} as a focus. The picks below are starting points from our catalog — patch test, introduce one new product at a time, and adjust with a professional if you use prescriptions.`,
  };
}

function routineLines(
  feel: SkinFeel,
  concern: Concern,
  spf: SpfHabit
): { am: string[]; pm: string[] } {
  const spfLine =
    spf === "rare"
      ? "SPF every day is the biggest upgrade — pick a texture you will actually wear."
      : spf === "sometimes"
        ? "Aim for daily SPF; reapply on active days outdoors."
        : "Keep your consistent SPF — it protects tone and lines work too.";

  const amBase =
    feel === "oily"
      ? ["Gentle gel cleanser", "BHA or niacinamide (not both at first)", "Oil-free hydrator", "SPF 30+"]
      : feel === "dry"
        ? ["Cream or milk cleanser", "Hydrating essence or serum", "Rich cream", "SPF 30+"]
        : feel === "combo"
          ? ["Mild cleanser", "Light humectant toner or serum", "Zone-friendly moisturizer", "SPF 30+"]
          : ["Simple cleanser", "Antioxidant serum optional", "Moisturizer you enjoy", "SPF 30+"];

  const pmBase =
    concern === "breakouts"
      ? ["Double cleanse if using SPF/makeup", "Treatment (BHA or adapalene if appropriate)", "Barrier moisturizer"]
      : concern === "texture"
        ? ["Cleanse", "Exfoliant 2–3×/week only (not nightly at first)", "Repair cream"]
        : concern === "redness"
          ? ["Fragrance-free cleanse", "Soothing serum or lotion", "Occlusive or balm on irritated nights"]
          : concern === "lines"
            ? ["Cleanse", "Peptide or retinoid night (if tolerated)", "Nourishing cream"]
            : concern === "tone"
              ? ["Cleanse", "Vitamin C or pigment serum (AM) / gentle renewer (PM)", "Moisturizer"]
              : ["Cleanse", "Layer humectant then cream", "Seal with balm if very dry"];

  return {
    am: [...amBase.slice(0, 3), spfLine],
    pm: pmBase,
  };
}

export function buildQuizResult(answers: QuizAnswers): QuizResult | null {
  const { skinFeel, concern, sensitivity, spfHabit } = answers;
  if (!skinFeel || !concern || !sensitivity || !spfHabit) return null;

  const { title, body } = profileCopy(skinFeel, concern);
  const { am, pm } = routineLines(skinFeel, concern, spfHabit);

  const ids: string[] = [];
  const push = (arr: string[]) => {
    for (const id of arr) {
      if (!ids.includes(id) && getCatalogProductById(id)) ids.push(id);
    }
  };

  push(baseByFeel(skinFeel));
  push(concernBoost(concern));

  if (spfHabit !== "always") {
    push(["supergoop-unseen", "la-roche-anthelios", "fenty-hydra-vizor"]);
  }

  if (sensitivity === "high") {
    const filtered = ids.filter((id) => !STRONG_ACTIVES.has(id));
    ids.length = 0;
    ids.push(...filtered);
    push(["vanicream-gentle", "la-roche-toleriane", "tower28-sos", "origins-mega-mushroom"]);
  }

  const unique = [...new Set(ids)].filter((id) => getCatalogProductById(id));
  const productIds = unique.slice(0, 8);

  return {
    profileTitle: title,
    profileBody: body,
    routineAm: am,
    routinePm: pm,
    productIds,
  };
}

export function resolveQuizProducts(ids: string[]): CatalogProduct[] {
  return ids
    .map((id) => getCatalogProductById(id))
    .filter((p): p is CatalogProduct => p !== undefined);
}

/**
 * Educational routine framing by skin feel — aligns with `SkinFeel` in skin-quiz.
 * Not medical advice; conservative layering hints only.
 */

import type { SkinFeel } from "./skin-quiz";

export type RoutineGuideBlock = {
  headline: string;
  blurb: string;
  /** Short “why this shape” for the expandable panel */
  rationale: string;
  am: string[];
  pm: string[];
  layeringTips: string[];
  /** Ingredient angles to explore in the Actives Library */
  activeAngles: string[];
};

export const ROUTINE_GUIDE_BY_SKIN: Record<SkinFeel, RoutineGuideBlock> = {
  oily: {
    headline: "Keep mornings breathable",
    blurb:
      "Oil-rich skin still needs moisture and SPF—just in thinner films so pores are not smothered. Think gel textures, humectants, and one strong active at a time.",
    rationale:
      "Over-stripping triggers rebound oil; a light hydrator plus SPF stops you from compensating with heavy midday balms.",
    am: [
      "Gel or lightly foaming cleanser — quick rinse, no squeaky tightness.",
      "Optional: antioxidant serum (vitamin C) if you tolerate it; pat in on slightly damp skin.",
      "Oil-free or gel-cream moisturizer; skip thick occlusives unless wind or tretinoin demands them.",
      "SPF 30+ every day — mineral or hybrid often feels less greasy; reapply with powder SPF if that helps compliance.",
    ],
    pm: [
      "Second cleanse only if you wore water-resistant SPF or makeup.",
      "BHA (salicylic) a few nights per week on oily zones if you are not pregnant and patch-tested.",
      "Niacinamide can support oil appearance and barrier — space away from very low-pH vitamin C same session if either stings.",
      "Spot treat breakouts instead of treating the whole face like a problem zone every night.",
    ],
    layeringTips: [
      "Apply thinnest → thickest; wait a minute between watery serums and creams if things pill.",
      "If you use retinoids, sandwich with moisturizer on flaky days rather than skipping SPF the next morning.",
      "Dehydrated-oily? Add a glycerin or HA layer before cream — water ≠ oil.",
    ],
    activeAngles: [
      "Salicylic acid (BHA) for pores and congestion",
      "Niacinamide for oil look + barrier support",
      "Vitamin C in AM under SPF for brightening support",
    ],
  },
  dry: {
    headline: "Barrier first, actives second",
    blurb:
      "Dry skin tolerates fewer simultaneous strippers. Build a cushion of humectants and lipids, then introduce retinoids or acids slowly.",
    rationale:
      "When the barrier is thin, water escapes fast; creams lock steps in and reduce stinging from actives.",
    am: [
      "Cream or milk cleanse — or splash with water if you did not sweat overnight.",
      "Hydrating toner or essence on damp skin (hyaluronic acid, glycerin, panthenol).",
      "Face oil or serum with ceramides / fatty acids if winter or wind.",
      "Rich day cream, then SPF — tinted mineral creams can replace a heavy makeup layer.",
    ],
    pm: [
      "Oil or balm first if SPF or makeup, then gentle second cleanse.",
      "One exfoliating night per week to start — lactic or PHA is often kinder than glycolic on tight skin.",
      "Retinoid nights: buffer with moisturizer underneath or on top until comfortable.",
      "Seal with occlusive balm on cheeks only if you are not breakout-prone there.",
    ],
    layeringTips: [
      "Pat, do not rub, when skin is flaky — micro-tears make everything sting.",
      "If retinol flakes you, use it every third night for two weeks, then every other.",
      "Humidifier in dry climates often matters more than adding a fifth serum.",
    ],
    activeAngles: [
      "Hyaluronic acid + damp skin for plumpness",
      "Ceramides and lipids in moisturizer",
      "Gentler acids (lactic, mandelic) before jumping to high-strength glycolic",
    ],
  },
  combo: {
    headline: "Zone play: lighter center, richer cheeks",
    blurb:
      "Combination skin is really two micro-climates. You can split textures — lighter gels on the T-zone and richer creams on cheeks and jaw.",
    rationale:
      "One uniform routine often over-feeds the center or starves the perimeter; small texture tweaks beat doubling everything.",
    am: [
      "Balanced cleanser — not ultra-stripping, not ultra-rich.",
      "Hydrating layer everywhere; gel moisturizer on nose and forehead, creamier layer pressed onto cheeks.",
      "SPF full face — gel SPF on center, cream SPF on dry patches if two textures help you comply.",
    ],
    pm: [
      "BHA or clay on T-zone only on oilier nights; skip dry cheeks.",
      "Cheeks get extra moisturizer or sleeping mask; center stays lighter so pores stay clear.",
      "Retinoid: start on full face thinly, then buffer dry zones more heavily if peeling is uneven.",
    ],
    layeringTips: [
      "If makeup separates on the nose only, mattify that zone before foundation instead of mattifying the whole face.",
      "Seasonal pivot: summer leans oilier in the center; winter leans drier on cheeks — adjust one product, not the whole shelf.",
    ],
    activeAngles: [
      "Salicylic on T-zone vs gentler exfoliants on cheeks",
      "Niacinamide as a shared middle ground",
      "Keep zone-specific actives on a simple schedule if you use more than one the same day",
    ],
  },
  balanced: {
    headline: "Rhythm over reinvention",
    blurb:
      "Balanced skin still benefits from SPF, antioxidants, and a slow retinoid cadence for long-term texture and tone — without daily drama.",
    rationale:
      "The goal is maintenance: protect by day, repair by night, and change one variable at a time when seasons shift.",
    am: [
      "Gentle cleanser — you do not need maximum foam every morning.",
      "Vitamin C or other antioxidant if you like the glow bump.",
      "Light-to-medium moisturizer, then SPF 30+.",
    ],
    pm: [
      "Cleanse off SPF and pollution.",
      "Alternate or stack retinoid with hydrating nights — e.g. retinol Mon/Wed/Fri, extra moisture Tue/Thu.",
      "Weekly exfoliation if texture dulls — drop frequency if you add a new active.",
    ],
    layeringTips: [
      "When you feel tight in winter, add one lipid step instead of three new serums.",
      "Travel and stress can swing you combo or dry for a week — listen and simplify.",
    ],
    activeAngles: [
      "Vitamin C + SPF synergy in AM",
      "Retinoids paced for maintenance",
      "Avoid stacking two strong actives until your skin has adjusted",
    ],
  },
};

export const SENSITIVE_SKIN_ADDENDUM = {
  title: "Easily irritated? Stack these habits on any profile",
  lines: [
    "Patch-test new products behind the ear or jaw for several days.",
    "Introduce one new active at a time so you know what changed.",
    "Shorter contact (rinse-off BHA) can give benefits with less sting than leave-on at first.",
    "If something burns, that is not “working” — pause and moisturize; see a clinician for persistent reactions.",
  ],
};

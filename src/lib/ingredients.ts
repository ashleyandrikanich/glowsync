export type PairingVerdict = "safe" | "caution" | "avoid";

export const INGREDIENTS = [
  {
    id: "retinol",
    name: "Retinol",
    notes:
      "Vitamin A derivative that increases cell turnover. Usually PM; increases sun sensitivity.",
    teaser: "The famous PM overachiever.",
    funFact:
      "Retinol has been studied for decades—part of its charm is how much we actually know about it (and how gently your skin prefers to meet it).",
    tags: ["PM", "Anti-aging", "Cell turnover"],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C (L-ascorbic & friends)",
    notes:
      "Antioxidant; many forms exist. L-ascorbic acid loves a low, acidic pH. Pairs thoughtfully with SPF in the AM.",
    teaser: "Brightening’s brunch friend.",
    funFact:
      "Not all “vitamin C” serums use L-ascorbic acid—tetrasodium ascorbate and others can behave differently, so the label is always the real tea.",
    tags: ["AM", "Brightening", "Antioxidant"],
  },
  {
    id: "ahas",
    name: "AHAs (glycolic, lactic, mandelic…)",
    notes:
      "Alpha-hydroxy acids exfoliate the surface. Can tingle; respect barrier and SPF.",
    teaser: "Surface polish crew.",
    funFact:
      "Glycolic is the social butterfly (small molecule), while mandelic tends to be gentler and larger—same family, different party volume.",
    tags: ["Exfoliating", "Texture", "PM"],
  },
  {
    id: "niacinamide",
    name: "Niacinamide (vitamin B3)",
    notes:
      "Supports barrier, oil balance, and tone over time. Often well tolerated AM or PM.",
    teaser: "The versatile one everyone invites back.",
    funFact:
      "Studies often land around 2–5% for a sweet spot—more isn’t always merrier if your skin says “nope.”",
    tags: ["AM", "PM", "Barrier", "Oil balance"],
  },
  {
    id: "bha",
    name: "BHA (salicylic acid)",
    notes:
      "Oil-soluble exfoliant; loves pores and oilier zones. Can be drying if overused.",
    teaser: "Oil-friendly pore detective.",
    funFact:
      "Salicylic is related to aspirin—if you’re aspirin-allergic, flag it with a clinician before going all-in.",
    tags: ["Exfoliating", "Acne", "Pores"],
  },
  {
    id: "benzoyl-peroxide",
    name: "Benzoyl peroxide",
    notes:
      "Acne bacteria–busting classic. Can bleach fabrics and stress barrier; start low and slow.",
    teaser: "Acne’s loud but effective cousin.",
    funFact:
      "It can oxidize some other actives (like certain retinoids or vitamin C formulas)—timing and formulation matter more than drama threads.",
    tags: ["Acne", "AM", "PM"],
  },
  {
    id: "azelaic-acid",
    name: "Azelaic acid",
    notes:
      "Brightening and redness-friendly multitasker; often prescription-strength or OTC depending on region.",
    teaser: "The multitasker with a PhD vibe.",
    funFact:
      "Dermatologists sometimes pair azelaic with other actives—your label % and formula still run the show.",
    tags: ["Brightening", "Redness", "AM", "PM"],
  },
  {
    id: "pha",
    name: "PHAs (gluconolactone, lactobionic…)",
    notes:
      "Poly-hydroxy acids: gentler, larger molecules than many AHAs—humectant perks too.",
    teaser: "Exfoliation with training wheels (in a good way).",
    funFact:
      "PHAs can grab water while they work—helpful when you want glow without feeling sandpapered.",
    tags: ["Exfoliating", "Sensitive-friendly", "Hydration"],
  },
  {
    id: "ceramides",
    name: "Ceramides",
    notes:
      "Lipids that help mortar your barrier. Play well with almost everything.",
    teaser: "Barrier group hug.",
    funFact:
      "Your skin already makes ceramides—topical ones are like sending reinforcements when the wall feels wobbly.",
    tags: ["Barrier", "AM", "PM"],
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic acid",
    notes:
      "Humectant that draws water into the skin; loves damp skin and a cream on top in dry climates.",
    teaser: "A tall drink of water (literally).",
    funFact:
      "HA comes in different molecular weights—some sit on top for plumpness, others aim deeper; marketing loves to brag about both.",
    tags: ["Hydration", "AM", "PM"],
  },
  {
    id: "peptides",
    name: "Peptides",
    notes:
      "Signal fragments; lines vary from firming marketing to interesting research—patch test new formulas.",
    teaser: "Tiny protein texts to your skin.",
    funFact:
      "There isn’t one “peptide”—copper peptides, matrixyl family, etc. all RSVP to the party differently.",
    tags: ["Anti-aging", "PM", "AM"],
  },
  {
    id: "bakuchiol",
    name: "Bakuchiol",
    notes:
      "Plant-derived retinol alternative buzzword; generally gentler, still introduce slowly.",
    teaser: "Retinol’s plant-based pen pal.",
    funFact:
      "Studies are smaller than retinol’s scrapbook—exciting, but your skin’s opinion still counts most.",
    tags: ["PM", "Anti-aging", "Sensitive-friendly"],
  },
  {
    id: "adapalene",
    name: "Adapalene",
    notes:
      "Synthetic retinoid (often OTC gel). PM; strong photosensitivity; follow label spacing.",
    teaser: "Derm aisle retinoid energy.",
    funFact:
      "Adapalene is often studied for acne specifically—still a real retinoid with real rules about irritation.",
    tags: ["PM", "Acne", "Cell turnover"],
  },
  {
    id: "snail-mucin",
    name: "Snail mucin",
    notes:
      "Humectant-rich filtrate; popular in K-beauty for bounce and repair feel.",
    teaser: "Slime science (the cute kind).",
    funFact:
      "Not vegan—snails are unharmed in many farmed processes, but ethics vary; patch test if you’re protein-sensitive.",
    tags: ["Hydration", "Barrier", "PM"],
  },
  {
    id: "centella",
    name: "Centella / cica (asiatica)",
    notes:
      "Soothing botanical suite; common after sun or in “recovery” formulas.",
    teaser: "The cool compress of ingredients.",
    funFact:
      "Madecassoside, asiaticoside, and friends are all centella’s little hype squad—labels love to name-drop them.",
    tags: ["Soothing", "Redness", "AM", "PM"],
  },
  {
    id: "tranexamic-acid",
    name: "Tranexamic acid",
    notes:
      "Brightening helper for tone and post-blemish marks; often in serums or Rx contexts.",
    teaser: "Marks and uneven tone’s study buddy.",
    funFact:
      "Originally an oral medication for bleeding—dermatology borrowed it for pigment pathways; strength matters.",
    tags: ["Brightening", "PM"],
  },
  {
    id: "kojic-acid",
    name: "Kojic acid",
    notes:
      "Brightening agent from fungi fermentation; can irritate sensitive skin at higher %.",
    teaser: "Fermentation’s glow-up story.",
    funFact:
      "Often appears with vitamin C or AHAs in brightening cocktails—layering patience is the real MVP.",
    tags: ["Brightening", "PM"],
  },
  {
    id: "arbutin",
    name: "Arbutin (alpha / beta)",
    notes:
      "Tyrosinase-pathway brightener; cousin stories to hydroquinone exist—concentration and form matter.",
    teaser: "Pigment’s soft-focus filter.",
    funFact:
      "Alpha-arbutin is often pitched as gentler than beta—either way, SPF is still the headline act.",
    tags: ["Brightening", "PM", "AM"],
  },
  {
    id: "tretinoin",
    name: "Tretinoin (Rx)",
    notes:
      "Prescription retinoid—stronger than cosmetic retinol. PM; strict sun protection; clinician-directed.",
    teaser: "The Rx retinoid with main-character energy.",
    funFact:
      "Purging and peeling get memed a lot—your prescriber’s schedule beats any TikTok “sandwich” hack.",
    tags: ["PM", "Acne", "Anti-aging", "Rx"],
  },
  {
    id: "vitamin-e",
    name: "Vitamin E (tocopherol)",
    notes:
      "Antioxidant oil-soluble vitamin; stabilizing sidekick in many vitamin C serums.",
    teaser: "Vitamin C’s chill bodyguard.",
    funFact:
      "Tocopherol vs tocopheryl acetate isn’t the same activity—formulation chemistry strikes again.",
    tags: ["Antioxidant", "AM", "PM"],
  },
  {
    id: "green-tea",
    name: "Green tea (EGCG)",
    notes:
      "Polyphenol antioxidant; soothing in many formulas—rarely the “star %” on the label.",
    teaser: "Calm in a teacup.",
    funFact:
      "Extract quality varies wildly—CAMellia sinensis leaf extract could be a whisper or a shout.",
    tags: ["Antioxidant", "Soothing", "AM"],
  },
] as const;

export type Ingredient = (typeof INGREDIENTS)[number];
export type IngredientId = Ingredient["id"];

const pairingKey = (a: IngredientId, b: IngredientId) =>
  [a, b].sort().join(":");

/** Conservative same-routine guidance (not medical advice). Unlisted pairs default to safe. */
const PAIRINGS: Record<string, PairingVerdict> = {
  // Original trio
  [pairingKey("retinol", "vitamin-c")]: "caution",
  [pairingKey("retinol", "ahas")]: "avoid",
  [pairingKey("ahas", "vitamin-c")]: "caution",

  // Retinoids vs exfoliants / BP
  [pairingKey("retinol", "bha")]: "caution",
  [pairingKey("retinol", "pha")]: "caution",
  [pairingKey("retinol", "benzoyl-peroxide")]: "avoid",
  [pairingKey("adapalene", "ahas")]: "avoid",
  [pairingKey("adapalene", "bha")]: "caution",
  [pairingKey("adapalene", "pha")]: "caution",
  [pairingKey("adapalene", "vitamin-c")]: "caution",
  [pairingKey("adapalene", "benzoyl-peroxide")]: "avoid",
  [pairingKey("tretinoin", "ahas")]: "avoid",
  [pairingKey("tretinoin", "bha")]: "caution",
  [pairingKey("tretinoin", "pha")]: "caution",
  [pairingKey("tretinoin", "vitamin-c")]: "caution",
  [pairingKey("tretinoin", "benzoyl-peroxide")]: "avoid",

  // Double exfoliation / irritation stacks
  [pairingKey("ahas", "bha")]: "caution",
  [pairingKey("bha", "pha")]: "caution",
  [pairingKey("ahas", "pha")]: "caution",

  // Benzoyl peroxide conflicts / stress
  [pairingKey("benzoyl-peroxide", "vitamin-c")]: "caution",
  [pairingKey("benzoyl-peroxide", "ahas")]: "caution",
  [pairingKey("benzoyl-peroxide", "bha")]: "caution",
  [pairingKey("benzoyl-peroxide", "pha")]: "caution",

  // Brighteners + strong exfoliants
  [pairingKey("ahas", "kojic-acid")]: "caution",
  [pairingKey("ahas", "arbutin")]: "caution",
  [pairingKey("bha", "kojic-acid")]: "caution",
  [pairingKey("bha", "arbutin")]: "caution",
  [pairingKey("ahas", "tranexamic-acid")]: "caution",
  [pairingKey("bha", "tranexamic-acid")]: "caution",

  // Bakuchiol still plays with exfoliants
  [pairingKey("bakuchiol", "ahas")]: "caution",
  [pairingKey("bakuchiol", "bha")]: "caution",
  [pairingKey("bakuchiol", "retinol")]: "caution",

  // Stacking retinoids
  [pairingKey("retinol", "adapalene")]: "caution",
  [pairingKey("retinol", "tretinoin")]: "avoid",
  [pairingKey("adapalene", "tretinoin")]: "avoid",
};

export function evaluatePairing(
  a: IngredientId | "",
  b: IngredientId | ""
): { verdict: PairingVerdict | null; message: string } {
  if (!a || !b) {
    return { verdict: null, message: "Choose two ingredients to compare." };
  }
  if (a === b) {
    return {
      verdict: "safe",
      message: "Same ingredient — no conflict, but duplicate steps rarely add benefit.",
    };
  }
  const verdict = PAIRINGS[pairingKey(a, b)] ?? "safe";
  const messages: Record<PairingVerdict, string> = {
    safe: "No major documented conflict for typical layering — still introduce one active at a time.",
    caution:
      "Possible irritation or pH interaction — alternate days, separate AM/PM, or space with moisturizer; patch test.",
    avoid:
      "High risk of irritation or barrier stress in the same routine — avoid combining or get professional guidance.",
  };
  return { verdict, message: messages[verdict] };
}

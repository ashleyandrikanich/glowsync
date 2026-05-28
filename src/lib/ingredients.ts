export type PairingVerdict = "safe" | "caution" | "avoid";

export const INGREDIENTS = [
  {
    id: "retinol",
    name: "Retinol",
    notes:
      "Vitamin A derivative that increases cell turnover. Usually PM; increases sun sensitivity.",
    teaser: "PM vitamin A derivative that supports cell turnover.",
    funFact:
      "Retinol has been studied for decades, part of its charm is how much we actually know about it (and how gently your skin prefers to meet it).",
    tags: ["PM", "Anti-aging", "Cell turnover"],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C (L-ascorbic & friends)",
    notes:
      "Antioxidant; many forms exist. L-ascorbic acid loves a low, acidic pH. Pairs thoughtfully with SPF in the AM.",
    teaser: "Morning antioxidant often used for brightening and SPF support.",
    funFact:
      "Not all “vitamin C” serums use L-ascorbic acid, tetrasodium ascorbate and others can behave differently, so the label is always the real tea.",
    tags: ["AM", "Brightening", "Antioxidant"],
  },
  {
    id: "ahas",
    name: "AHAs (glycolic, lactic, mandelic…)",
    notes:
      "Alpha-hydroxy acids exfoliate the surface. Can tingle; respect barrier and SPF.",
    teaser: "Surface exfoliants that improve texture and radiance.",
    funFact:
      "Glycolic is the social butterfly (small molecule), while mandelic tends to be gentler and larger, same family, different party volume.",
    tags: ["Exfoliating", "Texture", "PM"],
  },
  {
    id: "niacinamide",
    name: "Niacinamide (vitamin B3)",
    notes:
      "Supports barrier, oil balance, and tone over time. Often well tolerated AM or PM.",
    teaser: "Versatile barrier and tone support for AM or PM.",
    funFact:
      "Studies often land around 2–5% for a sweet spot, more isn’t always merrier if your skin says “nope.”",
    tags: ["AM", "PM", "Barrier", "Oil balance"],
  },
  {
    id: "bha",
    name: "BHA (salicylic acid)",
    notes:
      "Oil-soluble exfoliant; loves pores and oilier zones. Can be drying if overused.",
    teaser: "Oil-soluble exfoliant for pores and blemish-prone areas.",
    funFact:
      "Salicylic is related to aspirin, if you’re aspirin-allergic, flag it with a clinician before going all-in.",
    tags: ["Exfoliating", "Acne", "Pores"],
  },
  {
    id: "benzoyl-peroxide",
    name: "Benzoyl peroxide",
    notes:
      "Acne bacteria–busting classic. Can bleach fabrics and stress barrier; start low and slow.",
    teaser: "Acne treatment that targets blemish-causing bacteria.",
    funFact:
      "It can oxidize some other actives (like certain retinoids or vitamin C formulas), timing and formulation matter more than drama threads.",
    tags: ["Acne", "AM", "PM"],
  },
  {
    id: "azelaic-acid",
    name: "Azelaic acid",
    notes:
      "Brightening and redness-friendly multitasker; often prescription-strength or OTC depending on region.",
    teaser: "Multitasker for tone, redness, and blemishes.",
    funFact:
      "Dermatologists sometimes pair azelaic with other actives, your label % and formula still run the show.",
    tags: ["Brightening", "Redness", "AM", "PM"],
  },
  {
    id: "pha",
    name: "PHAs (gluconolactone, lactobionic…)",
    notes:
      "Poly-hydroxy acids: gentler, larger molecules than many AHAs, humectant perks too.",
    teaser: "Gentler exfoliation with added hydration support.",
    funFact:
      "PHAs can grab water while they work, helpful when you want glow without feeling sandpapered.",
    tags: ["Exfoliating", "Sensitive-friendly", "Hydration"],
  },
  {
    id: "ceramides",
    name: "Ceramides",
    notes:
      "Lipids that help mortar your barrier. Play well with almost everything.",
    teaser: "Lipids that help strengthen the skin barrier.",
    funFact:
      "Your skin already makes ceramides, topical ones are like sending reinforcements when the wall feels wobbly.",
    tags: ["Barrier", "AM", "PM"],
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic acid",
    notes:
      "Humectant that draws water into the skin; loves damp skin and a cream on top in dry climates.",
    teaser: "Humectant that draws water into the skin.",
    funFact:
      "HA comes in different molecular weights, some sit on top for plumpness, others aim deeper; marketing loves to brag about both.",
    tags: ["Hydration", "AM", "PM"],
  },
  {
    id: "peptides",
    name: "Peptides",
    notes:
      "Signal fragments; lines vary from firming marketing to interesting research, patch test new formulas.",
    teaser: "Short protein fragments used in firming formulas.",
    funFact:
      "There isn’t one “peptide”, copper peptides, matrixyl family, etc. all RSVP to the party differently.",
    tags: ["Anti-aging", "PM", "AM"],
  },
  {
    id: "bakuchiol",
    name: "Bakuchiol",
    notes:
      "Plant-derived retinol alternative buzzword; generally gentler, still introduce slowly.",
    teaser: "Plant-based retinol alternative; generally milder.",
    funFact:
      "Studies are smaller than retinol’s scrapbook, exciting, but your skin’s opinion still counts most.",
    tags: ["PM", "Anti-aging", "Sensitive-friendly"],
  },
  {
    id: "adapalene",
    name: "Adapalene",
    notes:
      "Synthetic retinoid (often OTC gel). PM; strong photosensitivity; follow label spacing.",
    teaser: "OTC retinoid often used for acne; best at night.",
    funFact:
      "Adapalene is often studied for acne specifically, still a real retinoid with real rules about irritation.",
    tags: ["PM", "Acne", "Cell turnover"],
  },
  {
    id: "snail-mucin",
    name: "Snail mucin",
    notes:
      "Humectant-rich filtrate; popular in K-beauty for bounce and repair feel.",
    teaser: "Humectant-rich filtrate for hydration and bounce.",
    funFact:
      "Not vegan, snails are unharmed in many farmed processes, but ethics vary; patch test if you’re protein-sensitive.",
    tags: ["Hydration", "Barrier", "PM"],
  },
  {
    id: "centella",
    name: "Centella / cica (asiatica)",
    notes:
      "Soothing botanical suite; common after sun or in “recovery” formulas.",
    teaser: "Soothing botanical for calm, irritated-feeling skin.",
    funFact:
      "Madecassoside, asiaticoside, and friends are all centella’s little hype squad, labels love to name-drop them.",
    tags: ["Soothing", "Redness", "AM", "PM"],
  },
  {
    id: "tranexamic-acid",
    name: "Tranexamic acid",
    notes:
      "Brightening helper for tone and post-blemish marks; often in serums or Rx contexts.",
    teaser: "Supports even tone and post-blemish marks.",
    funFact:
      "Originally an oral medication for bleeding, dermatology borrowed it for pigment pathways; strength matters.",
    tags: ["Brightening", "PM"],
  },
  {
    id: "kojic-acid",
    name: "Kojic acid",
    notes:
      "Brightening agent from fungi fermentation; can irritate sensitive skin at higher %.",
    teaser: "Brightening agent from fermentation; may irritate sensitive skin.",
    funFact:
      "Often appears with vitamin C or AHAs in brightening cocktails, layering patience is the real MVP.",
    tags: ["Brightening", "PM"],
  },
  {
    id: "arbutin",
    name: "Arbutin (alpha / beta)",
    notes:
      "Tyrosinase-pathway brightener; cousin stories to hydroquinone exist, concentration and form matter.",
    teaser: "Brightening ingredient that targets uneven pigment.",
    funFact:
      "Alpha-arbutin is often pitched as gentler than beta, either way, SPF is still the headline act.",
    tags: ["Brightening", "PM", "AM"],
  },
  {
    id: "tretinoin",
    name: "Tretinoin (Rx)",
    notes:
      "Prescription retinoid, stronger than cosmetic retinol. PM; strict sun protection; clinician-directed.",
    teaser: "Prescription-strength retinoid; use as directed at night.",
    funFact:
      "Purging and peeling get memed a lot, your prescriber’s schedule beats any TikTok “sandwich” hack.",
    tags: ["PM", "Acne", "Anti-aging", "Rx"],
  },
  {
    id: "vitamin-e",
    name: "Vitamin E (tocopherol)",
    notes:
      "Antioxidant oil-soluble vitamin; stabilizing sidekick in many vitamin C serums.",
    teaser: "Antioxidant that often stabilizes vitamin C formulas.",
    funFact:
      "Tocopherol vs tocopheryl acetate isn’t the same activity, formulation chemistry strikes again.",
    tags: ["Antioxidant", "AM", "PM"],
  },
  {
    id: "green-tea",
    name: "Green tea (EGCG)",
    notes:
      "Polyphenol antioxidant; soothing in many formulas, rarely the “star %” on the label.",
    teaser: "Antioxidant botanical with soothing benefits.",
    funFact:
      "Extract quality varies wildly, CAMellia sinensis leaf extract could be a whisper or a shout.",
    tags: ["Antioxidant", "Soothing", "AM"],
  },
  {
    id: "panthenol",
    name: "Panthenol (pro-vitamin B5)",
    notes:
      "Humectant and barrier-support ingredient often used in soothing moisturizers and recovery serums.",
    teaser: "Barrier-supporting hydration.",
    funFact:
      "Panthenol converts to pantothenic acid in skin, which is why it often appears in formulas marketed for comfort and repair.",
    tags: ["Barrier", "Hydration", "Soothing", "AM", "PM"],
  },
  {
    id: "allantoin",
    name: "Allantoin",
    notes:
      "Soothing ingredient that helps reduce the feel of dryness and irritation in gentle formulas.",
    teaser: "Soothing support for dry or irritated-feeling skin.",
    funFact:
      "Allantoin is often included at low percentages, but it can still make a formula feel more comfortable.",
    tags: ["Soothing", "Barrier", "Sensitive-friendly", "AM", "PM"],
  },
  {
    id: "licorice-root",
    name: "Licorice root extract",
    notes:
      "Botanical brightening and soothing ingredient often used for uneven tone and visible redness support.",
    teaser: "Tone support with a calming angle.",
    funFact:
      "Look for names like glycyrrhiza glabra or dipotassium glycyrrhizate on labels.",
    tags: ["Brightening", "Soothing", "Redness", "AM", "PM"],
  },
  {
    id: "squalane",
    name: "Squalane",
    notes:
      "Lightweight emollient that helps soften skin and reduce water loss without feeling as heavy as many oils.",
    teaser: "Lightweight moisture support.",
    funFact:
      "Modern skincare squalane is commonly plant-derived, often from sugarcane or olives.",
    tags: ["Moisture", "Barrier", "AM", "PM"],
  },
  {
    id: "urea",
    name: "Urea",
    notes:
      "Humectant at lower percentages and smoothing keratolytic at higher percentages; useful for dry, rough skin.",
    teaser: "Dry-skin smoothing support.",
    funFact:
      "Urea is part of skin’s natural moisturizing factor, which is why it appears in many body and barrier formulas.",
    tags: ["Hydration", "Texture", "Barrier", "PM"],
  },
  {
    id: "sulfur",
    name: "Sulfur",
    notes:
      "Acne-focused ingredient that can help with oil and blemishes, but may be drying or have a distinct scent.",
    teaser: "Targeted blemish support.",
    funFact:
      "Sulfur appears in masks, spot treatments, and some cleanser formats; contact time can change how drying it feels.",
    tags: ["Acne", "Oil balance", "PM"],
  },
  {
    id: "oat",
    name: "Colloidal oat / oat extract",
    notes:
      "Soothing, barrier-friendly ingredient often used in formulas for dry or sensitive-feeling skin.",
    teaser: "Soothing support for sensitive-feeling skin.",
    funFact:
      "Colloidal oatmeal is recognized as a skin protectant in some over-the-counter contexts.",
    tags: ["Soothing", "Barrier", "Sensitive-friendly", "AM", "PM"],
  },
  {
    id: "zinc-oxide",
    name: "Zinc oxide",
    notes:
      "Mineral UV filter used in sunscreens; can be helpful for sensitive skin but may leave a cast depending on formula.",
    teaser: "Mineral SPF filter.",
    funFact:
      "Particle size, tint, and base formula make a major difference in how wearable zinc oxide feels.",
    tags: ["SPF", "Sensitive-friendly", "AM"],
  },
  {
    id: "caffeine",
    name: "Caffeine",
    notes:
      "Antioxidant often used in eye products and body formulas for temporary de-puffing or firming effects.",
    teaser: "Temporary de-puffing support.",
    funFact:
      "Caffeine does not replace sleep, but it can make some eye-area formulas feel more refreshing.",
    tags: ["Antioxidant", "Eye area", "AM"],
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
      message: "Same ingredient, no conflict, but duplicate steps rarely add benefit.",
    };
  }
  const verdict = PAIRINGS[pairingKey(a, b)] ?? "safe";
  const messages: Record<PairingVerdict, string> = {
    safe: "No major documented conflict for typical layering, still introduce one active at a time.",
    caution:
      "Possible irritation or pH interaction, alternate days, separate AM/PM, or space with moisturizer; patch test.",
    avoid:
      "High risk of irritation or barrier stress in the same routine, avoid combining or get professional guidance.",
  };
  return { verdict, message: messages[verdict] };
}

export type IngredientId = "retinol" | "vitamin-c" | "ahas";

export type PairingVerdict = "safe" | "caution" | "avoid";

export interface Ingredient {
  id: IngredientId;
  name: string;
  /** Short context for the checker UI */
  notes: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: "retinol",
    name: "Retinol",
    notes:
      "Vitamin A derivative that increases cell turnover. Usually PM; increases sun sensitivity.",
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    notes:
      "Antioxidant (often L-ascorbic acid). Works best at low pH; pairs thoughtfully with SPF in the AM.",
  },
  {
    id: "ahas",
    name: "AHAs",
    notes:
      "Alpha-hydroxy acids (e.g. glycolic, lactic). Exfoliating; can disrupt barrier if layered heavily.",
  },
];

const pairingKey = (a: IngredientId, b: IngredientId) =>
  [a, b].sort().join(":");

/** Conservative same-routine guidance (not medical advice). */
const PAIRINGS: Record<string, PairingVerdict> = {
  [`${pairingKey("retinol", "vitamin-c")}`]: "caution",
  [`${pairingKey("retinol", "ahas")}`]: "avoid",
  [`${pairingKey("ahas", "vitamin-c")}`]: "caution",
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

import { getCatalogProductById, PRODUCT_CATALOG, type CatalogProduct } from "./product-catalog";
import type { QuizAnswers } from "./skin-quiz";

export type RoutineStepSession = "am" | "pm";

export type RoutineStepKind =
  | "cleanse"
  | "treat"
  | "hydrate"
  | "protect"
  | "moisturize";

export type QuizRoutineStep = {
  id: string;
  session: RoutineStepSession;
  stepNumber: number;
  title: string;
  guidance: string;
  kind: RoutineStepKind;
  productId: string;
  alternativeProductIds: string[];
};

const KIND_KEYWORDS: Record<RoutineStepKind, string[]> = {
  protect: ["spf", "sunscreen", "sun screen", "anthelios", "supergoop", "elta", "hydra-vizor"],
  cleanse: ["cleanser", "cleanse", "wash", "purity", "soy", "vanicream-gentle", "yttp"],
  treat: [
    "bha",
    "salicylic",
    "retinol",
    "retinoid",
    "adapalene",
    "differin",
    "glycolic",
    "exfoliant",
    "acid",
    "niacinamide",
    "vitamin c",
    "ascorbic",
    "good-genes",
    "tretinoin",
  ],
  hydrate: ["toner", "essence", "serum", "heartleaf", "snail", "humectant", "hydrating"],
  moisturize: [
    "moistur",
    "cream",
    "lotion",
    "cerave",
    "toleriane",
    "barrier",
    "repair",
    "omega",
    "ultra",
    "laneige",
  ],
};

function classifyProductKind(p: CatalogProduct): RoutineStepKind[] {
  const hay = `${p.id} ${p.name} ${p.brand} ${p.keyActives.join(" ")}`.toLowerCase();
  const kinds: RoutineStepKind[] = [];
  for (const [kind, words] of Object.entries(KIND_KEYWORDS) as [RoutineStepKind, string[]][]) {
    if (words.some((w) => hay.includes(w))) kinds.push(kind);
  }
  if (kinds.length === 0) kinds.push("moisturize");
  return kinds;
}

function inferKindFromGuidance(
  line: string,
  session: RoutineStepSession
): RoutineStepKind {
  const l = line.toLowerCase();
  if (l.includes("cleanse") || l.includes("double cleanse")) return "cleanse";
  if (session === "am" && (l.includes("spf") || l.includes("sunscreen"))) {
    return "protect";
  }
  if (
    l.includes("bha") ||
    l.includes("retinoid") ||
    l.includes("adapalene") ||
    l.includes("exfoliant") ||
    l.includes("treatment") ||
    l.includes("vitamin c") ||
    l.includes("niacinamide") ||
    l.includes("salicylic")
  ) {
    return "treat";
  }
  if (l.includes("toner") || l.includes("essence") || l.includes("humectant")) return "hydrate";
  return "moisturize";
}

function compactRoutineLines(
  session: RoutineStepSession,
  lines: string[]
): { guidance: string; kind: RoutineStepKind }[] {
  const out: { guidance: string; kind: RoutineStepKind }[] = [];
  const counts = new Map<RoutineStepKind, number>();
  const limitForKind = (kind: RoutineStepKind) =>
    kind === "treat" && session === "pm" ? 2 : 1;

  for (const guidance of lines) {
    const kind = inferKindFromGuidance(guidance, session);
    const current = counts.get(kind) ?? 0;
    if (current >= limitForKind(kind)) continue;
    counts.set(kind, current + 1);
    out.push({ guidance, kind });
  }

  return out;
}

function titleForKind(kind: RoutineStepKind, session: RoutineStepSession): string {
  if (kind === "protect") return "Sun protection";
  if (kind === "cleanse") return session === "am" ? "Morning cleanse" : "Evening cleanse";
  if (kind === "treat") return session === "am" ? "Active / treatment" : "Treatment step";
  if (kind === "hydrate") return "Hydrating layer";
  return "Moisturizer";
}

function scoreProductForKind(p: CatalogProduct, kind: RoutineStepKind): number {
  const kinds = classifyProductKind(p);
  if (kinds.includes(kind)) return 10;
  if (kind === "moisturize" && kinds.includes("hydrate")) return 4;
  if (kind === "hydrate" && kinds.includes("moisturize")) return 3;
  return 0;
}

function pickProductForKind(
  kind: RoutineStepKind,
  pool: string[],
  used: Set<string>,
  favoriteBrands: string[]
): string | null {
  const favKeys = new Set(favoriteBrands.map((b) => b.trim().toLowerCase()));
  let best: { id: string; score: number } | null = null;

  for (const id of pool) {
    if (used.has(id)) continue;
    const p = getCatalogProductById(id);
    if (!p) continue;
    let score = scoreProductForKind(p, kind);
    if (score <= 0) continue;
    if (favKeys.has(p.brand.trim().toLowerCase())) score += 5;
    if (!best || score > best.score) best = { id, score };
  }

  if (best) return best.id;

  for (const id of pool) {
    if (used.has(id)) continue;
    if (getCatalogProductById(id)) return id;
  }
  return null;
}

function alternativesForKind(
  kind: RoutineStepKind,
  pool: string[],
  primaryId: string,
  favoriteBrands: string[],
  limit = 5
): string[] {
  const favKeys = new Set(favoriteBrands.map((b) => b.trim().toLowerCase()));
  const scored: { id: string; score: number }[] = [];

  for (const id of pool) {
    if (id === primaryId) continue;
    const p = getCatalogProductById(id);
    if (!p) continue;
    let score = scoreProductForKind(p, kind);
    if (score <= 0 && kind !== "moisturize") continue;
    if (score <= 0) score = 1;
    if (favKeys.has(p.brand.trim().toLowerCase())) score += 3;
    scored.push({ id, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.id);
}

/** Expand candidate pool beyond the 8 shown picks for assignment + swaps. */
export function expandProductPool(
  orderedIds: string[],
  answers: QuizAnswers
): string[] {
  const out = [...orderedIds];
  const add = (id: string) => {
    if (getCatalogProductById(id) && !out.includes(id)) out.push(id);
  };

  for (const id of orderedIds) add(id);
  for (const p of PRODUCT_CATALOG) {
    if (out.length >= 24) break;
    if (answers.favoriteBrands.some((b) => b.toLowerCase() === p.brand.toLowerCase())) {
      add(p.id);
    }
  }

  return out;
}

export function buildQuizRoutineSteps(
  routineAm: string[],
  routinePm: string[],
  productPool: string[],
  favoriteBrands: string[]
): QuizRoutineStep[] {
  const used = new Set<string>();
  const steps: QuizRoutineStep[] = [];

  const addSession = (session: RoutineStepSession, lines: string[]) => {
    compactRoutineLines(session, lines).forEach(({ guidance, kind }, i) => {
      const productId =
        pickProductForKind(kind, productPool, used, favoriteBrands) ??
        productPool.find((id) => !used.has(id)) ??
        productPool[0];
      if (!productId) return;
      used.add(productId);

      steps.push({
        id: `${session}-${i + 1}`,
        session,
        stepNumber: i + 1,
        title: titleForKind(kind, session),
        guidance,
        kind,
        productId,
        alternativeProductIds: alternativesForKind(
          kind,
          productPool,
          productId,
          favoriteBrands
        ),
      });
    });
  };

  addSession("am", routineAm);
  addSession("pm", routinePm);

  return steps;
}

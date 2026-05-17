import type { IngredientId, PairingVerdict } from "./ingredients";
import { evaluatePairing, INGREDIENTS } from "./ingredients";
import type { RoutineProduct } from "./routine";

export type RoutineRating = {
  score: number;
  stars: number;
  tier: string;
  blurb: string;
};

export type ProductRoutineInsight = {
  productId: string;
  name: string;
  slotLabel: string;
  detected: IngredientId[];
  /** Short coaching line for this row */
  tip: string | null;
};

export type SessionPairingAlert = {
  id: string;
  slot: "am" | "pm";
  verdict: PairingVerdict;
  ingredientA: string;
  ingredientB: string;
  productNames: string;
  summary: string;
};

export type CrossDayTip = {
  id: string;
  title: string;
  detail: string;
};

export type ActiveLoadAlert = {
  id: string;
  slot: "am" | "pm";
  title: string;
  productNames: string;
  detail: string;
};

export type RoutineInsights = {
  bullets: string[];
  perProduct: ProductRoutineInsight[];
  sameSession: SessionPairingAlert[];
  crossDay: CrossDayTip[];
  activeLoad: ActiveLoadAlert[];
  /** Short lines for “what helped / hurt the score” */
  scoreFactors: string[];
};

const ingredientName = (id: IngredientId) =>
  INGREDIENTS.find((x) => x.id === id)?.name ?? id;

function productHaystack(p: RoutineProduct): string {
  return `${p.name} ${p.brand} ${p.notes}`.toLowerCase();
}

/**
 * Best-effort map of free text → checker ingredient ids (conservative; misses unknowns).
 */
export function inferIngredientSignals(text: string): IngredientId[] {
  const t = text.toLowerCase();
  const out = new Set<IngredientId>();

  if (/\btretinoin\b|retin-a|\batralin\b|\brenova\b/i.test(t)) out.add("tretinoin");
  else if (/\badapalene\b|\bdifferin\b/i.test(t)) out.add("adapalene");
  else if (
    /\bretinol\b|\bretinal\b|hydroxypinacolone\s*retinoate|granactive\s*retinoid|\bretinoic\b/i.test(t)
  ) {
    out.add("retinol");
  }

  if (
    /\bvitamin\s*c\b|ascorbic|l-ascorbic|magnesium\s*ascorbyl|3-o-ethyl|ethyl\s*ascorbic|thd\s*ascorbate|sodium\s*ascorbyl|ascorbyl\s*glucoside|cef\b|ce\s*ferulic/i.test(
      t
    )
  ) {
    out.add("vitamin-c");
  }

  if (/\bpha\b|polyhydroxy|gluconolactone|lactobionic/i.test(t)) {
    out.add("pha");
  }
  if (
    /\bglycolic\b|\blactic\s+acid\b|\bmandelic\b|\baha\b|framboos|exfoliat|acid\s*toner|acid\s*treatment|alpha\s*beta/i.test(
      t
    )
  ) {
    out.add("ahas");
  }

  if (/\bsalicylic\b|\bbha\b|willow\s*bark|acetyl\s*salicylic/i.test(t)) out.add("bha");

  if (/\bniacinamide\b|vitamin\s*b3\b|\bvb3\b/i.test(t)) out.add("niacinamide");

  if (/\bbenzo(?:yl)?\s*peroxide\b|\bbpo\b/i.test(t)) out.add("benzoyl-peroxide");

  if (/\bazelaic\b/i.test(t)) out.add("azelaic-acid");

  if (/\bpeptide\b|matrixyl|copper\s*peptide|palmitoyl|acetyl\s*hexapeptide/i.test(t))
    out.add("peptides");

  if (/\bbakuchiol\b/i.test(t)) out.add("bakuchiol");

  if (/\bsnail\b|mucin|sn-?hgf|helix\s*aspersa/i.test(t)) out.add("snail-mucin");

  if (
    /\bcentella\b|\bcica\b|asiatica|madecassoside|asiaticoside|heartleaf|houttuynia/i.test(t)
  ) {
    out.add("centella");
  }

  if (/\btranexamic\b|\btxa\b/i.test(t)) out.add("tranexamic-acid");

  if (/\bkojic\b/i.test(t)) out.add("kojic-acid");

  if (/\barbutin\b/i.test(t)) out.add("arbutin");

  if (/\btocopherol\b|vitamin\s*e\b/i.test(t)) out.add("vitamin-e");

  if (/\bgreen\s*tea\b|camellia\s*sinensis|egcg/i.test(t)) out.add("green-tea");

  if (/\bhyaluronic\b|sodium\s*hyaluronate/i.test(t)) out.add("hyaluronic-acid");

  if (/\bceramide\b/i.test(t)) out.add("ceramides");

  if (/\bpanthenol\b|pro-?vitamin\s*b5|\bvitamin\s*b5\b/i.test(t)) out.add("panthenol");

  if (/\ballantoin\b/i.test(t)) out.add("allantoin");

  if (/\blicorice\b|glycyrrhiza|dipotassium\s*glycyrrhizate/i.test(t)) {
    out.add("licorice-root");
  }

  if (/\bsqualane\b/i.test(t)) out.add("squalane");

  if (/\burea\b|carbamide/i.test(t)) out.add("urea");

  if (/\bsulfur\b|sulphur/i.test(t)) out.add("sulfur");

  if (/\bcolloidal\s*oat\b|\boat\b|avena\s*sativa/i.test(t)) out.add("oat");

  if (/\bzinc\s*oxide\b/i.test(t)) out.add("zinc-oxide");

  if (/\bcaffeine\b|guarana|guaraná/i.test(t)) out.add("caffeine");

  return [...out];
}

function slotTag(slot: RoutineProduct["slot"]): string {
  if (slot === "am") return "Morning";
  if (slot === "pm") return "Evening";
  return "Morning & evening";
}

function perProductTip(
  p: RoutineProduct,
  detected: IngredientId[]
): string | null {
  const t = productHaystack(p);
  const has = (id: IngredientId) => detected.includes(id);
  const tips: string[] = [];

  const retinoid =
    has("tretinoin") || has("adapalene") || has("retinol");
  if (retinoid && (p.slot === "am" || p.slot === "both")) {
    tips.push("Retinoids are usually PM-only — confirm your label if this is truly a morning step.");
  }

  if (has("vitamin-c") && /\b(?:spf|sunscreen)\b/i.test(t) === false && p.slot === "pm") {
    tips.push("Vitamin C often shines in AM under SPF; still fine at night if your skin loves it.");
  }

  if ((has("ahas") || has("bha") || has("pha")) && retinoid) {
    tips.push("Exfoliant + retinoid in one product stack is easy to overdo — watch for stinging or flakes.");
  }

  if (detected.length === 0 && t.length > 8) {
    tips.push(
      "No major actives detected from text — add key ingredients to notes for smarter pairing tips."
    );
  }

  if (detected.length >= 4) {
    tips.push("Many actives flagged in one row — check whether any also appear in another step.");
  }

  return tips.length ? tips.join(" ") : null;
}

function sessionProducts(
  products: RoutineProduct[],
  slot: "am" | "pm"
): RoutineProduct[] {
  return products.filter((p) =>
    slot === "am" ? p.slot === "am" || p.slot === "both" : p.slot === "pm" || p.slot === "both"
  );
}

function collectSessionPairings(
  products: RoutineProduct[],
  slot: "am" | "pm"
): SessionPairingAlert[] {
  const list = sessionProducts(products, slot);
  const best = new Map<string, SessionPairingAlert>();
  const rank = (v: PairingVerdict) => (v === "avoid" ? 2 : 1);

  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const p1 = list[i]!;
      const p2 = list[j]!;
      const s1 = inferIngredientSignals(productHaystack(p1));
      const s2 = inferIngredientSignals(productHaystack(p2));
      for (const a of s1) {
        for (const b of s2) {
          if (a === b) continue;
          const { verdict, message } = evaluatePairing(a, b);
          if (!verdict || verdict === "safe") continue;
          const key = `${slot}|${[p1.id, p2.id].sort().join(":")}|${[a, b].sort().join(":")}`;
          const row: SessionPairingAlert = {
            id: `${slot}-${p1.id}-${p2.id}-${a}-${b}`,
            slot,
            verdict,
            ingredientA: ingredientName(a),
            ingredientB: ingredientName(b),
            productNames: `${p1.name} · ${p2.name}`,
            summary: message,
          };
          const prev = best.get(key);
          if (!prev || rank(verdict) > rank(prev.verdict)) best.set(key, row);
        }
      }
    }
  }
  return [...best.values()].sort((a, b) => rank(b.verdict) - rank(a.verdict));
}

const HARSH_ACTIVE_IDS = new Set<IngredientId>([
  "retinol",
  "adapalene",
  "tretinoin",
  "ahas",
  "bha",
  "pha",
  "benzoyl-peroxide",
  "sulfur",
]);

function frequencyWeight(p: RoutineProduct): number {
  if (p.frequency === "weekly") return 0.3;
  if (p.frequency === "every_other_day") return 0.6;
  if (p.frequency === "as_needed") return 0.35;
  return 1;
}

function harshSignalsForProduct(p: RoutineProduct): IngredientId[] {
  return inferIngredientSignals(productHaystack(p)).filter((id) =>
    HARSH_ACTIVE_IDS.has(id)
  );
}

function collectActiveLoadAlerts(products: RoutineProduct[]): ActiveLoadAlert[] {
  const alerts: ActiveLoadAlert[] = [];

  for (const slot of ["am", "pm"] as const) {
    const rows = sessionProducts(products, slot)
      .map((p) => ({ product: p, signals: harshSignalsForProduct(p) }))
      .filter((row) => row.signals.length > 0);

    if (rows.length === 0) continue;

    const productNames = rows.map((row) => row.product.name).join(" · ");
    const uniqueSignals = new Set(rows.flatMap((row) => row.signals));
    const weightedLoad = rows.reduce(
      (sum, row) => sum + frequencyWeight(row.product) * Math.max(1, row.signals.length),
      0
    );
    const dailyStrongCount = rows.filter(
      (row) => (row.product.frequency ?? "daily") === "daily"
    ).length;

    if (uniqueSignals.size >= 3 || rows.length >= 3 || weightedLoad >= 2.4) {
      alerts.push({
        id: `active-load-${slot}`,
        slot,
        title: `${slot === "am" ? "Morning" : "Evening"} active load looks high`,
        productNames,
        detail:
          "Several stronger actives appear in the same session. Consider alternating days, moving one active to a different session, or adding more recovery nights.",
      });
    } else if (dailyStrongCount >= 2) {
      alerts.push({
        id: `active-load-daily-${slot}`,
        slot,
        title: `${slot === "am" ? "Morning" : "Evening"} has multiple daily strong actives`,
        productNames,
        detail:
          "Two or more stronger actives are marked daily in this session. If your skin gets dry, tight, or stingy, reduce one to every other day or weekly.",
      });
    }
  }

  return alerts;
}

function collectCrossDayTips(products: RoutineProduct[]): CrossDayTip[] {
  const amSigs = new Set<IngredientId>();
  const pmSigs = new Set<IngredientId>();
  for (const p of sessionProducts(products, "am")) {
    for (const id of inferIngredientSignals(productHaystack(p))) amSigs.add(id);
  }
  for (const p of sessionProducts(products, "pm")) {
    for (const id of inferIngredientSignals(productHaystack(p))) pmSigs.add(id);
  }

  const tips: CrossDayTip[] = [];
  const seen = new Set<string>();

  for (const a of amSigs) {
    for (const b of pmSigs) {
      if (a === b) continue;
      const { verdict, message } = evaluatePairing(a, b);
      if (!verdict || verdict === "safe") continue;
      const key = [a, b].sort().join(":");
      if (seen.has(key)) continue;
      seen.add(key);

      if (verdict === "avoid") {
        tips.push({
          id: `cross-${key}`,
          title: `Same day: ${ingredientName(a)} (AM lane) + ${ingredientName(b)} (PM lane)`,
          detail: `${message} Many people alternate evenings instead of stacking hard on one calendar day.`,
        });
      } else {
        tips.push({
          id: `cross-${key}`,
          title: `Same day rhythm: ${ingredientName(a)} + ${ingredientName(b)}`,
          detail: message,
        });
      }
    }
  }
  return tips.slice(0, 8);
}

function completenessScore(
  products: RoutineProduct[],
  sameSession?: SessionPairingAlert[],
  activeLoad?: ActiveLoadAlert[]
): {
  score: number;
  factors: string[];
} {
  const all = products.map(productHaystack).join(" | ");
  const am = sessionProducts(products, "am").map(productHaystack).join(" | ");

  let s = 0;
  const factors: string[] = [];

  const has = (re: RegExp, text: string) => re.test(text);

  if (has(/\bcleanser\b|cleansing|face wash|wash\b|micellar|balm|purity|jelly\s*cleanser|foaming/i, all)) {
    s += 8;
    factors.push("Cleansing step detected (+8)");
  } else factors.push("Add a dedicated cleanser when you can");

  if (has(/\bspf\b|sunscreen|sun screen|broad\s*spectrum|uv\s*a|anthelios|supergoop|elta|hydra\s*vizor|spf\s*\d/i, am)) {
    s += 12;
    factors.push("AM sun protection called out (+12)");
  } else if (products.some((p) => p.slot === "am" || p.slot === "both")) {
    factors.push("Log SPF in an AM row so we can credit sun protection");
  }

  if (has(/\bmoistur|cream\b|lotion|barrier|ceramide|gel-cream|water\s*cream|surge\b/i, all)) {
    s += 8;
    factors.push("Moisture / barrier product detected (+8)");
  }

  if (has(/\bserum\b|essence|toner|treatment|ampoule/i, all)) {
    s += 5;
    factors.push("Treatment-style step detected (+5)");
  }

  if (has(/\bniacinamide\b|\bvitamin\s*c\b|retinol|retin|adapalene|glycolic|salicylic|peptide/i, all)) {
    s += 6;
    factors.push("Active-forward products noted (+6)");
  }

  if (has(/\bceramide|snail|centella|cica|oat\b|panthenol|allantoin|barrier/i, all)) {
    s += 6;
    factors.push("Barrier-friendly ingredients spotted (+6)");
  }

  if (
    products.some((p) => p.slot === "am" || p.slot === "both") &&
    products.some((p) => p.slot === "pm" || p.slot === "both")
  ) {
    s += 8;
    factors.push("Both AM and PM logged (+8)");
  } else if (products.length > 0) {
    factors.push("Balance AM and PM when possible");
  }

  const withNotes = products.filter((p) => p.notes.trim().length > 12).length;
  s += Math.min(12, withNotes * 3);
  if (withNotes > 0) factors.push(`Helpful notes on ${withNotes} product(s) (+${Math.min(12, withNotes * 3)})`);

  if (products.length >= 4) {
    s += 5;
    factors.push("Four or more steps logged (+5)");
  }

  const sessionAlerts =
    sameSession ??
    [...collectSessionPairings(products, "am"), ...collectSessionPairings(products, "pm")];
  let penalty = 0;
  for (const a of sessionAlerts) {
    if (a.verdict === "avoid") penalty += 18;
    else penalty += 7;
  }
  penalty = Math.min(45, penalty);
  if (penalty > 0) {
    factors.push(`Layering cautions in one session (−${penalty})`);
    s -= penalty;
  }

  const loadAlerts = activeLoad ?? collectActiveLoadAlerts(products);
  if (loadAlerts.length > 0) {
    const loadPenalty = Math.min(24, loadAlerts.length * 12);
    factors.push(`Strong-active load looks high (−${loadPenalty})`);
    s -= loadPenalty;
  }

  return { score: Math.max(0, Math.min(92, s)), factors };
}

function tierFromScore(score: number, n: number): Pick<RoutineRating, "tier" | "blurb" | "stars"> {
  if (n === 0) {
    return {
      stars: 0,
      tier: "Not started",
      blurb: "Add products with honest notes — the coach reads text to guess actives and how steps play together.",
    };
  }
  const stars =
    score <= 0 ? 0 : Math.min(5, Math.max(0, Math.ceil(score / 21)));

  if (score < 30) {
    return {
      stars,
      tier: "Building the foundation",
      blurb:
        "Score reflects coverage, SPF in AM, notes, and whether detected actives clash in the same session. Keep logging — specificity unlocks better tips.",
    };
  }
  if (score < 50) {
    return {
      stars,
      tier: "Taking shape",
      blurb:
        "Nice momentum. Tighten notes with real actives from the label so pairing hints stay accurate.",
    };
  }
  if (score < 68) {
    return {
      stars,
      tier: "Balanced cadence",
      blurb:
        "Solid routine on paper. Scan same-session and active-intensity alerts before adding more treatments.",
    };
  }
  if (score < 85) {
    return {
      stars,
      tier: "Thoughtful shelf",
      blurb:
        "Strong structure and relatively calm layering. Re-check any caution rows when you swap a serum.",
    };
  }
  return {
    stars,
    tier: "Routine architect",
    blurb:
      "Top marks for completeness and low conflict signals — still patch-test anything new.",
  };
}

function insightBullets(
  products: RoutineProduct[],
  sessionAlerts: SessionPairingAlert[],
  crossDay: CrossDayTip[],
  activeLoad: ActiveLoadAlert[]
): string[] {
  const bullets: string[] = [];
  if (products.length === 0) return bullets;

  if (sessionAlerts.length === 0 && activeLoad.length === 0) {
    bullets.push(
      "No major same-session conflicts surfaced from detected actives — introduce new bottles one at a time anyway."
    );
  }

  if (activeLoad.length > 0) {
    bullets.push(
      `${activeLoad.length} active-intensity check${activeLoad.length === 1 ? "" : "s"} flagged a potentially harsh stack — reduce frequency or alternate strong treatments if skin feels stressed.`
    );
  }

  const avoid = sessionAlerts.filter((x) => x.verdict === "avoid");
  if (avoid.length > 0) {
    bullets.push(
      `${avoid.length} same-session pairing(s) look high-risk on paper — separate nights or buffer with moisturizer.`
    );
  }

  const caution = sessionAlerts.filter((x) => x.verdict === "caution");
  if (caution.length > 0 && avoid.length === 0) {
    bullets.push(
      "Some same-session combos may irritate — alternate evenings or move one active to the other half of the day."
    );
  }

  if (crossDay.length > 0 && avoid.length === 0) {
    bullets.push(
      "Same-day AM + PM signals are worth a second look if you stack strong actives."
    );
  }

  const anySpf = sessionProducts(products, "am").some((p) =>
    /\bspf\b|sunscreen|broad\s*spectrum|spf\s*\d/i.test(productHaystack(p))
  );
  if (!anySpf && products.some((p) => p.slot === "am" || p.slot === "both")) {
    bullets.push("SPF not obvious in AM rows — if you wear it, name it so feedback stays accurate.");
  }

  return bullets;
}

export function buildRoutineInsights(products: RoutineProduct[]): RoutineInsights {
  const perProduct: ProductRoutineInsight[] = products.map((p) => {
    const detected = inferIngredientSignals(productHaystack(p));
    return {
      productId: p.id,
      name: p.name,
      slotLabel: slotTag(p.slot),
      detected,
      tip: perProductTip(p, detected),
    };
  });

  const sameSession = [
    ...collectSessionPairings(products, "am"),
    ...collectSessionPairings(products, "pm"),
  ];

  const crossDay = collectCrossDayTips(products);
  const activeLoad = collectActiveLoadAlerts(products);
  const { factors: scoreFactors } = completenessScore(products, sameSession, activeLoad);
  const bullets = insightBullets(products, sameSession, crossDay, activeLoad);

  return {
    bullets,
    perProduct,
    sameSession,
    crossDay,
    activeLoad,
    scoreFactors,
  };
}

export function computeRoutineRating(products: RoutineProduct[]): RoutineRating {
  const n = products.length;
  const sameSession = [
    ...collectSessionPairings(products, "am"),
    ...collectSessionPairings(products, "pm"),
  ];
  const activeLoad = collectActiveLoadAlerts(products);
  const { score: baseScore } = completenessScore(products, sameSession, activeLoad);
  const score = n === 0 ? 0 : Math.min(100, Math.round(baseScore * 1.08));
  const { stars, tier, blurb } = tierFromScore(score, n);

  return {
    score,
    stars,
    tier,
    blurb,
  };
}

/** Full score + structured feedback for My routine UI */
export function buildRoutineScorecard(products: RoutineProduct[]): {
  rating: RoutineRating;
  insights: RoutineInsights;
} {
  const insights = buildRoutineInsights(products);
  return {
    rating: computeRoutineRating(products),
    insights,
  };
}

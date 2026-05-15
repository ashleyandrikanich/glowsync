import type { RoutineProduct } from "./routine";
import { computeRoutineRating } from "./routine-rating";

export type CoachSuggestion = {
  id: string;
  title: string;
  detail: string;
  tone?: "tip" | "nudge" | "celebrate";
  links?: { href: string; label: string }[];
};

function haystack(p: RoutineProduct): string {
  return `${p.name} ${p.brand} ${p.notes}`.toLowerCase();
}

/**
 * Heuristic suggestions from the locally saved routine — education only.
 */
export function analyzeRoutine(products: RoutineProduct[]): CoachSuggestion[] {
  const out: CoachSuggestion[] = [];
  const n = products.length;
  const hasAm = products.some((p) => p.slot === "am" || p.slot === "both");
  const hasPm = products.some((p) => p.slot === "pm" || p.slot === "both");
  const withNotes = products.filter((p) => p.notes.trim().length > 0).length;
  const allText = products.map(haystack).join(" \n ");
  const rating = computeRoutineRating(products);

  if (n === 0) {
    out.push({
      id: "empty",
      title: "Start with a skeleton",
      detail:
        "Nothing is logged yet. Use the “Build a starter routine” side of this page to pick a skin feel, then copy ideas into My routine when you are ready.",
      tone: "nudge",
      links: [
        { href: "/routine", label: "Open My routine" },
        { href: "/skin-quiz", label: "Take the skin quiz" },
      ],
    });
    return out;
  }

  if (rating.score >= 72) {
    out.push({
      id: "strong-shelf",
      title: "Shelf is looking full",
      detail:
        "You have a lot logged — great for memory. If anything stings or flakes, try removing one active before adding another, and spot-check pairs on Home.",
      tone: "celebrate",
      links: [{ href: "/", label: "Pairing checker on Home" }],
    });
  }

  if (!hasAm) {
    out.push({
      id: "no-am",
      title: "Add a morning lane",
      detail:
        "We do not see anything tagged for morning. Even a simple cleanse + moisturizer + SPF counts — log what you actually use so reminders stay honest.",
      tone: "nudge",
      links: [{ href: "/routine", label: "Edit My routine" }],
    });
  }

  if (!hasPm) {
    out.push({
      id: "no-pm",
      title: "Evening is empty",
      detail:
        "No PM-only or twice-daily steps yet. Nights are when many people use retinoids or richer creams — add what you reach for after dinner.",
      tone: "nudge",
      links: [{ href: "/routine", label: "Edit My routine" }],
    });
  }

  if (n < 3) {
    out.push({
      id: "thin-routine",
      title: "Room to grow",
      detail:
        "A tiny routine can be perfect — if you want more structure, add cleanser, moisturizer, and SPF as separate rows so the rating reflects each step.",
      tone: "tip",
      links: [{ href: "/guide", label: "Routine guide" }],
    });
  }

  if (withNotes < Math.ceil(n * 0.5)) {
    out.push({
      id: "notes",
      title: "Notes help future-you",
      detail:
        "Several products have no notes. Jot actives, frequency, or what layer it is — it makes the pairing checker and dermatology visits easier to prep for.",
      tone: "tip",
      links: [{ href: "/routine", label: "Add notes in My routine" }],
    });
  }

  if (/\b(retinol|retinoid|tretin|adapalene|differin|tazarotene)\b/i.test(allText)) {
    out.push({
      id: "retinoid",
      title: "Retinoid spacing",
      detail:
        "We spotted retinoid language in your log. Use them sparingly at first, buffer with moisturizer, and be strict with SPF. Compare other actives the same night on Home before stacking.",
      tone: "tip",
      links: [
        { href: "/", label: "Home pairing checker" },
        { href: "/actives", label: "Actives library" },
      ],
    });
  }

  if (/\b(vitamin c|ascorbic|l-ascorb|magnesium ascorbyl)\b/i.test(allText)) {
    out.push({
      id: "vitaminc",
      title: "Vitamin C habits",
      detail:
        "Vitamin C serums are often AM-friendly under SPF. Low-pH formulas can tingle next to niacinamide or exfoliants in the same session — check compatibility on Home if you layer hard.",
      tone: "tip",
      links: [{ href: "/", label: "Pairing checker" }],
    });
  }

  if (/\b(bha|salicylic|aha|glycolic|lactic|mandelic|exfoliat|acid toner)\b/i.test(allText)) {
    out.push({
      id: "acids",
      title: "Acids and rest nights",
      detail:
        "Exfoliants do not need to run seven nights a week. If you also use retinoids, alternate evenings or use contact therapy until your barrier feels calm.",
      tone: "tip",
      links: [
        { href: "/guide", label: "Layering guide" },
        { href: "/", label: "Pairing checker" },
      ],
    });
  }

  if (!/\b(spf|sunscreen|sun screen|anthelios|supergoop|elta)\b/i.test(allText) && hasAm) {
    out.push({
      id: "spf",
      title: "SPF reminder",
      detail:
        "We do not see SPF called out in your logged names or notes. If you wear it, add a row so your AM column tells the whole story.",
      tone: "nudge",
      links: [{ href: "/routine", label: "Log SPF in My routine" }],
    });
  }

  if (out.length === 0) {
    out.push({
      id: "all-good",
      title: "Looks balanced on paper",
      detail:
        "No big gaps jumped out. Keep patch-testing new bottles and use the checker any time you add a second strong active the same day.",
      tone: "celebrate",
      links: [{ href: "/", label: "Open pairing checker" }],
    });
  }

  return out;
}

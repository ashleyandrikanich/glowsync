"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  formatProductNotes,
  getCatalogProductById,
} from "@/src/lib/product-catalog";
import {
  loadRoutineProducts,
  newProductId,
  saveRoutineProducts,
  type RoutineProduct,
  type RoutineSlot,
} from "@/src/lib/routine";
import type { QuizRoutineStep } from "@/src/lib/quiz-routine-steps";

export type StepChoice = "undecided" | "keep" | "swap";
type RetailerFilter = "all" | "ulta" | "sephora";

type StepState = {
  choice: StepChoice;
  productId: string;
};

type SwapFilterState = {
  query: string;
  retailer: RetailerFilter;
};

type QuizRoutinePlannerProps = {
  steps: QuizRoutineStep[];
};

function slotForSession(session: QuizRoutineStep["session"]): RoutineSlot {
  return session === "am" ? "am" : "pm";
}

function ProductMini({
  productId,
  selected,
  onSelect,
}: {
  productId: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const p = getCatalogProductById(productId);
  if (!p) return null;

  const inner = (
    <>
      <p className="font-medium text-offblack">
        {p.brand} — {p.name}
      </p>
      <p className="mt-0.5 text-xs text-earth/90">{p.keyActives.join(" · ")}</p>
      {p.retailers?.length ? (
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-offblack/45">
          {p.retailers.map((r) => (r === "ulta" ? "Ulta" : "Sephora")).join(" · ")}
        </p>
      ) : null}
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${
          selected
            ? "border-earth bg-gradient-to-br from-dawn/75 via-dawn/55 to-blossom/20 ring-2 ring-earth/35"
            : "border-sand/80 bg-linen/60 hover:border-earth/35 hover:bg-linen/90"
        }`}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-sand/80 bg-linen/60 px-3 py-2.5 text-sm">
      {inner}
    </div>
  );
}

export function QuizRoutinePlanner({ steps }: QuizRoutinePlannerProps) {
  const initial = useMemo(() => {
    const m: Record<string, StepState> = {};
    for (const s of steps) {
      m[s.id] = { choice: "undecided", productId: s.productId };
    }
    return m;
  }, [steps]);

  const [stepState, setStepState] = useState<Record<string, StepState>>(initial);
  const [swapFilters, setSwapFilters] = useState<Record<string, SwapFilterState>>({});
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const amSteps = steps.filter((s) => s.session === "am");
  const pmSteps = steps.filter((s) => s.session === "pm");

  const keptCount = useMemo(
    () => Object.values(stepState).filter((x) => x.choice === "keep").length,
    [stepState]
  );

  const setChoice = useCallback((stepId: string, choice: StepChoice) => {
    setStepState((prev) => ({
      ...prev,
      [stepId]: { ...prev[stepId]!, choice },
    }));
    setSaveMsg(null);
  }, []);

  const setProduct = useCallback((stepId: string, productId: string) => {
    setStepState((prev) => ({
      ...prev,
      [stepId]: { choice: "swap", productId },
    }));
    setSaveMsg(null);
  }, []);

  const updateSwapFilter = useCallback(
    (stepId: string, patch: Partial<SwapFilterState>) => {
      setSwapFilters((prev) => ({
        ...prev,
        [stepId]: {
          ...(prev[stepId] ?? { query: "", retailer: "all" }),
          ...patch,
        },
      }));
    },
    []
  );

  const clearSwapFilter = useCallback((stepId: string) => {
    setSwapFilters((prev) => ({
      ...prev,
      [stepId]: { query: "", retailer: "all" },
    }));
  }, []);

  function saveKeptToRoutine() {
    const kept = steps.filter((s) => {
      const st = stepState[s.id];
      return st?.choice === "keep";
    });
    if (kept.length === 0) {
      setSaveMsg("Mark at least one step as “Keep in my routine” first.");
      return;
    }

    const existing = loadRoutineProducts();
    const next: RoutineProduct[] = [...existing];

    for (const step of kept) {
      const st = stepState[step.id]!;
      const p = getCatalogProductById(st.productId);
      if (!p) continue;
      const slot = slotForSession(step.session);
      const dup = next.some(
        (r) =>
          r.name === p.name &&
          r.brand === p.brand &&
          (r.slot === slot || r.slot === "both" || slot === "both")
      );
      if (dup) continue;
      next.push({
        id: newProductId(),
        name: p.name,
        brand: p.brand,
        notes: formatProductNotes(p),
        slot,
      });
    }

    saveRoutineProducts(next);
    setSaveMsg(
      `Added ${kept.length} product${kept.length === 1 ? "" : "s"} to My routine on this device.`
    );
  }

  function renderStep(step: QuizRoutineStep) {
    const st = stepState[step.id]!;
    const showingSwap = st.choice === "swap";
    const altIds = [
      st.productId,
      ...step.alternativeProductIds.filter((id) => id !== st.productId),
    ];
    const filters = swapFilters[step.id] ?? { query: "", retailer: "all" };
    const filteredAltIds = altIds.filter((id) => {
      const p = getCatalogProductById(id);
      if (!p) return false;
      if (filters.retailer !== "all" && !p.retailers?.includes(filters.retailer)) {
        return false;
      }
      const q = filters.query.trim().toLowerCase();
      if (!q) return true;
      const hay = [
        p.brand,
        p.name,
        ...p.aliases,
        ...p.keyActives,
        ...p.mainIngredients,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    return (
      <li
        key={step.id}
        className="rounded-2xl border border-sand/85 bg-gradient-to-br from-linen/80 via-blush/25 to-dawn/15 p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85">
              Step {step.stepNumber}
            </p>
            <h4 className="font-serif text-lg font-medium text-offblack">{step.title}</h4>
          </div>
          {st.choice === "keep" ? (
            <span className="rounded-full bg-sage/25 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-earth">
              Keeping
            </span>
          ) : st.choice === "swap" ? (
            <span className="rounded-full bg-dawn/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-earth">
              Swapping
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-offblack/75">{step.guidance}</p>

        <div className="mt-4">
          <p className="text-[0.65rem] font-semibold tracking-[0.06em] text-earth/80">
            Suggested product
          </p>
          <div className="mt-2">
            <ProductMini productId={st.productId} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setChoice(step.id, "keep")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              st.choice === "keep"
                ? "bg-earth text-linen shadow-sm"
                : "border border-earth/30 bg-linen/80 text-earth hover:border-earth/50"
            }`}
          >
            Keep in my routine
          </button>
          <button
            type="button"
            onClick={() => setChoice(step.id, "swap")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              st.choice === "swap"
                ? "bg-earth text-linen shadow-sm"
                : "border border-earth/30 bg-linen/80 text-earth hover:border-earth/50"
            }`}
          >
            Find a different product
          </button>
          {st.choice !== "undecided" ? (
            <button
              type="button"
              onClick={() =>
                setStepState((prev) => ({
                  ...prev,
                  [step.id]: { choice: "undecided", productId: step.productId },
                }))
              }
              className="rounded-xl px-3 py-2 text-sm font-medium text-offblack/55 underline decoration-sand underline-offset-4 hover:text-offblack"
            >
              Reset
            </button>
          ) : null}
        </div>

        {showingSwap ? (
          <div className="mt-4 space-y-3 border-t border-sand/60 pt-4">
            <p className="text-xs font-medium text-offblack/70">
              Pick another product for this step, then tap{" "}
              <strong className="font-medium text-offblack">Keep in my routine</strong> to
              save your choice:
            </p>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor={`${step.id}-swap-search`}>
                Search product alternatives
              </label>
              <input
                id={`${step.id}-swap-search`}
                type="search"
                value={filters.query}
                onChange={(e) =>
                  updateSwapFilter(step.id, { query: e.target.value })
                }
                placeholder="Search this step by brand, active, or texture..."
                className="w-full rounded-xl border border-sand/80 bg-linen/70 px-3 py-2 text-sm text-offblack outline-none transition placeholder:text-offblack/40 focus:border-sage focus:ring-2 focus:ring-sage/25"
              />
              <button
                type="button"
                onClick={() => clearSwapFilter(step.id)}
                className="rounded-xl border border-sand/80 px-3 py-2 text-xs font-semibold text-earth transition hover:border-earth/40 hover:bg-linen/80"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "ulta", "sephora"] as RetailerFilter[]).map((retailer) => {
                const active = filters.retailer === retailer;
                const label =
                  retailer === "all"
                    ? "All"
                    : retailer === "ulta"
                      ? "Ulta"
                      : "Sephora";
                return (
                  <button
                    key={retailer}
                    type="button"
                    onClick={() => updateSwapFilter(step.id, { retailer })}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? "border-earth bg-earth text-linen"
                        : "border-sand/80 bg-linen/60 text-earth hover:border-earth/40"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {filteredAltIds.map((id) => (
                <ProductMini
                  key={id}
                  productId={id}
                  selected={st.productId === id}
                  onSelect={() => setProduct(step.id, id)}
                />
              ))}
            </div>
            {filteredAltIds.length === 0 ? (
              <p className="rounded-xl border border-dashed border-sand/80 bg-linen/50 px-3 py-4 text-center text-xs leading-relaxed text-offblack/60">
                No alternatives match those filters. Try clearing search or switching
                retailer.
              </p>
            ) : null}
            <p className="text-xs text-offblack/55">
              Want more options?{" "}
              <Link
                href="/actives"
                className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
              >
                Browse the actives library
              </Link>{" "}
              or use the catalog search on{" "}
              <Link
                href="/routine"
                className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
              >
                My routine
              </Link>
              .
            </p>
          </div>
        ) : null}
      </li>
    );
  }

  return (
    <section className="rounded-2xl border border-dawn/50 bg-gradient-to-br from-linen/90 via-blush/35 to-dawn/22 p-6 sm:p-8">
      <h3 className="font-serif text-xl font-medium text-offblack sm:text-2xl">
        Build Your Routine Step by Step
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-offblack/70">
        Start with the steps that match your biggest concern, then save only the
        products you actually want in{" "}
        <strong className="font-medium text-offblack">My routine</strong>. Use swap when
        the step feels right but the product does not.
      </p>
      <p className="mt-4 rounded-xl border border-sand/70 bg-linen/60 px-4 py-3 text-xs leading-relaxed text-offblack/65">
        Safety note: these are routine ideas, not treatment instructions. Start new
        actives slowly, keep SPF in the morning, and pause anything that burns or
        worsens irritation.
      </p>

      {amSteps.length > 0 ? (
        <div className="mt-8">
          <h4 className="text-[0.7rem] font-semibold tracking-[0.12em] text-earth/90">
            Morning (AM)
          </h4>
          <ol className="mt-4 space-y-4">{amSteps.map(renderStep)}</ol>
        </div>
      ) : null}

      {pmSteps.length > 0 ? (
        <div className="mt-10">
          <h4 className="text-[0.7rem] font-semibold tracking-[0.12em] text-earth/90">
            Evening (PM)
          </h4>
          <ol className="mt-4 space-y-4">{pmSteps.map(renderStep)}</ol>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-sand/60 pt-6">
        <button
          type="button"
          onClick={saveKeptToRoutine}
          disabled={keptCount === 0}
          className="rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack disabled:cursor-not-allowed disabled:opacity-45"
        >
          Save kept steps to My routine ({keptCount})
        </button>
        <Link
          href="/routine"
          className="rounded-xl border border-sand/90 px-5 py-2.5 text-sm font-semibold text-earth transition hover:border-earth/50 hover:bg-linen/80"
        >
          Open My routine
        </Link>
      </div>

      {saveMsg ? (
        <p
          className="mt-4 rounded-lg border border-sage/35 bg-sage/10 px-3 py-2 text-sm text-offblack/80"
          role="status"
        >
          {saveMsg}
        </p>
      ) : null}
    </section>
  );
}

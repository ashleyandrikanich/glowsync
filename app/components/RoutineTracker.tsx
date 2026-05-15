"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  loadRoutineProducts,
  newProductId,
  saveRoutineProducts,
  type RoutineProduct,
  type RoutineSlot,
} from "@/src/lib/routine";
import {
  formatProductNotes,
  searchCatalog,
  type CatalogProduct,
} from "@/src/lib/product-catalog";
import {
  buildRoutineScorecard,
  type ProductRoutineInsight,
  type SessionPairingAlert,
} from "@/src/lib/routine-rating";
import type { IngredientId } from "@/src/lib/ingredients";
import { INGREDIENTS } from "@/src/lib/ingredients";

const inputClass =
  "w-full rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 text-offblack shadow-sm outline-none transition placeholder:text-offblack/35 " +
  "hover:border-blossom/35 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25";

const selectClass =
  "w-full cursor-pointer appearance-none rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 pr-10 text-offblack shadow-sm outline-none transition " +
  "hover:border-blossom/35 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25 " +
  "bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat " +
  "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23CA8A04'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")]";

function slotLabel(slot: RoutineSlot): string {
  if (slot === "am") return "Morning";
  if (slot === "pm") return "Evening";
  return "Morning & evening";
}

function chipLabel(id: IngredientId): string {
  const full = INGREDIENTS.find((x) => x.id === id)?.name ?? id;
  return full.length > 26 ? `${full.slice(0, 24)}…` : full;
}

function RoutineColumn({
  columnId,
  title,
  eyebrow,
  products,
  onRemove,
  insightById,
}: {
  columnId: "am" | "pm";
  title: string;
  eyebrow: string;
  products: RoutineProduct[];
  onRemove: (id: string) => void;
  insightById: Map<string, ProductRoutineInsight>;
}) {
  return (
    <section className="flex flex-col rounded-2xl border border-dawn/40 bg-gradient-to-b from-linen/75 via-blush/25 to-dawn/15 p-5 sm:p-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-earth/90">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-xl font-medium text-offblack">{title}</h2>
      <ul className="mt-5 flex flex-1 flex-col gap-3">
        {products.length === 0 ? (
          <li className="rounded-xl border border-dashed border-sand/90 bg-linen/40 py-8 text-center text-sm text-offblack/55">
            Nothing here yet.
          </li>
        ) : (
          products.map((p) => {
            const insight = insightById.get(p.id);
            return (
            <li
              key={`${p.id}-${columnId}`}
              className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/80 to-blush/30 px-4 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-offblack">{p.name}</p>
                  {p.brand ? (
                    <p className="mt-0.5 text-sm text-earth/90">{p.brand}</p>
                  ) : null}
                  {insight && insight.detected.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {insight.detected.map((id) => (
                        <span
                          key={id}
                          className="max-w-full truncate rounded-md bg-earth/10 px-2 py-0.5 text-[0.65rem] font-medium leading-snug text-earth"
                          title={INGREDIENTS.find((x) => x.id === id)?.name}
                        >
                          {chipLabel(id)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {p.notes ? (
                    <p className="mt-2 text-sm leading-relaxed text-offblack/70">
                      {p.notes}
                    </p>
                  ) : null}
                  {insight?.tip ? (
                    <p className="mt-2 rounded-lg border border-sage/30 bg-sage/10 px-3 py-2 text-xs leading-relaxed text-offblack/80">
                      {insight.tip}
                    </p>
                  ) : null}
                  {p.slot === "both" ? (
                    <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-earth/75">
                      {slotLabel(p.slot)}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  className="shrink-0 rounded-lg px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-earth/80 transition hover:bg-sand/60 hover:text-offblack"
                  aria-label={`Remove ${p.name}`}
                >
                  Remove
                </button>
              </div>
            </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

export function RoutineTracker() {
  const [products, setProducts] = useState<RoutineProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [slot, setSlot] = useState<RoutineSlot>("am");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useMemo(() => searchCatalog(name, 15), [name]);

  const applyCatalogProduct = useCallback((p: CatalogProduct) => {
    setName(p.name);
    setBrand(p.brand);
    setNotes(formatProductNotes(p));
    setActiveSuggestion(-1);
    setSuggestOpen(false);
  }, []);

  const cancelBlurClose = useCallback(() => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  }, []);

  const scheduleBlurClose = useCallback(() => {
    cancelBlurClose();
    blurTimeout.current = setTimeout(() => {
      setSuggestOpen(false);
      setActiveSuggestion(-1);
    }, 160);
  }, [cancelBlurClose]);

  useEffect(() => {
    return () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setProducts(loadRoutineProducts());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveRoutineProducts(products);
  }, [products, hydrated]);

  const amProducts = useMemo(
    () => products.filter((p) => p.slot === "am" || p.slot === "both"),
    [products]
  );
  const pmProducts = useMemo(
    () => products.filter((p) => p.slot === "pm" || p.slot === "both"),
    [products]
  );

  const activeDescendantId =
    activeSuggestion >= 0 && suggestions[activeSuggestion]
      ? `routine-suggest-${suggestions[activeSuggestion].id}`
      : undefined;

  const scorecard = useMemo(
    () => buildRoutineScorecard(products),
    [products]
  );
  const { rating, insights } = scorecard;

  const insightById = useMemo(() => {
    const m = new Map<string, ProductRoutineInsight>();
    for (const row of insights.perProduct) m.set(row.productId, row);
    return m;
  }, [insights.perProduct]);

  const addProduct = useCallback(() => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setProducts((prev) => [
      ...prev,
      {
        id: newProductId(),
        name: trimmed,
        brand: brand.trim(),
        notes: notes.trim(),
        slot,
      },
    ]);
    setName("");
    setBrand("");
    setNotes("");
    setSlot("am");
  }, [name, brand, notes, slot]);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    if (products.length === 0) return;
    const ok =
      typeof window !== "undefined"
        ? window.confirm("Clear your entire routine? This cannot be undone.")
        : false;
    if (ok) setProducts([]);
  }, [products.length]);

  return (
    <div className="space-y-10">
      <p className="text-[0.9375rem] leading-relaxed text-offblack/75">
        Add the products you actually reach for. Everything stays in this
        browser — nothing is sent to a server. We scan names and notes for
        common actives, score coverage (cleanser, SPF, moisture, notes), and
        flag same-session combos using the same rules as the{" "}
        <Link
          href="/"
          className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          safety checker on Home
        </Link>
        . For a deliberate two-ingredient check, open it anytime.
      </p>

      <div className="glow-card-sheen rounded-2xl border border-dawn/45 bg-gradient-to-br from-linen/88 via-blush/35 to-dawn/22 p-6 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Add a product
        </h2>
        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <div className="relative sm:col-span-2 space-y-2">
            <label
              htmlFor="routine-name"
              className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
            >
              Product name <span className="text-offblack/50">· required</span>
            </label>
            <input
              id="routine-name"
              role="combobox"
              aria-expanded={suggestOpen && name.trim().length >= 1}
              aria-controls="routine-name-suggestions"
              aria-autocomplete="list"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setActiveSuggestion(-1);
                setSuggestOpen(true);
              }}
              onFocus={() => {
                cancelBlurClose();
                setSuggestOpen(true);
              }}
              onBlur={scheduleBlurClose}
              onKeyDown={(e) => {
                if (
                  e.key === "Escape" &&
                  suggestOpen &&
                  name.trim().length >= 1
                ) {
                  e.preventDefault();
                  setSuggestOpen(false);
                  setActiveSuggestion(-1);
                  return;
                }
                if (!suggestOpen || name.trim().length < 1) return;

                if (e.key === "ArrowDown" && suggestions.length > 0) {
                  e.preventDefault();
                  setActiveSuggestion((i) => {
                    if (i < 0) return 0;
                    return Math.min(i + 1, suggestions.length - 1);
                  });
                } else if (e.key === "ArrowUp" && suggestions.length > 0) {
                  e.preventDefault();
                  setActiveSuggestion((i) => {
                    if (i <= 0) return -1;
                    return i - 1;
                  });
                } else if (e.key === "Enter" && activeSuggestion >= 0) {
                  const pick = suggestions[activeSuggestion];
                  if (pick) {
                    e.preventDefault();
                    applyCatalogProduct(pick);
                  }
                }
              }}
              placeholder="Start typing a product or brand…"
              className={inputClass}
              autoComplete="off"
              aria-activedescendant={activeDescendantId}
            />
            {suggestOpen && name.trim().length >= 1 ? (
              <ul
                id="routine-name-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-xl border border-sand/90 bg-linen/95 py-1 shadow-lg backdrop-blur-md"
                onMouseDown={cancelBlurClose}
              >
                {suggestions.length === 0 ? (
                  <li
                    role="presentation"
                    className="px-4 py-3 text-sm leading-relaxed text-offblack/65"
                  >
                    No catalog match. Keep typing to add a custom product — your
                    notes stay yours.
                  </li>
                ) : (
                  suggestions.map((p, index) => {
                    const active = index === activeSuggestion;
                    return (
                      <li key={p.id} role="option" aria-selected={active}>
                        <button
                          type="button"
                          id={`routine-suggest-${p.id}`}
                          className={`flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition ${
                            active
                              ? "bg-sand/70 text-offblack"
                              : "text-offblack hover:bg-sand/40"
                          }`}
                          onMouseEnter={() => setActiveSuggestion(index)}
                          onMouseDown={(ev) => {
                            ev.preventDefault();
                            applyCatalogProduct(p);
                          }}
                        >
                          <span className="font-medium text-offblack">
                            {p.name}
                          </span>
                          <span className="text-xs text-earth/90">{p.brand}</span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            ) : null}
            <p className="text-xs leading-relaxed text-offblack/50">
              Suggestions include many staples carried at Ulta and Sephora (US);
              inventory changes, so always confirm on your own label. Pick a row
              to auto-fill brand and notes with key actives and representative
              bases — or ignore the list and add anything manually.
            </p>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="routine-brand"
              className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
            >
              Brand
            </label>
            <input
              id="routine-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Optional"
              className={inputClass}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="routine-slot"
              className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
            >
              When you use it
            </label>
            <select
              id="routine-slot"
              value={slot}
              onChange={(e) => setSlot(e.target.value as RoutineSlot)}
              className={selectClass}
            >
              <option value="am">Morning</option>
              <option value="pm">Evening</option>
              <option value="both">Morning & evening</option>
            </select>
          </div>
          <div className="sm:col-span-2 space-y-2">
            <label
              htmlFor="routine-notes"
              className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
            >
              Notes
            </label>
            <textarea
              id="routine-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Filled automatically when you pick a catalog match — edit freely."
              rows={4}
              className={`${inputClass} resize-y min-h-[6.5rem]`}
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-earth via-earth to-blossom px-6 py-2.5 text-sm font-medium text-linen shadow-md transition hover:from-offblack hover:via-earth hover:to-sage disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!name.trim()}
            >
              Add to routine
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-sand/90 px-4 py-2.5 text-sm font-medium text-earth transition hover:border-earth/50 hover:bg-sand/30 disabled:opacity-40"
              disabled={products.length === 0}
            >
              Clear all
            </button>
          </div>
        </form>
      </div>

      {hydrated ? (
        <section
          className="rounded-2xl border border-sand/75 bg-gradient-to-br from-linen/70 via-blush/25 to-dawn/18 px-6 py-5 sm:px-8 sm:py-6"
          aria-labelledby="routine-rating-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                id="routine-rating-heading"
                className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-earth/85"
              >
                Routine rating
              </p>
              <p className="mt-2 font-serif text-3xl font-medium tracking-tight text-offblack sm:text-4xl">
                {rating.score}
                <span className="text-lg font-normal text-earth/55 sm:text-xl">
                  /100
                </span>
              </p>
              <p className="mt-1 text-sm font-medium text-earth">{rating.tier}</p>
            </div>
            <div
              className="flex gap-0.5 text-2xl leading-none text-sand sm:text-3xl"
              aria-label={`${rating.stars} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={
                    i <= rating.stars ? "text-earth" : "text-sand/80"
                  }
                  aria-hidden
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-sand/50"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rating.score}
            aria-label={`Routine completeness ${rating.score} percent`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-earth via-earth to-sage transition-[width] duration-500 ease-out"
              style={{ width: `${rating.score}%` }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-offblack/60 sm:text-sm">
            {rating.blurb}{" "}
            <span className="text-offblack/45">
              ({products.length} product{products.length === 1 ? "" : "s"} logged)
            </span>
          </p>
          <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/80">
            What moved the score
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs leading-relaxed text-offblack/70 sm:text-sm">
            {insights.scoreFactors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {insights.bullets.length > 0 ? (
            <>
              <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/80">
                Routine coach notes
              </p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-offblack/75 sm:text-sm">
                {insights.bullets.map((b) => (
                  <li
                    key={b}
                    className="rounded-lg border border-sand/60 bg-linen/50 px-3 py-2"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      ) : null}

      {hydrated && products.length > 0 ? (
        <div className="space-y-6">
          {insights.sameSession.length > 0 ? (
            <section
              className="rounded-2xl border border-earth/25 bg-earth/[0.06] px-5 py-5 sm:px-6"
              aria-labelledby="routine-pairings-heading"
            >
              <h2
                id="routine-pairings-heading"
                className="font-serif text-lg font-medium text-offblack"
              >
                Same-session layering (detected actives)
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-offblack/65 sm:text-sm">
                We scan product names and notes for ingredients, then apply the
                same pairing rules as the{" "}
                <Link
                  href="/"
                  className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
                >
                  Home checker
                </Link>
                . Misses are possible if notes are vague.
              </p>
              <ul className="mt-4 space-y-3">
                {insights.sameSession.map((row: SessionPairingAlert) => (
                  <li
                    key={row.id}
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      row.verdict === "avoid"
                        ? "border-blossom/50 bg-blossom/15"
                        : "border-dawn/55 bg-dawn/35"
                    }`}
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/85">
                      {row.slot === "am" ? "Morning" : "Evening"} ·{" "}
                      {row.verdict === "avoid" ? "High caution" : "Heads-up"}
                    </p>
                    <p className="mt-1 font-medium text-offblack">
                      {row.ingredientA} + {row.ingredientB}
                    </p>
                    <p className="mt-0.5 text-xs text-offblack/70">
                      {row.productNames}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-offblack/80">
                      {row.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {insights.crossDay.length > 0 ? (
            <section className="rounded-2xl border border-sand/80 bg-linen/60 px-5 py-5 sm:px-6">
              <h2 className="font-serif text-lg font-medium text-offblack">
                Same-day AM + PM rhythm
              </h2>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-offblack/80">
                {insights.crossDay.map((tip) => (
                  <li key={tip.id} className="rounded-lg border border-sand/70 bg-white/45 px-3 py-2">
                    <p className="font-medium text-offblack">{tip.title}</p>
                    <p className="mt-1 text-xs text-offblack/75">{tip.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      {!hydrated ? (
        <div className="grid gap-6 lg:grid-cols-2" aria-hidden>
          <div className="h-56 rounded-2xl bg-sand/25" />
          <div className="h-56 rounded-2xl bg-sand/25" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <RoutineColumn
            columnId="am"
            title="Morning"
            eyebrow="A.M."
            products={amProducts}
            onRemove={removeProduct}
            insightById={insightById}
          />
          <RoutineColumn
            columnId="pm"
            title="Evening"
            eyebrow="P.M."
            products={pmProducts}
            onRemove={removeProduct}
            insightById={insightById}
          />
        </div>
      )}
    </div>
  );
}

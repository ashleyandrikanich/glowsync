"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  loadRoutineProducts,
  newProductId,
  saveRoutineProducts,
  type RoutineProduct,
  type RoutineFrequency,
  type RoutineSlot,
  type RoutineProductStatus,
} from "@/src/lib/routine";
import {
  formatProductNotes,
  searchCatalog,
  type CatalogProduct,
} from "@/src/lib/product-catalog";
import {
  buildRoutineScorecard,
  type ActiveLoadAlert,
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

function frequencyLabel(frequency: RoutineFrequency | undefined): string {
  if (frequency === "every_other_day") return "Every other day";
  if (frequency === "weekly") return "Weekly";
  if (frequency === "as_needed") return "As needed";
  return "Daily";
}

function chipLabel(id: IngredientId): string {
  const full = INGREDIENTS.find((x) => x.id === id)?.name ?? id;
  return full.length > 26 ? `${full.slice(0, 24)}…` : full;
}

function statusLabel(status: RoutineProductStatus | undefined): string {
  if (status === "using") return "In Rotation";
  if (status === "love") return "Love";
  if (status === "irritating") return "Irritating";
  if (status === "finished") return "Finished";
  return "In Rotation";
}

function statusTone(status: RoutineProductStatus | undefined): string {
  if (status === "love") return "border-sage/40 bg-sage/15 text-earth";
  if (status === "irritating") return "border-blossom/45 bg-blossom/15 text-earth";
  if (status === "finished") return "border-sand/80 bg-sand/35 text-offblack/60";
  return "border-dawn/50 bg-dawn/25 text-earth";
}

function RoutineColumn({
  columnId,
  title,
  eyebrow,
  products,
  onRemove,
  onMove,
  onMarkUsed,
  onStatusChange,
  insightById,
  today,
}: {
  columnId: "am" | "pm";
  title: string;
  eyebrow: string;
  products: RoutineProduct[];
  onRemove: (id: string) => void;
  onMove: (id: string, direction: -1 | 1, columnId: "am" | "pm") => void;
  onMarkUsed: (id: string) => void;
  onStatusChange: (id: string, status: RoutineProductStatus) => void;
  insightById: Map<string, ProductRoutineInsight>;
  today: string;
}) {
  const emptyHint =
    columnId === "am"
      ? "Start with cleanser, moisturizer, and SPF. Add one treatment only if your skin already feels steady."
      : "Start with cleanser and moisturizer. Keep stronger actives here so mornings stay SPF-focused.";

  return (
    <section className="flex flex-col rounded-2xl border border-dawn/40 bg-gradient-to-b from-linen/75 via-blush/25 to-dawn/15 p-5 sm:p-6">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-earth/90">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-xl font-medium text-offblack">{title}</h2>
      <ul className="mt-5 flex flex-1 flex-col gap-3">
        {products.length === 0 ? (
          <li className="rounded-xl border border-dashed border-sand/90 bg-linen/45 px-4 py-8 text-center text-sm leading-relaxed text-offblack/60">
            <span className="block font-medium text-offblack">Nothing here yet.</span>
            <span className="mt-1 block">{emptyHint}</span>
          </li>
        ) : (
          products.map((p, index) => {
            const insight = insightById.get(p.id);
            const usedToday = p.lastUsedDate === today;
            const status = p.status ?? "using";
            return (
            <li
              key={`${p.id}-${columnId}`}
              className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/80 to-blush/30 px-4 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/75">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 font-medium text-offblack">{p.name}</p>
                  {p.brand ? (
                    <p className="mt-0.5 text-sm text-earth/90">{p.brand}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${statusTone(
                        status
                      )}`}
                    >
                      {statusLabel(status)}
                    </span>
                    {usedToday ? (
                      <span className="rounded-md border border-earth/20 bg-earth/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-earth">
                        Used today
                      </span>
                    ) : null}
                  </div>
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
                  <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-earth/75">
                    {frequencyLabel(p.frequency)}
                  </p>
                </div>
                <details className="relative shrink-0">
                  <summary className="list-none rounded-lg border border-sand/80 bg-linen/70 px-3 py-1.5 text-xs font-semibold text-earth transition hover:border-earth/40 hover:bg-linen [&::-webkit-details-marker]:hidden">
                    Actions
                  </summary>
                  <div className="absolute right-0 z-20 mt-1 flex w-44 flex-col rounded-xl border border-sand/90 bg-linen/95 p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => onMove(p.id, -1, columnId)}
                      disabled={index === 0}
                      className="rounded-lg px-3 py-2 text-left text-xs font-semibold text-earth transition hover:bg-sand/45 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move up in routine
                    </button>
                    <button
                      type="button"
                      onClick={() => onMove(p.id, 1, columnId)}
                      disabled={index === products.length - 1}
                      className="rounded-lg px-3 py-2 text-left text-xs font-semibold text-earth transition hover:bg-sand/45 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move down in routine
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(p.id)}
                      className="rounded-lg px-3 py-2 text-left text-xs font-semibold text-earth transition hover:bg-blossom/15"
                    >
                      Remove product
                    </button>
                  </div>
                </details>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-sand/55 pt-3">
                <button
                  type="button"
                  onClick={() => onMarkUsed(p.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    usedToday
                      ? "bg-sage/20 text-earth"
                      : "border border-earth/25 bg-linen/70 text-earth hover:border-earth/45"
                  }`}
                >
                  {usedToday ? "Used today" : "Mark used today"}
                </button>
                <label className="sr-only" htmlFor={`${columnId}-${p.id}-status`}>
                  Product status
                </label>
                <select
                  id={`${columnId}-${p.id}-status`}
                  value={status}
                  onChange={(e) =>
                    onStatusChange(p.id, e.target.value as RoutineProductStatus)
                  }
                  className="rounded-lg border border-sand/80 bg-linen/70 px-3 py-1.5 text-xs font-semibold text-earth outline-none transition hover:border-earth/40 focus:border-sage focus:ring-2 focus:ring-sage/25"
                >
                  <option value="using">In Rotation</option>
                  <option value="love">Love</option>
                  <option value="irritating">Irritating</option>
                  <option value="finished">Finished</option>
                </select>
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
  const [activeOverview, setActiveOverview] = useState<"today" | "shelf" | null>(null);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [slot, setSlot] = useState<RoutineSlot>("am");
  const [frequency, setFrequency] = useState<RoutineFrequency>("daily");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
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
  const usedTodayCount = useMemo(
    () => products.filter((p) => p.lastUsedDate === today).length,
    [products, today]
  );
  const usedTodayProducts = useMemo(
    () => products.filter((p) => p.lastUsedDate === today),
    [products, today]
  );
  const attentionCount = useMemo(
    () => products.filter((p) => p.status === "irritating").length,
    [products]
  );
  const statusGroups = useMemo(
    () =>
      (["using", "love", "irritating", "finished"] as RoutineProductStatus[]).map(
        (status) => ({
          status,
          products: products.filter((p) => (p.status ?? "using") === status),
        })
      ),
    [products]
  );

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
        frequency,
        status: "using",
      },
    ]);
    setName("");
    setBrand("");
    setNotes("");
    setSlot("am");
    setFrequency("daily");
  }, [name, brand, notes, slot, frequency]);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const markUsedToday = useCallback(
    (id: string) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, lastUsedDate: today } : p))
      );
    },
    [today]
  );

  const changeStatus = useCallback((id: string, status: RoutineProductStatus) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }, []);

  const moveProduct = useCallback((id: string, direction: -1 | 1, columnId: "am" | "pm") => {
    setProducts((prev) => {
      const visible = prev.filter((p) =>
        columnId === "am" ? p.slot === "am" || p.slot === "both" : p.slot === "pm" || p.slot === "both"
      );
      const visibleIndex = visible.findIndex((p) => p.id === id);
      const target = visible[visibleIndex + direction];
      if (!target) return prev;
      const index = prev.findIndex((p) => p.id === id);
      const nextIndex = prev.findIndex((p) => p.id === target.id);
      const next = [...prev];
      [next[index], next[nextIndex]] = [next[nextIndex]!, next[index]!];
      return next;
    });
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
        Add what you use, mark today’s products, and adjust your AM/PM order.
        GlowSync reads names and notes for quick active checks and practical
        layering nudges.
      </p>

      {hydrated ? (
        <section className="space-y-3" aria-label="Routine overviews">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                setActiveOverview((cur) => (cur === "today" ? null : "today"))
              }
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                activeOverview === "today"
                  ? "border-earth/45 bg-gradient-to-br from-dawn/35 to-linen shadow-sm"
                  : "border-dawn/45 bg-gradient-to-br from-linen/80 to-dawn/20 hover:border-earth/35"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
                    Used Today
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-offblack/65">
                    See which routine products you marked for today.
                  </p>
                </div>
                <span className="rounded-full bg-earth/10 px-2.5 py-1 text-xs font-semibold text-earth">
                  {usedTodayCount}/{products.length}
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveOverview((cur) => (cur === "shelf" ? null : "shelf"))
              }
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                activeOverview === "shelf"
                  ? "border-earth/45 bg-gradient-to-br from-blush/35 to-linen shadow-sm"
                  : "border-dawn/45 bg-gradient-to-br from-linen/80 to-blush/25 hover:border-earth/35"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
                    Shelf Status
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-offblack/65">
                    Review what is in rotation, loved, irritating, or finished.
                  </p>
                </div>
                <span className="rounded-full bg-earth/10 px-2.5 py-1 text-xs font-semibold text-earth">
                  {attentionCount} flagged
                </span>
              </div>
            </button>
          </div>

          {activeOverview ? (
            <div className="rounded-2xl border border-sand/80 bg-linen/65 px-4 py-4">
              {activeOverview === "today" ? (
                <>
                  <p className="font-serif text-lg font-medium text-offblack">
                    Products Used Today
                  </p>
                  {usedTodayProducts.length > 0 ? (
                    <ul className="mt-3 space-y-2 text-sm text-offblack/75">
                      {usedTodayProducts.map((p) => (
                        <li
                          key={p.id}
                          className="rounded-lg border border-sand/70 bg-white/35 px-3 py-2"
                        >
                          <span className="font-medium text-offblack">{p.name}</span>
                          {p.brand ? (
                            <span className="text-earth/85"> · {p.brand}</span>
                          ) : null}
                          <span className="text-offblack/50"> · {slotLabel(p.slot)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-offblack/65">
                      Nothing marked yet. Tap “Mark used today” on any routine card.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="font-serif text-lg font-medium text-offblack">
                    Shelf Status Overview
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {statusGroups.map((group) => (
                      <div
                        key={group.status}
                        className="rounded-lg border border-sand/70 bg-white/35 px-3 py-2"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-earth/80">
                          {statusLabel(group.status)} ({group.products.length})
                        </p>
                        {group.products.length > 0 ? (
                          <p className="mt-1 text-sm text-offblack/75">
                            {group.products.map((p) => p.name).join(", ")}
                          </p>
                        ) : (
                          <p className="mt-1 text-sm text-offblack/45">None</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="glow-card-sheen rounded-2xl border border-dawn/45 bg-gradient-to-br from-linen/88 via-blush/35 to-dawn/22 p-6 sm:p-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Add a Product
        </h2>
        <form
          className="mt-6 grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <div className="relative sm:col-span-3 space-y-2">
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
          <div className="space-y-2">
            <label
              htmlFor="routine-frequency"
              className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
            >
              How often you use it
            </label>
            <select
              id="routine-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as RoutineFrequency)}
              className={selectClass}
            >
              <option value="daily">Daily</option>
              <option value="every_other_day">Every other day</option>
              <option value="weekly">Weekly</option>
              <option value="as_needed">As needed</option>
            </select>
          </div>
          <div className="sm:col-span-3 space-y-2">
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
          <div className="sm:col-span-3 flex flex-wrap items-center gap-3 pt-1">
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
                className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85"
              >
                Routine Rating
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
          <p className="mt-4 text-[0.65rem] font-semibold tracking-[0.06em] text-earth/80">
            What Moved the Score
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs leading-relaxed text-offblack/70 sm:text-sm">
            {insights.scoreFactors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {insights.bullets.length > 0 ? (
            <>
              <p className="mt-5 text-[0.65rem] font-semibold tracking-[0.06em] text-earth/80">
                Routine Coach Notes
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
          {insights.activeLoad.length > 0 ? (
            <section
              className="rounded-2xl border border-blossom/35 bg-blossom/10 px-5 py-5 sm:px-6"
              aria-labelledby="routine-active-load-heading"
            >
              <h2
                id="routine-active-load-heading"
                className="font-serif text-lg font-medium text-offblack"
              >
                Active Intensity Check
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-offblack/65 sm:text-sm">
                GlowSync checks whether stronger actives look concentrated in one
                session or marked too frequently. Use this as a prompt to slow down,
                alternate days, or add recovery nights.
              </p>
              <ul className="mt-4 space-y-3">
                {insights.activeLoad.map((row: ActiveLoadAlert) => (
                  <li
                    key={row.id}
                    className="rounded-xl border border-blossom/45 bg-linen/55 px-4 py-3 text-sm"
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/85">
                      {row.slot === "am" ? "Morning" : "Evening"} · Active load
                    </p>
                    <p className="mt-1 font-medium text-offblack">{row.title}</p>
                    <p className="mt-0.5 text-xs text-offblack/70">
                      {row.productNames}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-offblack/80">
                      {row.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {insights.sameSession.length > 0 ? (
            <section
              className="rounded-2xl border border-earth/25 bg-earth/[0.06] px-5 py-5 sm:px-6"
              aria-labelledby="routine-pairings-heading"
            >
              <h2
                id="routine-pairings-heading"
                className="font-serif text-lg font-medium text-offblack"
              >
                Same-Session Layering (Detected Actives)
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-offblack/65 sm:text-sm">
                We scan product names and notes for ingredients, then apply the
                same conservative ingredient rules used across GlowSync. Misses
                are possible if notes are vague.
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
                Same-Day AM + PM Rhythm
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
            onMove={moveProduct}
            onMarkUsed={markUsedToday}
            onStatusChange={changeStatus}
            insightById={insightById}
            today={today}
          />
          <RoutineColumn
            columnId="pm"
            title="Evening"
            eyebrow="P.M."
            products={pmProducts}
            onRemove={removeProduct}
            onMove={moveProduct}
            onMarkUsed={markUsedToday}
            onStatusChange={changeStatus}
            insightById={insightById}
            today={today}
          />
        </div>
      )}
    </div>
  );
}

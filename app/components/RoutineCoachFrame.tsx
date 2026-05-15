"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ROUTINE_GUIDE_BY_SKIN } from "@/src/lib/routine-guide-content";
import { loadRoutineProducts, ROUTINE_STORAGE_KEY, type RoutineProduct, type RoutineSlot } from "@/src/lib/routine";
import { analyzeRoutine, type CoachSuggestion } from "@/src/lib/routine-coach";
import { computeRoutineRating } from "@/src/lib/routine-rating";
import { SKIN_FEEL_OPTIONS, type SkinFeel } from "@/src/lib/skin-quiz";

type CoachTab = "starter" | "review";

function slotLabel(slot: RoutineSlot): string {
  if (slot === "am") return "Morning";
  if (slot === "pm") return "Evening";
  return "Morning & evening";
}

function suggestionStyles(tone: CoachSuggestion["tone"]) {
  if (tone === "celebrate") {
    return "border-sage/40 bg-sage/10";
  }
  if (tone === "nudge") {
    return "border-blossom/40 bg-dawn/35";
  }
  return "border-sand/80 bg-linen/70";
}

export function RoutineCoachFrame() {
  const [tab, setTab] = useState<CoachTab>("starter");
  const [skin, setSkin] = useState<SkinFeel>("combo");
  const [products, setProducts] = useState<RoutineProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refreshProducts = useCallback(() => {
    setProducts(loadRoutineProducts());
  }, []);

  useEffect(() => {
    refreshProducts();
    setHydrated(true);
  }, [refreshProducts]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ROUTINE_STORAGE_KEY) refreshProducts();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refreshProducts]);

  useEffect(() => {
    const onFocus = () => {
      if (tab === "review") refreshProducts();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [tab, refreshProducts]);

  useEffect(() => {
    if (tab === "review") refreshProducts();
  }, [tab, refreshProducts]);

  const block = ROUTINE_GUIDE_BY_SKIN[skin];
  const rating = useMemo(() => computeRoutineRating(products), [products]);
  const suggestions = useMemo(() => analyzeRoutine(products), [products]);

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-dawn/45 bg-gradient-to-br from-linen/90 via-blush/35 to-dawn/22 shadow-[inset_0_1px_0_rgba(255,251,247,0.85)]">
      <div
        className="flex flex-wrap gap-2 border-b border-sand/50 bg-linen/50 px-4 py-3 sm:px-5"
        role="tablist"
        aria-label="Routine coach modes"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "starter"}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            tab === "starter"
              ? "bg-earth text-linen shadow-sm"
              : "border border-transparent text-earth/90 hover:bg-linen"
          }`}
          onClick={() => setTab("starter")}
        >
          Build a starter routine
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "review"}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            tab === "review"
              ? "bg-earth text-linen shadow-sm"
              : "border border-transparent text-earth/90 hover:bg-linen"
          }`}
          onClick={() => setTab("review")}
        >
          Review my routine
        </button>
      </div>

      <div className="p-5 sm:p-7" role="tabpanel">
        {tab === "starter" ? (
          <div className="space-y-8">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
                Step 1 — how does your skin usually feel?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SKIN_FEEL_OPTIONS.map((opt) => {
                  const on = skin === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSkin(opt.value)}
                      className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition sm:px-4 sm:text-sm ${
                        on
                          ? "border-earth bg-earth text-linen shadow-sm"
                          : "border-sand/80 bg-linen/60 text-earth/90 hover:border-earth/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm text-offblack/65">
                {SKIN_FEEL_OPTIONS.find((o) => o.value === skin)?.hint}
              </p>
            </div>

            <div className="rounded-2xl border border-sand/85 bg-gradient-to-br from-linen/85 to-blush/28 p-5 sm:p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-earth/85">
                Suggested starter frame
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium text-offblack">
                {block.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-offblack/75 sm:text-[0.9375rem]">
                {block.blurb}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="font-serif text-lg font-medium text-offblack">
                    AM ideas
                  </h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
                    {block.am.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-offblack">
                    PM ideas
                  </h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
                    {block.pm.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-offblack/55">
                This is a template, not a prescription. Copy what resonates into{" "}
                <Link
                  href="/routine"
                  className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
                >
                  My routine
                </Link>{" "}
                row by row, or refine further in the{" "}
                <Link
                  href="/guide"
                  className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
                >
                  routine guide
                </Link>{" "}
                and{" "}
                <Link
                  href="/skin-quiz"
                  className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
                >
                  skin quiz
                </Link>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
                  Logged on this device
                </p>
                <p className="mt-1 text-sm text-offblack/70">
                  We read the same list as{" "}
                  <Link
                    href="/routine"
                    className="font-medium text-earth underline decoration-sand/80 underline-offset-2"
                  >
                    My routine
                  </Link>
                  . Switch tabs and come back — we refresh when you return.
                </p>
              </div>
              {hydrated ? (
                <button
                  type="button"
                  onClick={refreshProducts}
                  className="shrink-0 rounded-xl border border-earth/30 bg-linen/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-earth transition hover:border-earth/50"
                >
                  Refresh
                </button>
              ) : null}
            </div>

            {!hydrated ? (
              <div className="h-40 animate-pulse rounded-xl bg-sand/30" aria-hidden />
            ) : (
              <>
                <section className="rounded-2xl border border-sand/80 bg-linen/70 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/85">
                        Routine rating (same formula as My routine)
                      </p>
                      <p className="mt-1 font-serif text-3xl font-medium text-offblack">
                        {rating.score}
                        <span className="text-lg font-normal text-earth/55">
                          /100
                        </span>
                      </p>
                      <p className="text-sm font-medium text-earth">{rating.tier}</p>
                    </div>
                    <p className="text-sm text-offblack/60">
                      {products.length} product
                      {products.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-offblack/60 sm:text-sm">
                    {rating.blurb}
                  </p>
                </section>

                {products.length > 0 ? (
                  <section>
                    <h3 className="font-serif text-lg font-medium text-offblack">
                      What we see
                    </h3>
                    <ul className="mt-3 divide-y divide-sand/70 rounded-xl border border-sand/80 bg-white/50">
                      {products.map((p) => (
                        <li
                          key={p.id}
                          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="min-w-0">
                            <p className="font-medium text-offblack">{p.name}</p>
                            {p.brand ? (
                              <p className="text-sm text-earth/90">{p.brand}</p>
                            ) : null}
                          </div>
                          <p className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-earth/75">
                            {slotLabel(p.slot)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                <section>
                  <h3 className="font-serif text-lg font-medium text-offblack">
                    Suggestions
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {suggestions.map((s) => (
                      <li
                        key={s.id}
                        className={`rounded-2xl border px-4 py-4 sm:px-5 ${suggestionStyles(s.tone)}`}
                      >
                        <p className="font-medium text-offblack">{s.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-offblack/80">
                          {s.detail}
                        </p>
                        {s.links && s.links.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {s.links.map((l) => (
                              <Link
                                key={l.href + l.label}
                                href={l.href}
                                className="text-sm font-semibold text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
                              >
                                {l.label} →
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

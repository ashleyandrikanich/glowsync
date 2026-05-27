"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { QuizRoutinePlanner } from "./QuizRoutinePlanner";
import { SkinProfileBridge } from "./SkinProfileBridge";
import {
  formatProductNotes,
  getCatalogBrands,
  getCatalogProductById,
} from "@/src/lib/product-catalog";
import {
  CONCERN_OPTIONS,
  MAX_FAVORITE_BRANDS,
  MAX_QUIZ_PRIORITIES,
  QUIZ_SKIN_PROFILE_OPTIONS,
  SENSITIVITY_OPTIONS,
  SPF_OPTIONS,
  buildQuizResult,
  type Concern,
  type QuizAnswers,
  type QuizSkinProfile,
  type Sensitivity,
  type SpfHabit,
} from "@/src/lib/skin-quiz";
import {
  SKIN_PROFILE_STORAGE_KEY,
  describeProfileBlend,
  firstIncompleteQuizStep,
  loadSkinProfile,
  saveSkinProfileFromQuiz,
} from "@/src/lib/skin-profile";

const choiceClass =
  "flex w-full flex-col rounded-xl border border-sand/90 bg-linen/60 px-4 py-3.5 text-left shadow-sm transition hover:border-earth/40 hover:bg-linen/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/40";

/** Selected answer, warm orange fill + ring */
const choiceSelected =
  "border-earth bg-gradient-to-br from-dawn/75 via-dawn/55 to-blossom/20 ring-2 ring-earth/40 shadow-md";

const brandChipClass =
  "rounded-full border border-sand/90 bg-linen/60 px-3 py-1.5 text-sm font-medium text-offblack shadow-sm transition hover:border-earth/40 hover:bg-linen/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/40";

const brandChipSelected =
  "border-earth bg-gradient-to-br from-dawn/75 via-dawn/55 to-blossom/20 text-offblack ring-2 ring-earth/35";

const STEPS = [
  {
    key: "skinProfile" as const,
    title: "How Does Your Skin Feel Most Days?",
    subtitle: "Pick the closest match, finer choices help us shape AM/PM ideas.",
  },
  {
    key: "concern" as const,
    title: "What Do You Want the Most Help With?",
    subtitle: `Choose up to ${MAX_QUIZ_PRIORITIES} top priorities (at least one). Tap again to remove.`,
  },
  {
    key: "sensitivity" as const,
    title: "How Does Your Skin React to New Actives?",
    subtitle: "We will bias picks toward gentler options when needed.",
  },
  {
    key: "spfHabit" as const,
    title: "How Often Do You Wear SPF on Your Face?",
    subtitle: "Honest answers shape your AM routine notes.",
  },
  {
    key: "favoriteBrands" as const,
    title: "Any Favorite Brands?",
    subtitle: `Optional, pick up to ${MAX_FAVORITE_BRANDS} brands you already trust. We will favor them in catalog picks when they still fit your skin profile.`,
  },
];

const ALL_CATALOG_BRANDS = getCatalogBrands();

type SkinQuizClientProps = {
  hub?: boolean;
  onQuizComplete?: () => void;
};

export function SkinQuizClient({ hub = false, onQuizComplete }: SkinQuizClientProps = {}) {
  const searchParams = useSearchParams();
  const fromScan = searchParams.get("from") === "scan";

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinProfile: null,
    concerns: [],
    sensitivity: null,
    spfHabit: null,
    favoriteBrands: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogRetailer, setCatalogRetailer] = useState<"all" | "ulta" | "sephora">("all");
  const [plannerKey, setPlannerKey] = useState(0);

  useEffect(() => {
    const saved = loadSkinProfile();
    if (saved?.answers) {
      setAnswers(saved.answers);
      if (fromScan) {
        const incomplete = firstIncompleteQuizStep(saved.answers);
        setStep(incomplete >= STEPS.length ? STEPS.length : incomplete);
      }
    }
    setHydrated(true);
  }, [fromScan]);

  useEffect(() => {
    if (!hydrated) return;
    saveSkinProfileFromQuiz(answers);
  }, [answers, hydrated]);

  const result = useMemo(() => buildQuizResult(answers), [answers]);
  const visibleCatalogPicks = useMemo(() => {
    if (!result) return [];
    const q = catalogQuery.trim().toLowerCase();
    return result.catalogPicks.filter((pick) => {
      const p = getCatalogProductById(pick.productId);
      if (!p) return false;
      if (catalogRetailer !== "all" && !p.retailers?.includes(catalogRetailer)) {
        return false;
      }
      if (!q) return true;
      const hay = [
        p.brand,
        p.name,
        ...p.aliases,
        ...p.keyActives,
        ...p.mainIngredients,
        ...pick.reasons,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [catalogQuery, catalogRetailer, result]);

  const filteredBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (!q) return ALL_CATALOG_BRANDS;
    return ALL_CATALOG_BRANDS.filter((b) => b.toLowerCase().includes(q));
  }, [brandQuery]);

  const allAnswered =
    answers.skinProfile &&
    answers.concerns.length > 0 &&
    answers.sensitivity &&
    answers.spfHabit;

  const current = STEPS[step];
  const isResults = step >= STEPS.length && allAnswered && !hub;

  function selectSkinProfile(v: QuizSkinProfile) {
    setAnswers((a) => ({ ...a, skinProfile: v }));
  }
  function toggleConcern(v: Concern) {
    setAnswers((a) => {
      const cur = a.concerns;
      if (cur.includes(v)) {
        return { ...a, concerns: cur.filter((x) => x !== v) };
      }
      if (cur.length >= MAX_QUIZ_PRIORITIES) return a;
      return { ...a, concerns: [...cur, v] };
    });
  }
  function selectSensitivity(v: Sensitivity) {
    setAnswers((a) => ({ ...a, sensitivity: v }));
  }
  function selectSpf(v: SpfHabit) {
    setAnswers((a) => ({ ...a, spfHabit: v }));
  }
  function toggleFavoriteBrand(brand: string) {
    setAnswers((a) => {
      const cur = a.favoriteBrands;
      if (cur.includes(brand)) {
        return { ...a, favoriteBrands: cur.filter((b) => b !== brand) };
      }
      if (cur.length >= MAX_FAVORITE_BRANDS) return a;
      return { ...a, favoriteBrands: [...cur, brand] };
    });
  }

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setStep(0);
    setAnswers({
      skinProfile: null,
      concerns: [],
      sensitivity: null,
      spfHabit: null,
      favoriteBrands: [],
    });
    setBrandQuery("");
    setCatalogQuery("");
    setCatalogRetailer("all");
    setPlannerKey((k) => k + 1);
    if (typeof window !== "undefined") {
      localStorage.removeItem(SKIN_PROFILE_STORAGE_KEY);
    }
  }

  const canNext =
    (current?.key === "skinProfile" && answers.skinProfile) ||
    (current?.key === "concern" && answers.concerns.length > 0) ||
    (current?.key === "sensitivity" && answers.sensitivity) ||
    (current?.key === "spfHabit" && answers.spfHabit) ||
    current?.key === "favoriteBrands";

  const blendNote = describeProfileBlend(loadSkinProfile());

  if (isResults && result) {
    return (
      <div className="space-y-10">
        <SkinProfileBridge mode="quiz" />
        {blendNote ? (
          <p className="rounded-xl border border-earth/20 bg-dawn/25 px-4 py-3 text-sm text-offblack/80">
            {blendNote}
          </p>
        ) : null}
        <div className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/88 via-blush/32 to-dawn/22 p-6 sm:p-8">
          <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85">
            Your Snapshot
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl">
            {result.profileTitle}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-offblack/75">
            {result.profileBody}
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3" aria-label="Personalized next steps">
          {result.actionCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-dawn/45 bg-gradient-to-br from-linen/82 via-blush/25 to-dawn/18 p-5"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-earth/80">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-offblack/72">
                {card.body}
              </p>
            </article>
          ))}
        </section>

        <QuizRoutinePlanner key={plannerKey} steps={result.routineSteps} />

        <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/82 via-blush/30 to-dawn/20 p-6 sm:p-8">
          <h3 className="font-serif text-xl font-medium text-offblack">Catalog Picks to Explore</h3>
          <p className="mt-2 text-sm text-offblack/65">
            Each row lists which quiz answers nudged it in, Steps 1–4 are skin feel,
            priorities, sensitivity, and SPF; Step 5 is favorite brands when you picked
            any. Treat picks as starting points: patch test, introduce one change at a
            time, and confirm prescriptions, pregnancy, allergies, or painful irritation
            with a clinician.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="catalog-picks-search">
              Search catalog picks
            </label>
            <input
              id="catalog-picks-search"
              type="search"
              value={catalogQuery}
              onChange={(e) => setCatalogQuery(e.target.value)}
              placeholder="Search picks by brand, active, or reason..."
              className="w-full rounded-xl border border-sand/90 bg-linen/70 px-4 py-2.5 text-sm text-offblack outline-none transition placeholder:text-offblack/40 focus:border-sage focus:ring-2 focus:ring-sage/25"
            />
            <button
              type="button"
              onClick={() => {
                setCatalogQuery("");
                setCatalogRetailer("all");
              }}
              className="rounded-xl border border-sand/90 px-4 py-2.5 text-sm font-semibold text-earth transition hover:border-earth/40 hover:bg-linen/80"
            >
              Clear filters
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "ulta", "sephora"] as const).map((retailer) => {
              const active = catalogRetailer === retailer;
              const label =
                retailer === "all" ? "All retailers" : retailer === "ulta" ? "Ulta" : "Sephora";
              return (
                <button
                  key={retailer}
                  type="button"
                  onClick={() => setCatalogRetailer(retailer)}
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
          <p className="mt-3 text-xs text-offblack/55">
            Showing {visibleCatalogPicks.length} of {result.catalogPicks.length} picks
          </p>
          <ul className="mt-6 space-y-4">
            {visibleCatalogPicks.map((pick) => {
              const p = getCatalogProductById(pick.productId);
              if (!p) return null;
              return (
                <li
                  key={pick.productId}
                  className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/75 to-blush/25 px-4 py-3"
                >
                  <p className="font-medium text-offblack">
                    {p.brand}: {p.name}
                  </p>
                  <p className="mt-1 text-xs text-earth/90">
                    {p.keyActives.join(" · ")}
                  </p>
                  <p className="mt-3 text-[0.65rem] font-semibold tracking-[0.06em] text-earth/85">
                    Why this showed up
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-offblack/75">
                    {pick.reasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-medium text-earth">
                      Sample notes for your routine log
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-offblack/70">
                      {formatProductNotes(p)}
                    </pre>
                  </details>
                </li>
              );
            })}
          </ul>
          {visibleCatalogPicks.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-sand/90 bg-linen/50 px-4 py-6 text-center text-sm text-offblack/65">
              No catalog picks match those filters. Clear filters to see all recommendations.
            </p>
          ) : null}
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/actives"
            className="rounded-xl bg-earth px-5 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack"
          >
            Browse Actives Library
          </Link>
          <Link
            href="/skin-quiz?tab=scan"
            className="rounded-xl border border-sand/90 px-5 py-2.5 text-sm font-medium text-earth transition hover:border-earth/40 hover:bg-sand/30"
          >
            Add Skin Scan
          </Link>
          <button
            type="button"
            onClick={restart}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-earth/90 underline decoration-sand decoration-2 underline-offset-4 transition hover:text-offblack"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const gridColsForStep =
    current?.key === "skinProfile"
      ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-2"
      : current?.key === "concern"
        ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-2"
        : "grid gap-3 sm:grid-cols-2";

  return (
    <div className="space-y-8">
      {!hub ? <SkinProfileBridge mode="quiz" /> : null}
      {fromScan && hydrated && !hub ? (
        <p className="rounded-xl border border-earth/20 bg-dawn/25 px-4 py-3 text-sm text-offblack/80">
          Loaded your scan results. Confirm each step, add favorite brands, then view
          combined recommendations.
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium tracking-[0.08em] text-earth/80">
          Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
        </p>
        <div className="flex h-1.5 flex-1 max-w-xs gap-1">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`h-full flex-1 rounded-full transition ${
                i <= step ? "bg-earth" : "bg-sand/60"
              }`}
            />
          ))}
        </div>
      </div>

      {current ? (
        <>
          <div>
            <h2 className="font-serif text-2xl font-medium text-offblack sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-2 text-sm text-offblack/65">{current.subtitle}</p>
            {current.key === "concern" ? (
              <p className="mt-2 text-xs font-medium text-earth/90">
                {answers.concerns.length} of {MAX_QUIZ_PRIORITIES} selected
                {answers.concerns.length >= MAX_QUIZ_PRIORITIES
                  ? ", remove one to pick another"
                  : ""}
              </p>
            ) : null}
            {current.key === "favoriteBrands" ? (
              <p className="mt-2 text-xs font-medium text-earth/90">
                {answers.favoriteBrands.length} of {MAX_FAVORITE_BRANDS} selected
                {answers.favoriteBrands.length === 0
                  ? ", skip is fine; tap Continue"
                  : answers.favoriteBrands.length >= MAX_FAVORITE_BRANDS
                    ? ", remove one to pick another"
                    : ""}
              </p>
            ) : null}
          </div>

          {current.key === "favoriteBrands" ? (
            <div className="space-y-4">
              <label htmlFor="brand-search" className="sr-only">
                Search brands
              </label>
              <input
                id="brand-search"
                type="search"
                value={brandQuery}
                onChange={(e) => setBrandQuery(e.target.value)}
                placeholder="Search brands in our catalog…"
                className="w-full rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 text-sm text-offblack shadow-sm outline-none transition placeholder:text-offblack/40 hover:border-blossom/35 focus:border-sage focus:ring-2 focus:ring-sage/25"
              />
              <div
                className="flex max-h-64 flex-wrap gap-2 overflow-y-auto rounded-xl border border-sand/70 bg-linen/40 p-3 sm:max-h-80"
                role="group"
                aria-label="Favorite brands"
              >
                {filteredBrands.length === 0 ? (
                  <p className="text-sm text-offblack/60">No brands match that search.</p>
                ) : (
                  filteredBrands.map((brand) => {
                    const on = answers.favoriteBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        type="button"
                        aria-pressed={on}
                        className={`${brandChipClass} ${on ? brandChipSelected : ""}`}
                        onClick={() => toggleFavoriteBrand(brand)}
                      >
                        {brand}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
          <div className={gridColsForStep}>
            {current.key === "skinProfile" &&
              QUIZ_SKIN_PROFILE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={answers.skinProfile === o.value}
                  className={`${choiceClass} ${
                    answers.skinProfile === o.value ? choiceSelected : ""
                  }`}
                  onClick={() => selectSkinProfile(o.value)}
                >
                  <span className="font-medium text-offblack">{o.label}</span>
                  <span className="mt-1 text-xs text-offblack/60">{o.hint}</span>
                </button>
              ))}
            {current.key === "concern" &&
              CONCERN_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={answers.concerns.includes(o.value)}
                  className={`${choiceClass} ${
                    answers.concerns.includes(o.value) ? choiceSelected : ""
                  }`}
                  onClick={() => toggleConcern(o.value)}
                >
                  <span className="font-medium text-offblack">{o.label}</span>
                  <span className="mt-1 text-xs text-offblack/60">{o.hint}</span>
                </button>
              ))}
            {current.key === "sensitivity" &&
              SENSITIVITY_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={answers.sensitivity === o.value}
                  className={`${choiceClass} ${
                    answers.sensitivity === o.value ? choiceSelected : ""
                  }`}
                  onClick={() => selectSensitivity(o.value)}
                >
                  <span className="font-medium text-offblack">{o.label}</span>
                  <span className="mt-1 text-xs text-offblack/60">{o.hint}</span>
                </button>
              ))}
            {current.key === "spfHabit" &&
              SPF_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={answers.spfHabit === o.value}
                  className={`${choiceClass} ${
                    answers.spfHabit === o.value ? choiceSelected : ""
                  }`}
                  onClick={() => selectSpf(o.value)}
                >
                  <span className="font-medium text-offblack">{o.label}</span>
                  <span className="mt-1 text-xs text-offblack/60">{o.hint}</span>
                </button>
              ))}
          </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!canNext}
              onClick={() => {
                if (hub && step === STEPS.length - 1 && allAnswered) {
                  onQuizComplete?.();
                  return;
                }
                if (step === STEPS.length - 1) setStep(STEPS.length);
                else next();
              }}
              className="rounded-xl bg-earth px-6 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === STEPS.length - 1
                ? hub
                  ? "Continue to photo scan"
                  : "See results"
                : "Continue"}
            </button>
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="rounded-xl border border-sand/90 px-4 py-2.5 text-sm font-medium text-earth transition hover:bg-sand/30 disabled:opacity-40"
            >
              Back
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

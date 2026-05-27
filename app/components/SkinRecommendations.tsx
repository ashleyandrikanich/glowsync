"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuizRoutinePlanner } from "./QuizRoutinePlanner";
import {
  formatProductNotes,
  getCatalogProductById,
} from "@/src/lib/product-catalog";
import {
  SKIN_PROFILE_STORAGE_KEY,
  describeProfileBlend,
  loadSkinProfile,
} from "@/src/lib/skin-profile";
import { buildQuizResult } from "@/src/lib/skin-quiz";

type SkinRecommendationsProps = {
  onRetake?: () => void;
};

export function SkinRecommendations({ onRetake }: SkinRecommendationsProps) {
  const profile = loadSkinProfile();
  const result = useMemo(
    () => (profile ? buildQuizResult(profile.answers) : null),
    [profile]
  );
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogRetailer, setCatalogRetailer] = useState<"all" | "ulta" | "sephora">(
    "all"
  );
  const [plannerKey] = useState(0);

  const blendNote = describeProfileBlend(profile);

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

  function restart() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SKIN_PROFILE_STORAGE_KEY);
    }
    onRetake?.();
  }

  if (!result) {
    return (
      <p className="rounded-xl border border-sand/90 bg-linen/60 px-4 py-6 text-sm text-offblack/70">
        Complete the quiz and photo scan to unlock recommendations.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {blendNote ? (
        <p className="rounded-xl border border-earth/20 bg-dawn/25 px-4 py-3 text-sm text-offblack/80">
          {blendNote}
        </p>
      ) : null}

      {profile?.scanObservations.length ? (
        <div className="rounded-2xl border border-sand/90 bg-linen/70 px-4 py-4 sm:px-5">
          <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85">
            From your photo scan
            {profile.scanConfidence ? ` · confidence: ${profile.scanConfidence}` : ""}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-offblack/72">
            {profile.scanObservations.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/88 via-blush/32 to-dawn/22 p-6 sm:p-8">
        <p className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/85">
          Your combined profile
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
            <p className="mt-2 text-sm leading-relaxed text-offblack/72">{card.body}</p>
          </article>
        ))}
      </section>

      <QuizRoutinePlanner key={plannerKey} steps={result.routineSteps} />

      <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/82 via-blush/30 to-dawn/20 p-6 sm:p-8">
        <h3 className="font-serif text-xl font-medium text-offblack">
          Catalog picks to explore
        </h3>
        <p className="mt-2 text-sm text-offblack/65">
          Built from your quiz answers and photo scan together. Patch test, introduce one
          change at a time, and confirm prescriptions, pregnancy, allergies, or painful
          irritation with a clinician.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="sr-only" htmlFor="hub-catalog-picks-search">
            Search catalog picks
          </label>
          <input
            id="hub-catalog-picks-search"
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
                <p className="mt-1 text-xs text-earth/90">{p.keyActives.join(" · ")}</p>
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
        <button
          type="button"
          onClick={restart}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-earth/90 underline decoration-sand decoration-2 underline-offset-4 transition hover:text-offblack"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

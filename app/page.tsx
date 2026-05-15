"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  INGREDIENTS,
  evaluatePairing,
  type IngredientId,
} from "@/src/lib/ingredients";
import { BrandTitle } from "./components/BrandTitle";
import { HomeSideDressing } from "./components/HomeSideDressing";

const empty = "" as const;

const selectClassName =
  "w-full cursor-pointer appearance-none rounded-xl border border-sand/90 bg-linen/65 px-4 py-3 pr-10 text-offblack shadow-sm outline-none transition " +
  "hover:border-blossom/50 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25 " +
  "bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat " +
  "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23CA8A04'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")]";

export default function Home() {
  const [first, setFirst] = useState<IngredientId | typeof empty>(empty);
  const [second, setSecond] = useState<IngredientId | typeof empty>(empty);

  const result = useMemo(
    () => evaluatePairing(first, second),
    [first, second]
  );

  const verdictStyles: Record<
    NonNullable<typeof result.verdict>,
    { panel: string; label: string }
  > = {
    safe: {
      panel: "border-sage/35 bg-sage/15",
      label: "text-earth",
    },
    caution: {
      panel: "border-blossom/45 bg-dawn/50",
      label: "text-offblack",
    },
    avoid: {
      panel: "border-blossom/55 bg-blossom/20",
      label: "text-offblack",
    },
  };

  const verdictLabel: Record<NonNullable<typeof result.verdict>, string> = {
    safe: "Looks compatible",
    caution: "Use with care",
    avoid: "Not recommended together",
  };

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[max(1.75rem,min(7rem,9vw))] select-none border-r border-sand/30 bg-gradient-to-r from-sand/[0.09] via-dawn/[0.06] to-transparent md:block"
        aria-hidden
      >
        <HomeSideDressing side="left" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[max(1.75rem,min(7rem,9vw))] select-none border-l border-sand/30 bg-gradient-to-l from-sand/[0.09] via-dawn/[0.06] to-transparent md:block"
        aria-hidden
      >
        <HomeSideDressing side="right" />
      </div>

      <div className="relative z-[1] flex min-h-dvh flex-1 flex-col">
      {/* Hero — typical homepage: headline, tagline, primary paths */}
      <header className="relative px-6 pb-12 pt-12 text-center sm:px-10 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/4 rounded-full bg-dawn/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 translate-x-1/4 rounded-full bg-sand/35 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-earth/85">
            GlowSync
          </p>
          <BrandTitle as="h1" size="lg" className="mx-auto mt-4 block" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-offblack/80 sm:text-xl">
            Explore your skin with a quick quiz, keep a simple routine log, and
            learn how common actives play together—all in one place.
          </p>
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/skin-quiz"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-earth px-6 py-3 text-sm font-semibold text-linen shadow-md transition hover:bg-offblack sm:min-w-[10.5rem]"
            >
              Take the skin quiz
            </Link>
            <Link
              href="/routine"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-earth/35 bg-linen/80 px-6 py-3 text-sm font-semibold text-earth shadow-sm transition hover:border-earth/60 hover:bg-linen sm:min-w-[10.5rem]"
            >
              Build your routine
            </Link>
            <Link
              href="/actives"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-earth/35 bg-linen/80 px-6 py-3 text-sm font-semibold text-earth shadow-sm transition hover:border-earth/60 hover:bg-linen sm:min-w-[10.5rem]"
            >
              {"Ingredients & actives"}
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-offblack/55">
            <a
              href="#routine-safety-checker"
              className="font-medium text-earth underline decoration-sand/70 underline-offset-4 transition hover:decoration-earth"
            >
              Jump to the pairing checker
            </a>{" "}
            when you are ready to compare two actives.
          </p>
        </div>
      </header>

      {/* Feature strip — scannable “what you can do” */}
      <section
        className="border-y border-sand/40 bg-linen/50 px-6 py-12 backdrop-blur-sm sm:px-10"
        aria-labelledby="home-features-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="home-features-heading"
            className="text-center font-serif text-2xl font-medium text-offblack sm:text-3xl"
          >
            What you can do here
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-offblack/65">
            Pick a starting point—everything runs in your browser unless you sign
            in for account features.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            <li>
              <Link
                href="/skin-quiz"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/80">
                  Quiz
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Skin profile snapshot
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Four questions and starter AM/PM ideas from our reference
                  catalog.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Start quiz →
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/routine"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/80">
                  Routine
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Your product log
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Add what you use morning and night, with notes—saved on this
                  device.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Open routine →
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/actives"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/80">
                  Learn
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Actives A–Z
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Short explainers on common ingredients so labels feel less
                  mysterious.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Browse actives →
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-10 text-center">
            <Link
              href="/guide"
              className="text-sm font-medium text-earth/90 underline decoration-sand/80 underline-offset-4 transition hover:text-offblack hover:decoration-earth"
            >
              Read the layering guide
            </Link>
          </p>
        </div>
      </section>

      {/* Primary tool — clearly a section below the fold */}
      <main className="relative flex flex-1 flex-col px-4 pb-20 pt-14 sm:px-8 sm:pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-earth/80">
              Tool
            </p>
            <h2
              id="routine-safety-checker"
              className="mt-2 scroll-mt-28 font-serif text-3xl font-medium tracking-tight text-offblack sm:text-4xl"
            >
              Routine safety checker
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-offblack/70">
              Choose two actives for conservative layering notes. For education
              only—not medical advice.
            </p>
          </div>

          <div className="glow-card-sheen rounded-3xl border border-dawn/50 bg-gradient-to-br from-linen/92 via-blush/38 to-dawn/28 p-8 backdrop-blur-sm sm:p-10">
            <section className="space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="ingredient-a"
                  className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
                >
                  First ingredient
                </label>
                <select
                  id="ingredient-a"
                  value={first}
                  onChange={(e) =>
                    setFirst(e.target.value as IngredientId | typeof empty)
                  }
                  className={selectClassName}
                >
                  <option value={empty}>Select an active…</option>
                  {INGREDIENTS.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative py-1">
                <div
                  className="absolute inset-x-0 top-1/2 border-t border-sand/90"
                  aria-hidden
                />
                <div className="relative flex justify-center">
                  <span className="bg-linen/85 px-4 font-serif text-sm italic text-earth/75 backdrop-blur-sm">
                    with
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ingredient-b"
                  className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
                >
                  Second ingredient
                </label>
                <select
                  id="ingredient-b"
                  value={second}
                  onChange={(e) =>
                    setSecond(e.target.value as IngredientId | typeof empty)
                  }
                  className={selectClassName}
                >
                  <option value={empty}>Select an active…</option>
                  {INGREDIENTS.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`rounded-2xl border px-5 py-5 transition-colors ${
                  result.verdict
                    ? verdictStyles[result.verdict].panel
                    : "border-dashed border-dawn/70 bg-blush/25 text-offblack/65"
                }`}
              >
                {result.verdict && (
                  <p
                    className={`mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${verdictStyles[result.verdict].label}`}
                  >
                    {verdictLabel[result.verdict]}
                  </p>
                )}
                <p className="text-[0.9375rem] leading-relaxed text-offblack/90">
                  {result.message}
                </p>
              </div>

              {(first || second) && (
                <ul className="space-y-4 border-t border-sand/70 pt-8">
                  {INGREDIENTS.filter((i) => i.id === first || i.id === second).map(
                    (ing) => (
                      <li
                        key={ing.id}
                        className="rounded-xl border-l-2 border-earth/35 bg-sand/20 py-3 pl-4 pr-3"
                      >
                        <p className="font-medium text-earth">{ing.name}</p>
                        <p className="mt-1 text-sm leading-relaxed text-offblack/75">
                          {ing.notes}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

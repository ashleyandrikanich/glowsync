"use client";

import { useMemo, useState } from "react";
import {
  INGREDIENTS,
  evaluatePairing,
  type IngredientId,
} from "@/src/lib/ingredients";

const empty = "" as const;

const selectClassName =
  "w-full cursor-pointer appearance-none rounded-xl border border-sand/90 bg-white/60 px-4 py-3 pr-10 text-offblack shadow-sm outline-none transition " +
  "hover:border-earth/40 hover:bg-white/80 focus:border-earth focus:ring-2 focus:ring-earth/20 " +
  "bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat " +
  "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238D7B68'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")]";

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
      panel: "border-earth/25 bg-white/70",
      label: "text-earth",
    },
    caution: {
      panel: "border-earth/50 bg-sand/50",
      label: "text-offblack",
    },
    avoid: {
      panel: "border-earth/60 bg-earth/12",
      label: "text-offblack",
    },
  };

  const verdictLabel: Record<NonNullable<typeof result.verdict>, string> = {
    safe: "Looks compatible",
    caution: "Use with care",
    avoid: "Not recommended together",
  };

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <header className="relative px-6 pb-10 pt-14 sm:px-12 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-earth/90">
            Skincare pairing
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-offblack text-balance">
            GlowSync
          </h1>
          <div className="mt-6 h-px w-14 bg-gradient-to-r from-earth/50 to-transparent" />
        </div>
      </header>

      <main className="flex flex-1 justify-center px-4 pb-20 sm:px-8">
        <div className="w-full max-w-xl">
          <div className="rounded-3xl border border-sand/90 bg-white/50 p-8 shadow-[0_24px_80px_-32px_rgba(45,41,38,0.18)] backdrop-blur-sm sm:p-10">
            <section className="mb-10 border-b border-sand/80 pb-10">
              <h2 className="font-serif text-2xl font-medium tracking-tight text-offblack">
                Routine Safety Checker
              </h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-offblack/70">
                Choose two actives to see conservative layering notes. For
                education only — not medical advice.
              </p>
            </section>

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
                  <span className="bg-white/80 px-4 font-serif text-sm italic text-earth/75 backdrop-blur-sm">
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
                    : "border-dashed border-sand bg-white/30 text-offblack/65"
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
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadRoutineProducts } from "@/src/lib/routine";

export function HomeRoutineTeaser() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setCount(loadRoutineProducts().length);
    });
  }, []);

  const hasProducts = count !== null && count > 0;

  return (
    <section className="rounded-3xl border border-dawn/45 bg-gradient-to-br from-linen/88 via-blush/30 to-dawn/20 px-6 py-6 shadow-sm sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
            Today&apos;s Routine
          </p>
          <h2 className="mt-2 font-serif text-2xl font-medium text-offblack">
            {hasProducts
              ? `${count} product${count === 1 ? "" : "s"} saved`
              : "Start with your first product"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-offblack/68">
            {hasProducts
              ? "Open My Routine to mark what you used today, adjust your AM/PM order, or flag products that are not working."
              : "Add what you already own, then GlowSync can help you organize steps and spot routine patterns."}
          </p>
        </div>
        <Link
          href="/routine"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
        >
          Open My Routine
        </Link>
      </div>
    </section>
  );
}

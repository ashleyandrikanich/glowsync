"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { Ingredient, IngredientId } from "@/src/lib/ingredients";

type ActivesExplorerProps = {
  ingredients: readonly Ingredient[];
};

function tagList(ing: Ingredient): string[] {
  return ing.tags ? [...ing.tags] : [];
}

export function ActivesExplorer({ ingredients }: ActivesExplorerProps) {
  const [query, setQuery] = useState("");
  const [tagFilters, setTagFilters] = useState<Set<string>>(() => new Set());
  const [openId, setOpenId] = useState<IngredientId | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const ing of ingredients) {
      for (const t of tagList(ing)) s.add(t);
    }
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [ingredients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ingredients.filter((ing) => {
      const tags = tagList(ing);
      if (tagFilters.size > 0) {
        const any = [...tagFilters].some((t) => tags.includes(t));
        if (!any) return false;
      }
      if (!q) return true;
      const hay = `${ing.name} ${ing.notes} ${ing.teaser ?? ""} ${ing.funFact ?? ""} ${tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [ingredients, query, tagFilters]);

  const toggleTag = useCallback((tag: string) => {
    setTagFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setTagFilters(new Set());
  }, []);

  const surpriseMe = useCallback(() => {
    const pool = filtered.length > 0 ? filtered : ingredients;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (!pick) return;
    setOpenId(pick.id);
    setTimeout(() => {
      document.getElementById(`active-card-${pick.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  }, [filtered, ingredients]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-dawn/50 bg-gradient-to-br from-blush/40 via-linen/70 to-dawn/25 px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-serif text-lg font-medium text-offblack sm:text-xl">
          Choose an ingredient, filter by topic, or open a concise explanation
          before adding a product to your routine.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={surpriseMe}
            className="inline-flex items-center rounded-xl bg-earth px-4 py-2 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
          >
            Suggest an active
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center rounded-xl border border-earth/30 bg-linen/80 px-4 py-2 text-sm font-semibold text-earth transition hover:border-earth/50"
          >
            Clear search & filters
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="actives-search"
          className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
        >
          Search
        </label>
        <input
          id="actives-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “barrier”, “glycolic”, “snail”…"
          className="w-full rounded-xl border border-sand/90 bg-linen/70 px-4 py-3 text-offblack shadow-sm outline-none transition placeholder:text-offblack/40 focus:border-sage focus:ring-2 focus:ring-sage/25"
          autoComplete="off"
        />
      </div>

      <div className="space-y-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
          Filter by topic (any match)
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const on = tagFilters.has(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                  on
                    ? "border-earth bg-earth text-linen shadow-sm"
                    : "border-sand/80 bg-linen/60 text-earth/90 hover:border-earth/40 hover:bg-linen"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-offblack/60">
        Showing{" "}
        <span className="font-semibold text-earth">{filtered.length}</span> of{" "}
        {ingredients.length} actives
      </p>

      <ul className="grid gap-5 sm:grid-cols-2">
        {filtered.map((ing) => {
          const open = openId === ing.id;
          const tags = tagList(ing);
          return (
            <li
              key={ing.id}
              id={`active-card-${ing.id}`}
              className="flex flex-col rounded-2xl border border-sand/80 bg-gradient-to-br from-linen/85 to-blush/30 p-5 shadow-sm transition hover:border-earth/25 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-sand/25 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-earth/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-serif text-xl font-medium text-offblack">
                {ing.name}
              </h2>
              {ing.teaser ? (
                <p className="mt-1 text-sm font-medium italic text-earth/90">
                  {ing.teaser}
                </p>
              ) : null}
              <button
                type="button"
                id={`active-toggle-${ing.id}`}
                aria-expanded={open}
                aria-controls={`active-panel-${ing.id}`}
                onClick={() => setOpenId((cur) => (cur === ing.id ? null : ing.id))}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-earth/25 bg-white/40 px-3 py-2 text-sm font-semibold text-earth transition hover:bg-linen/90"
              >
                {open ? "Hide the deep dive ▲" : "Peek inside — learn more ▼"}
              </button>
              {open ? (
                <div
                  id={`active-panel-${ing.id}`}
                  className="mt-4 space-y-3 border-t border-sand/60 pt-4 text-left"
                  role="region"
                  aria-labelledby={`active-toggle-${ing.id}`}
                >
                  <p className="text-[0.9375rem] leading-relaxed text-offblack/85">
                    {ing.notes}
                  </p>
                  {ing.funFact ? (
                    <div className="rounded-xl border border-sage/30 bg-sage/10 px-4 py-3">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-earth/80">
                        Fun fact
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-offblack/80">
                        {ing.funFact}
                      </p>
                    </div>
                  ) : null}
                  <Link
                    href="/guide"
                    className="inline-flex text-sm font-semibold text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
                  >
                    Read layering guidance →
                  </Link>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sand/90 bg-linen/50 px-4 py-6 text-center text-offblack/70">
          Nothing matches—loosen a filter or clear search to see the full shelf
          again.
        </p>
      ) : null}

      <p className="border-t border-sand/80 pt-8 text-offblack/70">
        Want help turning ingredients into routine order? Read the{" "}
        <Link
          href="/guide"
          className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          Routine Guide
        </Link>
        , then log products in My Routine.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";
import {
  ROUTINE_GUIDE_BY_SKIN,
  SENSITIVE_SKIN_ADDENDUM,
} from "@/src/lib/routine-guide-content";
import { SKIN_FEEL_OPTIONS, type SkinFeel } from "@/src/lib/skin-quiz";

const defaultSkin: SkinFeel = "combo";

export function RoutineGuideExplorer() {
  const [skin, setSkin] = useState<SkinFeel>(defaultSkin);
  const [sensitiveOn, setSensitiveOn] = useState(false);
  const [deepOpen, setDeepOpen] = useState(false);
  const rationaleId = useId();

  const block = ROUTINE_GUIDE_BY_SKIN[skin];
  const skinMeta = SKIN_FEEL_OPTIONS.find((o) => o.value === skin);

  const cycleSkin = useCallback(() => {
    const order = SKIN_FEEL_OPTIONS.map((o) => o.value);
    const i = order.indexOf(skin);
    setSkin(order[(i + 1) % order.length]!);
  }, [skin]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-dawn/50 bg-gradient-to-br from-blush/40 via-linen/70 to-dawn/25 px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-serif text-lg font-medium text-offblack sm:text-xl">
          Tap how your skin usually behaves, we will sketch AM/PM habits and
          layering angles you can adapt. Use the profiles as starting points,
          then adjust based on your own routine.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={cycleSkin}
            className="inline-flex items-center rounded-xl bg-earth px-4 py-2 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
          >
            Show me another profile →
          </button>
          <Link
            href="/skin-quiz"
            className="inline-flex items-center rounded-xl border border-earth/30 bg-linen/80 px-4 py-2 text-sm font-semibold text-earth transition hover:border-earth/50"
          >
            Take the full quiz
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
          Your usual skin feel
        </p>
        <div className="flex flex-wrap gap-2">
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
                    : "border-sand/80 bg-linen/60 text-earth/90 hover:border-earth/40 hover:bg-linen"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {skinMeta ? (
          <p className="text-sm text-offblack/65">
            <span className="font-medium text-earth">{skinMeta.label}</span> , {" "}
            {skinMeta.hint}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={sensitiveOn}
          onClick={() => setSensitiveOn((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
            sensitiveOn
              ? "border-earth bg-sand/30 text-earth shadow-sm ring-1 ring-earth/15"
              : "border-sand/80 bg-linen/50 text-earth/85 hover:border-earth/35"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${sensitiveOn ? "bg-earth" : "bg-sand"}`}
            aria-hidden
          />
          Sensitive / reactive mode
        </button>
        <span className="text-xs text-offblack/55">
          Adds universal guardrails on top of the profile below.
        </span>
      </div>

      {sensitiveOn ? (
        <section
          className="rounded-2xl border border-sage/35 bg-sage/10 px-5 py-4 sm:px-6"
          aria-label={SENSITIVE_SKIN_ADDENDUM.title}
        >
          <h2 className="font-serif text-lg font-medium text-offblack">
            {SENSITIVE_SKIN_ADDENDUM.title}
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-offblack/80 marker:text-earth/70">
            {SENSITIVE_SKIN_ADDENDUM.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/88 via-blush/32 to-dawn/22 p-6 sm:p-8">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-earth/85">
          Suggested shape for your shelf
        </p>
        <h2 className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl">
          {block.headline}
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-offblack/75">
          {block.blurb}
        </p>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-earth/25 bg-white/40 px-3 py-2 text-sm font-semibold text-earth transition hover:bg-linen/90"
          aria-expanded={deepOpen}
          aria-controls={rationaleId}
          onClick={() => setDeepOpen((o) => !o)}
        >
          {deepOpen ? "Hide why this framing ▲" : "Why this framing? ▼"}
        </button>
        {deepOpen ? (
          <p
            id={rationaleId}
            className="mt-3 border-t border-sand/60 pt-4 text-sm leading-relaxed text-offblack/80"
          >
            {block.rationale}
          </p>
        ) : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/80 via-blush/28 to-dawn/18 p-6">
          <h3 className="font-serif text-lg font-medium text-offblack">
            AM flow (template)
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
            {block.am.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>
        <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/80 via-blush/28 to-dawn/18 p-6">
          <h3 className="font-serif text-lg font-medium text-offblack">
            PM flow (template)
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
            {block.pm.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>
      </div>

      <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/82 via-blush/30 to-dawn/20 p-6">
        <h3 className="font-serif text-xl font-medium text-offblack">
          Layering habits for this profile
        </h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-offblack/80 marker:text-earth/70">
          {block.layeringTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-earth/20 bg-earth/5 px-6 py-6">
        <h3 className="font-serif text-lg font-medium text-offblack">
          Ingredient angles to explore next
        </h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-offblack/80">
          {block.activeAngles.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-earth" aria-hidden>
                ✦
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/actives"
            className="inline-flex text-sm font-semibold text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            Browse actives A–Z →
          </Link>
          <Link
            href="/routine"
            className="inline-flex text-sm font-semibold text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            Log products in your routine →
          </Link>
        </div>
      </section>
    </div>
  );
}

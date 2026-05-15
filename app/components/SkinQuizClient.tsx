"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatProductNotes, getCatalogProductById } from "@/src/lib/product-catalog";
import {
  CONCERN_OPTIONS,
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

const choiceClass =
  "flex w-full flex-col rounded-xl border border-sand/90 bg-linen/60 px-4 py-3.5 text-left shadow-sm transition hover:border-earth/40 hover:bg-linen/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/40";

/** Selected answer — warm orange fill + ring */
const choiceSelected =
  "border-earth bg-gradient-to-br from-dawn/75 via-dawn/55 to-blossom/20 ring-2 ring-earth/40 shadow-md";

const STEPS = [
  {
    key: "skinProfile" as const,
    title: "How Does Your Skin Feel Most Days?",
    subtitle: "Pick the closest match—finer choices help us shape AM/PM ideas.",
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
];

export function SkinQuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinProfile: null,
    concerns: [],
    sensitivity: null,
    spfHabit: null,
  });

  const result = useMemo(() => buildQuizResult(answers), [answers]);
  const allAnswered =
    answers.skinProfile &&
    answers.concerns.length > 0 &&
    answers.sensitivity &&
    answers.spfHabit;

  const current = STEPS[step];
  const isResults = step >= STEPS.length && allAnswered;

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
    });
  }

  const canNext =
    (current?.key === "skinProfile" && answers.skinProfile) ||
    (current?.key === "concern" && answers.concerns.length > 0) ||
    (current?.key === "sensitivity" && answers.sensitivity) ||
    (current?.key === "spfHabit" && answers.spfHabit);

  if (isResults && result) {
    return (
      <div className="space-y-10">
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

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/80 via-blush/28 to-dawn/18 p-6">
            <h3 className="font-serif text-lg font-medium text-offblack">Suggested AM Flow</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
              {result.routineAm.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>
          <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/80 via-blush/28 to-dawn/18 p-6">
            <h3 className="font-serif text-lg font-medium text-offblack">Suggested PM Flow</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-offblack/80">
              {result.routinePm.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>
        </div>

        <section className="rounded-2xl border border-sand/90 bg-gradient-to-br from-linen/82 via-blush/30 to-dawn/20 p-6 sm:p-8">
          <h3 className="font-serif text-xl font-medium text-offblack">Catalog Picks to Explore</h3>
          <p className="mt-2 text-sm text-offblack/65">
            Each row lists which quiz answers nudged it in—Step 1 is skin feel, Step 2
            priorities, Step 3 sensitivity, Step 4 SPF. Not medical advice.
          </p>
          <ul className="mt-6 space-y-4">
            {result.catalogPicks.map((pick) => {
              const p = getCatalogProductById(pick.productId);
              if (!p) return null;
              return (
                <li
                  key={pick.productId}
                  className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/75 to-blush/25 px-4 py-3"
                >
                  <p className="font-medium text-offblack">
                    {p.brand} — {p.name}
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
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/routine"
            className="rounded-xl bg-earth px-5 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack"
          >
            Log Picks in My Routine
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-sand/90 px-5 py-2.5 text-sm font-medium text-earth transition hover:border-earth/40 hover:bg-sand/30"
          >
            Check Actives on Home
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
                  ? " — remove one to pick another"
                  : ""}
              </p>
            ) : null}
          </div>

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

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!canNext}
              onClick={() => {
                if (step === STEPS.length - 1) setStep(STEPS.length);
                else next();
              }}
              className="rounded-xl bg-earth px-6 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === STEPS.length - 1 ? "See results" : "Continue"}
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

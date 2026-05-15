"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatProductNotes } from "@/src/lib/product-catalog";
import {
  CONCERN_OPTIONS,
  SENSITIVITY_OPTIONS,
  SKIN_FEEL_OPTIONS,
  SPF_OPTIONS,
  buildQuizResult,
  resolveQuizProducts,
  type Concern,
  type QuizAnswers,
  type Sensitivity,
  type SkinFeel,
  type SpfHabit,
} from "@/src/lib/skin-quiz";

const choiceClass =
  "flex w-full flex-col rounded-xl border border-sand/90 bg-linen/60 px-4 py-3.5 text-left shadow-sm transition hover:border-earth/35 hover:bg-linen/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/40";

const choiceSelected =
  "border-earth bg-sand/25 ring-1 ring-earth/20";

const STEPS = [
  { key: "skinFeel" as const, title: "How Does Your Skin Feel Most Days?", subtitle: "Pick the closest match." },
  { key: "concern" as const, title: "What Do You Want the Most Help With?", subtitle: "Choose your top priority right now." },
  { key: "sensitivity" as const, title: "How Does Your Skin React to New Actives?", subtitle: "We will bias picks toward gentler options when needed." },
  { key: "spfHabit" as const, title: "How Often Do You Wear SPF on Your Face?", subtitle: "Honest answers shape your AM routine notes." },
];

export function SkinQuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinFeel: null,
    concern: null,
    sensitivity: null,
    spfHabit: null,
  });

  const result = useMemo(() => buildQuizResult(answers), [answers]);
  const products = useMemo(
    () => (result ? resolveQuizProducts(result.productIds) : []),
    [result]
  );

  const allAnswered =
    answers.skinFeel &&
    answers.concern &&
    answers.sensitivity &&
    answers.spfHabit;

  const current = STEPS[step];
  const isResults = step >= STEPS.length && allAnswered;

  function selectSkinFeel(v: SkinFeel) {
    setAnswers((a) => ({ ...a, skinFeel: v }));
  }
  function selectConcern(v: Concern) {
    setAnswers((a) => ({ ...a, concern: v }));
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
      skinFeel: null,
      concern: null,
      sensitivity: null,
      spfHabit: null,
    });
  }

  const canNext =
    (current?.key === "skinFeel" && answers.skinFeel) ||
    (current?.key === "concern" && answers.concern) ||
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
            Pulled from the same reference list as the routine builder. Not medical advice.
          </p>
          <ul className="mt-6 space-y-4">
            {products.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-sand/80 bg-gradient-to-br from-linen/75 to-blush/25 px-4 py-3"
              >
                <p className="font-medium text-offblack">
                  {p.brand} — {p.name}
                </p>
                <p className="mt-1 text-xs text-earth/90">
                  {p.keyActives.join(" · ")}
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium text-earth">
                    Sample notes for your routine log
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-[0.7rem] leading-relaxed text-offblack/70">
                    {formatProductNotes(p)}
                  </pre>
                </details>
              </li>
            ))}
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
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {current.key === "skinFeel" &&
              SKIN_FEEL_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`${choiceClass} ${
                    answers.skinFeel === o.value ? choiceSelected : ""
                  }`}
                  onClick={() => selectSkinFeel(o.value)}
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
                  className={`${choiceClass} ${
                    answers.concern === o.value ? choiceSelected : ""
                  }`}
                  onClick={() => selectConcern(o.value)}
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

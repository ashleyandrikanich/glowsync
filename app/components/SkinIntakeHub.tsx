"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import {
  isQuizComplete,
  isReadyForRecommendations,
  isScanComplete,
  loadSkinProfile,
} from "@/src/lib/skin-profile";
import { SkinQuizClient } from "./SkinQuizClient";
import { SkinRecommendations } from "./SkinRecommendations";
import { SkinScanClient } from "./SkinScanClient";

type HubStep = "quiz" | "scan" | "results";

function deriveStep(
  quizDone: boolean,
  scanDone: boolean,
  preferScan: boolean
): HubStep {
  if (quizDone && scanDone) return "results";
  if (!quizDone) return "quiz";
  if (preferScan && !scanDone) return "scan";
  if (!scanDone) return "scan";
  return "results";
}

function IntakeProgress({
  quizDone,
  scanDone,
  activeStep,
  onSelect,
}: {
  quizDone: boolean;
  scanDone: boolean;
  activeStep: HubStep;
  onSelect: (step: HubStep) => void;
}) {
  const recsUnlocked = quizDone && scanDone;

  const rowClass = (step: HubStep, done: boolean, locked?: boolean) => {
    const active = activeStep === step;
    return `flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${
      locked
        ? "cursor-not-allowed border-sand/60 bg-linen/40 opacity-70"
        : active
          ? "border-earth/50 bg-dawn/30"
          : "border-sand/80 bg-linen/55 hover:border-earth/35 hover:bg-linen/80"
    } ${done ? "" : ""}`;
  };

  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-offblack/72">
        Complete the skin quiz and a photo scan for your best recommendations. Quiz
        answers cover habits and preferences; the scan refines what we see on your face.
      </p>
      <div className="grid gap-2 sm:grid-cols-3" role="list" aria-label="Skin profile steps">
        <button
          type="button"
          role="listitem"
          onClick={() => onSelect("quiz")}
          className={rowClass("quiz", quizDone)}
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              quizDone ? "bg-earth text-linen" : "border border-earth/40 text-earth"
            }`}
            aria-hidden
          >
            {quizDone ? "✓" : "1"}
          </span>
          <span>
            <span className="block text-sm font-semibold text-offblack">Skin quiz</span>
            <span className="mt-0.5 block text-xs text-offblack/60">
              {quizDone ? "Completed" : "Required"}
            </span>
          </span>
        </button>

        <button
          type="button"
          role="listitem"
          disabled={!quizDone}
          onClick={() => quizDone && onSelect("scan")}
          className={rowClass("scan", scanDone, !quizDone)}
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              scanDone
                ? "bg-earth text-linen"
                : quizDone
                  ? "border border-earth/40 text-earth"
                  : "border border-sand text-offblack/40"
            }`}
            aria-hidden
          >
            {scanDone ? "✓" : "2"}
          </span>
          <span>
            <span className="block text-sm font-semibold text-offblack">Photo scan</span>
            <span className="mt-0.5 block text-xs text-offblack/60">
              {!quizDone
                ? "Finish quiz first"
                : scanDone
                  ? "Completed"
                  : "Required"}
            </span>
          </span>
        </button>

        <button
          type="button"
          role="listitem"
          disabled={!recsUnlocked}
          onClick={() => recsUnlocked && onSelect("results")}
          className={rowClass("results", recsUnlocked, !recsUnlocked)}
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              recsUnlocked
                ? "bg-earth text-linen"
                : "border border-sand text-offblack/40"
            }`}
            aria-hidden
          >
            {recsUnlocked ? "✓" : "3"}
          </span>
          <span>
            <span className="block text-sm font-semibold text-offblack">Recommendations</span>
            <span className="mt-0.5 block text-xs text-offblack/60">
              {recsUnlocked ? "Ready" : "Needs quiz + scan"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export function SkinIntakeHub() {
  const params = useSearchParams();
  const preferScan = params.get("tab") === "scan" || params.get("from") === "scan";

  const [profileTick, setProfileTick] = useState(0);
  const profile = useMemo(() => {
    void profileTick;
    return loadSkinProfile();
  }, [profileTick]);

  const quizDone = isQuizComplete(profile);
  const scanDone = isScanComplete(profile);
  const recsReady = isReadyForRecommendations(profile);

  const suggestedStep = useMemo(
    () => deriveStep(quizDone, scanDone, preferScan),
    [quizDone, scanDone, preferScan]
  );
  const [overrideStep, setOverrideStep] = useState<HubStep | null>(null);
  const step = overrideStep ?? suggestedStep;

  const refreshProfile = useCallback(() => setProfileTick((t) => t + 1), []);

  const handleSelect = (next: HubStep) => {
    if (next === "scan" && !quizDone) return;
    if (next === "results" && !recsReady) return;
    setOverrideStep(next);
  };

  const handleQuizComplete = () => {
    refreshProfile();
    setOverrideStep("scan");
  };

  const handleScanComplete = () => {
    refreshProfile();
    if (isQuizComplete(loadSkinProfile())) {
      setOverrideStep("results");
    }
  };

  const handleRetake = () => {
    refreshProfile();
    setOverrideStep("quiz");
  };

  return (
    <div className="space-y-8">
      <IntakeProgress
        quizDone={quizDone}
        scanDone={scanDone}
        activeStep={step}
        onSelect={handleSelect}
      />

      {step === "quiz" ? (
        <SkinQuizClient hub onQuizComplete={handleQuizComplete} />
      ) : null}

      {step === "scan" ? (
        quizDone ? (
          <SkinScanClient hub onScanComplete={handleScanComplete} />
        ) : (
          <p className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950/90">
            Finish the skin quiz first, then add your photo scan.
          </p>
        )
      ) : null}

      {step === "results" ? (
        recsReady ? (
          <SkinRecommendations key={profileTick} onRetake={handleRetake} />
        ) : (
          <div className="rounded-2xl border border-sand/90 bg-linen/60 px-4 py-6 text-sm text-offblack/75">
            <p className="font-medium text-offblack">Almost there</p>
            <p className="mt-2">
              Recommendations unlock after both steps are done.
              {!quizDone ? " Complete the skin quiz." : null}
              {quizDone && !scanDone ? " Add a photo scan next." : null}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {!quizDone ? (
                <button
                  type="button"
                  onClick={() => setOverrideStep("quiz")}
                  className="rounded-xl bg-earth px-4 py-2 text-sm font-medium text-linen"
                >
                  Go to quiz
                </button>
              ) : null}
              {!scanDone ? (
                <button
                  type="button"
                  onClick={() => setOverrideStep("scan")}
                  className="rounded-xl border border-sand/90 px-4 py-2 text-sm font-medium text-earth"
                >
                  Go to photo scan
                </button>
              ) : null}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

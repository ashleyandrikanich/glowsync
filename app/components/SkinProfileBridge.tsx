"use client";

import Link from "next/link";
import {
  describeProfileBlend,
  loadSkinProfile,
  profileHasQuizData,
  profileHasScanData,
} from "@/src/lib/skin-profile";

type SkinProfileBridgeProps = {
  mode: "quiz" | "scan";
};

export function SkinProfileBridge({ mode }: SkinProfileBridgeProps) {
  const profile = loadSkinProfile();
  const blend = describeProfileBlend(profile);

  if (!profile || !blend) {
    return (
      <div className="rounded-2xl border border-sand/80 bg-linen/60 px-4 py-3 text-sm text-offblack/75">
        {mode === "quiz" ? (
          <p>
            Pair this quiz with a{" "}
            <Link href="/skin-quiz?tab=scan" className="font-semibold text-earth underline">
              Skin Scan
            </Link>{" "}
            photo for AI-visible patterns. Answers save in your browser and carry
            between both tools.
          </p>
        ) : (
          <p>
            Have quiz answers already? Take the{" "}
            <Link href="/skin-quiz" className="font-semibold text-earth underline">
              Skin Quiz
            </Link>{" "}
            first, or scan now and refine later. Your profile syncs in this browser.
          </p>
        )}
      </div>
    );
  }

  const hasQuiz = profileHasQuizData(profile);
  const hasScan = profileHasScanData(profile);

  return (
    <div className="rounded-2xl border border-earth/25 bg-gradient-to-br from-dawn/35 via-linen/70 to-blush/25 px-4 py-3 text-sm text-offblack/80">
      <p className="font-semibold text-offblack">{blend}</p>
      {profile.scanObservations.length > 0 ? (
        <p className="mt-2 text-xs text-offblack/65">
          Latest scan notes: {profile.scanObservations.slice(0, 2).join(" · ")}
          {profile.scanObservations.length > 2 ? " · …" : ""}
        </p>
      ) : null}
      <p className="mt-3 flex flex-wrap gap-2">
        {mode === "quiz" && hasScan ? (
          <Link
            href="/skin-quiz?tab=scan"
            className="rounded-lg border border-earth/30 bg-linen/80 px-3 py-1.5 text-xs font-semibold text-earth transition hover:border-earth/50"
          >
            Run another scan
          </Link>
        ) : null}
        {mode === "scan" && hasQuiz ? (
          <Link
            href="/skin-quiz?from=scan"
            className="rounded-lg border border-earth/30 bg-linen/80 px-3 py-1.5 text-xs font-semibold text-earth transition hover:border-earth/50"
          >
            Open combined quiz
          </Link>
        ) : mode === "scan" ? (
          <Link
            href="/skin-quiz"
            className="rounded-lg border border-earth/30 bg-linen/80 px-3 py-1.5 text-xs font-semibold text-earth transition hover:border-earth/50"
          >
            Take Skin Quiz
          </Link>
        ) : (
          <Link
            href="/skin-quiz?tab=scan"
            className="rounded-lg border border-earth/30 bg-linen/80 px-3 py-1.5 text-xs font-semibold text-earth transition hover:border-earth/50"
          >
            Add Skin Scan
          </Link>
        )}
      </p>
    </div>
  );
}

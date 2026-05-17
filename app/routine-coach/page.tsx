import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";
import { RoutineCoachFrame } from "../components/RoutineCoachFrame";

export const metadata: Metadata = {
  title: "Routine Coach",
  description:
    "Build a starter routine by skin type or get gentle suggestions on what you already logged — all from your browser.",
};

export default function RoutineCoachPage() {
  return (
    <PageScaffold
      title="Routine Coach"
      description="Two modes in one frame: sketch a beginner-friendly AM/PM shape from your skin feel, or let us read your saved shelf and surface practical nudges. Educational only — not medical advice."
    >
      <RoutineCoachFrame />

      <p className="text-sm leading-relaxed text-offblack/65">
        The coach reads{" "}
        <Link
          href="/routine"
          className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          My Routine
        </Link>{" "}
        from this browser only. Nothing is uploaded. For ingredient context, browse{" "}
        <Link
          href="/actives"
          className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          Actives Library
        </Link>
        .
      </p>
    </PageScaffold>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";
import { RoutineGuideExplorer } from "../components/RoutineGuideExplorer";

export const metadata: Metadata = {
  title: "Routine Guide",
  description:
    "Interactive layering guide by skin type — oily, dry, combination, balanced — plus checker tips and patch-test reminders.",
};

export default function GuidePage() {
  return (
    <PageScaffold
      title="Routine Guide"
      description="Pick a skin feel to see AM/PM templates, layering habits, and ingredient angles — then cross-check actives on Home. For learning only, not a diagnosis."
    >
      <RoutineGuideExplorer />

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          How the Pairing Checker Fits In
        </h2>
        <p>
          After you sketch a routine here, choose two ingredients from the{" "}
          <Link
            href="/"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            home page
          </Link>{" "}
          dropdowns. GlowSync compares them against a small, conservative rule
          set for same-day layering — not percentages, buffers, or prescriptions.
          Prefer the cozy extended list? Browse{" "}
          <Link
            href="/actives"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            actives A–Z
          </Link>{" "}
          first.
        </p>
      </section>

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Patch Tests Still Win
        </h2>
        <p>
          A guide cannot replace your own patch test. Try new products on a
          small area for several days before full-face use, especially with
          acids and retinoids — even more important when{" "}
          <span className="font-medium text-earth">sensitive / reactive mode</span>{" "}
          above is on.
        </p>
      </section>
    </PageScaffold>
  );
}

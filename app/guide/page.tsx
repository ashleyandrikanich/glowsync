import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";
import { RoutineGuideExplorer } from "../components/RoutineGuideExplorer";

export const metadata: Metadata = {
  title: "Routine Guide",
  description:
    "Interactive layering guide by skin type, oily, dry, combination, balanced, plus patch-test reminders.",
};

export default function GuidePage() {
  return (
    <PageScaffold
      title="Routine Guide"
      description="Pick a skin feel to see AM/PM templates, layering habits, and ingredient angles. For learning only, not a diagnosis."
    >
      <RoutineGuideExplorer />

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          How Ingredient Notes Fit In
        </h2>
        <p>
          After you sketch a routine here, use ingredient notes as a second
          pass: strong actives usually deserve slower ramps, recovery nights,
          and sunscreen support. For more ingredient context, browse{" "}
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
          acids and retinoids, even more important when{" "}
          <span className="font-medium text-earth">sensitive / reactive mode</span>{" "}
          above is on.
        </p>
      </section>
    </PageScaffold>
  );
}

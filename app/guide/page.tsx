import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Routine guide",
  description: "How to layer actives thoughtfully and use the GlowSync checker.",
};

export default function GuidePage() {
  return (
    <PageScaffold
      title="Routine guide"
      description="A calm framework for reading your shelf — not a substitute for a dermatologist."
    >
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-medium text-offblack">
          How the checker works
        </h2>
        <p>
          Not sure where to start? Take the{" "}
          <Link href="/skin-quiz" className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth">
            skin type quiz
          </Link>{" "}
          for routine ideas and catalog suggestions, then choose two ingredients from the{" "}
          <Link href="/" className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth">
            home
          </Link>{" "}
          page. GlowSync compares them against a small, conservative rule set
          meant for same-day or same-routine layering — not for every product
          nuance (buffers, percentages, or prescriptions).
        </p>
      </section>

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Layering habits
        </h2>
        <ul className="list-inside list-disc space-y-2 marker:text-earth/70">
          <li>Introduce one new active at a time so you know what changed.</li>
          <li>When combining strong actives, moisturizer can act as a buffer.</li>
          <li>Morning antioxidant plus SPF pairs well; retinoids usually belong at night.</li>
          <li>If skin stings, flakes, or feels tight, pull back before adding more.</li>
        </ul>
      </section>

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Patch tests
        </h2>
        <p>
          A tool cannot replace your own patch test. Try new products on a small
          area for several days before full-face use, especially with acids and
          retinoids.
        </p>
      </section>
    </PageScaffold>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { INGREDIENTS } from "@/src/lib/ingredients";
import { ActivesExplorer } from "../components/ActivesExplorer";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Actives Library",
  description:
    "Explore actives with search, playful filters, and expandable notes.",
};

export default function ActivesPage() {
  return (
    <PageScaffold
      title="Actives Library"
      description="Search common skincare ingredients, filter by topic, and open concise notes when you want more context."
    >
      <section
        className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/88 to-blush/32 p-5 shadow-sm sm:p-6"
        aria-labelledby="actives-definition-heading"
      >
        <h2
          id="actives-definition-heading"
          className="font-serif text-xl font-medium text-offblack sm:text-2xl"
        >
          What are actives?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-offblack/70 sm:text-[0.9375rem]">
          Actives are the ingredients that do the targeted work in a routine —
          like retinol, niacinamide, vitamin C, salicylic acid, or SPF. Cleansers
          and moisturizers support your skin; actives are what you pick when you
          want to address texture, breakouts, brightness, or sun protection.
        </p>
      </section>

      <ActivesExplorer ingredients={INGREDIENTS} />

      <p className="border-t border-sand/80 pt-8 text-sm text-offblack/65">
        Prefer structure after browsing ingredients? Jump to the{" "}
        <Link
          href="/guide"
          className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          Routine Guide
        </Link>
        .
      </p>
    </PageScaffold>
  );
}

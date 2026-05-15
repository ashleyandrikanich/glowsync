import type { Metadata } from "next";
import Link from "next/link";
import { INGREDIENTS } from "@/src/lib/ingredients";
import { ActivesExplorer } from "../components/ActivesExplorer";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Actives Library",
  description:
    "Explore actives with search, playful filters, and expandable notes—then pair two on Home.",
};

export default function ActivesPage() {
  return (
    <PageScaffold
      title="Actives Library"
      description="Meet the crew: search, tap a vibe, peek inside for facts, or hit “surprise me” when you want a random rabbit hole."
    >
      <ActivesExplorer ingredients={INGREDIENTS} />

      <p className="border-t border-sand/80 pt-8 text-sm text-offblack/65">
        Prefer the short list in the checker dropdowns? Same ingredients—this
        page is the cozy extended edition. Jump to the{" "}
        <Link
          href="/"
          className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          pairing checker
        </Link>
        .
      </p>
    </PageScaffold>
  );
}

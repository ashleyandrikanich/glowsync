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

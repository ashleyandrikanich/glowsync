import type { Metadata } from "next";
import Link from "next/link";
import { INGREDIENTS } from "@/src/lib/ingredients";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Actives library",
  description: "Reference notes for the actives supported in GlowSync.",
};

export default function ActivesPage() {
  return (
    <PageScaffold
      title="Actives library"
      description="Short context for each active in the checker. We will grow this list over time."
    >
      <ul className="space-y-5">
        {INGREDIENTS.map((ing) => (
          <li
            key={ing.id}
            className="rounded-2xl border border-sand/90 bg-sand/15 px-5 py-4"
          >
            <h2 className="font-serif text-xl font-medium text-offblack">
              {ing.name}
            </h2>
            <p className="mt-2 text-offblack/80">{ing.notes}</p>
          </li>
        ))}
      </ul>

      <p className="border-t border-sand/80 pt-8 text-offblack/70">
        Want to compare two of these? Use the{" "}
        <Link
          href="/"
          className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
        >
          Routine Safety Checker
        </Link>
        .
      </p>
    </PageScaffold>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Education Hub",
  description: "Short skincare lessons for building safer routines.",
};

const lessons = [
  {
    title: "How to Start Retinol",
    body: "Begin slowly, use it at night, moisturize well, and avoid stacking it with other strong actives at first.",
  },
  {
    title: "What Not to Mix",
    body: "Be careful with retinoids, exfoliating acids, benzoyl peroxide, and strong vitamin C in the same routine.",
  },
  {
    title: "AM vs PM Basics",
    body: "Morning routines usually focus on protection. Evening routines are better for cleansing and treatment steps.",
  },
  {
    title: "How to Patch Test",
    body: "Try a small amount on one area for a few days before using a new active across your whole face.",
  },
  {
    title: "Barrier Support",
    body: "If skin feels tight, burning, or unusually reactive, simplify the routine and lean on moisturizer and SPF.",
  },
  {
    title: "Product Frequency",
    body: "Not every product belongs in every routine every day. Frequency matters as much as ingredient choice.",
  },
];

export default function EducationPage() {
  return (
    <PageScaffold
      title="Education Hub"
      description="Quick lessons for building routines, introducing actives, and understanding when to slow down."
    >
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <article
            key={lesson.title}
            className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/82 to-blush/30 p-5 shadow-sm"
          >
            <h2 className="font-serif text-xl font-medium text-offblack">
              {lesson.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-offblack/68">
              {lesson.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-dawn/55 bg-linen/60 p-5 shadow-sm">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Ready to apply this?
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-offblack/65">
          Use the Routine Coach to compare these lessons with products already
          saved in your routine, or open the FAQ for quick answers about the app.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/routine-coach"
            className="rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
          >
            Open Routine Coach
          </Link>
          <Link
            href="/faq"
            className="rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack"
          >
            Read FAQ
          </Link>
        </div>
      </section>
    </PageScaffold>
  );
}

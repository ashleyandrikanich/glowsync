import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "About",
  description: "What GlowSync is — and what it is not.",
};

export default function AboutPage() {
  return (
    <PageScaffold
      title="About GlowSync"
      description="A small, opinionated companion for reading your routine — built for clarity, not hype."
    >
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-medium text-offblack">Purpose</h2>
        <p>
          GlowSync exists to reduce guesswork when you are pairing strong
          actives. It favors conservative guidance so you can decide when to
          bend the rules with a professional you trust.
        </p>
      </section>

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">
          Medical disclaimer
        </h2>
        <p>
          Nothing on this site is medical advice, diagnosis, or treatment. Skin
          conditions, pregnancy, prescriptions, and allergies need a qualified
          clinician. If you have concerns, stop experimenting and ask someone
          who can examine your skin.
        </p>
      </section>

      <section className="space-y-4 border-t border-sand/80 pt-8">
        <h2 className="font-serif text-xl font-medium text-offblack">Explore</h2>
        <p>
          Start with the{" "}
          <Link
            href="/skin-quiz"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            skin quiz
          </Link>
          , the{" "}
          <Link
            href="/routine"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            routine tracker
          </Link>
          , the{" "}
          <Link
            href="/guide"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            routine guide
          </Link>
          , browse{" "}
          <Link
            href="/actives"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            actives
          </Link>
          , or return{" "}
          <Link
            href="/"
            className="text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            home
          </Link>
          .
        </p>
      </section>
    </PageScaffold>
  );
}

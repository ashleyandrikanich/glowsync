import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "About",
  description:
    "What GlowSync is: quizzes, routines, and actives education—friendly, clear, and not medical advice.",
};

const linkBtn =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack";

const linkOutline =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-earth/35 bg-linen/70 px-5 py-2.5 text-sm font-semibold text-earth transition hover:border-earth/55 hover:bg-linen";

export default function AboutPage() {
  return (
    <PageScaffold
      title="About GlowSync"
      description="A clear overview of what GlowSync helps with, how your data is handled, and where its guidance has limits."
    >
      <div className="rounded-2xl border border-dawn/60 bg-gradient-to-br from-blush/50 via-linen/60 to-dawn/30 px-5 py-6 sm:px-7 sm:py-8">
        <p className="font-serif text-lg font-medium leading-snug text-offblack sm:text-xl">
          GlowSync is a small skincare toolkit for building routines, tracking
          products, and learning ingredient basics. It is not a clinic or a
          replacement for professional care.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-offblack/75">
          Whether you are starting fresh or organizing products you already own,
          the goal is to make routine decisions easier to understand and easier
          to maintain.
        </p>
      </div>

      <section className="space-y-5 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          What the app does
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-offblack/80">
          GlowSync brings a few practical tools together in one place:
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-xl border border-sand/70 bg-linen/70 p-4 shadow-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/85">
              Quiz
            </p>
            <p className="mt-2 font-medium text-offblack">Skin profile snapshot</p>
            <p className="mt-1 text-sm leading-relaxed text-offblack/70">
              A short, low-pressure quiz that suggests ideas based on how you
              describe your skin—more “starting points” than rules.
            </p>
          </li>
          <li className="rounded-xl border border-sand/70 bg-linen/70 p-4 shadow-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/85">
              Routine
            </p>
            <p className="mt-2 font-medium text-offblack">Your product log</p>
            <p className="mt-1 text-sm leading-relaxed text-offblack/70">
              Track what you use morning and night, with notes saved in your
              browser.
            </p>
          </li>
          <li className="rounded-xl border border-sand/70 bg-linen/70 p-4 shadow-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/85">
              Actives
            </p>
            <p className="mt-2 font-medium text-offblack">Ingredient notes</p>
            <p className="mt-1 text-sm leading-relaxed text-offblack/70">
              Browse common actives in plain language so labels feel less
              mysterious.
            </p>
          </li>
          <li className="rounded-xl border border-sand/70 bg-linen/70 p-4 shadow-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/85">
              {"Actives & guide"}
            </p>
            <p className="mt-2 font-medium text-offblack">Learn the vocabulary</p>
            <p className="mt-1 text-sm leading-relaxed text-offblack/70">
              Browse common ingredients and read a friendly layering guide when
              you want a bit more context.
            </p>
          </li>
        </ul>
      </section>

      <section className="space-y-4 border-t border-sand/70 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          How GlowSync approaches guidance
        </h2>
        <ul className="space-y-3 text-[0.9375rem] leading-relaxed text-offblack/80">
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth text-[0.65rem] font-bold text-linen"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-offblack">Plain language first.</strong>{" "}
              We bias toward clear explanations over jargon—without pretending
              skin is one-size-fits-all.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth text-[0.65rem] font-bold text-linen"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-offblack">Conservative routine nudges.</strong>{" "}
              When in doubt, we favor slower ramps, fewer stacked actives, and
              room for a pro if you use prescriptions or have tricky skin.
            </span>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-earth text-[0.65rem] font-bold text-linen"
              aria-hidden
            >
              ✓
            </span>
            <span>
              <strong className="text-offblack">You stay in the driver’s seat.</strong>{" "}
              Accounts are optional for the routine log; the quiz and library
              can be used without signing in.
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 border-t border-sand/70 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Important limits
        </h2>
        <div className="rounded-xl border border-blossom/40 bg-blossom/10 px-4 py-4 sm:px-5">
          <p className="text-[0.9375rem] leading-relaxed text-offblack/85">
            Nothing on GlowSync is medical advice, diagnosis, or treatment.
            Pregnancy, prescriptions, allergies, and anything that hurts or
            worries you belongs with a qualified clinician who can see your skin
            in person. GlowSync is for organization and education, not medical
            care.
          </p>
        </div>
      </section>

      <section className="space-y-6 border-t border-sand/70 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Where to start
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-offblack/75">
          Choose the section that best matches what you want to do next.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/skin-quiz" className={linkBtn}>
            Take the quiz
          </Link>
          <Link href="/routine" className={linkOutline}>
            Open my routine
          </Link>
          <Link href="/actives" className={linkOutline}>
            Browse actives
          </Link>
        </div>
        <p className="text-sm text-offblack/60">
          Want more reading first?{" "}
          <Link
            href="/guide"
            className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            Layering guide
          </Link>{" "}
          ·{" "}
          <Link
            href="/settings"
            className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
          >
            Settings
          </Link>{" "}
          ·{" "}
          <Link
            href="/login"
            className="font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
            prefetch={false}
          >
            Log in
          </Link>{" "}
          if you have an account.
        </p>
      </section>
    </PageScaffold>
  );
}

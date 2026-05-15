import type { Metadata } from "next";
import Link from "next/link";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "About",
  description:
    "What GlowSync is: quizzes, routines, actives, and a pairing checker—friendly, clear, and not medical advice.",
};

const linkBtn =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-earth px-5 py-2.5 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack";

const linkOutline =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-earth/35 bg-linen/70 px-5 py-2.5 text-sm font-semibold text-earth transition hover:border-earth/55 hover:bg-linen";

export default function AboutPage() {
  return (
    <PageScaffold
      title="About GlowSync"
      description="Pull up a chair—here’s what this app loves helping you with, and how we keep things honest and low-stress."
    >
      <div className="rounded-2xl border border-dawn/60 bg-gradient-to-br from-blush/50 via-linen/60 to-dawn/30 px-5 py-6 sm:px-7 sm:py-8">
        <p className="font-serif text-lg font-medium leading-snug text-offblack sm:text-xl">
          Hi! GlowSync is a small toolkit for curious skincare people—not a
          clinic, not a brand, and definitely not a place for doom-scroll
          anxiety.
        </p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-offblack/75">
          Whether you are just starting a routine or you already have a shelf
          full of serums, we want you to feel invited to explore, jot things
          down, and peek at how ingredients get along—at your own pace.
        </p>
      </div>

      <section className="space-y-5 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          So… what does the app actually do?
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-offblack/80">
          GlowSync brings a few simple pieces together so you do not have to
          jump between ten tabs:
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
              Track what you use morning and night, with notes—saved in your
              browser so it feels like a notebook, not homework.
            </p>
          </li>
          <li className="rounded-xl border border-sand/70 bg-linen/70 p-4 shadow-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth/85">
              Checker
            </p>
            <p className="mt-2 font-medium text-offblack">Actives pairing helper</p>
            <p className="mt-1 text-sm leading-relaxed text-offblack/70">
              Pick two actives on the home page for conservative layering notes.
              Think of it as a cautious friend, not a chemistry final.
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
          Why it feels a little “cozy” on purpose
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
              <strong className="text-offblack">Conservative pairing notes.</strong>{" "}
              When in doubt, we nudge you toward caution so you can adjust with a
              pro if you use prescriptions or have tricky skin.
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
              Accounts are optional for the routine log; the quiz and checker
              are here whenever you want to poke around.
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-4 border-t border-sand/70 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Quick heads-up (the serious bit)
        </h2>
        <div className="rounded-xl border border-blossom/40 bg-blossom/10 px-4 py-4 sm:px-5">
          <p className="text-[0.9375rem] leading-relaxed text-offblack/85">
            Nothing on GlowSync is medical advice, diagnosis, or treatment.
            Pregnancy, prescriptions, allergies, and anything that hurts or
            worries you belongs with a qualified clinician who can see your skin
            in person. We love curiosity—we just do not replace your care team.
          </p>
        </div>
      </section>

      <section className="space-y-6 border-t border-sand/70 pt-10">
        <h2 className="font-serif text-2xl font-medium text-offblack">
          Ready to wander?
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-offblack/75">
          Pick whatever sounds fun first—there is no wrong door.
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
          <Link href="/" className={linkOutline}>
            Try the pairing checker
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

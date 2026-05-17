import Link from "next/link";
import { BrandTitle } from "./components/BrandTitle";
import { HomeSideDressing } from "./components/HomeSideDressing";

const heroPrimaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-earth px-6 py-3 text-sm font-semibold text-linen shadow-md transition hover:bg-dawn hover:text-offblack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/45 sm:min-w-[10.5rem]";

export default function Home() {
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[max(1.75rem,min(7rem,9vw))] select-none border-r border-sand/30 bg-gradient-to-r from-sand/[0.09] via-dawn/[0.06] to-transparent md:block"
        aria-hidden
      >
        <HomeSideDressing side="left" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[max(1.75rem,min(7rem,9vw))] select-none border-l border-sand/30 bg-gradient-to-l from-sand/[0.09] via-dawn/[0.06] to-transparent md:block"
        aria-hidden
      >
        <HomeSideDressing side="right" />
      </div>

      <div className="relative z-[1] flex min-h-dvh flex-1 flex-col">
      {/* Hero — typical homepage: headline, tagline, primary paths */}
      <header className="relative px-6 pb-12 pt-12 text-center sm:px-10 sm:pb-16 sm:pt-16">
        <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/4 rounded-full bg-dawn/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 translate-x-1/4 rounded-full bg-sand/35 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-earth/85">
            GlowSync
          </p>
          <BrandTitle as="h1" size="lg" className="mx-auto mt-4 block" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-offblack/80 sm:text-xl">
            Explore your skin with a quick quiz, keep a simple routine log, and
            learn the basics of common actives—all in one place.
          </p>
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link href="/skin-quiz" className={heroPrimaryCtaClass}>
              Take the Skin Quiz
            </Link>
            <Link href="/routine" className={heroPrimaryCtaClass}>
              Build Your Routine
            </Link>
            <Link href="/actives" className={heroPrimaryCtaClass}>
              Ingredients & Actives
            </Link>
          </div>
        </div>
      </header>

      {/* Feature strip — scannable “what you can do” */}
      <section
        className="border-y border-sand/40 bg-linen/50 px-6 py-12 backdrop-blur-sm sm:px-10"
        aria-labelledby="home-features-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="home-features-heading"
            className="text-center font-serif text-2xl font-medium text-offblack sm:text-3xl"
          >
            What You Can Do Here
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-offblack/65">
            Pick a starting point—everything runs in your browser unless you sign
            in for account features.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            <li>
              <Link
                href="/skin-quiz"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/80">
                  Quiz
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Skin Profile Snapshot
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Four questions and starter AM/PM ideas from our reference
                  catalog.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Start quiz →
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/routine"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/80">
                  Routine
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Your Product Log
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Add what you use morning and night, with notes—saved on this
                  device.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Open routine →
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/actives"
                className="group flex h-full flex-col rounded-2xl border border-sand/60 bg-gradient-to-br from-linen/90 to-blush/40 p-6 text-left shadow-sm transition hover:border-earth/30 hover:shadow-md"
              >
                <span className="text-[0.65rem] font-semibold tracking-[0.08em] text-earth/80">
                  Learn
                </span>
                <span className="mt-3 font-serif text-xl font-medium text-offblack group-hover:text-earth">
                  Actives A–Z
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/70">
                  Short explainers on common ingredients so labels feel less
                  mysterious.
                </span>
                <span className="mt-5 text-sm font-semibold text-earth">
                  Browse actives →
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-10 text-center">
            <Link
              href="/guide"
              className="text-sm font-medium text-earth/90 underline decoration-sand/80 underline-offset-4 transition hover:text-offblack hover:decoration-earth"
            >
              Read the Layering Guide
            </Link>
          </p>
        </div>
      </section>

      </div>
    </div>
  );
}

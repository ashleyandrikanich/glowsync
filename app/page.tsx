import Link from "next/link";
import { BrandTitle } from "./components/BrandTitle";
import { BubbleDivider } from "./components/BubbleDivider";
import { HomeRoutineTeaser } from "./components/HomeRoutineTeaser";
import { HomeSideDressing } from "./components/HomeSideDressing";

const heroPrimaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-earth px-6 py-3 text-sm font-semibold text-linen shadow-md transition hover:bg-dawn hover:text-offblack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/45 sm:min-w-[10.5rem]";

const heroSecondaryCtaClass =
  heroPrimaryCtaClass;

const howItWorks = [
  {
    step: "01",
    title: "Take the Skin Quiz",
    body: "Answer a few questions about skin feel, goals, sensitivity, SPF, and favorite brands.",
  },
  {
    step: "02",
    title: "Save a Routine",
    body: "Keep the suggested steps you like, swap products you do not, and build your AM/PM order.",
  },
  {
    step: "03",
    title: "Learn the Actives",
    body: "Use the library and guide to understand ingredients in clear, practical language.",
  },
];

const startHere = [
  {
    title: "New to Skincare?",
    body: "Start with the quiz and let GlowSync suggest a simple AM/PM shape.",
    href: "/skin-quiz",
    cta: "Take the quiz",
  },
  {
    title: "Already Have Products?",
    body: "Log your shelf, arrange the order, and track what you used today.",
    href: "/routine",
    cta: "Open My Routine",
  },
  {
    title: "Confused by Ingredients?",
    body: "Browse actives first, then use the guide to understand layering habits.",
    href: "/actives",
    cta: "Browse Actives",
  },
];

const newTools = [
  {
    title: "Skin Journal",
    body: "Log skin feel, irritation, breakouts, and notes so changes are easier to connect over time.",
    href: "/skin-journal",
  },
  {
    title: "Routine History",
    body: "Review recent product usage and see how your saved frequency plan lines up with your week.",
    href: "/routine-history",
  },
  {
    title: "Product Compare",
    body: "Place catalog products side by side to compare actives, ingredients, role, and retailer notes.",
    href: "/compare",
  },
  {
    title: "Wishlist",
    body: "Save products you want to research, compare, or try later without adding them to your routine yet.",
    href: "/wishlist",
  },
];

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
        <header className="relative px-6 pb-12 pt-12 text-center sm:px-10 sm:pb-16 sm:pt-16">
          <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/4 rounded-full bg-dawn/40 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 translate-x-1/4 rounded-full bg-sand/35 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden"
            aria-hidden
          >
            <span className="absolute left-[8%] top-12 h-10 w-10 rounded-full border border-dawn/50 bg-gradient-to-br from-linen/80 to-dawn/35 shadow-sm sm:h-14 sm:w-14" />
            <span className="absolute right-[12%] top-8 h-7 w-7 rounded-full border border-sand/70 bg-gradient-to-br from-linen/85 to-blush/35 shadow-sm sm:h-10 sm:w-10" />
            <span className="absolute left-[18%] top-48 h-5 w-5 rounded-full bg-dawn/45 shadow-sm sm:h-8 sm:w-8" />
            <span className="absolute right-[20%] top-52 h-12 w-12 rounded-full border border-blossom/30 bg-gradient-to-br from-blush/40 to-linen/75 shadow-sm sm:h-16 sm:w-16" />
            <span className="absolute bottom-6 left-[30%] h-6 w-6 rounded-full border border-sage/20 bg-sage/15 shadow-sm sm:h-9 sm:w-9" />
            <span className="absolute bottom-14 right-[32%] h-4 w-4 rounded-full bg-sand/45 shadow-sm sm:h-6 sm:w-6" />
            <span className="absolute left-[7%] bottom-20 hidden h-4 w-4 rounded-full bg-blossom/30 shadow-sm sm:block" />
            <span className="absolute right-[8%] bottom-24 hidden h-8 w-8 rounded-full border border-dawn/40 bg-linen/65 shadow-sm sm:block" />
            <span className="absolute left-[38%] top-8 hidden h-3 w-3 rounded-full bg-sage/20 shadow-sm sm:block" />
            <span className="absolute right-[42%] bottom-8 hidden h-5 w-5 rounded-full bg-dawn/35 shadow-sm sm:block" />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-earth/85">
              GlowSync
            </p>
            <BrandTitle as="h1" size="lg" className="mx-auto mt-4 block" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-offblack/80 sm:text-xl">
              Build a skincare routine that actually makes sense for your skin:
              quiz your skin, save your products, and learn what belongs in AM
              vs PM.
            </p>
            <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link href="/skin-quiz" className={heroPrimaryCtaClass}>
                Take the Skin Quiz
              </Link>
              <Link href="/routine" className={heroSecondaryCtaClass}>
                Open My Routine
              </Link>
              <Link href="/actives" className={heroSecondaryCtaClass}>
                Browse Actives
              </Link>
            </div>
            <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-offblack/55 sm:text-sm">
              Educational only. Stored locally unless you sign in. No diagnosis,
              no fear-mongering.
            </p>
          </div>
        </header>

        <main className="space-y-16 px-6 pb-20 sm:px-10">
          <section
            className="mx-auto max-w-6xl"
            aria-labelledby="home-flow-heading"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
                How GlowSync Works
              </p>
              <h2
                id="home-flow-heading"
                className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl"
              >
                From quiz answers to a routine you can use
              </h2>
            </div>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className="rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/88 to-blush/32 p-5 shadow-sm"
                >
                  <p className="font-serif text-2xl text-earth/70">{item.step}</p>
                  <h3 className="mt-3 font-serif text-xl font-medium text-offblack">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offblack/68">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <BubbleDivider />

          <section className="mx-auto max-w-6xl">
            <HomeRoutineTeaser />
          </section>

          <BubbleDivider />

          <section
            className="mx-auto max-w-6xl rounded-3xl border border-sand/60 bg-linen/50 px-5 py-8 backdrop-blur-sm sm:px-8"
            aria-labelledby="home-start-heading"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
                Start Here
              </p>
              <h2
                id="home-start-heading"
                className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl"
              >
                Choose the best starting point
              </h2>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {startHere.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/88 to-blush/32 p-5 text-left shadow-sm transition hover:border-earth/35 hover:shadow-md"
                  >
                    <span className="font-serif text-xl font-medium text-offblack group-hover:text-earth">
                      {item.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/68">
                      {item.body}
                    </span>
                    <span className="mt-5 text-sm font-semibold text-earth">
                      {item.cta} -&gt;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <BubbleDivider />

          <section
            className="mx-auto max-w-6xl"
            aria-labelledby="home-tools-heading"
          >
            <div className="text-center">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-earth/80">
                New Tools
              </p>
              <h2
                id="home-tools-heading"
                className="mt-2 font-serif text-2xl font-medium text-offblack sm:text-3xl"
              >
                Track, compare, and save more thoughtfully
              </h2>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {newTools.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/88 to-blush/32 p-5 shadow-sm transition hover:border-earth/35 hover:shadow-md"
                  >
                    <span className="font-serif text-xl font-medium text-offblack group-hover:text-earth">
                      {item.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-offblack/68">
                      {item.body}
                    </span>
                    <span className="mt-5 text-sm font-semibold text-earth">
                      Open -&gt;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <BubbleDivider />

          <section className="mx-auto max-w-6xl rounded-3xl border border-dawn/50 bg-gradient-to-br from-blush/42 via-linen/78 to-dawn/28 px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
            <p className="font-serif text-2xl font-medium text-offblack sm:text-3xl">
              Ready to build your routine?
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-offblack/68">
              Start with the quiz if you want guidance, or jump straight into
              My Routine if you already know what is on your shelf.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/skin-quiz" className={heroPrimaryCtaClass}>
                Take the Skin Quiz
              </Link>
              <Link href="/routine" className={heroSecondaryCtaClass}>
                Build Your Routine
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

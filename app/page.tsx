import Link from "next/link";
import { BrandTitle } from "./components/BrandTitle";
import { BubbleDivider } from "./components/BubbleDivider";
import { HomeRoutineTeaser } from "./components/HomeRoutineTeaser";
import { HomeSideDressing } from "./components/HomeSideDressing";

function iconForTool(title: string) {
  const iconClass = "h-6 w-6 shrink-0 text-earth";

  if (title === "Skin Quiz + Scan") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h10M4 12h10M4 18h7M16.5 14.5l1.8 1.8 3.7-3.7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (title === "Product Compare") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 4h6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M14.8 4h1.8M16.6 4v2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M10 6h4v2h-4z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M8.2 8h7.6c1.2 0 2.2 1 2.2 2.2V19c0 .8-.7 1.5-1.5 1.5h-9c-.8 0-1.5-.7-1.5-1.5v-8.8C6 9 7 8 8.2 8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.4 12.2h5.2M9.4 14.8h5.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (title === "Wishlist") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 20s-6.5-4-8.5-7.4A4.7 4.7 0 0 1 12 7a4.7 4.7 0 0 1 8.5 5.6C18.5 16 12 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (title === "Skin Journal") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Routine History") {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return null;
}

const heroPrimaryCtaClass =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-earth px-6 py-3 text-sm font-semibold text-linen shadow-md transition hover:bg-dawn hover:text-offblack focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/45 sm:min-w-[10.5rem]";

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

const toolGroups = [
  {
    title: "Build your plan",
    tools: [
      {
        title: "Skin Quiz + Scan",
        body: "Use one combined page for quiz answers and photo scan recommendations (educational only).",
        href: "/skin-quiz",
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
    ],
  },
  {
    title: "Track your progress",
    tools: [
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
    ],
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
            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3">
              <Link href="/skin-quiz" className={heroPrimaryCtaClass}>
                Start Skin Quiz
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-earth/90">
                <Link
                  href="/routine"
                  className="underline decoration-earth/45 underline-offset-4 transition hover:text-offblack hover:decoration-earth"
                >
                  Open My Routine
                </Link>
                <Link
                  href="/actives"
                  className="underline decoration-earth/45 underline-offset-4 transition hover:text-offblack hover:decoration-earth"
                >
                  Browse Actives
                </Link>
              </div>
            </div>
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
            <div className="mt-8 space-y-6">
              {toolGroups.map((group) => (
                <section key={group.title} className="rounded-2xl border border-sand/60 bg-linen/45 p-4 sm:p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-earth/75">
                    {group.title}
                  </h3>
                  <ul className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {group.tools.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="group flex h-full flex-col rounded-2xl border border-sand/70 bg-gradient-to-br from-linen/88 to-blush/32 p-5 shadow-sm transition hover:border-earth/35 hover:shadow-md"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-earth/25 bg-blush/45 shadow-sm"
                              aria-hidden
                            >
                              {iconForTool(item.title)}
                            </span>
                            <span className="min-w-0 font-serif text-lg font-medium leading-snug text-offblack group-hover:text-earth sm:text-xl">
                              {item.title}
                            </span>
                          </div>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-offblack/68">
                            {item.body}
                          </p>
                          <span className="mt-4 text-sm font-semibold text-earth">
                            Open →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>

          <BubbleDivider />

          <section className="mx-auto max-w-6xl">
            <HomeRoutineTeaser />
          </section>
        </main>
      </div>
    </div>
  );
}

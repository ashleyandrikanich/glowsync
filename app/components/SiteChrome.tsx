import Link from "next/link";
import { getSession } from "@/src/lib/auth";
import { BrandTitle } from "./BrandTitle";
import { NavMenuDropdown } from "./NavMenuDropdown";

export async function SiteChrome() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b border-sand/45 bg-gradient-to-r from-linen/95 via-dawn/40 to-blush/55 shadow-[0_2px_18px_-8px_rgba(39,30,26,0.12)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute -left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-dawn/45 bg-gradient-to-br from-linen/80 to-dawn/30 shadow-sm sm:h-10 sm:w-10" />
        <span className="absolute left-14 top-2 hidden h-3 w-3 rounded-full bg-sand/40 shadow-sm sm:block" />
        <span className="absolute right-6 top-3 h-5 w-5 rounded-full border border-blush/50 bg-linen/70 shadow-sm sm:right-12 sm:h-6 sm:w-6" />
        <span className="absolute -right-1 bottom-1 h-7 w-7 rounded-full border border-sage/20 bg-sage/10 shadow-sm sm:h-9 sm:w-9" />
        <span className="absolute left-1/2 top-1/2 h-16 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dawn/20 blur-2xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-8 sm:py-3.5 lg:px-10">
        <div className="relative z-[1] flex min-w-0 items-center justify-start">
          <NavMenuDropdown userEmail={session?.email ?? null} />
        </div>

        <div className="relative z-[1] flex min-w-0 justify-center px-1 sm:px-2">
          <Link
            href="/"
            className="inline-flex max-w-full min-w-0 rounded-xl outline-none ring-offset-2 ring-offset-linen/90 focus-visible:ring-2 focus-visible:ring-earth/35"
            aria-label="GlowSync — home"
          >
            <BrandTitle as="span" size="lg" variant="default" />
          </Link>
        </div>

        <div className="relative z-[1] min-w-0" aria-hidden="true" />
      </div>
    </header>
  );
}

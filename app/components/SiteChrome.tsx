import Link from "next/link";
import { getSession } from "@/src/lib/auth";
import { BrandTitle } from "./BrandTitle";
import { NavMenuDropdown } from "./NavMenuDropdown";

export async function SiteChrome() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 border-b border-sand/40 bg-orange-200 shadow-[0_2px_14px_-6px_rgba(39,30,26,0.1)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-8 sm:py-3.5 lg:px-10">
        <div className="flex min-w-0 items-center justify-start">
          <NavMenuDropdown userEmail={session?.email ?? null} />
        </div>

        <div className="flex min-w-0 justify-center px-1 sm:px-2">
          <Link
            href="/"
            className="group inline-flex max-w-full min-w-0 rounded-lg outline-none ring-offset-2 ring-offset-orange-200 transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-earth/35"
            aria-label="GlowSync — home"
          >
            <BrandTitle as="span" size="lg" variant="default" />
          </Link>
        </div>

        <div className="min-w-0" aria-hidden="true" />
      </div>
    </header>
  );
}

import Link from "next/link";
import { AuthNav } from "./AuthNav";
import { BrandTitle } from "./BrandTitle";
import { MainNav } from "./MainNav";

export async function SiteChrome() {
  return (
    <header className="sticky top-0 z-20 border-b border-sand/80 bg-linen/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="group rounded-lg outline-none ring-offset-2 ring-offset-linen transition hover:opacity-[0.88] focus-visible:ring-2 focus-visible:ring-earth/30"
          aria-label="GlowSync — home"
        >
          <BrandTitle as="span" size="sm" />
        </Link>
        <MainNav />
        <AuthNav />
      </div>
    </header>
  );
}

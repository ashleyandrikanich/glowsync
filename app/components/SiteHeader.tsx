"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandTitle } from "./BrandTitle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/skin-quiz", label: "Quiz" },
  { href: "/routine", label: "Routine" },
  { href: "/guide", label: "Guide" },
  { href: "/actives", label: "Actives" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

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
        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/90"
          aria-label="Primary"
        >
          {nav.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`border-b border-transparent pb-0.5 transition hover:text-offblack ${
                  active ? "border-earth text-offblack" : ""
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

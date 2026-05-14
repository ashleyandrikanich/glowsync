"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/skin-quiz", label: "Quiz" },
  { href: "/routine", label: "Routine" },
  { href: "/guide", label: "Guide" },
  { href: "/actives", label: "Actives" },
  { href: "/about", label: "About" },
] as const;

export function MainNav() {
  const pathname = usePathname();

  return (
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
  );
}

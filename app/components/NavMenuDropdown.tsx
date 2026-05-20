"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_GROUPS } from "@/src/lib/site-nav";
import { LogoutButton } from "./LogoutButton";

const HEADER_OFFSET = "4.75rem";

const accountLinkClass =
  "block rounded-xl px-3 py-2.5 text-sm font-medium text-offblack/85 transition hover:bg-sand/35 hover:text-offblack";

type NavMenuDropdownProps = {
  userEmail: string | null;
};

/** Remount on route change so the menu closes without syncing state in an effect. */
export function NavMenuDropdown(props: NavMenuDropdownProps) {
  const pathname = usePathname();
  return <NavMenuDropdownInner key={pathname} {...props} />;
}

function NavMenuDropdownInner({ userEmail }: NavMenuDropdownProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((o) => !o);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open, close]);

  const menuPortal =
    open && mounted
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[100] cursor-default bg-offblack/25 backdrop-blur-[2px]"
              style={{ top: HEADER_OFFSET }}
              onClick={close}
            />
            <div
              ref={panelRef}
              id={menuId}
              role="menu"
              aria-label="Site navigation"
              className="fixed left-0 z-[110] flex max-h-[min(calc(100dvh-5rem),36rem)] w-[min(19.5rem,calc(100vw-1.25rem))] flex-col overflow-y-auto rounded-r-2xl border border-sand/60 border-l-0 bg-gradient-to-b from-linen/98 via-linen/95 to-blush/45 py-4 shadow-[8px_0_40px_-12px_rgba(39,30,26,0.25)]"
              style={{ top: HEADER_OFFSET, bottom: 0 }}
            >
              <div className="border-b border-sand/50 px-4 pb-3">
                <p className="font-serif text-lg font-medium text-offblack">
                  GlowSync
                </p>
                <p className="mt-1 text-xs leading-relaxed text-offblack/60">
                  Jump anywhere — routes, tools, and your account live in this
                  panel.
                </p>
              </div>

              <nav className="flex-1 space-y-1 px-2 pt-3">
                {NAV_GROUPS.map((group, gi) => (
                  <div key={group.label} className="pb-2">
                    <p className="px-3 pb-2 text-[0.65rem] font-semibold tracking-[0.06em] text-earth/70">
                      {group.label}
                    </p>
                    <ul className="space-y-0.5" role="none">
                      {group.items.map((item) => {
                        const active =
                          item.href === "/"
                            ? pathname === "/"
                            : pathname === item.href ||
                              pathname.startsWith(`${item.href}/`);
                        return (
                          <li key={item.href} role="none">
                            <Link
                              role="menuitem"
                              href={item.href}
                              onClick={close}
                              className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                active
                                  ? "bg-earth/12 text-offblack ring-1 ring-earth/20"
                                  : "text-offblack/85 hover:bg-sand/35 hover:text-offblack"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    {gi < NAV_GROUPS.length - 1 ? (
                      <div className="mx-3 mt-3 h-px bg-gradient-to-r from-transparent via-sand/70 to-transparent" />
                    ) : null}
                  </div>
                ))}
              </nav>

              <div className="border-t border-sand/50 px-2 pt-4">
                <p className="px-3 pb-2 text-[0.65rem] font-semibold tracking-[0.06em] text-earth/70">
                  Account
                </p>
                {userEmail ? (
                  <div className="space-y-3 px-3 pb-1">
                    <p
                      className="truncate font-serif text-sm font-medium leading-snug text-offblack/85"
                      title={userEmail}
                    >
                      {userEmail}
                    </p>
                    <LogoutButton tone="light" />
                  </div>
                ) : (
                  <ul className="space-y-0.5 px-2 pb-1" role="none">
                    <li role="none">
                      <Link
                        role="menuitem"
                        href="/login"
                        onClick={close}
                        className={accountLinkClass}
                      >
                        Log In
                      </Link>
                    </li>
                    <li role="none">
                      <Link
                        role="menuitem"
                        href="/register"
                        onClick={close}
                        className={accountLinkClass}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              <div className="border-t border-sand/50 px-4 py-3">
                <Link
                  href="/actives"
                  onClick={close}
                  className="text-xs font-medium text-earth underline decoration-sand/80 underline-offset-4 transition hover:decoration-earth"
                >
                  Browse Actives →
                </Link>
              </div>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <div className="relative flex shrink-0 items-center">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={toggle}
        className="inline-flex items-center gap-2 rounded-xl border border-earth/25 bg-linen/80 px-3 py-2 text-[0.65rem] font-semibold tracking-[0.12em] text-earth shadow-sm transition hover:border-earth/45 hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earth/40 sm:px-3.5 sm:py-2.5 sm:tracking-[0.16em]"
      >
        <span className="flex flex-col gap-[3px]" aria-hidden>
          <span className="h-0.5 w-[1.1rem] rounded-full bg-earth/85" />
          <span className="h-0.5 w-[1.1rem] rounded-full bg-earth/85" />
          <span className="h-0.5 w-[1.1rem] rounded-full bg-earth/85" />
        </span>
        <span className="hidden sm:inline">Menu</span>
      </button>
      {menuPortal}
    </div>
  );
}

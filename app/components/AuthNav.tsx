import Link from "next/link";
import { getSession } from "@/src/lib/auth";
import { LogoutButton } from "./LogoutButton";

const linkLight =
  "border-b border-transparent pb-0.5 text-earth/90 transition hover:border-earth hover:text-offblack";
const linkDark =
  "border-b border-transparent pb-0.5 text-linen/85 transition hover:border-linen hover:text-white";

export async function AuthNav({
  variant = "light",
}: {
  variant?: "light" | "onDark";
}) {
  const isDark = variant === "onDark";
  const linkClass = isDark ? linkDark : linkLight;

  const session = await getSession();
  const guestWrap = isDark
    ? "flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
    : "flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]";

  if (!session) {
    return (
      <div className={guestWrap}>
        <Link href="/login" className={linkClass}>
          Log in
        </Link>
        <Link href="/register" className={linkClass}>
          Register
        </Link>
      </div>
    );
  }

  const sessionWrap = isDark
    ? "flex max-w-[min(18rem,42vw)] flex-row flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:max-w-[20rem]"
    : "flex max-w-lg flex-col items-center gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4";

  return (
    <div className={sessionWrap}>
      <span
        className={`max-w-full truncate font-serif text-base font-medium leading-snug tracking-tight sm:text-lg ${
          isDark
            ? "text-right text-linen drop-shadow-sm"
            : "text-center text-offblack/80"
        }`}
      >
        {session.email}
      </span>
      <LogoutButton tone={isDark ? "dark" : "light"} />
    </div>
  );
}

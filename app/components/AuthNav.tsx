import Link from "next/link";
import { getSession } from "@/src/lib/auth";
import { LogoutButton } from "./LogoutButton";

export async function AuthNav() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
        <Link
          href="/login"
          className="border-b border-transparent pb-0.5 text-earth/90 transition hover:border-earth hover:text-offblack"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="border-b border-transparent pb-0.5 text-earth/90 transition hover:border-earth hover:text-offblack"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex max-w-[14rem] flex-col items-end gap-1 sm:max-w-none sm:flex-row sm:items-center sm:gap-3">
      <span className="truncate text-[0.65rem] font-medium normal-case tracking-normal text-offblack/70">
        {session.email}
      </span>
      <LogoutButton />
    </div>
  );
}

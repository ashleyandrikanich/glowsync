"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/90 underline decoration-sand decoration-1 underline-offset-4 transition hover:text-offblack"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      Log out
    </button>
  );
}

"use client";

type LogoutButtonProps = {
  /** Lighter styling on dark header */
  tone?: "light" | "dark";
};

export function LogoutButton({ tone = "light" }: LogoutButtonProps) {
  const cls =
    tone === "dark"
      ? "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-linen/85 underline decoration-linen/40 decoration-1 underline-offset-4 transition hover:text-white"
      : "text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-earth/90 underline decoration-sand decoration-1 underline-offset-4 transition hover:text-offblack";

  return (
    <button
      type="button"
      className={cls}
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      Log Out
    </button>
  );
}

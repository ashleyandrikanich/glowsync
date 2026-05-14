"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? (
        <p className="rounded-lg border border-blossom/40 bg-dawn/40 px-3 py-2 text-sm text-offblack" role="alert">
          {error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-sand/90 bg-white/60 px-4 py-2.5 text-offblack shadow-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/25"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-earth/90">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-sand/90 bg-white/60 px-4 py-2.5 text-offblack shadow-sm outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/25"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-earth px-6 py-2.5 text-sm font-medium text-linen transition hover:bg-offblack disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-sm text-offblack/65">
        No account?{" "}
        <Link href="/register" className="text-earth underline decoration-sand underline-offset-4 hover:decoration-earth">
          Create one
        </Link>
      </p>
    </form>
  );
}

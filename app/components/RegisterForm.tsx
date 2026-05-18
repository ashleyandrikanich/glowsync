"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PASSWORD_RULES } from "@/src/lib/password-policy";

const fieldClass =
  "w-full rounded-xl border border-sand/90 bg-linen/65 px-4 py-2.5 text-offblack shadow-sm outline-none transition hover:border-blossom/35 hover:bg-linen/85 focus:border-sage focus:ring-2 focus:ring-sage/25";

const labelClass =
  "block text-[0.7rem] font-semibold tracking-[0.06em] text-earth/90";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const ruleStatus = useMemo(
    () => PASSWORD_RULES.map((r) => ({ ...r, met: r.test(password) })),
    [password]
  );

  const passwordsMatch =
    confirmPassword.length === 0 || password === confirmPassword;

  const allRulesMet = ruleStatus.every((x) => x.met);
  const canSubmit =
    email.trim().length > 0 &&
    allRulesMet &&
    password === confirmPassword &&
    confirmPassword.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!ruleStatus.every((x) => x.met)) {
      setError("Please meet all password requirements below.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not register.");
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
    <div className="mx-auto max-w-md space-y-8">
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-offblack/70">
          Create an account to keep your routine, quiz results, and settings
          connected to your sign-in.
        </p>
        <p className="rounded-2xl border border-dawn/55 bg-linen/55 px-4 py-3 text-xs leading-relaxed text-offblack/62">
          Use a working email and a password you do not use on other sites. Your
          routine details stay tied to your account and are not sold.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {error ? (
          <p
            className="rounded-lg border border-blossom/40 bg-dawn/40 px-3 py-2 text-sm text-offblack"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="space-y-2">
          <label htmlFor="reg-email" className={labelClass}>
            Email
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-name" className={labelClass}>
            Display name{" "}
            <span className="font-normal text-offblack/45">(optional)</span>
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="How we greet you in the app"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${fieldClass} pr-20`}
              aria-describedby="reg-password-requirements"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-earth transition hover:text-offblack"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div
            id="reg-password-requirements"
            className="rounded-xl border border-sand/70 bg-linen/50 px-3 py-3 text-sm"
          >
            <p className="text-[0.65rem] font-semibold tracking-[0.06em] text-earth/80">
              Password requirements
            </p>
            <ul className="mt-2 space-y-1.5 text-[0.8125rem] leading-snug text-offblack/75">
              {ruleStatus.map((r) => (
                <li key={r.id} className="flex items-start gap-2">
                  <span
                    className={
                      r.met
                        ? "mt-0.5 text-sage"
                        : "mt-0.5 text-offblack/35"
                    }
                    aria-hidden
                  >
                    {r.met ? "✓" : "○"}
                  </span>
                  <span className={r.met ? "text-offblack/90" : ""}>
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-confirm" className={labelClass}>
            Confirm password
          </label>
          <div className="relative">
            <input
              id="reg-confirm"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${fieldClass} pr-20 ${
                !passwordsMatch && confirmPassword.length > 0
                  ? "border-blossom/60 ring-1 ring-blossom/25"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-earth transition hover:text-offblack"
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {!passwordsMatch && confirmPassword.length > 0 ? (
            <p className="text-xs text-earth" role="status">
              Passwords must match.
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending || !canSubmit}
          className="w-full rounded-xl bg-earth px-6 py-3 text-sm font-semibold text-linen shadow-sm transition hover:bg-offblack disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[12rem]"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>

        <p className="border-t border-sand/60 pt-5 text-center text-sm text-offblack/65">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-earth underline decoration-sand underline-offset-4 hover:decoration-earth"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

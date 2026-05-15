export type PasswordRule = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

/** Shared client + server rules for registration passwords. */
export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (p) => p.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (p) => /[A-Z]/.test(p),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (p) => /[a-z]/.test(p),
  },
  {
    id: "digit",
    label: "One number",
    test: (p) => /[0-9]/.test(p),
  },
] as const;

export function passwordMeetsAllRules(password: string): boolean {
  return PASSWORD_RULES.every((r) => r.test(password));
}

export function passwordPolicyErrorMessage(): string {
  return "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
}

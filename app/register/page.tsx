import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { RegisterForm } from "../components/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Create a GlowSync account.",
};

export default function RegisterPage() {
  return (
    <PageScaffold
      title="Create an Account"
      description="We store a hashed password in the database. Copy .env.example to .env, set DATABASE_URL and AUTH_SECRET, then run npm run db:push. Use a strong password — not medical advice."
    >
      <RegisterForm />
    </PageScaffold>
  );
}

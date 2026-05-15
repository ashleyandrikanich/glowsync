import type { Metadata } from "next";
import { LoginForm } from "../components/LoginForm";
import { PageScaffold } from "../components/PageScaffold";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your GlowSync account.",
};

export default function LoginPage() {
  return (
    <PageScaffold
      title="Log In"
      description="Use the email and password you registered with. Sessions use a secure cookie on this device."
    >
      <LoginForm />
    </PageScaffold>
  );
}

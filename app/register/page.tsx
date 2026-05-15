import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { RegisterForm } from "../components/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Create a GlowSync account.",
};

export default function RegisterPage() {
  return (
    <PageScaffold title="Create an Account">
      <RegisterForm />
    </PageScaffold>
  );
}

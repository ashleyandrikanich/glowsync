import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { SkinQuizClient } from "../components/SkinQuizClient";

export const metadata: Metadata = {
  title: "Skin Quiz",
  description:
    "Short quiz to explore skin type and concerns, with routine ideas and catalog product suggestions.",
};

export default function SkinQuizPage() {
  return (
    <PageScaffold
      title="What's My Skin Type?"
      description="A short quiz on skin feel, priorities, sensitivity, SPF, and optional favorite brands — then AM/PM ideas and catalog picks matched to your answers. For learning only, not a diagnosis."
    >
      <SkinQuizClient />
    </PageScaffold>
  );
}

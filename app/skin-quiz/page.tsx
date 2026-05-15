import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { SkinQuizClient } from "../components/SkinQuizClient";

export const metadata: Metadata = {
  title: "Skin quiz",
  description:
    "Short quiz to explore skin type and concerns, with routine ideas and catalog product suggestions.",
};

export default function SkinQuizPage() {
  return (
    <PageScaffold
      title="What’s my skin type?"
      description="Four quick questions — then a tailored snapshot with AM/PM routine ideas and product ideas from our reference catalog. For learning only, not a diagnosis."
    >
      <SkinQuizClient />
    </PageScaffold>
  );
}

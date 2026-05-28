import type { Metadata } from "next";
import { Suspense } from "react";
import { PageScaffold } from "../components/PageScaffold";
import { SkinIntakeHub } from "../components/SkinIntakeHub";

export const metadata: Metadata = {
  title: "Skin Profile",
  description:
    "Complete the skin quiz and photo scan for combined product recommendations.",
};

export default function SkinQuizPage() {
  return (
    <PageScaffold
      title="Skin Profile"
      description="Do both the quiz and a photo scan for your best recommendations. Quiz answers cover habits and preferences; the scan refines what we see on your face. Both are required before we show your full routine and catalog picks."
    >
      <Suspense fallback={<p className="text-sm text-offblack/65">Loading quiz…</p>}>
        <SkinIntakeHub />
      </Suspense>
    </PageScaffold>
  );
}

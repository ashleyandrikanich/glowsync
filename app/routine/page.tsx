import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { RoutineTracker } from "../components/RoutineTracker";

export const metadata: Metadata = {
  title: "My Routine",
  description:
    "Build and track the products you use; a completeness rating grows as you log more and balance day and night.",
};

export default function RoutinePage() {
  return (
    <PageScaffold
      title="My Routine"
      description="Track what you use, tune your AM/PM order, and keep quick notes. Stored only on this device."
    >
      <RoutineTracker />
    </PageScaffold>
  );
}

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
      description="Log what you use, when you use it, and keep notes in one place. Your routine rating rises as you add products (and small bonuses for AM+PM balance and notes). Stored only on this device."
    >
      <RoutineTracker />
    </PageScaffold>
  );
}

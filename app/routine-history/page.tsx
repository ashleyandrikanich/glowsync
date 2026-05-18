import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { RoutineHistoryClient } from "../components/RoutineHistoryClient";

export const metadata: Metadata = {
  title: "Routine History",
  description: "Review recent product usage and saved routine frequency.",
};

export default function RoutineHistoryPage() {
  return (
    <PageScaffold
      title="Routine History"
      description="See what you have logged recently, spot weekly patterns, and compare that with your saved product frequency."
    >
      <RoutineHistoryClient />
    </PageScaffold>
  );
}

import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { SkinJournalClient } from "../components/SkinJournalClient";

export const metadata: Metadata = {
  title: "Skin Journal",
  description: "Log skin changes, irritation, breakouts, and routine notes.",
};

export default function SkinJournalPage() {
  return (
    <PageScaffold
      title="Skin Journal"
      description="Keep a simple record of how your skin feels over time so product changes are easier to understand."
    >
      <SkinJournalClient />
    </PageScaffold>
  );
}

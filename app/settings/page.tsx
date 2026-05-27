import type { Metadata } from "next";
import { PageScaffold } from "../components/PageScaffold";
import { SettingsPanel } from "../components/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "GlowSync settings: export or clear your local routine, import backups, and quick links to safety notes.",
};

export default function SettingsPage() {
  return (
    <PageScaffold
      title="Settings"
      description="Everything here runs in your browser, backups, resets, and reminders about how GlowSync handles your routine data."
    >
      <SettingsPanel />
    </PageScaffold>
  );
}

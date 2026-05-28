import { redirect } from "next/navigation";

export default function SkinScanPage() {
  redirect("/skin-quiz?tab=scan");
}

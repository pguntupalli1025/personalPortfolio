import type { Metadata } from "next";
import { SkillsView } from "@/components/SkillsView";

export const metadata: Metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  return <SkillsView />;
}

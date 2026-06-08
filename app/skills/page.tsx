import type { Metadata } from "next";
import { SkillsPageContent } from "@/components/pages/skills-page";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills, security domains, tools, and technologies expertise of Drumil Nikhare.",
};

export default function SkillsPage() {
  return <SkillsPageContent />;
}

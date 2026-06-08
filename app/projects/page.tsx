import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description: "Cybersecurity projects and research by Drumil Nikhare — API security, AI privacy, and cryptography.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}

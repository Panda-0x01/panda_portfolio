import type { Metadata } from "next";
import { ExperiencePageContent } from "@/components/pages/experience-page";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience and career history of Drumil Nikhare, cybersecurity professional.",
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}

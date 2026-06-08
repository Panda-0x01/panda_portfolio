import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Drumil Nikhare — Security Engineer & SOC Analyst",
  description:
    "Cybersecurity professional specializing in SOC analysis, threat detection, incident response, and security engineering.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <CtaSection />
    </>
  );
}

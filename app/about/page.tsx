import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Drumil Nikhare — cybersecurity professional, education background, and career journey.",
};

export default function About() {
  return <AboutPage />;
}

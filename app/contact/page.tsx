import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Drumil Nikhare — security engineer and SOC analyst.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}

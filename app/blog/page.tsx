import type { Metadata } from "next";
import { BlogListPage } from "@/components/pages/blog-list-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "Cybersecurity articles, research insights, and technical deep-dives by Drumil Nikhare.",
};

export default function BlogPage() {
  return <BlogListPage />;
}

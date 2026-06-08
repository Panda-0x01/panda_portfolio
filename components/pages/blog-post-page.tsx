"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/types";

interface Props { post: BlogPost; }

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="serif font-black text-3xl sm:text-4xl text-foreground mt-12 mb-5 leading-tight">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="serif font-bold text-2xl text-foreground mt-10 mb-4 pb-3 border-b border-border">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="serif font-bold text-xl text-foreground mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="font-medium text-foreground mt-5 mb-2">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-3 my-5">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="text-border shrink-0 mt-0.5 select-none">—</span>{item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() !== "") {
      const parsed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-medium text-foreground">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline underline-offset-3 hover:opacity-60 transition-opacity">$1</a>');
      elements.push(<p key={i} className="text-sm sm:text-base text-muted-foreground leading-[1.85] mb-5" dangerouslySetInnerHTML={{ __html: parsed }} />);
    }
    i++;
  }
  return elements;
}

export function BlogPostContent({ post }: Props) {
  return (
    <div className="min-h-screen w-full">
      {/* Navbar spacer */}
      <div className="h-14 lg:h-16" />

      {/* Centered reading column */}
      <div className="max-w-2xl mx-auto w-full px-5 sm:px-8">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="pt-10 sm:pt-14 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> Back to Blog
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="pb-12 border-b border-border mb-12">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
            <p className="label text-muted-foreground">{post.category}</p>
            <p className="label text-muted-foreground">{post.readTime}</p>
            <p className="label text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <h1 className="serif font-black leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground leading-[1.8] mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap gap-4">
            {post.tags.map((tag) => (
              <span key={tag} className="label text-muted-foreground">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Article body */}
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose-min">
          {renderMarkdown(post.content)}
        </motion.article>

        {/* Bottom nav */}
        <div className="mt-16 pt-10 border-t border-border pb-20">
          <Link href="/blog" className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> All articles
          </Link>
        </div>
      </div>
    </div>
  );
}


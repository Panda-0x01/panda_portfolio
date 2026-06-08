"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search } from "lucide-react";
import { blogPosts } from "@/lib/data";

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export function BlogListPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter((post) => {
    const q = search.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesSearch && (activeCategory === "All" || post.category === activeCategory);
  });

  return (
    <div className="min-h-screen">
      <div className="h-14 lg:h-16" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">Writing</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Blog &amp; <span className="italic text-muted-foreground">Articles</span>
          </h1>
        </motion.div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 py-8 border-b border-border">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-5 pb-1.5 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors" />
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            {allCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`label transition-colors ${activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center"><p className="label text-muted-foreground">No articles found.</p></div>
        ) : filtered.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="py-16 sm:py-20 border-b border-border">
                {/* Meta row */}
                <div className="flex items-center gap-5 mb-4">
                  <p className="label text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                  <p className="label text-muted-foreground">{post.readTime}</p>
                  <p className="label text-muted-foreground">{post.category}</p>
                </div>

                {/* Title */}
                <h2 className="serif font-bold text-2xl sm:text-3xl text-foreground mb-4 group-hover:opacity-60 transition-opacity leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-[1.8] mb-7 max-w-2xl">{post.excerpt}</p>

                {/* Tags + read cue */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="label text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <span className="label text-muted-foreground group-hover:text-foreground transition-colors">Read →</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <div className="h-16" />
      </div>
    </div>
  );
}


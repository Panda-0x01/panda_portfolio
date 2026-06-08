"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Search, Home, User, Wrench, Briefcase,
  FolderOpen, BookOpen, Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CommandItem {
  label: string;
  description: string;
  href: string;
  group: string;
  icon: React.ElementType<{ size?: number; className?: string }>;
  external?: boolean;
}

const navItems: CommandItem[] = [
  { label: "Home",       description: "Back to the start",                   href: "/",           group: "Pages",   icon: Home      },
  { label: "About",      description: "Who I am and my background",          href: "/about",      group: "Pages",   icon: User      },
  { label: "Skills",     description: "Technologies and tools I work with",  href: "/skills",     group: "Pages",   icon: Wrench    },
  { label: "Experience", description: "Work history and internships",         href: "/experience", group: "Pages",   icon: Briefcase },
  { label: "Projects",   description: "Boing, Zeno and research work",       href: "/projects",   group: "Pages",   icon: FolderOpen},
  { label: "Blog",       description: "Technical writing and deep-dives",    href: "/blog",       group: "Pages",   icon: BookOpen  },
  { label: "Contact",    description: "Get in touch",                        href: "/contact",    group: "Pages",   icon: Mail      },
];

const quickActions: CommandItem[] = [
  { label: "GitHub",   description: "github.com/Panda-0x01",          href: siteConfig.github,              group: "Links", icon: GithubIcon,   external: true },
  { label: "LinkedIn", description: "linkedin.com/in/drumilnikhare",  href: siteConfig.linkedin,            group: "Links", icon: LinkedinIcon, external: true },
  { label: "Email",    description: siteConfig.email,                 href: `mailto:${siteConfig.email}`,   group: "Links", icon: Mail,         external: true },
];

const allItems = [...navItems, ...quickActions];

interface CommandMenuProps { open: boolean; onClose: () => void; }

export function CommandMenu({ open, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
    onClose();
    setQuery("");
  }, [router, onClose]);

  useEffect(() => { setActiveIndex(0); }, [query]);
  useEffect(() => { if (!open) { setQuery(""); setActiveIndex(0); } }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      else if (e.key === "Enter")     { e.preventDefault(); if (filtered[activeIndex]) handleSelect(filtered[activeIndex]); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, activeIndex, handleSelect, onClose]);

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[201] flex items-start justify-center px-5 pt-[14vh] sm:pt-[18vh]">
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-background border border-border shadow-2xl overflow-hidden"
            >

              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search size={15} className="text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search pages and links..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear"
                  >
                    <X size={13} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="label text-muted-foreground hover:text-foreground transition-colors border border-border px-1.5 py-0.5 ml-1"
                  aria-label="Close"
                >
                  esc
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="py-14 text-center">
                    <p className="label text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                  </div>
                ) : (
                  Object.entries(groups).map(([group, items]) => (
                    <div key={group}>
                      {/* Group label */}
                      <div className="px-5 pt-4 pb-2">
                        <p className="label text-muted-foreground">{group}</p>
                      </div>

                      {/* Items */}
                      {items.map((item) => {
                        const globalIndex = filtered.indexOf(item);
                        const isActive = globalIndex === activeIndex;
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.href + item.label}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={cn(
                              "w-full flex items-center gap-4 px-5 py-3 text-left transition-colors",
                              isActive
                                ? "bg-foreground text-background"
                                : "hover:bg-muted/40 text-foreground"
                            )}
                          >
                            {/* Icon box */}
                            <div className={cn(
                              "w-8 h-8 flex items-center justify-center border shrink-0",
                              isActive
                                ? "border-background/30 bg-background/10"
                                : "border-border bg-muted/40"
                            )}>
                              <Icon size={14} />
                            </div>

                            {/* Label + description */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-none mb-1">{item.label}</p>
                              <p className={cn(
                                "label truncate",
                                isActive ? "text-background/60" : "text-muted-foreground"
                              )}>
                                {item.description}
                              </p>
                            </div>

                            {/* External badge */}
                            {item.external && (
                              <span className={cn(
                                "label shrink-0",
                                isActive ? "text-background/50" : "text-muted-foreground"
                              )}>
                                ↗
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="px-5 py-3 border-t border-border flex items-center gap-5">
                <span className="label text-muted-foreground flex items-center gap-1.5">
                  <kbd className="border border-border px-1 py-px font-mono text-[10px]">↑↓</kbd>
                  navigate
                </span>
                <span className="label text-muted-foreground flex items-center gap-1.5">
                  <kbd className="border border-border px-1 py-px font-mono text-[10px]">↵</kbd>
                  open
                </span>
                <span className="label text-muted-foreground flex items-center gap-1.5">
                  <kbd className="border border-border px-1 py-px font-mono text-[10px]">esc</kbd>
                  close
                </span>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


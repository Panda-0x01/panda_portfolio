"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useCommand } from "@/components/providers/command-provider";
import { cn } from "@/lib/utils";

const leftLinks  = [
  { href: "/about",      label: "About"      },
  { href: "/skills",     label: "Skills"     },
  { href: "/experience", label: "Experience" },
];
const rightLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog"     },
  { href: "/contact",  label: "Contact"  },
];
const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const pathname   = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { open: openCommand } = useCommand();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "relative label pb-0.5 transition-colors hover:text-foreground whitespace-nowrap",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-background/96 backdrop-blur-md border-b border-border"
            : "bg-background border-b border-border"
        )}
      >
        {/* ── Desktop lg+ : full-width bar, logo pinned to center of the viewport ── */}
        <div className="hidden lg:flex items-center h-16 w-full px-10 xl:px-16 relative">

          {/* Left nav — absolute left */}
          <nav className="flex items-center gap-8 absolute left-10 xl:left-16">
            {leftLinks.map((l) => <NavLink key={l.href} {...l} />)}
          </nav>

          {/* Center logo — truly centered in the full header */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex flex-col items-center gap-1 group">
              <span className="serif text-sm font-bold tracking-[0.2em] uppercase text-foreground leading-none group-hover:opacity-60 transition-opacity">
                Drumil Nikhare
              </span>
              <span className="label text-muted-foreground" style={{ fontSize: "0.56rem", letterSpacing: "0.24em" }}>
                Security Engineer
              </span>
            </Link>
          </div>

          {/* Right nav — absolute right */}
          <nav className="flex items-center gap-8 absolute right-10 xl:right-16">
            {rightLinks.map((l) => <NavLink key={l.href} {...l} />)}
            <button
              onClick={openCommand}
              className="label text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              Search
            </button>
            <ThemeSwitcher />
          </nav>

        </div>

        {/* ── Mobile / Tablet below lg ── */}
        <div className="lg:hidden flex items-center justify-between h-14 px-5 sm:px-8">
          <Link href="/" className="flex flex-col gap-0.5 group">
            <span className="serif text-sm font-bold tracking-[0.18em] uppercase text-foreground leading-none group-hover:opacity-60 transition-opacity">
              Drumil Nikhare
            </span>
            <span className="label text-muted-foreground" style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}>
              Security Engineer
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 flex items-center justify-center text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile / Tablet drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/80 backdrop-blur-xl overflow-y-auto"
          >
            <div className="h-14" />
            <div className="px-5 sm:px-8 pb-12">
              <nav>
                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between py-5 border-b border-border serif text-2xl sm:text-3xl font-bold transition-colors",
                        pathname === link.href
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                      <span className="label text-muted-foreground">↗</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-10 flex flex-col gap-4">
                <a href="mailto:drumilnikhare29@gmail.com"
                  className="label text-muted-foreground hover:text-foreground transition-colors">
                  drumilnikhare29@gmail.com
                </a>
                <button
                  onClick={() => { setMobileOpen(false); openCommand(); }}
                  className="label text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Search (⌘K)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

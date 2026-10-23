import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "../data/navigation";
import { siteConfig } from "../data/siteConfig";
import { isBooted } from "../lib/boot";
import { useLenis } from "../hooks/useLenis";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Tracks which section is currently in view for aria-current + accent state. */
function useActiveSection(): string {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = ["hero", ...navLinks.map((l) => l.target)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo, stop, start } = useLenis();
  const reducedMotion = useReducedMotion();
  const active = useActiveSection();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Condense the bar once the hero starts leaving.
  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        setScrolled(window.scrollY > window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock scrolling + manage focus while the full-window overlay is open. Only
  // restarts Lenis if the boot loader isn't currently holding scroll.
  useEffect(() => {
    if (!open) return;
    stop();
    // Also lock native scrolling for the reduced-motion / no-Lenis path.
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
      if (isBooted()) start();
    };
  }, [open, stop, start]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    // Let modified clicks / middle-clicks behave natively.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    // When the overlay was open, Lenis is restarting — give it a beat so the
    // programmatic scroll isn't swallowed.
    if (wasOpen) {
      window.setTimeout(() => scrollTo(target, -8), 90);
    } else {
      scrollTo(target, -8);
    }
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,backdrop-filter] duration-500 ease-cine",
          scrolled
            ? "bg-ink/85 py-3 backdrop-blur-[2px]"
            : "bg-transparent py-5 md:py-7",
        ].join(" ")}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <a
            href="#hero"
            onClick={(e) => go(e, "hero")}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-paper"
            aria-label={`${siteConfig.wordmark} — back to top`}
          >
            {siteConfig.wordmark}
          </a>

          {/* Hamburger toggle — opens the full-window menu on every screen size */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Full-window overlay menu */}
      <div
        id="site-menu"
        data-lenis-prevent
        className={[
          "fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-ink px-[var(--gutter)] pb-8 pt-28 md:pt-36",
          "transition-[opacity,transform] duration-500 ease-cine",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav aria-label="Primary">
          <ul>
            {navLinks.map((link, i) => {
              const isActive = active === link.target;
              return (
                <li key={link.target} className="overflow-hidden">
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${link.target}`}
                    onClick={(e) => go(e, link.target)}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive ? "true" : undefined}
                    style={
                      reducedMotion
                        ? undefined
                        : { transitionDelay: open ? `${120 + i * 80}ms` : "0ms" }
                    }
                    className={[
                      "group flex items-baseline justify-between gap-6 border-b border-line py-3 md:py-5",
                      "transition-transform duration-[650ms] ease-cine",
                      open ? "translate-y-0" : "translate-y-full",
                    ].join(" ")}
                  >
                    <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
                      <span
                        className={[
                          "meta shrink-0",
                          isActive ? "text-paper" : "text-muted",
                        ].join(" ")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "font-display whitespace-nowrap text-[clamp(2.25rem,10vw,6.5rem)] uppercase leading-[1.05] tracking-tighter2 transition-colors duration-300",
                          isActive ? "text-paper" : "text-muted group-hover:text-paper",
                        ].join(" ")}
                      >
                        {link.label}
                      </span>
                    </span>
                    <span
                      className="meta hidden shrink-0 whitespace-nowrap sm:block"
                      aria-hidden="true"
                    >
                      {isActive
                        ? "CURRENT"
                        : `${String(i + 1).padStart(2, "0")} / ${String(navLinks.length).padStart(2, "0")}`}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <div className="meta">
            {siteConfig.role}
            <br />
            {siteConfig.location}
          </div>
          <a
            href="#contact"
            onClick={(e) => go(e, "contact")}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.22em] text-paper"
          >
            CONTACT <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
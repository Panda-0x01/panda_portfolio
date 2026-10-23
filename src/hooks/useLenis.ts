import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
  /** Smoothly scroll to an element id or offset/selector. */
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

/**
 * Sets up Lenis smooth scrolling and keeps GSAP's ScrollTrigger perfectly in
 * sync with it. When the user prefers reduced motion, Lenis is skipped and
 * native scrolling is used instead — ScrollTrigger still works.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoResize: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Route every Lenis scroll frame through the GSAP ticker so animations
    // and scroll position can never disagree.
    const onLenisScroll = () => ScrollTrigger.update();
    instance.on("scroll", onLenisScroll);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Fonts / images shifting layout would otherwise desync pinned triggers.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      instance.off("scroll", onLenisScroll);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reducedMotion]);

  const value = useMemo<LenisContextValue>(() => {
    // Accept "about", "#about" or ".selector" and normalize for Lenis, which
    // expects a real CSS selector string.
    const resolve = (target: string) =>
      target.startsWith("#") || target.startsWith(".") ? target : `#${target}`;

    const scrollToRaw = (
      target: string | number | HTMLElement,
      offset = 0
    ) => {
      const active = lenisRef.current;
      const resolved =
        typeof target === "string" ? resolve(target) : target;

      if (active) {
        active.scrollTo(resolved, { offset, duration: 1.2 });
        return;
      }

      // Reduced-motion / no-Lenis fallback: native, non-animated scroll.
      if (typeof resolved === "number") {
        window.scrollTo({ top: resolved + offset, behavior: "auto" });
        return;
      }
      const el =
        typeof resolved === "string"
          ? document.querySelector<HTMLElement>(resolved)
          : resolved;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "auto" });
    };

    return {
      lenis,
      scrollTo: scrollToRaw,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    };
  }, [lenis]);

  return createElement(LenisContext.Provider, { value }, children);
}

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}

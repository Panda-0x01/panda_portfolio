import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { initHero, type HeroElements } from "../animations/heroAnimations";
import { heroMeta } from "../data/siteConfig";
import { useReducedMotion } from "../hooks/useReducedMotion";

function useLocalTime(): string {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/**
 * Hero — the reference composition.
 *
 * Enormous "Panda" spanning nearly the full content width, "0x01" beneath it
 * aligned to the right, micro metadata pinned to the corners. Type is fitted
 * to the viewport in JS (see initHero) so the proportions survive every
 * screen size.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLHeadingElement>(null);
  const secondaryRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const time = useLocalTime();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!root || !primary || !secondary) return;

    const elements: HeroElements = { root, primary, secondary };
    return initHero(elements, reducedMotion);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-label="Introduction"
      className="relative flex h-[100svh] min-h-[100svh] flex-col justify-between overflow-hidden pb-6 pt-20 md:pb-9 md:pt-24"
    >
      {/* Corner metadata — top */}
      <div className="container-x grid shrink-0 grid-cols-2 items-start gap-4 md:gap-8">
        <div data-hero-meta className="flex flex-col gap-1.5">
          {heroMeta.topLeft.map((line) => (
            <span key={line} className="meta">
              {line}
            </span>
          ))}
        </div>
        <div data-hero-meta className="flex flex-col items-end gap-1.5 text-right">
          <span className="meta">{heroMeta.topRight[0]}</span>
          <span className="meta whitespace-nowrap">
            {heroMeta.topRight[1]} {time}
            <span className="caret ml-1 inline-block" aria-hidden="true">
              _
            </span>
          </span>
        </div>
      </div>

      {/* Oversized typography */}
      <div
        data-hero-fit
        className="container-x flex min-h-0 flex-1 flex-col justify-center py-4 md:py-6"
      >
        <div data-hero-type className="w-full">
          <div
            data-hero-rule
            className="mb-3 h-px w-full bg-line md:mb-4"
            aria-hidden="true"
          />
          <h1
            ref={primaryRef}
            className="type-hero-primary w-max whitespace-nowrap text-paper"
          >
            Panda
          </h1>
          <div className="flex justify-end">
            <h2
              ref={secondaryRef}
              className="type-hero-secondary w-max whitespace-nowrap text-paper"
            >
              0x01
            </h2>
          </div>
        </div>
      </div>

      {/* Corner metadata — bottom */}
      <div className="container-x flex shrink-0 items-end justify-between gap-4">
        <div data-hero-meta className="meta flex items-center gap-2">
          <span>{heroMeta.bottomLeft}</span>
          <ArrowDown
            size={13}
            className="scroll-hint"
            aria-hidden="true"
          />
        </div>
        <div data-hero-meta className="meta text-right">
          {heroMeta.bottomRight}
        </div>
      </div>
    </section>
  );
}

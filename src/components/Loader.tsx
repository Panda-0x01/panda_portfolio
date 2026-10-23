import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { markBooted } from "../lib/boot";
import { siteConfig } from "../data/siteConfig";
import { useLenis } from "../hooks/useLenis";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** Minimum time on screen (ms) so the counter never flashes past. */
const MIN_MS_MOTION = 1500;
const MIN_MS_REDUCED = 350;

/**
 * First-load curtain.
 *
 * A full-screen monochrome loader with a live percentage that climbs to 100
 * once the fonts and the window `load` event have settled (with a minimum
 * on-screen time so it reads as intentional, not a flash). It locks scrolling
 * while up, then slides away to reveal the hero — whose entrance is gated on
 * `markBooted()` so it animates into view rather than playing hidden behind
 * the curtain.
 */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { stop, start } = useLenis();

  // Lock scrolling while the loader is up; release it the moment it's hidden.
  // Uses a class on <html> so it can't be clobbered by other components that
  // write to document.body.style.overflow (e.g. the nav overlay).
  useEffect(() => {
    if (hidden) return;
    const html = document.documentElement;
    html.classList.add("is-booting");
    stop();
    document.body.style.overflow = "hidden";
    return () => {
      html.classList.remove("is-booting");
      document.body.style.overflow = "";
      start();
    };
  }, [hidden, stop, start]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let cancelled = false;
    const started = performance.now();
    const minMs = reducedMotion ? MIN_MS_REDUCED : MIN_MS_MOTION;
    let current = 0;
    let assetsReady = false;

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      }),
    ])
      .then(() => {
        assetsReady = true;
      })
      .catch(() => {
        assetsReady = true;
      });

    const finish = () => {
      // Let the hero (and anything else gated) start animating as we lift.
      markBooted();

      if (reducedMotion) {
        setHidden(true);
        return;
      }

      const inner = el.querySelector<HTMLElement>("[data-loader-inner]");
      const tl = gsap.timeline({ onComplete: () => setHidden(true) });
      if (inner) {
        tl.to(inner, { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, 0);
      }
      tl.to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 0.1);
    };

    const loop = (now: number) => {
      if (cancelled) return;

      const elapsed = now - started;
      // Ease-out ramp that never quite reaches 100 until assets are ready.
      const ramp = 97 * (1 - Math.pow(1 - Math.min(1, elapsed / minMs), 2));
      const goal = assetsReady && elapsed >= minMs ? 100 : ramp;

      current += (goal - current) * 0.14;
      if (goal >= 100 && current > 99.4) current = 100;

      setProgress(Math.max(0, Math.min(100, Math.round(current))));

      if (current >= 100) {
        finish();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      data-loader
      role="progressbar"
      aria-label="Loading site"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-24 md:pb-14 md:pt-28"
    >
      <div aria-hidden="true" className="flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-paper">
          {siteConfig.wordmark}
        </span>
        <span className="meta hidden sm:block">{siteConfig.role}</span>
      </div>

      <div aria-hidden="true" data-loader-inner className="flex flex-col gap-6">
        <div className="h-px w-full bg-line">
          <div
            className="h-px bg-paper"
            style={{ width: `${progress}%`, transition: "width 120ms linear" }}
          />
        </div>
        <div className="flex items-end justify-between gap-6">
          <span className="meta">{siteConfig.tagline}</span>
          <span className="font-display text-[clamp(3rem,13vw,9rem)] leading-[0.9] tabular-nums text-paper">
            {progress}
            <span className="text-muted">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

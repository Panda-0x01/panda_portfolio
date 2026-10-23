import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenBooted } from "../lib/boot";

gsap.registerPlugin(ScrollTrigger);

export interface HeroElements {
  root: HTMLElement;
  primary: HTMLElement;
  secondary: HTMLElement;
}

/** Hard ceiling so a freakishly wide viewport never over-sizes the type. */
const MAX_FONT_PX = 900;
/** Reference size used for one measurement pass. */
const PROBE = 100;
/** Width ratios against the hero type block (matches the reference crop). */
const RATIO_PRIMARY = 0.94;
const RATIO_SECONDARY = 0.52;
/** Vertical space taken by the hairline rule above the primary word (px). */
const RULE_SPACE = 18;
/**
 * The secondary word may never shrink below this fraction of the primary's
 * size — it stays a co-headline, never a caption.
 */
const MIN_RATIO = 0.5;
/** Both display words render with line-height 0.85 (matches .type-hero-*). */
const LINE_HEIGHT = 0.85;

/**
 * Measures the element's real laid-out text width at a probe size and solves
 * for the font size that yields exactly `targetWidth`.
 *
 * The headings are `w-max`, so `offsetWidth` equals the text width and — unlike
 * `getBoundingClientRect` — is completely unaffected by any transform GSAP has
 * applied. This is exact, whereas canvas metrics drift a few percent from real
 * text layout.
 */
function sizeForWidth(el: HTMLElement, targetWidth: number): number {
  if (targetWidth <= 0) return 0;
  el.style.fontSize = `${PROBE}px`;
  const natural = el.offsetWidth;
  if (!natural) return 0;
  return (PROBE * targetWidth) / natural;
}

/**
 * Hero entrance + responsive type fitting.
 *
 * Typography is fitted to the real viewport on every resize: the primary word
 * targets nearly the full content width, the secondary word sits beneath it,
 * right-aligned. When the pair cannot fit the available height, the primary
 * keeps (at least) twice the size of the secondary rather than shrinking
 * proportionally — so `Panda` always dominates, on every device.
 *
 * Note: there is deliberately NO scroll scrub on the hero words anymore — they
 * must stay fully visible while scrolling and only leave the viewport the
 * natural way, as the section scrolls past.
 *
 * Returns a cleanup that reverts every tween/ScrollTrigger created here.
 */
export function initHero(
  { root, primary, secondary }: HeroElements,
  reducedMotion: boolean
): () => void {
  const fit = () => {
    const wrap = root.querySelector<HTMLElement>("[data-hero-fit]");
    const block = root.querySelector<HTMLElement>("[data-hero-type]");
    if (!wrap || !block) return;

    const width = block.clientWidth;
    if (width <= 0) return;

    // Available height is owned by the flexible wrapper, not the type block
    // (whose own height is derived from the very font size we're solving for).
    const wrapStyles = window.getComputedStyle(wrap);
    const available =
      wrap.clientHeight -
      (parseFloat(wrapStyles.paddingTop) || 0) -
      (parseFloat(wrapStyles.paddingBottom) || 0);

    const primarySize = Math.min(sizeForWidth(primary, width * RATIO_PRIMARY), MAX_FONT_PX);
    const secondarySize = Math.min(sizeForWidth(secondary, width * RATIO_SECONDARY), MAX_FONT_PX);
    if (!primarySize || !secondarySize) return;

    // Vertical budget. Both words stack, so their line boxes must fit.
    const budget = available - RULE_SPACE;
    const totalMax = budget > 0 ? budget / LINE_HEIGHT : 0;
    if (totalMax <= 0) return;

    // The primary takes as much room as it can, but the secondary always keeps
    // at least MIN_RATIO of the primary's size so both remain co-headlines.
    // It then clamps to whichever is smaller: its own width fit or the leftover.
    const p = Math.min(primarySize, totalMax / (1 + MIN_RATIO));
    const s = Math.max(0, Math.min(secondarySize, totalMax - p));

    primary.style.fontSize = `${p}px`;
    secondary.style.fontSize = `${s}px`;
  };

  fit();
  document.fonts?.ready.then(fit).catch(() => {});
  // Belt and braces: some browsers settle webfont metrics a frame later.
  const settle = window.setTimeout(fit, 350);

  window.addEventListener("resize", fit, { passive: true });
  window.addEventListener("orientationchange", fit, { passive: true });

  let observer: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(() => fit());
    observer.observe(root);
  }

  let releaseIntro: (() => void) | null = null;

  const ctx = gsap.context(() => {
    const meta = gsap.utils.toArray<HTMLElement>("[data-hero-meta]");
    const rules = gsap.utils.toArray<HTMLElement>("[data-hero-rule]");

    if (reducedMotion) return;

    gsap.set([primary, secondary], {
      willChange: "transform, clip-path, opacity",
    });

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

    intro
      .from(primary, {
        yPercent: 110,
        opacity: 0,
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.2,
      })
      .from(
        secondary,
        {
          yPercent: 100,
          opacity: 0,
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.1,
        },
        0.18
      )
      .from(meta, { opacity: 0, y: 14, duration: 0.8, stagger: 0.1 }, 0.45)
      .from(
        rules,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
          stagger: 0.08,
        },
        0.3
      );

    // No scroll scrub here: the hero words must stay fully visible while
    // scrolling. They exit the viewport only the natural way — by the page
    // scrolling past them. (Removed at user request: "vanishes when we scroll".)

    // Hold the entrance until the boot loader's curtain starts lifting so the
    // hero animates into view instead of playing hidden behind the loader.
    intro.pause();
    releaseIntro = whenBooted(() => intro.play());
  }, root);

  return () => {
    window.clearTimeout(settle);
    window.removeEventListener("resize", fit);
    window.removeEventListener("orientationchange", fit);
    observer?.disconnect();
    releaseIntro?.();
    ctx.revert();
  };
}

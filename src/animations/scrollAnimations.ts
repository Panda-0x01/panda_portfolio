import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Declarative scroll-animation kit.
 *
 * Any component can call `initScrollAnimations(rootEl, reducedMotion)` and all
 * marked patterns inside that subtree are animated and scoped to a single GSAP
 * context. The returned cleanup reverts everything (StrictMode safe).
 *
 * Supported markers:
 *  [data-anim="reveal"]  fade + rise into view
 *  [data-anim="rule"]    thin separator drawing in from the left
 *  [data-mask-line]      line inside a `.line-mask`, slides up from below
 *  [data-mask-group]     groups the mask lines above for sequential reveal
 *  .reveal-word          word-by-word brighten (About), scrub-driven
 */
export function initScrollAnimations(
  root: HTMLElement,
  reducedMotion: boolean
): () => void {
  const ctx = gsap.context(() => {
    if (reducedMotion) {
      // Ensure content is fully visible without motion.
      gsap.set(".reveal-word", { color: "#F5F5F5" });
      gsap.set('[data-anim="reveal"], [data-mask-line]', {
        opacity: 1,
        y: 0,
        clearProps: "transform",
      });
      return;
    }

    // --- Fade / rise reveals ---------------------------------------------
    gsap.utils
      .toArray<HTMLElement>('[data-anim="reveal"]')
      .forEach((el) => {
        const delay = Number(el.dataset.animDelay ?? 0);
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

    // --- Separator rules --------------------------------------------------
    gsap.utils
      .toArray<HTMLElement>('[data-anim="rule"]')
      .forEach((rule) => {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%" },
        });
      });

    // --- Masked line reveals ---------------------------------------------
    const groups = gsap.utils.toArray<HTMLElement>("[data-mask-group]");
    const grouped = new Set<HTMLElement>();

    groups.forEach((group) => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-mask-line]", group);
      lines.forEach((l) => grouped.add(l));
      if (!lines.length) return;
      gsap.from(lines, {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: "top 85%" },
      });
    });

    // Mask lines that aren't inside an explicit group animate individually.
    gsap.utils
      .toArray<HTMLElement>("[data-mask-line]")
      .filter((el) => !grouped.has(el))
      .forEach((el) => {
        gsap.from(el, {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

    // --- Word-by-word brighten (About headline) --------------------------
    const words = gsap.utils.toArray<HTMLElement>(".reveal-word");
    if (words.length) {
      const trigger = root.querySelector("[data-words-trigger]") ?? root;
      gsap.fromTo(
        words,
        { color: "#555555" },
        {
          color: "#F5F5F5",
          ease: "none",
          duration: 1,
          stagger: 0.45,
          scrollTrigger: {
            trigger,
            start: "top 78%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    }
  }, root);

  return () => ctx.revert();
}

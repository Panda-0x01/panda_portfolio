import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected Work choreography.
 *
 * Desktop (>=1024px): the section pins and the track translates horizontally,
 * its distance measured from the real scroll width (never hard-coded). Visual
 * reveals + parallax are driven by `containerAnimation` so they stay locked to
 * the horizontal motion.
 *
 * Below that: the same reveals run on vertical scroll. Everything is wrapped in
 * gsap.matchMedia so switching breakpoints or resizing rebuilds cleanly.
 */
export function initProjects(
  root: HTMLElement,
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    // Content stays visible & static; CSS already stacks it vertically on small
    // screens, so there is nothing to build here.
    return () => {};
  }

  let matchMediaRef: gsap.MatchMedia | null = null;

  const ctx = gsap.context(() => {
    const track = root.querySelector<HTMLElement>("[data-project-track]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]");

    const revealVisual = (visual: HTMLElement, vars: ScrollTrigger.Vars) => {
      gsap.fromTo(
        visual,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: vars,
        }
      );
    };

    const mm = gsap.matchMedia();
    matchMediaRef = mm;

    // ---------- Desktop: pinned horizontal scroll ----------
    mm.add("(min-width: 1024px)", () => {
      if (!track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const visual = panel.querySelector<HTMLElement>("[data-project-visual]");
        const media = panel.querySelector<HTMLElement>("[data-project-media]");

        if (visual) {
          revealVisual(visual, {
            trigger: panel,
            containerAnimation: tween,
            start: "left 88%",
            end: "left 45%",
          });
        }

        if (media) {
          gsap.fromTo(
            media,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    });

    // ---------- Tablet / mobile: vertical reveals ----------
    mm.add("(max-width: 1023px)", () => {
      panels.forEach((panel) => {
        const visual = panel.querySelector<HTMLElement>("[data-project-visual]");
        const media = panel.querySelector<HTMLElement>("[data-project-media]");

        if (visual) {
          revealVisual(visual, { trigger: visual, start: "top 90%" });
        }
        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: visual ?? panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    });
  }, root);

  return () => {
    matchMediaRef?.revert();
    ctx.revert();
  };
}

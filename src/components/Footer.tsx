import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import { initScrollAnimations } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useLenis } from "../hooks/useLenis";
import { siteConfig } from "../data/siteConfig";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useLenis();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initScrollAnimations(root, reducedMotion);
  }, [reducedMotion]);

  return (
    <footer
      ref={rootRef}
      aria-label="Site footer"
      className="relative overflow-hidden border-t border-line pt-16 md:pt-24"
    >
      <div className="container-x">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <p className="meta">{siteConfig.wordmark}</p>
          <p className="meta">{siteConfig.tagline}</p>
        </div>

        <div data-mask-group className="mt-8 md:mt-12">
          <span className="line-mask">
            <span
              data-mask-line
              className="type-hero-primary block text-paper"
              style={{ fontSize: "clamp(3rem, 15.5vw, 18rem)" }}
            >
              Panda 0x01
            </span>
          </span>
        </div>

        <div className="rule mt-10 flex flex-col gap-5 pt-5 sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <p className="meta">
            © {siteConfig.year} {siteConfig.wordmark}
          </p>

          <button
            type="button"
            onClick={() => scrollTo("hero", -8)}
            className="group inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-paper sm:self-auto"
          >
            BACK TO TOP
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-500 ease-cine group-hover:-translate-y-1"
            />
          </button>

          <p className="meta">DESIGNED &amp; BUILT IN INDIA</p>
        </div>
      </div>

      <div className="container-x">
        <div
          className="pointer-events-none select-none overflow-hidden pb-2 pt-6"
          aria-hidden="true"
        >
          <div
            className="marquee marquee-run"
            style={{ "--marquee-duration": "42s" } as CSSProperties}
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap px-6 font-mono text-[10px] uppercase tracking-[0.45em] text-line"
                  >
                    DEVELOPMENT · CYBERSECURITY · AI · SECURITY RESEARCH ·
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { initScrollAnimations } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { siteConfig } from "../data/siteConfig";

const HEADLINE = ["HAVE AN IDEA?", "LET'S BUILD", "SOMETHING."];

/**
 * Magnetic wrapper: the element eases toward the pointer while hovered and
 * springs back on leave. Fine pointers + non-reduced-motion only.
 */
function useMagnetic<T extends HTMLElement>(disabled: boolean, strength = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [disabled, strength]);

  return ref;
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const magneticRef = useMagnetic<HTMLSpanElement>(reducedMotion);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initScrollAnimations(root, reducedMotion);
  }, [reducedMotion]);

  const { email, socials } = siteConfig;

  return (
    <section
      id="contact"
      ref={rootRef}
      aria-labelledby="contact-heading"
      className="section-shell"
    >
      <div className="container-x">
        <header className="rule flex items-center justify-between gap-6 pt-5">
          <span className="type-section-num">
            <span aria-hidden="true">04</span> / CONTACT
          </span>
          <span className="type-section-num hidden xs:block">(LET'S TALK)</span>
        </header>

        <h2
          id="contact-heading"
          data-mask-group
          className="type-display-xl mt-14 md:mt-20"
        >
          {HEADLINE.map((line) => (
            <span key={line} className="line-mask">
              <span data-mask-line>{line}</span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-y-14 md:mt-24">
          <div className="col-span-12 md:col-span-6">
            <p data-anim="reveal" className="type-lead max-w-md">
              Open to freelance work, collaborations and security research
              conversations.
            </p>

            <span ref={magneticRef} className="mt-10 inline-block">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-center gap-3 text-paper"
                >
                  <span className="font-display text-3xl uppercase tracking-display sm:text-5xl">
                    GET IN TOUCH
                  </span>
                  <ArrowUpRight
                    size={34}
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-cine group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center gap-3 text-muted"
                >
                  <span className="font-display text-3xl uppercase tracking-display sm:text-5xl">
                    GET IN TOUCH
                  </span>
                  <ArrowUpRight size={34} aria-hidden="true" />
                </span>
              )}
            </span>

            {email && (
              <p className="mt-6">
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-sm tracking-[0.08em] text-muted transition-colors duration-300 ease-cine hover:text-paper"
                >
                  {email}
                </a>
              </p>
            )}

            {!email && (
              <p className="meta mt-4">
                CONTACT DETAILS NOT CONFIGURED — SET <code>email</code> IN{" "}
                <code>src/data/siteConfig.ts</code>
              </p>
            )}
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <h3 className="meta mb-4">ELSEWHERE</h3>
            <ul>
              {socials.map((social) => (
                <li key={social.platform}>
                  {social.url ? (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-t border-line py-4 text-paper"
                    >
                      <span className="font-mono text-sm uppercase tracking-[0.16em] transition-transform duration-500 ease-cine group-hover:translate-x-1">
                        {social.platform}
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-cine group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  ) : (
                    <span className="flex items-center justify-between border-t border-line py-4 text-muted">
                      <span className="font-mono text-sm uppercase tracking-[0.16em]">
                        {social.platform}
                      </span>
                      <span className="meta text-[9px] tracking-[0.22em]">
                        LINK PENDING
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

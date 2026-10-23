import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { initScrollAnimations } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { expertise } from "../data/projects";

/**
 * Expertise — full-width typographic rows.
 *
 * Each row's title rises out of a vertical mask as it enters; hovering shifts
 * the title, reveals the supporting line and tints the row. Rows are not
 * interactive elements, so they are plain markup with no faked buttons.
 */
export default function Expertise() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initScrollAnimations(root, reducedMotion);
  }, [reducedMotion]);

  return (
    <section
      id="expertise"
      ref={rootRef}
      aria-labelledby="expertise-heading"
      className="section-shell"
    >
      <div className="container-x">
        <header className="flex items-center justify-between gap-6 rule pt-5">
          <span className="type-section-num">
            <span aria-hidden="true">02</span> / EXPERTISE
          </span>
          <span className="type-section-num hidden xs:block">(WHAT I DO)</span>
        </header>

        <h2 id="expertise-heading" className="sr-only">
          Expertise
        </h2>

        <ul className="mt-14 md:mt-20">
          {expertise.map((item) => (
            <li key={item.number} data-expertise-row className="group relative">
              <div data-anim="rule" className="h-px w-full bg-line" />
              <div className="flex items-center gap-5 py-8 transition-colors duration-500 ease-cine group-hover:bg-white/[0.03] md:gap-10 md:py-12">
                <span className="type-section-num w-6 shrink-0 transition-colors duration-500 group-hover:text-paper">
                  {item.number}
                </span>

                <span className="line-mask min-w-0 flex-1">
                  <h3
                    data-mask-line
                    className="type-display block transition-transform duration-500 ease-cine group-hover:translate-x-2 md:group-hover:translate-x-4"
                  >
                    {item.title}
                  </h3>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="shrink-0 -translate-x-2 text-muted opacity-0 transition-all duration-500 ease-cine group-hover:translate-x-0 group-hover:text-paper group-hover:opacity-100"
                  size={28}
                />
              </div>

              <p className="max-w-xl pb-8 pl-[2.75rem] text-sm leading-[1.8] text-muted transition-all duration-500 ease-cine md:pb-10 md:pl-[4.5rem] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        <div data-anim="rule" className="h-px w-full bg-line" />
      </div>
    </section>
  );
}

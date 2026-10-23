import { useLayoutEffect, useRef } from "react";
import { initScrollAnimations } from "../animations/scrollAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { siteConfig } from "../data/siteConfig";

const HEADLINE = [
  "BUILDING DIGITAL",
  "EXPERIENCES.",
  "SECURING DIGITAL",
  "SYSTEMS.",
];

const DESCRIPTION =
  "I'm a developer and cybersecurity enthusiast focused on building intelligent applications, secure systems, and meaningful digital experiences.";

const FACTS: { label: string; value: string }[] = [
  { label: "Role", value: siteConfig.role },
  { label: "Focus", value: "WEB · SECURITY · AI" },
  { label: "Based", value: siteConfig.location },
  { label: "Status", value: siteConfig.availability },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initScrollAnimations(root, reducedMotion);
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-heading"
      className="section-shell"
    >
      <div className="container-x">
        <header className="flex items-center justify-between gap-6 rule pt-5">
          <span className="type-section-num">
            <span aria-hidden="true">01</span> / ABOUT
          </span>
          <span className="type-section-num hidden xs:block">(PROFILE)</span>
        </header>

        <div className="mt-14 grid grid-cols-12 gap-y-14 md:mt-20">
          <h2
            id="about-heading"
            data-words-trigger
            className="type-display-xl col-span-12"
          >
            {HEADLINE.map((line) => (
              <span key={line} className="line-mask">
                <span data-mask-line>
                  {line.split(" ").map((word, i) => (
                    <span key={`${word}-${i}`}>
                      <span className="reveal-word">{word}</span>
                      {i < line.split(" ").length - 1 ? " " : ""}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h2>

          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 gap-10 border-t border-line pt-8 sm:grid-cols-12">
              <p
                data-anim="reveal"
                className="type-lead sm:col-span-7 lg:col-span-6"
              >
                {DESCRIPTION}
              </p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:col-span-5 lg:col-span-5 lg:col-start-8">
                {FACTS.map((fact, i) => (
                  <div
                    key={fact.label}
                    data-anim="reveal"
                    data-anim-delay={(i * 0.06).toFixed(2)}
                  >
                    <dt className="meta mb-1">{fact.label}</dt>
                    <dd className="font-mono text-xs uppercase tracking-[0.14em] text-paper">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

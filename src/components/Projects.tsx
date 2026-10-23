import { useLayoutEffect, useRef } from "react";
import { initProjects } from "../animations/projectAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

/**
 * Selected Work.
 *
 * Desktop pins the section and drives the track horizontally (distance is
 * measured at runtime). Below 1024px the same panels stack vertically.
 */
export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initProjects(root, reducedMotion);
  }, [reducedMotion]);

  return (
    <section
      id="work"
      ref={rootRef}
      aria-labelledby="work-heading"
      className="relative flex flex-col lg:h-screen lg:overflow-hidden"
    >
      <div className="container-x shrink-0 pt-24 lg:pt-24">
        <header className="rule flex items-center justify-between gap-6 pt-5">
          <span className="type-section-num">
            <span aria-hidden="true">03</span> / SELECTED WORK
          </span>
          <span className="type-section-num hidden xs:block">
            ({String(projects.length).padStart(2, "0")} PROJECTS)
          </span>
        </header>
        <h2 id="work-heading" className="sr-only">
          Selected Work
        </h2>
      </div>

      <div className="relative mt-10 lg:mt-4 lg:flex lg:min-h-0 lg:flex-1 lg:items-stretch lg:pb-8">
        <ul
          data-project-track
          className="project-track flex flex-col gap-16 px-[var(--gutter)] lg:h-full lg:flex-row lg:gap-[4vw] lg:pr-[14vw] lg:pl-[var(--gutter)] lg:will-change-transform"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.number}
              project={project}
              total={projects.length}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import ProjectVisual from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
  total: number;
}

/**
 * A single work panel. Renders as a horizontal panel on desktop (inside the
 * pinned track) and a stacked block on mobile.
 *
 * The "VIEW PROJECT" affordance is only a real link when a URL exists — with
 * no URL it becomes clearly non-interactive rather than a dead button.
 */
export default function ProjectCard({ project, total }: ProjectCardProps) {
  return (
    <li
      data-project-panel
      className="group w-full shrink-0 list-none lg:flex lg:h-full lg:flex-col lg:w-[64vw] xl:w-[54vw]"
    >
      <div className="flex shrink-0 items-baseline justify-between gap-4">
        <span className="meta">
          <span aria-hidden="true">{project.number}</span> — {project.category}
        </span>
        <span className="meta" aria-hidden="true">
          / {String(total).padStart(2, "0")}
        </span>
      </div>

      <h3 className="type-project-name mt-2 shrink-0 text-paper">{project.name}</h3>

      <div
        data-project-visual
        data-cursor="view"
        className="relative mt-5 aspect-[16/10] overflow-hidden border border-line bg-ink lg:aspect-auto lg:min-h-0 lg:flex-1 lg:max-h-[54vh]"
      >
        <div className="h-full w-full transition-transform duration-[900ms] ease-cine md:group-hover:scale-[1.06]">
          <div data-project-media className="absolute -inset-[6%]">
            <ProjectVisual kind={project.visual} />
          </div>
        </div>
        <span className="meta absolute bottom-3 right-3 text-[9px] tracking-[0.22em] text-muted">
          UI CONCEPT
        </span>
      </div>

      <div className="mt-5 flex shrink-0 flex-col gap-5 border-t border-line pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <p className="max-w-md text-sm leading-[1.8] text-muted">
          {project.description}
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:justify-end">
            {project.stack.map((tech) => (
              <li key={tech} className="meta">
                {tech}
              </li>
            ))}
          </ul>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-between gap-4 border border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 ease-cine hover:border-paper hover:bg-paper hover:text-ink sm:min-w-[16rem]"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-paper transition-colors duration-300 group-hover:bg-ink"
                />
                VISIT SITE
              </span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 ease-cine group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ) : (
            <span className="flex flex-col items-start gap-1 sm:items-end">
              <span
                aria-hidden="true"
                title="Set the project link in src/data/projects.ts"
                className="inline-flex w-full items-center justify-between gap-4 border border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted opacity-60 sm:min-w-[16rem]"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-line" />
                  LINK PENDING
                </span>
                <ArrowUpRight size={14} />
              </span>
              <span className="meta text-[9px] tracking-[0.22em]">
                SET LINK IN src/data/projects.ts
              </span>
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

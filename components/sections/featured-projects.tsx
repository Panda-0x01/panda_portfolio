"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/lib/data";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-border pt-20 pb-10">

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label text-muted-foreground mb-16"
          >
            Selected Work
          </motion.p>

          {/* Projects */}
          <div>
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="border-b border-border py-16 sm:py-20 group"
              >
                {/* Grid: index | content | links */}
                <div className="grid grid-cols-[32px_1fr_auto] gap-x-6 sm:gap-x-8 items-start">

                  {/* Index */}
                  <p className="label text-muted-foreground pt-2">{String(i + 1).padStart(2, "0")}</p>

                  {/* Main content */}
                  <div>
                    <h3 className="serif font-black leading-none tracking-tight text-foreground mb-4"
                      style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
                      {project.tagline}
                    </p>
                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2.5">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span key={tech} className="label text-[9px] tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1 bg-secondary/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links — right column, vertically centred with title */}
                  <div className="flex flex-col items-end gap-3 pt-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <GithubIcon size={11} /> Source
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      Live ↗
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer link */}
          <div className="pt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors"
            >
              All Projects <ArrowRight size={11} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}


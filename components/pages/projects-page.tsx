"use client";

import { motion } from "framer-motion";
import { projects, research } from "@/lib/data";
import { GithubIcon } from "@/components/ui/icons";

export function ProjectsPageContent() {
  return (
    <div className="min-h-screen">
      {/* Navbar spacer — always exactly navbar height */}
      <div className="h-14 lg:h-16" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">Portfolio</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Projects &amp;{" "}
            <span className="italic text-muted-foreground">Research</span>
          </h1>
        </motion.div>

        {/* Projects */}
        <div className="py-16 sm:py-20">
          <p className="label text-muted-foreground mb-12">Featured Projects</p>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-16 sm:py-20 border-b border-border group"
            >
              {/* Top row: number + name + links */}
              <div className="flex items-start justify-between gap-6 mb-7">
                <div className="flex items-start gap-5">
                  <span className="label text-muted-foreground mt-1.5 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="serif font-bold text-2xl sm:text-3xl text-foreground leading-snug mb-1 group-hover:opacity-60 transition-opacity">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                    <GithubIcon size={11} /> Source
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="label text-muted-foreground hover:text-foreground transition-colors">
                    Live ↗
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-[1.85] mb-7 sm:pl-9">
                {project.longDescription}
              </p>

              {/* Highlights */}
              <ul className="space-y-3.5 mb-8 sm:pl-9">
                {project.highlights.map((hl, hi) => (
                  <li key={hi} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-border shrink-0 mt-0.5 select-none">—</span>{hl}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2.5 sm:pl-9">
                {project.techStack.map((t) => (
                  <span key={t} className="label text-[9px] tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1 bg-secondary/10">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research */}
        <div className="py-16 sm:py-20">
          <p className="label text-muted-foreground mb-12">Research</p>
          {research.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-16 sm:py-20 border-b border-border"
            >
              <div className="flex items-start justify-between gap-6 mb-7">
                <div>
                  <p className="label text-muted-foreground mb-2">{paper.type} · {paper.status}</p>
                  <h3 className="serif font-bold text-xl sm:text-2xl text-foreground leading-snug">
                    {paper.title}
                  </h3>
                </div>
                <a href={paper.github} target="_blank" rel="noopener noreferrer"
                  className="label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 shrink-0">
                  <GithubIcon size={11} /> GitHub
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-[1.85] mb-7">{paper.description}</p>
              <ul className="space-y-3.5 mb-8">
                {paper.highlights.map((hl, hi) => (
                  <li key={hi} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-border shrink-0 mt-0.5 select-none">—</span>{hl}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2.5">
                {paper.techStack.map((t) => (
                  <span key={t} className="label text-[9px] tracking-wider text-muted-foreground border border-border/60 rounded-full px-3 py-1 bg-secondary/10">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}


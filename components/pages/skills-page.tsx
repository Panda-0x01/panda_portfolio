"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

function SkillRow({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="flex items-center justify-between py-6 sm:py-7 border-b border-border"
    >
      <span className="text-sm sm:text-base text-foreground">{name}</span>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="w-24 sm:w-44 h-px bg-border relative">
          <motion.div className="absolute top-0 left-0 h-px bg-foreground"
            initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }} />
        </div>
        <span className="label text-muted-foreground w-7 text-right tabular-nums">{level}</span>
      </div>
    </motion.div>
  );
}

export function SkillsPageContent() {
  return (
    <div className="min-h-screen">
      <div className="h-14 lg:h-16" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">Expertise</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Skills &amp; <span className="italic text-muted-foreground">Technologies</span>
          </h1>
        </motion.div>

        {/* Security */}
        <div className="py-16 sm:py-20 border-b border-border">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label text-muted-foreground mb-10">Security Domains</motion.p>
          {skills.security.map((s, i) => <SkillRow key={s.name} {...s} delay={i * 0.06} />)}
        </div>

        {/* Programming */}
        <div className="py-16 sm:py-20 border-b border-border">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label text-muted-foreground mb-10">Programming</motion.p>
          {skills.programming.map((s, i) => <SkillRow key={s.name} {...s} delay={i * 0.06} />)}
        </div>

        {/* Tools */}
        <div className="py-16 sm:py-20 border-b border-border">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label text-muted-foreground mb-10">Tools &amp; Technologies</motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
            {skills.tools.map((tool, i) => (
              <motion.span key={tool} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="text-sm sm:text-base text-foreground py-5 pr-4 border-b border-border hover:text-muted-foreground transition-colors cursor-default">
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Focus areas */}
        <div className="py-16 sm:py-20">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label text-muted-foreground mb-10">Focus Areas</motion.p>
          <div className="flex flex-wrap gap-x-8 gap-y-5">
            {skills.domains.map((d, i) => (
              <motion.span key={d} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="serif italic text-xl sm:text-2xl text-muted-foreground hover:text-foreground transition-colors cursor-default">
                {d}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}


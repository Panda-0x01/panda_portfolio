"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export function ExperiencePageContent() {
  return (
    <div className="min-h-screen">
      <div className="h-14 lg:h-16" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">Work History</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Professional <span className="italic text-muted-foreground">Experience</span>
          </h1>
        </motion.div>

        {/* Jobs */}
        {experience.map((job, i) => (
          <motion.div key={job.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="py-16 sm:py-24 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
              <div className="space-y-2">
                <p className="label text-muted-foreground">{job.period}</p>
                <p className="label text-muted-foreground">{job.duration} · {job.mode}</p>
                <p className="label text-muted-foreground">{job.location}</p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="serif font-bold text-2xl sm:text-3xl text-foreground mb-1">{job.title}</h3>
                <p className="text-sm text-muted-foreground mb-8">{job.company}</p>
                <ul className="space-y-5.5">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-4 text-sm text-muted-foreground leading-[1.8]">
                      <span className="text-border mt-0.5 shrink-0 select-none">—</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Currently studying */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-border">
          <div>
            <p className="label text-muted-foreground mb-3">Currently Studying</p>
            <p className="text-base text-foreground">B.Tech — Computer Science &amp; Engineering (Cybersecurity)</p>
            <p className="text-sm text-muted-foreground mt-1">Silver Oak University · 2025 – Present</p>
          </div>
          <p className="serif font-bold shrink-0" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            8.57 <span className="text-muted-foreground text-base font-normal">/10</span>
          </p>
        </motion.div>

        <div className="h-16" />
      </div>
    </div>
  );
}


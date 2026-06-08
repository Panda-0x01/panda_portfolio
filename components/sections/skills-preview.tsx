"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { skills } from "@/lib/data";

export function SkillsPreview() {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-border py-24 sm:py-28">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">

            {/* ── Skills ── */}
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="label text-muted-foreground mb-10"
              >
                Core Skills
              </motion.p>

              <div>
                {skills.security.slice(0, 5).map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between py-5 border-b border-border"
                  >
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-24 sm:w-32 h-px bg-border relative">
                        <motion.div
                          className="absolute top-0 left-0 h-px bg-foreground"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.25 + i * 0.07, ease: "easeOut" }}
                        />
                      </div>
                      <span className="label text-muted-foreground tabular-nums w-6 text-right">
                        {skill.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Tools ── */}
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="label text-muted-foreground mb-10"
              >
                Tools
              </motion.p>

              {/* 2-column grid — clean, consistent */}
              <div className="grid grid-cols-2 gap-y-0">
                {skills.tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="py-4.5 border-b border-border pr-4"
                  >
                    <span className="text-sm text-foreground">{tool}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors"
                >
                  Full skill set <ArrowRight size={11} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "3+",   label: "Projects Built" },
  { value: "8.57", label: "B.Tech GPA"     },
  { value: "2",    label: "Internships"    },
  { value: "10+",  label: "Security Tools" },
];

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col pt-14 lg:pt-16">

      {/* Headline */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-16 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="label text-muted-foreground mb-8 sm:mb-12"
        >
          Available for opportunities
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="serif font-black leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3.5rem, 13vw, 10rem)" }}
        >
          Security
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="serif italic font-black leading-[0.9] tracking-tight text-muted-foreground"
          style={{ fontSize: "clamp(3.5rem, 13vw, 10rem)" }}
        >
          Engineer.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col items-center gap-3 mt-12 sm:mt-16"
        >
          <p className="label text-muted-foreground">scroll to discover</p>
          <motion.div
            className="w-px bg-border"
            initial={{ height: 0 }}
            animate={{ height: 56 }}
            transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
          />
        </motion.div>
      </div>

      {/* Stats bar — full width, divided into 4 equal columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="border-t border-border w-full"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "py-7 sm:py-8 text-center",
                i !== stats.length - 1 ? "border-r border-border" : "",
                /* on 2-col mobile, remove right border from col 2 (index 1) and col 4 (index 3) */
                i === 1 ? "md:border-r border-r-0" : "",
              ].filter(Boolean).join(" ")}
            >
              <p
                className="serif font-bold text-foreground leading-none mb-2"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" }}
              >
                {s.value}
              </p>
              <p className="label text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}

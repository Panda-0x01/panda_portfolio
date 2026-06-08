"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CtaSection() {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="border-t border-border mt-4 py-36 sm:py-52 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p className="label text-muted-foreground mb-10">Let&apos;s connect</p>

            <h2
              className="serif font-black leading-[0.92] tracking-tight mb-16 mx-auto"
              style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            >
              Open to new{" "}
              <em className="italic not-italic text-muted-foreground">opportunities</em>
            </h2>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 label text-foreground border border-foreground px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-200"
            >
              Get in touch ↗
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


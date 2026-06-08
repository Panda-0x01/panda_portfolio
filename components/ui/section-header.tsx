"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, italic, description, className, align = "left" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}
    >
      {eyebrow && (
        <p className="label text-muted-foreground mb-6">{eyebrow}</p>
      )}
      <h2 className="serif font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
        {title}
        {italic && (
          <> <span className="italic text-muted-foreground">{italic}</span></>
        )}
      </h2>
      {description && (
        <p className="mt-6 text-muted-foreground text-base leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}


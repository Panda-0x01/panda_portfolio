"use client";

import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { education, siteConfig } from "@/lib/data";

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="h-14 lg:h-16" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">About</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            The person <span className="italic text-muted-foreground">behind the work</span>
          </h1>
        </motion.div>

        {/* Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 py-20 sm:py-28 border-b border-border">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-7">
            <div>
              <p className="label text-muted-foreground mb-2">Name</p>
              <p className="serif font-bold text-xl text-foreground">Drumil Nikhare</p>
            </div>
            <div>
              <p className="label text-muted-foreground mb-2">Role</p>
              <p className="text-sm text-foreground leading-relaxed">Security Engineer &amp; SOC Analyst</p>
            </div>
            <div>
              <p className="label text-muted-foreground mb-2">Location</p>
              <p className="text-sm text-foreground">India</p>
            </div>
            <div>
              <p className="label text-muted-foreground mb-2">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-foreground hover:opacity-60 transition-opacity break-all">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
                className="label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <GithubIcon size={12} /> GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                className="label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <LinkedinIcon size={12} /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="label text-muted-foreground mb-7">Summary</p>
            <div className="space-y-5 text-sm text-muted-foreground leading-[1.85]">
              <p>
                Motivated and detail-oriented Cybersecurity professional with a strong interest in{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">Security Operations Center (SOC) analysis</span>,{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">threat detection</span>, and{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">incident response</span>.
              </p>
              <p>
                Possesses a solid foundation in{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">network security</span>,{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">vulnerability assessment</span>, and security monitoring,
                complemented by hands-on experience through cybersecurity projects and continuous technical learning.
              </p>
              <p>
                Committed to protecting organizational assets by identifying, analyzing, and mitigating emerging cyber threats.
                Passionate about{" "}
                <span className="text-foreground font-medium border-b border-foreground/40">building tools that make security operations more effective</span>.
              </p>
            </div>
            <div className="mt-10">
              <p className="label text-muted-foreground mb-5">Interests</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Threat Detection","SOC Operations","Incident Response","API Security","Cryptography","Malware Analysis","Penetration Testing","Security Automation"].map((t) => (
                  <span key={t} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <div className="py-20 sm:py-28">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="label text-muted-foreground mb-10">Education</motion.p>
          {education.map((edu, i) => (
            <motion.div key={edu.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 py-14 sm:py-16 border-b border-border">
              <div>
                <p className="label text-muted-foreground">{edu.period}</p>
                <p className="label text-muted-foreground mt-2">GPA: {edu.gpa}</p>
              </div>
              <div>
                <h3 className="serif font-bold text-lg sm:text-xl text-foreground mb-1 leading-snug">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}


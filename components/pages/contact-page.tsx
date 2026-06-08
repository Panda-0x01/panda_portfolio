"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactPageContent() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="h-14 lg:h-16" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="py-16 sm:py-24 border-b border-border text-center"
        >
          <p className="label text-muted-foreground mb-5">Contact</p>
          <h1 className="serif font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            Let&apos;s <span className="italic text-muted-foreground">Connect</span>
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 py-20 sm:py-28">

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                <p className="label text-foreground">Available for opportunities</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                Open to security engineering, SOC analyst, and internship roles.
              </p>
            </div>
            <div className="border-t border-border" />
            <div className="space-y-6">
              <div>
                <p className="label text-muted-foreground mb-2">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-foreground hover:opacity-60 transition-opacity break-all">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="label text-muted-foreground mb-2">Location</p>
                <p className="text-sm text-foreground">India</p>
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
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="md:col-span-3">
            {state === "success" ? (
              <div className="py-20 text-center">
                <p className="serif italic font-bold text-5xl text-foreground mb-5">Sent.</p>
                <p className="text-sm text-muted-foreground mb-10">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="label text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {[
                  { id: "name",    label: "Full Name",     type: "text",  placeholder: "Your name"           },
                  { id: "email",   label: "Email Address", type: "email", placeholder: "your@email.com"       },
                  { id: "subject", label: "Subject",       type: "text",  placeholder: "What is this about?"  },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="border-b border-border py-7 sm:py-8">
                    <label htmlFor={id} className="label text-muted-foreground block mb-3">{label}</label>
                    <input id={id} name={id} type={type} required value={form[id as keyof typeof form]}
                      onChange={handleChange} placeholder={placeholder}
                      className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none" />
                  </div>
                ))}
                <div className="border-b border-border py-7 sm:py-8">
                  <label htmlFor="message" className="label text-muted-foreground block mb-3">Message</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange}
                    placeholder="Tell me about the opportunity or project..."
                    className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none" />
                </div>
                {state === "error" && <p className="label text-destructive mt-4">{errorMsg}</p>}
                <div className="pt-12">
                  <button type="submit" disabled={state === "loading"}
                    className="inline-flex items-center gap-3 label text-foreground border border-foreground px-8 sm:px-10 py-3.5 hover:bg-foreground hover:text-background transition-all disabled:opacity-40 cursor-pointer">
                    {state === "loading"
                      ? <><Loader2 size={12} className="animate-spin" /> Sending...</>
                      : "Send Message →"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}


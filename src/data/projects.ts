/**
 * Project data.
 *
 * Content rules enforced here:
 *  - No invented achievements, metrics or statistics.
 *  - No fabricated screenshots (visuals are generated abstract placeholders).
 *  - `link` is the real, user-supplied URL (GitHub repos so far); a project with
 *    a null link shows a disabled "LINK PENDING" button instead of a fake URL.
 */
export interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  /** Compact tech metadata — only what is known. */
  stack: string[];
  /** Real, user-supplied URL; null === not available yet (shows LINK PENDING). */
  link: string | null;
  /** Interface-concept key — selects the product mockup `ProjectVisual` renders. */
  visual:
    | "radar"
    | "stream"
    | "terminal"
    | "nodes";
}

export const projects: Project[] = [
  {
    number: "01",
    name: "TRINETRA",
    category: "Cybersecurity / AI",
    description: "AI-Powered National Cyber Resilience Platform.",
    stack: ["AI", "Threat Intel", "Dashboard"],
    // No public URL supplied yet — renders as a disabled "LINK PENDING" button.
    link: null,
    visual: "radar",
  },
  {
    number: "02",
    name: "BOING",
    category: "API Security",
    description: "API Abuse Detection and Cybersecurity Monitoring Platform.",
    stack: ["API Security", "Monitoring", "Detection"],
    link: "https://github.com/Panda-0x01/Boing_API",
    visual: "stream",
  },
  {
    number: "03",
    name: "ZENO",
    category: "Artificial Intelligence",
    description: "Local-First AI Desktop Assistant.",
    stack: ["Local LLM", "Desktop", "Automation"],
    link: "https://github.com/Panda-0x01/zeno_AI",
    visual: "terminal",
  },
  {
    number: "04",
    name: "NEONET",
    category: "Network Security",
    description: "Python-Based Network Analysis and Cybersecurity Tool.",
    stack: ["Python", "Networking", "Analysis"],
    link: "https://github.com/Panda-0x01/neoNet",
    visual: "nodes",
  },
];

export interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
}

export const expertise: ExpertiseItem[] = [
  {
    number: "01",
    title: "FULL-STACK DEVELOPMENT",
    description: "Designing and developing modern web applications.",
  },
  {
    number: "02",
    title: "CYBERSECURITY",
    description: "Building secure systems and analyzing digital threats.",
  },
  {
    number: "03",
    title: "AI & AUTOMATION",
    description: "Creating intelligent applications and automated workflows.",
  },
  {
    number: "04",
    title: "SECURITY RESEARCH",
    description:
      "Exploring vulnerabilities, detection systems, and security technologies.",
  },
];

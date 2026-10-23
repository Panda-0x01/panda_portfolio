/**
 * Global site configuration.
 *
 * Any value still `null` degrades gracefully to a clearly non-interactive
 * placeholder (no fake links) — fill it in to activate the control.
 */
export interface SocialLink {
  platform: string;
  /** null === not configured yet, renders a non-interactive placeholder */
  url: string | null;
}

export interface SiteConfig {
  name: string;
  wordmark: string;
  role: string;
  tagline: string;
  location: string;
  email: string | null;
  availability: string;
  socials: SocialLink[];
  /** Used for canonical + OG url generation */
  url: string;
  year: number;
}

export const siteConfig: SiteConfig = {
  name: "Panda 0x01",
  wordmark: "PANDA 0x01",
  role: "INDEPENDENT DEVELOPER",
  tagline: "INDEPENDENT DEVELOPER & CYBERSECURITY ENTHUSIAST",
  location: "BASED IN INDIA",
  email: "drumilnikhare29@gmail.com",
  availability: "OPEN FOR SELECT PROJECTS",
  socials: [
    { platform: "GitHub", url: "https://github.com/Panda-0x01" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/drumilnikhare" },
  ],
  url: "https://panda0x01.vercel.app",
  year: new Date().getFullYear(),
};

/** Hero corner metadata, kept in data so it stays editable. */
export const heroMeta = {
  topLeft: [
    "INDEPENDENT DEVELOPER",
    "CYBERSECURITY RESEARCHER",
    "BASED IN INDIA",
  ],
  topRight: ["INDEX / 001", "LOCAL TIME"],
  bottomLeft: "SCROLL TO EXPLORE",
  bottomRight: "PORTFOLIO — 2026",
};

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface Skills {
  security: SkillItem[];
  tools: string[];
  programming: SkillItem[];
  domains: string[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  mode: string;
  bullets: string[];
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  github: string;
  live: string;
  category: string;
  featured: boolean;
}

export interface Research {
  id: number;
  slug: string;
  title: string;
  status: string;
  type: string;
  techStack: string[];
  description: string;
  highlights: string[];
  github: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured: boolean;
}

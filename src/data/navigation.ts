export interface NavLink {
  label: string;
  /** in-page anchor id, without the `#` */
  target: string;
}

export const navLinks: NavLink[] = [
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "work" },
  { label: "EXPERTISE", target: "expertise" },
  { label: "CONTACT", target: "contact" },
];

export const sectionOrder = [
  "hero",
  "about",
  "expertise",
  "work",
  "contact",
] as const;

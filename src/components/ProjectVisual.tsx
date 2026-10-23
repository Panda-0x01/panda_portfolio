import type { ComponentType } from "react";
import type { Project } from "../data/projects";
import TrinetraUI from "./visuals/TrinetraUI";
import BoingUI from "./visuals/BoingUI";
import ZenoUI from "./visuals/ZenoUI";
import NeonetUI from "./visuals/NeonetUI";

/**
 * Product mockups for the Selected Work panels.
 *
 * Each project renders as a monochrome, animated interface concept styled like
 * a real app. They are deliberately NOT screenshots and contain only
 * illustrative, non-real data (TEST-NET addresses, sample counters) — the
 * "UI CONCEPT" tag in ProjectCard keeps that honest.
 *
 * Sizing/animation lives in `styles/mockup.css` (container-query based, so the
 * mockup scales like a screenshot) and `styles/animations.css` (`.pv-*` loops,
 * all disabled under `prefers-reduced-motion`).
 */
const MAP: Record<Project["visual"], ComponentType> = {
  radar: TrinetraUI,
  stream: BoingUI,
  terminal: ZenoUI,
  nodes: NeonetUI,
};

export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  const UI = MAP[kind];
  return <UI />;
}

import type { Project } from "@/domain/portfolio";
import { goldenCrest } from "@/content/projects/goldencrest";
import { isiLens } from "@/content/projects/isi-lens";
import { meteotech } from "@/content/projects/meteotech";
import { mtrendz } from "@/content/projects/mtrendz";
import { quantumEdge } from "@/content/projects/quantumedge";
import { tradersHindsight } from "@/content/projects/traders-hindsight";

export { tradersHindsight } from "@/content/projects/traders-hindsight";

/** Everything the Selected work list shows, in its order: the flagship, then newest first. */
export const projects: readonly Project[] = [
  tradersHindsight,
  goldenCrest,
  isiLens,
  quantumEdge,
  mtrendz,
  meteotech,
];

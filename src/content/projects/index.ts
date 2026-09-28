import type { Project } from "@/domain/portfolio";
import { isiLens } from "@/content/projects/isi-lens";
import { tradersHindsight } from "@/content/projects/traders-hindsight";

export { tradersHindsight } from "@/content/projects/traders-hindsight";

/** Everything the Selected work list shows, in its order: the flagship, then newest first. */
export const projects: readonly Project[] = [tradersHindsight, isiLens];

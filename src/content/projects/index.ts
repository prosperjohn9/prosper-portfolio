import type { CaseStudy, Project } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { isiLens } from "@/content/projects/isi-lens";
import { tradersHindsight } from "@/content/projects/traders-hindsight";

/** Everything the Selected work list shows, in its order: the flagship, then newest first. */
export const projects: readonly Project<ReceiptId>[] = [tradersHindsight, isiLens];

type ProjectWithPage = Project<ReceiptId> & { caseStudy: CaseStudy<ReceiptId> };

/** The projects that have their own page at /work/<slug>. */
export const projectsWithPages = projects.filter(
  (project): project is ProjectWithPage => project.caseStudy !== undefined,
);

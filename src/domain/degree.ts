import { formatMonth } from "@/domain/format";
import type { Milestone } from "@/domain/portfolio";

/** A completed degree. The page and search engines both describe it from this. */
export interface Degree {
  /** As written on the page, such as "M.Sc.". */
  award: string;
  /** For search engines, such as "Master's degree". */
  level: string;
  field: string;
  school: string;
  /** The month it was completed, YYYY-MM. */
  completed: string;
  detail?: string;
}

/** "M.Sc. Cyber Security". */
export const degreeName = (degree: Degree): string => `${degree.award} ${degree.field}`;

/** The degree as a line of the Education timeline. */
export function degreeMilestone(degree: Degree): Milestone {
  return {
    period: formatMonth(degree.completed),
    title: `${degreeName(degree)}, ${degree.school}`,
    ...(degree.detail ? { detail: degree.detail } : {}),
  };
}

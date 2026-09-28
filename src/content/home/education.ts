import type { Milestone } from "@/domain/portfolio";

export const education = {
  title: "Education",
  degrees: [
    {
      period: "Feb 2026",
      title: "M.Sc. Cyber Security, Üsküdar University",
      detail: "Thesis: AI in cybersecurity, adaptive threat detection.",
    },
    {
      period: "Jul 2024",
      title: "B.E. Computer Engineering, Üsküdar University",
      detail: "GPA 3.63.",
    },
    { period: "Jul 2017", title: "B.Ed. Chemistry Education, Delta State University" },
  ] satisfies Milestone[],
};

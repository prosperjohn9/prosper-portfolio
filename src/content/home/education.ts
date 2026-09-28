import type { Milestone } from "@/domain/portfolio";

export const experience = {
  title: "Experience and education",
  roles: [
    {
      period: "Dec 2025 to now",
      title: "Founder and software engineer, Hindsight Trade Analytics Limited",
      detail: "Designed, built and run The Trader's Hindsight.",
    },
    {
      period: "Nov 2025 to Jan 2026",
      title: "Software engineer (contract), QuantumEdge Technologies",
      detail:
        "Cloud applications used by 250,000+ active users, and a move from legacy systems to the cloud.",
    },
    {
      period: "Sep 2021 to Jun 2025",
      title: "Full stack developer, MTrendz, London (remote)",
      detail: "An e-commerce platform: REST APIs, payment integrations and React interfaces.",
    },
    {
      period: "Mar 2019 to Jun 2020",
      title: "Cyber security specialist, Meteotech, Abuja",
      detail:
        "Vulnerability assessments, authentication with JWT and OAuth, and incident response.",
    },
  ] satisfies Milestone[],
  educationTitle: "Education",
  education: [
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

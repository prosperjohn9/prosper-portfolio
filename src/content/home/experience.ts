import type { Degree } from "@/domain/degree";
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
  // Also tells search engines what I studied, where and when (see app/page.tsx).
  education: [
    {
      award: "M.Sc.",
      level: "Master's degree",
      field: "Cyber Security",
      school: "Üsküdar University",
      completed: "2026-02",
      detail: "Thesis: AI in cybersecurity, adaptive threat detection.",
    },
    {
      award: "B.Sc.",
      level: "Bachelor's degree",
      field: "Computer Engineering",
      school: "Üsküdar University",
      completed: "2024-07",
      detail: "GPA 3.63.",
    },
    {
      award: "B.Ed.",
      level: "Bachelor's degree",
      field: "Chemistry Education",
      school: "Delta State University",
      completed: "2017-07",
    },
  ] satisfies Degree[],
};

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { projectsWithPages } from "@/content/projects";
import { receipts } from "@/content/receipts";
import { caseStudyProse } from "@/domain/project";
import { numberReceipts } from "@/domain/receipts";
import { CaseStudyHeader } from "@/sections/case-study/CaseStudyHeader";
import { CaseStudySection } from "@/sections/case-study/CaseStudySection";

// Every project with a case study gets a page at build time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectsWithPages.map((project) => ({ slug: project.slug }));
}

const projectFor = async ({ params }: PageProps<"/work/[slug]">) => {
  const { slug } = await params;
  return projectsWithPages.find((project) => project.slug === slug);
};

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = await projectFor(props);
  if (!project) return {};
  return {
    title: `${project.name}, a case study by ${profile.shortName}`,
    description: project.caseStudy.description,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const project = await projectFor(props);
  if (!project) notFound();
  const { caseStudy } = project;
  // Numbered for this page alone: receipts read 1, 2, 3 from its top.
  const numbering = numberReceipts(receipts, caseStudyProse(caseStudy));
  return (
    <>
      <CaseStudyHeader project={project} caseStudy={caseStudy} numbering={numbering} />
      {caseStudy.sections.map((section) => (
        <CaseStudySection key={section.id} section={section} numbering={numbering} />
      ))}
    </>
  );
}

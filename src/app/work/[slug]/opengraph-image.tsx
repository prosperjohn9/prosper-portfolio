import { notFound } from "next/navigation";
import { renderShareCard, shareCardSize, shareCardType } from "@/components/share-card/share-card";
import { profile } from "@/content/profile";
import { projectsWithPages } from "@/content/projects";

const projectFor = (slug: string) => projectsWithPages.find((project) => project.slug === slug);

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const project = projectFor(params.slug);
  if (!project) return [];
  return [
    {
      id: "card",
      alt: `${project.name}: a case study by ${profile.shortName}. ${project.summary}`,
      size: shareCardSize,
      contentType: shareCardType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectFor((await params).slug);
  if (!project) notFound();
  return renderShareCard({
    byline: profile.shortName,
    label: "Case study",
    title: project.name,
    detail: project.summary,
    footer: `${project.role}, ${project.period}`,
  });
}

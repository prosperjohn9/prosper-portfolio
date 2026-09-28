import { notFound } from "next/navigation";
import { renderShareCard, shareCardSize, shareCardType } from "@/components/share-card/share-card";
import { notes } from "@/content/notes";
import { profile } from "@/content/profile";
import { formatDate } from "@/domain/format";

const noteFor = (slug: string) => notes.find((note) => note.slug === slug);

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const note = noteFor(params.slug);
  if (!note) return [];
  return [
    {
      id: "card",
      alt: `${note.title}: a note by ${profile.shortName}.`,
      size: shareCardSize,
      contentType: shareCardType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const note = noteFor((await params).slug);
  if (!note) notFound();
  return renderShareCard({
    byline: profile.shortName,
    label: "Note",
    title: note.title,
    footer: `${formatDate(note.published)}. First posted on LinkedIn.`,
  });
}

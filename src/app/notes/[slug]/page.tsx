import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/content/notes";
import { profile } from "@/content/profile";
import { MoreNotes } from "@/sections/notes/MoreNotes";
import { NoteArticle } from "@/sections/notes/NoteArticle";

// Every note is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

const noteFor = async ({ params }: PageProps<"/notes/[slug]">) => {
  const { slug } = await params;
  return notes.find((note) => note.slug === slug);
};

export async function generateMetadata(props: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const note = await noteFor(props);
  if (!note) return {};
  return {
    title: `${note.title}, a note by ${profile.shortName}`,
    description: note.paragraphs[0],
  };
}

export default async function NotePage(props: PageProps<"/notes/[slug]">) {
  const note = await noteFor(props);
  if (!note) notFound();
  return (
    <>
      <NoteArticle note={note} />
      <MoreNotes notes={notes.filter((other) => other.slug !== note.slug)} />
    </>
  );
}

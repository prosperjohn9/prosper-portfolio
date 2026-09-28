import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { formatDate } from "@/domain/format";
import { notePath } from "@/domain/links";
import type { Note } from "@/domain/note";

/** The other notes, newest first, so a reader can go on from any one of them. */
export function MoreNotes({ notes }: { notes: readonly Note[] }) {
  if (notes.length === 0) return null;
  return (
    <Section id="more-notes" title="More notes">
      <ul className="m-0 max-w-[48rem] list-none p-0">
        {notes.map((note) => (
          <li
            key={note.slug}
            className="grid gap-0.5 border-t border-rule py-4 md:grid-cols-[11rem_1fr] md:gap-x-6"
          >
            <time dateTime={note.published} className="text-base text-graphite md:pt-0.5">
              {formatDate(note.published)}
            </time>
            <Link href={notePath(note.slug)} className="t-h3">
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

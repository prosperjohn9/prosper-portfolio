import { formatDate } from "@/domain/format";
import type { Note } from "@/domain/note";

/** A note in full: its title, when and where it was first posted, then the text. */
export function NoteArticle({ note }: { note: Note }) {
  return (
    <article aria-labelledby="note-title" className="wrap pt-[clamp(28px,6vw,72px)]">
      <h1 id="note-title" className="t-title max-w-[46rem]">
        {note.title}
      </h1>
      <p className="t-small mt-4 text-graphite">
        <time dateTime={note.published}>{formatDate(note.published)}</time>. First posted on{" "}
        <a href={note.source.href}>{note.source.text}</a>.
      </p>
      <div className="mt-8 max-w-[38rem] space-y-5">
        {note.paragraphs.map((paragraph, index) => (
          <p key={index} className={index === 0 ? "t-lede" : undefined}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

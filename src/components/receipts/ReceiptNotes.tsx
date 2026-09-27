import { noteId } from "@/components/receipts/anchors";
import { Prose } from "@/components/receipts/Prose";
import type { NumberedReceipt } from "@/domain/receipts";

/**
 * The receipts for one block of the page. In the margin on wide screens; under
 * the text on phones, where each note opens when its number is tapped.
 */
export function ReceiptNotes({ notes }: { notes: readonly NumberedReceipt[] }) {
  if (notes.length === 0) return null;
  return (
    <ol className="notes" aria-label="Receipts">
      {notes.map((note) => (
        <li key={note.id} id={noteId(note.id)} className="note" tabIndex={-1}>
          <span className="note-number" aria-hidden="true">
            {note.number}
          </span>
          <span className="sr-only">Receipt {note.number}: </span>
          <strong className="note-title">{note.title}</strong> <Prose text={note.body} />
        </li>
      ))}
    </ol>
  );
}

import type { LinkSegment } from "@/domain/rich-text";

/** A paragraph: plain text, or text and links in reading order. */
export type NoteParagraph = string | readonly (string | LinkSegment)[];

/** A short piece of writing, first posted elsewhere and kept here in full. */
export interface Note {
  /** Stable and URL-safe: the note lives at /notes/<slug>. */
  slug: string;
  title: string;
  /** The day it was first posted, as YYYY-MM-DD. */
  published: string;
  /** Where it was first posted. */
  source: LinkSegment;
  /** One entry per paragraph. The first is the opening line. */
  paragraphs: readonly NoteParagraph[];
}

/** A paragraph's words with its links as plain text, for places that take text only. */
export function plainText(paragraph: NoteParagraph): string {
  if (typeof paragraph === "string") return paragraph;
  return paragraph.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

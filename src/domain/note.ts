import type { LinkSegment } from "@/domain/rich-text";

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
  paragraphs: readonly string[];
}

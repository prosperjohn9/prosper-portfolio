import type { MetadataRoute } from "next";
import { notes } from "@/content/notes";
import { projectsWithPages } from "@/content/projects";
import { notePath, workPath } from "@/domain/links";
import { siteUrl } from "@/lib/seo";

// Built from the same lists as the pages, so a new project or note is listed
// as soon as it has a page.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl()).href;
  return [
    { url: url("/") },
    ...projectsWithPages.map((project) => ({ url: url(workPath(project.slug)) })),
    ...notes.map((note) => ({ url: url(notePath(note.slug)), lastModified: note.published })),
  ];
}

/** A mailto: link, with the subject encoded so any text is safe to use. */
export function mailto(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/** True for a path to a page on this site, as opposed to a file, an anchor or another site. */
export function isSitePage(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//") && !/\.[a-z0-9]+$/i.test(href);
}

/** The address of a project's own page on this site. */
export function workPath(slug: string): string {
  return `/work/${slug}`;
}

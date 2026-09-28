import type { Metadata } from "next";

type Environment = Record<string, string | undefined>;
type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * The address the site is served from, for canonical links, the sitemap and
 * share previews. Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every build to the
 * production domain (the custom one, once added), so preview builds point search
 * engines at production too. Anywhere else it is the local server.
 */
export function siteUrl(env: Environment = process.env): URL {
  const host = env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(host ? `https://${host}` : "http://localhost:3000");
}

export interface PageSeo {
  /** The page's path on this site, such as "/notes/ai-written-code". */
  path: string;
  title: string;
  description: string;
  /** For an article: the day it was first published, YYYY-MM-DD. */
  published?: string;
}

/**
 * Title, description, canonical address and share-preview fields for one page.
 * Each page sets its own canonical address: one set in the layout would be
 * inherited by every page below it. The preview image comes from the route's
 * opengraph-image file, and Next copies these fields into the X card.
 */
export function pageMetadata(page: PageSeo, siteName: string): Metadata {
  const openGraph: OpenGraph = page.published
    ? { type: "article", publishedTime: page.published, siteName, url: page.path }
    : { type: "website", siteName, url: page.path };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph,
  };
}

/**
 * JSON for a <script type="application/ld+json"> tag. "<" is escaped so no
 * value can close the tag early.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

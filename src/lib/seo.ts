import type { Metadata } from "next";
import { type Degree, degreeName } from "@/domain/degree";

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

/**
 * Whether search engines should index the site at this address. Not on a
 * *.vercel.app address: those stand in until the real domain is live, and the
 * site should only ever be found at its own domain.
 */
export function isIndexable(url: URL): boolean {
  return !url.hostname.endsWith(".vercel.app");
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

/** The facts about a person that search engines may show. */
export interface PersonFacts {
  name: string;
  alternateName: string;
  jobTitle: string;
  url: string;
  image: string;
  country: string;
  sameAs: readonly string[];
  degrees: readonly Degree[];
}

/**
 * A page about one person, in schema.org terms: who they are, where they live,
 * what they studied and which profiles are theirs. Each degree names its school
 * and the month it was completed, so search engines need not piece it together.
 */
export function profilePageJsonLd(person: PersonFacts): object {
  const school = (name: string) => ({ "@type": "CollegeOrUniversity", name });
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: person.name,
      alternateName: person.alternateName,
      jobTitle: person.jobTitle,
      url: person.url,
      image: person.image,
      homeLocation: { "@type": "Country", name: person.country },
      alumniOf: [...new Set(person.degrees.map((degree) => degree.school))].map(school),
      hasCredential: person.degrees.map((degree) => ({
        "@type": "EducationalOccupationalCredential",
        name: degreeName(degree),
        credentialCategory: "degree",
        educationalLevel: degree.level,
        dateCreated: degree.completed,
        recognizedBy: school(degree.school),
      })),
      sameAs: person.sameAs,
    },
  };
}

/**
 * JSON for a <script type="application/ld+json"> tag. "<" is escaped so no
 * value can close the tag early.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

import { serializeJsonLd } from "@/lib/seo";

/** Structured data for search engines. It is data, never run as a script. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

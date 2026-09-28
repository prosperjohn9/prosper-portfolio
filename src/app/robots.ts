import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Every page is public; the sitemap lists them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl()).href,
  };
}

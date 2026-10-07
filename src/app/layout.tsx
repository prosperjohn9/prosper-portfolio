import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteMeta } from "@/content/site";
import { enhanceScript } from "@/lib/enhance";
import { isIndexable, siteUrl } from "@/lib/seo";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// Variable Archivo with its width axis: the whole type system is one family.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  // Resolves the relative addresses in every page's metadata.
  metadataBase: siteUrl(),
  title: siteMeta.title,
  description: siteMeta.description,
  ...(isIndexable(siteUrl()) ? {} : { robots: { index: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Fixed strings from lib/, run before first paint: the theme, then the
            receipts enhancement. Neither reads anything from the request. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: enhanceScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-[4px] bg-button px-4 py-2 text-button-text focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {/* Cookie-free visit counts. The script is served by Vercel at
            /_vercel/insights, so it only exists in builds Vercel runs. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}

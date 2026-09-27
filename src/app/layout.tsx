import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { profile } from "@/content/profile";
import { fullName } from "@/domain/profile";
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
  title: `${profile.shortName}, ${profile.role.toLowerCase()}`,
  description: `${fullName(profile)}, ${profile.role.toLowerCase()} in ${profile.location}. Founder of The Trader's Hindsight. Every claim on this site links to its proof.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        {/* Static string from lib/theme; applies the saved theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
      </body>
    </html>
  );
}

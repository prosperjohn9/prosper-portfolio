import type { Metadata } from "next";
import portrait from "@/assets/portrait.jpg";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeProse } from "@/content/home";
import { profile } from "@/content/profile";
import { receipts } from "@/content/receipts";
import { siteMeta } from "@/content/site";
import { fullName } from "@/domain/profile";
import { numberReceipts } from "@/domain/receipts";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { HowIWork } from "@/sections/HowIWork";
import { SelectedWork } from "@/sections/SelectedWork";

export const metadata: Metadata = pageMetadata({ path: "/", ...siteMeta }, profile.shortName);

// Tells search engines who the site is about, and which profiles are his.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName(profile),
  alternateName: profile.shortName,
  jobTitle: profile.role,
  url: siteUrl().href,
  image: new URL(portrait.src, siteUrl()).href,
  sameAs: [profile.links.linkedin, profile.links.github],
};

export default function Home() {
  // One numbering for the whole page: receipts read 1, 2, 3 from top to bottom.
  const numbering = numberReceipts(receipts, homeProse);
  return (
    <>
      <JsonLd data={person} />
      <Hero numbering={numbering} />
      <SelectedWork />
      <HowIWork numbering={numbering} />
      <Experience />
      <Contact />
    </>
  );
}

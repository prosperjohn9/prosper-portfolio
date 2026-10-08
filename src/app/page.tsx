import type { Metadata } from "next";
import portrait from "@/assets/portrait.jpg";
import { JsonLd } from "@/components/seo/JsonLd";
import { experience, homeProse } from "@/content/home";
import { profile } from "@/content/profile";
import { receipts } from "@/content/receipts";
import { siteMeta } from "@/content/site";
import { fullName } from "@/domain/profile";
import { numberReceipts } from "@/domain/receipts";
import { pageMetadata, profilePageJsonLd, siteUrl } from "@/lib/seo";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { HowIWork } from "@/sections/HowIWork";
import { SelectedWork } from "@/sections/SelectedWork";

export const metadata: Metadata = pageMetadata({ path: "/", ...siteMeta }, profile.shortName);

// Tells search engines who the site is about, what he studied, and which profiles are his.
const profilePage = profilePageJsonLd({
  name: fullName(profile),
  alternateName: profile.shortName,
  jobTitle: profile.role,
  url: siteUrl().href,
  image: new URL(portrait.src, siteUrl()).href,
  country: profile.location,
  sameAs: [profile.links.linkedin, profile.links.github],
  degrees: experience.education,
});

export default function Home() {
  // One numbering for the whole page: receipts read 1, 2, 3 from top to bottom.
  const numbering = numberReceipts(receipts, homeProse);
  return (
    <>
      <JsonLd data={profilePage} />
      <Hero numbering={numbering} />
      <SelectedWork />
      <HowIWork numbering={numbering} />
      <Experience />
      <Contact />
    </>
  );
}

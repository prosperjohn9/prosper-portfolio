import { renderShareCard, shareCardSize, shareCardType } from "@/components/share-card/share-card";
import { hero } from "@/content/home";
import { profile } from "@/content/profile";

const role = `${profile.role} in ${profile.location}.`;

export const alt = `${profile.shortName}. ${role} ${hero.availability.headline}`;
export const size = shareCardSize;
export const contentType = shareCardType;

export default function Image() {
  return renderShareCard({
    label: hero.availability.headline,
    title: profile.shortName,
    detail: role,
    footer: hero.availability.detail,
    portrait: true,
  });
}

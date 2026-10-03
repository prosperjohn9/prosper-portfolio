import { formatDate } from "@/domain/format";
import { fullName } from "@/domain/profile";
import { profile } from "@/content/profile";
import { isiLensCheckedOn } from "@/content/projects/isi-lens/checked-on";
import { stats } from "@/content/stats";

/** The home page's title and description, and the default for any page without its own. */
export const siteMeta = {
  title: `${profile.shortName}, ${profile.role.toLowerCase()}`,
  description: `${fullName(profile)}, ${profile.role.toLowerCase()} in ${profile.location}. Founder of The Trader's Hindsight. Every claim on this site links to its proof.`,
};

/** Shown on phones above the first receipts of a page, where they start closed. */
export const receiptHint = "Tap a yellow number to see its proof.";

/** Lines every page ends with. */
export const footerNotes = [
  "No real trader data appears on this site: The Trader's Hindsight screenshots use fixture data, a test account or its public landing page.",
  `Figures last checked: The Trader's Hindsight on ${formatDate(stats.countedOn)}, Isi Lens on ${formatDate(isiLensCheckedOn)}. If one is wrong, email me and I will fix it.`,
];

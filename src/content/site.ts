import { formatDate } from "@/domain/format";
import { fullName } from "@/domain/profile";
import { profile } from "@/content/profile";
import { stats } from "@/content/stats";

/** The home page's title and description, and the default for any page without its own. */
export const siteMeta = {
  title: `${profile.shortName}, ${profile.role.toLowerCase()}`,
  description: `${fullName(profile)}, ${profile.role.toLowerCase()} in ${profile.location}. Founder of The Trader's Hindsight. Every claim on this site links to its proof.`,
};

/** Lines every page ends with. */
export const footerNotes = [
  "No real trader data appears on this site: screenshots use fixture data, a test account or the public landing page.",
  `Figures last checked on ${formatDate(stats.countedOn)}. If one is wrong, email me and I will fix it.`,
];

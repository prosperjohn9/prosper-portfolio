import { formatDate } from "@/domain/format";
import { stats } from "@/content/stats";

/** Lines every page ends with. */
export const footerNotes = [
  "No real trader data appears on this site: screenshots use fixture data, a test account or the public landing page.",
  `Figures last checked on ${formatDate(stats.countedOn)}. If one is wrong, email me and I will fix it.`,
];

import { mailto } from "@/domain/links";
import type { CaseStudySection } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { contact } from "@/content/home/contact";
import { profile } from "@/content/profile";

export const call = {
  id: "walkthrough",
  title: "See how it is built, on a call",
  blocks: [
    {
      kind: "intro",
      text: [
        "The code is private, and so is the product's logic. On a call I can show you how it is built: the architecture, the tests and the delivery pipeline.",
      ],
    },
    {
      kind: "actions",
      actions: [
        {
          label: "Ask how it is built",
          href: mailto(profile.email, contact.walkthroughSubject),
          primary: true,
        },
        { label: "Open tradershindsight.com", href: profile.links.product },
        { label: "See the public showcase on GitHub", href: profile.links.productShowcase },
        { label: "Download CV (PDF)", href: profile.cvPath, download: true },
      ],
    },
  ],
} satisfies CaseStudySection<ReceiptId>;

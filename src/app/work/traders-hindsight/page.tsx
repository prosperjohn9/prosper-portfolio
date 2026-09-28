import type { Metadata } from "next";
import { caseStudyProse, header } from "@/content/case-study";
import { profile } from "@/content/profile";
import { receipts } from "@/content/receipts";
import { numberReceipts } from "@/domain/receipts";
import { CaseStudyHeader } from "@/sections/case-study/CaseStudyHeader";
import { Delivery } from "@/sections/case-study/Delivery";
import { Demo } from "@/sections/case-study/Demo";
import { Features } from "@/sections/case-study/Features";
import { FirmFit } from "@/sections/case-study/FirmFit";
import { Numbers } from "@/sections/case-study/Numbers";
import { Security } from "@/sections/case-study/Security";
import { Walkthrough } from "@/sections/case-study/Walkthrough";
import { Why } from "@/sections/case-study/Why";

export const metadata: Metadata = {
  title: `${header.title}, a case study by ${profile.shortName}`,
  description:
    "How I designed, built and run a live SaaS for forex and prop-firm traders: what it does, a working demo of its core idea, how it is secured and how it ships. Every claim links to its proof.",
};

export default function CaseStudy() {
  // Numbered for this page alone: receipts read 1, 2, 3 from its top.
  const numbering = numberReceipts(receipts, caseStudyProse);
  return (
    <>
      <CaseStudyHeader numbering={numbering} />
      <Why numbering={numbering} />
      <Features numbering={numbering} />
      <Demo numbering={numbering} />
      <FirmFit numbering={numbering} />
      <Security numbering={numbering} />
      <Delivery numbering={numbering} />
      <Numbers />
      <Walkthrough />
    </>
  );
}

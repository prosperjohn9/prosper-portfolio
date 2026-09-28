import type { Metadata } from "next";
import { caseStudyProse, header } from "@/content/case-study";
import { profile } from "@/content/profile";
import { receipts } from "@/content/receipts";
import { numberReceipts } from "@/domain/receipts";
import { Architecture } from "@/sections/case-study/Architecture";
import { CaseStudyHeader } from "@/sections/case-study/CaseStudyHeader";
import { Delivery } from "@/sections/case-study/Delivery";
import { Demo } from "@/sections/case-study/Demo";
import { FirmFit } from "@/sections/case-study/FirmFit";
import { Walkthrough } from "@/sections/case-study/Walkthrough";
import { Why } from "@/sections/case-study/Why";

export const metadata: Metadata = {
  title: `${header.title}, a case study by ${profile.shortName}`,
  description:
    "How I designed, built and run a live SaaS for forex and prop-firm traders: a working demo of its core idea, the decisions behind it and how it ships. Every claim links to its proof.",
};

export default function CaseStudy() {
  // Numbered for this page alone: receipts read 1, 2, 3 from its top.
  const numbering = numberReceipts(receipts, caseStudyProse);
  return (
    <>
      <CaseStudyHeader numbering={numbering} />
      <Why numbering={numbering} />
      <Demo numbering={numbering} />
      <FirmFit numbering={numbering} />
      <Architecture numbering={numbering} />
      <Delivery numbering={numbering} />
      <Walkthrough />
    </>
  );
}

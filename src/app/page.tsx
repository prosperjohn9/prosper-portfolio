import { homeProse } from "@/content/home";
import { receipts } from "@/content/receipts";
import { numberReceipts } from "@/domain/receipts";
import { Contact } from "@/sections/Contact";
import { Evidence } from "@/sections/Evidence";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { Ledger } from "@/sections/Ledger";
import { Security } from "@/sections/Security";
import { Studio } from "@/sections/Studio";
import { Writing } from "@/sections/Writing";

export default function Home() {
  // One numbering for the whole page: receipts read 1, 2, 3 from top to bottom.
  const numbering = numberReceipts(receipts, homeProse);
  return (
    <>
      <Hero numbering={numbering} />
      <Evidence numbering={numbering} />
      <Ledger />
      <Security numbering={numbering} />
      <Experience />
      <Studio />
      <Writing />
      <Contact />
    </>
  );
}

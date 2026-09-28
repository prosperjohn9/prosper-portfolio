import { homeProse } from "@/content/home";
import { receipts } from "@/content/receipts";
import { numberReceipts } from "@/domain/receipts";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { HowIWork } from "@/sections/HowIWork";
import { SelectedWork } from "@/sections/SelectedWork";

export default function Home() {
  // One numbering for the whole page: receipts read 1, 2, 3 from top to bottom.
  const numbering = numberReceipts(receipts, homeProse);
  return (
    <>
      <Hero numbering={numbering} />
      <SelectedWork />
      <HowIWork numbering={numbering} />
      <Experience />
      <Contact />
    </>
  );
}

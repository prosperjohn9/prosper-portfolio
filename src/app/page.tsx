import { homeProse } from "@/content/home";
import { receipts } from "@/content/receipts";
import { numberReceipts } from "@/domain/receipts";
import { Hero } from "@/sections/Hero";

export default function Home() {
  const numbering = numberReceipts(receipts, homeProse);
  return <Hero numbering={numbering} />;
}

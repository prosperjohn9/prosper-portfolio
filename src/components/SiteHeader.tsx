import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const sections = [
  { id: "evidence", label: "Product" },
  { id: "numbers", label: "Numbers" },
  { id: "security", label: "Security" },
  { id: "experience", label: "Experience" },
];

export function SiteHeader() {
  return (
    <header className="wrap flex items-center justify-between gap-3 py-5">
      <Link href="/" className="t-brand whitespace-nowrap no-underline">
        Prosper Osaigbovo
      </Link>
      <nav
        aria-label="Sections"
        className="flex items-center gap-3 text-base sm:gap-4 md:gap-[22px]"
      >
        {sections.map((s) => (
          <Link
            key={s.id}
            href={`/#${s.id}`}
            className="hidden text-graphite no-underline hover:text-ink hover:underline md:inline"
          >
            {s.label}
          </Link>
        ))}
        {/* Contact stays visible on phones so the way to reach him is never hidden. */}
        <Link
          href="/#contact"
          className="text-graphite no-underline hover:text-ink hover:underline"
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}

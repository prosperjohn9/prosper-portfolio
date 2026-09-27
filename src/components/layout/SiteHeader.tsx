import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { contactNav, sectionNav, type NavItem } from "@/content/navigation";
import { profile } from "@/content/profile";

const navLinkClass = "text-graphite no-underline hover:text-ink hover:underline";

function NavLink({ item, className = "" }: { item: NavItem; className?: string }) {
  return (
    <Link href={`/#${item.id}`} className={`${navLinkClass} ${className}`}>
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="wrap flex items-center justify-between gap-3 py-5">
      <Link href="/" className="t-brand whitespace-nowrap no-underline">
        {profile.shortName}
      </Link>
      <nav
        aria-label="Sections"
        className="flex items-center gap-3 text-base sm:gap-4 md:gap-[22px]"
      >
        {sectionNav.map((item) => (
          <NavLink key={item.id} item={item} className="hidden md:inline" />
        ))}
        {/* Contact stays visible on phones, so the way to get in touch is never hidden. */}
        <NavLink item={contactNav} />
        <ThemeToggle />
      </nav>
    </header>
  );
}

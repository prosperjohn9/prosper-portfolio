import Link from "next/link";
import type { ReactNode } from "react";
import { isSitePage } from "@/domain/links";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Set for files the visitor saves, such as the CV. */
  download?: boolean;
}

const base =
  "inline-flex min-h-12 items-center rounded-[4px] border-[1.5px] px-5 text-[1.0625rem] font-semibold no-underline hover:underline";
const variants = {
  primary: "border-button bg-button text-button-text",
  secondary: "border-ink text-ink",
};

/** A link that looks like a button: it always goes somewhere, it never submits anything. */
export function ButtonLink({ href, children, variant = "secondary", download }: ButtonLinkProps) {
  const className = `${base} ${variants[variant]}`;
  if (isSitePage(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} download={download || undefined}>
      {children}
    </a>
  );
}

/** A row of button links that wraps on small screens. */
export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap gap-3">{children}</div>;
}

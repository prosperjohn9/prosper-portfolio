import type { ReactNode } from "react";

interface SectionProps {
  /** The anchor the header links to. */
  id: string;
  title: string;
  children: ReactNode;
}

/** A titled part of a page, reachable by its anchor. */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="wrap section">
      <h2 id={headingId} className="t-h2 mb-4.5">
        {title}
      </h2>
      {children}
    </section>
  );
}

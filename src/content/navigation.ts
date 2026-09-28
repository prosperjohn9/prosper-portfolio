export interface NavItem {
  /** The id of the section on the home page. */
  id: string;
  label: string;
}

/** Section links shown in the header on wider screens. */
export const sectionNav: readonly NavItem[] = [
  { id: "work", label: "Work" },
  { id: "how-i-work", label: "How I work" },
  { id: "experience", label: "Experience" },
];

/** Always visible, on every screen size. */
export const contactNav: NavItem = { id: "contact", label: "Contact" };

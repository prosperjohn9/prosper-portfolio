export interface NavItem {
  /** The id of the section on the home page. */
  id: string;
  label: string;
}

/** Section links shown in the header on wider screens. */
export const sectionNav: readonly NavItem[] = [
  { id: "evidence", label: "Product" },
  { id: "numbers", label: "Numbers" },
  { id: "security", label: "Security" },
  { id: "experience", label: "Experience" },
];

/** Always visible, on every screen size. */
export const contactNav: NavItem = { id: "contact", label: "Contact" };

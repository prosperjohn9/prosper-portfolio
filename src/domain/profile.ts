/** Who the site is about. Content modules provide the values; UI reads them. */
export interface Profile {
  /** The full legal name, one part per line in the hero. */
  nameParts: readonly string[];
  /** The name people use day to day. */
  shortName: string;
  role: string;
  location: string;
  pronouns: string;
  email: string;
  /** Site path of the CV download. */
  cvPath: string;
  links: {
    linkedin: string;
    github: string;
    product: string;
    /** The public repository that documents the product without its code. */
    productShowcase: string;
  };
}

export function fullName(profile: Pick<Profile, "nameParts">): string {
  return profile.nameParts.join(" ");
}

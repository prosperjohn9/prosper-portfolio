import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="wrap t-small pt-18 pb-10 text-graphite">
      <p>
        {profile.shortName}, {profile.role.toLowerCase()} in {profile.location}.
      </p>
    </footer>
  );
}

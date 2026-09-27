import { profile } from "@/content/profile";
import { footerNotes } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="wrap t-small space-y-2 pt-18 pb-10 text-graphite">
      {footerNotes.map((note) => (
        <p key={note} className="m-0 max-w-[44rem]">
          {note}
        </p>
      ))}
      <p className="m-0">
        {profile.shortName}, {profile.role.toLowerCase()} in {profile.location}.
      </p>
    </footer>
  );
}

import { profile } from "@/content/profile";

// The hero name for now. The claims, receipts and sections arrive in later steps.
export default function Home() {
  return (
    <div className="wrap pt-[clamp(28px,6vw,72px)]">
      <h1 className="t-name">
        {profile.nameParts.map((part) => (
          <span key={part} className="block">
            {part}
          </span>
        ))}
      </h1>
      <p className="mt-3.5 text-base text-graphite">
        {profile.role} in {profile.location}. {profile.pronouns}.
      </p>
    </div>
  );
}

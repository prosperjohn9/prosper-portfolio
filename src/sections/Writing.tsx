import { Section } from "@/components/layout/Section";
import { writing } from "@/content/home";
import { profile } from "@/content/profile";

export function Writing() {
  return (
    <Section id="writing" title={writing.title}>
      <div className="max-w-[38rem]">
        <ul className="m-0 list-none space-y-3 p-0">
          {writing.topics.map((topic) => (
            <li key={topic} className="t-intro">
              {topic}
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <a href={profile.links.linkedin}>{writing.more}</a>
        </p>
      </div>
    </Section>
  );
}

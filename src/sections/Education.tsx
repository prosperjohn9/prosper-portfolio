import { Section } from "@/components/layout/Section";
import { education } from "@/content/home";

export function Education() {
  return (
    <Section id="education" title={education.title}>
      <ol className="m-0 max-w-[48rem] list-none p-0">
        {education.degrees.map((degree) => (
          <li
            key={degree.title}
            className="grid gap-0.5 border-t border-rule py-4 md:grid-cols-[11rem_1fr] md:gap-x-6"
          >
            <span className="text-base text-graphite md:pt-0.5">{degree.period}</span>
            <div>
              <p className="t-h3 m-0">{degree.title}</p>
              {degree.detail ? <p className="m-0 mt-0.5">{degree.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

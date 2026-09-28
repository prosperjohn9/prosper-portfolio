import { Section } from "@/components/layout/Section";
import { experience } from "@/content/home";
import type { Milestone } from "@/domain/portfolio";

function Timeline({ items }: { items: readonly Milestone[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {items.map((item) => (
        <li
          key={item.title}
          className="grid gap-0.5 border-t border-rule py-4 md:grid-cols-[11rem_1fr] md:gap-x-6"
        >
          <span className="text-base text-graphite md:pt-0.5">{item.period}</span>
          <div>
            <p className="t-h3 m-0">{item.title}</p>
            {item.detail ? <p className="m-0 mt-0.5">{item.detail}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <Section id="experience" title={experience.title}>
      <div className="max-w-[48rem]">
        <Timeline items={experience.roles} />
        <h3 className="t-h3 mt-10 mb-1">{experience.educationTitle}</h3>
        <Timeline items={experience.education} />
      </div>
    </Section>
  );
}

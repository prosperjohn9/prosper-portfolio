import { Section } from "@/components/layout/Section";
import { studio } from "@/content/home";
import { profile } from "@/content/profile";
import { mailto } from "@/domain/links";

export function Studio() {
  return (
    <Section id="studio" title={studio.title}>
      <div className="max-w-[38rem]">
        <p>{studio.intro}</p>
        <ul className="m-0 mt-4 list-none space-y-4 p-0">
          {studio.projects.map((project) => (
            <li key={project.name}>
              <a href={project.href} className="t-h3">
                {project.name}
              </a>
              <p className="m-0 mt-0.5">{project.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <a href={mailto(profile.email, studio.enquiry.subject)}>{studio.enquiry.label}</a>
        </p>
      </div>
    </Section>
  );
}

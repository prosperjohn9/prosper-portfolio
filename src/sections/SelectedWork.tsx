import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { work } from "@/content/home";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { mailto, workPath } from "@/domain/links";
import type { Project } from "@/domain/project";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.caseStudy && !project.site) return null;
  return (
    <p className="m-0 mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
      {project.caseStudy ? (
        <ButtonLink href={workPath(project.slug)} variant="primary">
          Read the case study
        </ButtonLink>
      ) : null}
      {project.site ? <a href={project.site.href}>{project.site.text}</a> : null}
    </p>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  const headingId = `work-${project.slug}`;
  return (
    <li className="grid gap-1 border-t border-rule py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-6">
      <span className="text-base text-graphite md:pt-0.5">{project.period}</span>
      <article aria-labelledby={headingId} className="max-w-[40rem]">
        <h3 id={headingId} className="t-h3 m-0">
          {project.name}
        </h3>
        <p className="m-0 mt-1">{project.summary}</p>
        <dl className="t-small m-0 mt-3 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 gap-y-1">
          <dt className="text-graphite">Role</dt>
          <dd className="m-0">{project.role}</dd>
          {project.stack ? (
            <>
              <dt className="text-graphite">Stack</dt>
              <dd className="m-0">{project.stack.join(", ")}</dd>
            </>
          ) : null}
        </dl>
        <ProjectLinks project={project} />
      </article>
    </li>
  );
}

export function SelectedWork() {
  return (
    <Section id="work" title={work.title}>
      <ul className="m-0 list-none border-b border-rule p-0">
        {projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </ul>
      <p className="mt-6 max-w-[40rem] text-graphite">
        {work.studio}{" "}
        <a href={mailto(profile.email, work.enquiry.subject)} className="text-ink">
          {work.enquiry.label}
        </a>
      </p>
    </Section>
  );
}

import { Section } from "@/components/layout/Section";
import { ButtonLink, ButtonRow } from "@/components/ui/ButtonLink";
import { contact } from "@/content/home";
import { profile } from "@/content/profile";
import { mailto } from "@/domain/links";

export function Contact() {
  return (
    <Section id="contact" title={contact.title}>
      <div className="max-w-[44rem]">
        <p className="t-intro">{contact.lede}</p>
        <p className="text-graphite">{contact.availability}</p>
        <p className="mt-6">
          <a href={mailto(profile.email)} className="t-email">
            {profile.email}
          </a>
        </p>
        <ButtonRow>
          <ButtonLink href={mailto(profile.email)} variant="primary">
            Email me
          </ButtonLink>
          <ButtonLink href={profile.cvPath} download>
            Download CV (PDF)
          </ButtonLink>
          <ButtonLink href={profile.links.linkedin}>LinkedIn</ButtonLink>
          <ButtonLink href={profile.links.github}>GitHub</ButtonLink>
        </ButtonRow>
      </div>
    </Section>
  );
}

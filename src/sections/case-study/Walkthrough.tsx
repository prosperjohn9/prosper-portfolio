import { Section } from "@/components/layout/Section";
import { ButtonLink, ButtonRow } from "@/components/ui/ButtonLink";
import { walkthrough } from "@/content/case-study";
import { contact } from "@/content/home";
import { profile } from "@/content/profile";
import { mailto } from "@/domain/links";

export function Walkthrough() {
  return (
    <Section id="walkthrough" title={walkthrough.title}>
      <p className="t-intro max-w-[38rem]">{walkthrough.lede}</p>
      <ButtonRow>
        <ButtonLink href={mailto(profile.email, contact.walkthroughSubject)} variant="primary">
          Ask how it is built
        </ButtonLink>
        <ButtonLink href={profile.links.product}>Open tradershindsight.com</ButtonLink>
        <ButtonLink href={profile.links.productShowcase}>
          See the public showcase on GitHub
        </ButtonLink>
        <ButtonLink href={profile.cvPath} download>
          Download CV (PDF)
        </ButtonLink>
      </ButtonRow>
    </Section>
  );
}

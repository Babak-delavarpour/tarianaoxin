"use client";

import { HiArrowUpRight } from "react-icons/hi2";
import { Chapter, Container, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

/**
 * Section 11 — INK · archetype A (BAND) · the terminal statement.
 *
 * Full-bleed. The white `section-y` wrapper, the 2.5rem rounded panel,
 * the drifting blob and the hand-rolled `border-white/20` button
 * override are all gone. What is left is an edge-to-edge ink field, one
 * `shell-narrow` column, a mark, a claim at `fs-h1` — the only heading
 * on the page besides the hero that breaks `fs-h2` — and two buttons.
 * A single `brand-gradient` hairline seals the top edge: this is the
 * "HomeCta panel edge" the accent budget in §1.3 allows, and the only
 * gradient in the lower half of the page.
 *
 * Props are unchanged — `AboutView` and `ProductsView` also render this.
 */
export function CtaBand({
  title,
  body,
  primary,
  primaryHref,
  secondary,
  secondaryHref,
}: {
  title: string;
  body: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  secondaryHref: string;
}) {
  const { href } = useI18n();

  return (
    <Chapter tone="ink" pad="loose">
      <span
        aria-hidden
        className="brand-gradient pointer-events-none absolute inset-x-0 top-0 h-1"
      />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      <Container narrow className="relative flex flex-col items-center">
        <Reveal variant="fade">
          <LogoMark tone="light" className="h-10 w-10 opacity-90" />
        </Reveal>

        <SectionHeading
          titleAs="h2"
          size="h1"
          align="center"
          tone="light"
          title={title}
          subtitle={body}
          reveal="fade"
          className="mt-8 w-full"
        />

        <Reveal
          variant="fade"
          delay={140}
          className="stack-block flex w-full flex-col items-stretch gap-3 min-[26rem]:w-auto min-[26rem]:flex-row min-[26rem]:items-center"
        >
          <ButtonLink href={href(primaryHref)} variant="light" size="lg">
            {primary}
          </ButtonLink>
          <ButtonLink href={href(secondaryHref)} variant="onink" size="lg">
            {secondary}
            <HiArrowUpRight className="h-4 w-4 flip-rtl" />
          </ButtonLink>
        </Reveal>
      </Container>
    </Chapter>
  );
}

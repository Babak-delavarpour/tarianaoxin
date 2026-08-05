import { Reveal } from "./Reveal";

/**
 * Section primitives for the MEASURED system.
 *
 * `tone` is consistent across every export here and means *the colour of
 * the text*, not of the ground:
 *   - "dark"  → dark type on a light chapter (PAPER / BOARD)
 *   - "light" → light type on the INK chapter   ("ink" is an alias)
 */
export type Tone = "dark" | "light" | "ink";

const isOnInk = (tone: Tone) => tone !== "dark";

/* ───────────────────────────────────────────────────────────────
   Container — the page shell
   ─────────────────────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
  narrow = false,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  /** Switch from --shell-max (80/88rem) to --shell-narrow (62rem). */
  narrow?: boolean;
  as?: "div" | "section" | "header" | "footer" | "nav" | "ul" | "ol";
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">) {
  return (
    <Tag className={`${narrow ? "shell-narrow" : "shell"} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ───────────────────────────────────────────────────────────────
   Eyebrow — the only micro-label in the system
   `.eyebrow` carries size / weight / tracking / casing from the
   per-script registers, so tracked-uppercase self-disables in fa+ar.
   Never add `uppercase` or `tracking-*` at the call site.
   ─────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  tone = "dark",
  rule = true,
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  /** Set false to drop the leading 1.75rem hairline. */
  rule?: boolean;
  className?: string;
}) {
  const onInk = isOnInk(tone);
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 ${
        onInk ? "text-aqua-300" : "text-aqua-700"
      } ${className}`}
    >
      {rule ? (
        <span
          aria-hidden
          className={`h-px w-7 shrink-0 ${
            onInk ? "bg-aqua-400/70" : "bg-aqua-600/70"
          }`}
        />
      ) : null}
      {children}
    </span>
  );
}

/* ───────────────────────────────────────────────────────────────
   Divider — the hairline as an element (§5.11)
   ─────────────────────────────────────────────────────────────── */

export function Divider({
  tone = "dark",
  orientation = "horizontal",
  strong = false,
  className = "",
}: {
  tone?: Tone;
  orientation?: "horizontal" | "vertical";
  strong?: boolean;
  className?: string;
}) {
  const onInk = isOnInk(tone);
  const fill = onInk
    ? strong
      ? "bg-hairline-inverse-strong"
      : "bg-hairline-inverse"
    : strong
      ? "bg-hairline-strong"
      : "bg-hairline";
  return (
    <span
      aria-hidden
      className={`${
        orientation === "vertical" ? "w-px self-stretch" : "block h-px w-full"
      } ${fill} ${className}`}
    />
  );
}

/* ───────────────────────────────────────────────────────────────
   Chapter — the section shell. Guarantees every agent emits the
   same surface, rhythm and seam. There is no fourth background:
   a section with no Chapter (or no bg-* class) is a bug.
   ─────────────────────────────────────────────────────────────── */

const chapterTone = {
  paper: "bg-page",
  board: "bg-sunken",
  ink: "mesh-dark text-white",
  "ink-flat": "ink-flat text-white",
} as const;

const chapterPad = {
  none: "",
  tight: "section-y-tight",
  base: "section-y",
  loose: "section-y-loose",
} as const;

export function Chapter({
  tone,
  pad = "base",
  seam = "none",
  seamTone,
  id,
  className = "",
  children,
  ...rest
}: {
  tone: "paper" | "board" | "ink" | "ink-flat";
  pad?: "tight" | "base" | "loose" | "none";
  /** Light chapters only — INK chapters never carry a seam border. */
  seam?: "none" | "top" | "bottom" | "both";
  /**
   * Seam weight. Defaults to the chapter's own rule: BOARD seams are
   * `hairline-strong`, PAPER seams are `hairline`.
   */
  seamTone?: "hairline" | "strong";
  id?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children" | "id">) {
  const onInk = tone === "ink" || tone === "ink-flat";
  const weight =
    (seamTone ?? (tone === "board" ? "strong" : "hairline")) === "strong"
      ? "border-hairline-strong"
      : "border-hairline";

  const seamClass =
    onInk || seam === "none"
      ? ""
      : seam === "top"
        ? `border-t ${weight}`
        : seam === "bottom"
          ? `border-b ${weight}`
          : `border-y ${weight}`;

  return (
    <section
      id={id}
      data-tone={onInk ? "ink" : tone}
      className={`relative isolate ${chapterTone[tone]} ${chapterPad[pad]} ${seamClass} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
   SectionHeading — eyebrow / h2 / lead, in one register set.
   The subtitle is always a LIGHTER weight than the heading above it.
   ─────────────────────────────────────────────────────────────── */

const headingSize = {
  hero: "fs-hero",
  h1: "fs-h1",
  h2: "fs-h2",
  h3: "fs-h3",
  h4: "fs-h4",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "start",
  titleAs: Heading = "h2",
  size,
  action,
  reveal = true,
  id,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: Tone;
  align?: "start" | "center";
  /** Heading element. Semantics only — size is controlled by `size`. */
  titleAs?: "h1" | "h2" | "h3" | "h4";
  /** Type step. Defaults to the element (h2 → fs-h2). */
  size?: "hero" | "h1" | "h2" | "h3" | "h4";
  /** Trailing-edge slot: a "View all" link/button on the heading row. */
  action?: React.ReactNode;
  /** false disables the entrance; a string forces a variant. */
  reveal?: boolean | "rise" | "fade" | "scale";
  id?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}) {
  const onInk = isOnInk(tone);
  const centered = align === "center";
  const step = headingSize[size ?? Heading];

  const stack = (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={`${step} max-w-[22ch] font-bold ${
          onInk ? "text-white" : "text-ink-900"
        } ${centered ? "mx-auto text-balance" : ""} ${titleClassName}`}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p
          className={`fs-lead max-w-[54ch] font-normal ${
            onInk ? "text-onink-200" : "text-mist-600"
          } ${centered ? "mx-auto" : ""} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );

  const body = action ? (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
      {stack}
      <div className="shrink-0">{action}</div>
    </div>
  ) : (
    stack
  );

  if (reveal === false) {
    return <div className={className}>{body}</div>;
  }

  // PAPER rises, BOARD fades, INK fades — the only per-section variation.
  const variant =
    typeof reveal === "string" ? reveal : onInk ? "fade" : "rise";

  return (
    <Reveal variant={variant} className={className}>
      {body}
    </Reveal>
  );
}

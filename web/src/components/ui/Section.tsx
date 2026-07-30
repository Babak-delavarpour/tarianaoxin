import { Reveal } from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`shell ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.24em] uppercase ${
        tone === "light" ? "text-aqua-300" : "text-aqua-700"
      } ${className}`}
    >
      <span
        className={`h-px w-8 ${
          tone === "light" ? "bg-aqua-400/60" : "bg-aqua-500/60"
        }`}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "start",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`fs-h2 max-w-3xl font-extrabold ${
          tone === "light" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`fs-lead max-w-2xl ${
            tone === "light" ? "text-ink-100/75" : "text-mist-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}

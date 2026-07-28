import Link from "next/link";

type Variant = "primary" | "ghost" | "outline" | "light" | "soft";
type Size = "sm" | "md" | "lg";

const base =
  "sheen group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "brand-gradient text-white shadow-[0_12px_34px_-12px_rgba(11,122,150,0.75)] hover:shadow-[0_20px_46px_-14px_rgba(11,122,150,0.9)] hover:-translate-y-0.5",
  ghost:
    "text-ink-800 hover:text-aqua-700 hover:bg-ink-50",
  outline:
    "border border-ink-200 bg-white/70 text-ink-800 hover:border-aqua-400 hover:bg-white hover:text-aqua-700 hover:-translate-y-0.5",
  light:
    "bg-white text-ink-900 shadow-[0_12px_34px_-14px_rgba(4,22,36,0.7)] hover:-translate-y-0.5 hover:bg-aqua-50",
  soft: "bg-ink-50 text-ink-800 hover:bg-ink-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-6 text-[0.9rem]",
  lg: "h-14 px-8 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

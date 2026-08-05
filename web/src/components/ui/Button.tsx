import Link from "next/link";

/**
 * The system's only control shape. Buttons are `rounded-ctrl` (10px) —
 * pills read consumer/startup, 10px reads engineered. Every size is
 * ≥44px tall, so no button ever needs `tap-target`.
 */
export type Variant =
  | "primary"
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "light"
  | "onink";
export type Size = "sm" | "md" | "lg";

/**
 * `translate` is listed alongside `transform` on purpose: Tailwind v4
 * compiles `-translate-y-px` to the standalone `translate` property, so
 * without it the hover lift would snap instead of easing. Tailwind also
 * wraps every `hover:` utility in `@media (hover: hover)` itself, so no
 * hover state here can latch after a tap.
 */
const base =
  "press group relative inline-flex items-center justify-center gap-2.5 rounded-ctrl font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform,translate] duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";

const variants: Record<Variant, string> = {
  /** The accent budget: one primary button per section, maximum. */
  primary:
    "brand-gradient text-white shadow-e2 hover:shadow-e3 hover:-translate-y-px",
  solid: "bg-ink-900 text-white hover:bg-ink-800",
  outline:
    "border border-hairline-strong bg-page text-ink-900 hover:border-ink-900",
  ghost: "text-ink-800 hover:bg-mist-100 hover:text-aqua-700",
  soft: "bg-mist-100 text-ink-800 hover:bg-mist-200",
  light:
    "bg-white text-ink-900 shadow-e2 hover:bg-aqua-50 hover:-translate-y-px",
  /** The only legal button on an ink chapter besides `primary`/`light`. */
  onink:
    "border border-hairline-inverse-strong bg-white/[0.06] text-white hover:border-aqua-400 hover:bg-white/[0.12]",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 fs-micro",
  md: "h-12 px-6 fs-caption",
  lg: "h-14 px-8 fs-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

/** Purely visual: the accessible signal is `aria-busy` on the control. */
function Spinner() {
  return (
    <span
      aria-hidden
      className="h-4 w-4 shrink-0 animate-spin rounded-chip border-2 border-current border-t-transparent opacity-80"
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  type = "button",
  children,
  ...rest
}: CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Blocks interaction, shows a spinner and sets aria-busy. */
    loading?: boolean;
  }) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  children,
  ...rest
}: CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children"> & {
    /**
     * Links cannot be `disabled`; this renders the same dimmed, inert
     * state with `aria-disabled` and removes it from the tab order.
     */
    disabled?: boolean;
  }) {
  return (
    <Link
      href={href}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        disabled ? "pointer-events-none opacity-50" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

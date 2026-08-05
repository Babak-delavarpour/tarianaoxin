"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

/**
 * Entrance motion. Two components, one observer each:
 *
 *   <Reveal>       one block — a heading, a figure, a paragraph stack
 *   <RevealGroup>  a grid / rail / list — ONE observer for the whole
 *                  group, children staggered through `--i`
 *
 * Variants match the chapter, not the taste: PAPER rises, BOARD fades,
 * INK fades, the hero plate scales. Under `prefers-reduced-motion` no
 * observer is created at all and everything renders at its final state.
 */
export type RevealVariant = "rise" | "fade" | "scale";

export type RevealTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "figure"
  | "span"
  | "p"
  | "li"
  | "ul"
  | "ol"
  | "dl";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px",
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Flips true the first time the element enters the viewport, then
 *  unobserves and disconnects — the observer never outlives its use. */
function useShown(ref: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        io.disconnect();
        setShown(true);
        return;
      }
    }, OBSERVER_OPTIONS);

    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return shown;
}

export function Reveal({
  children,
  delay = 0,
  variant = "rise",
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  /** Extra delay in ms before this block starts. Keep under 400. */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  as?: RevealTag;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children" | "style">) {
  const ref = useRef<HTMLElement>(null);
  const shown = useShown(ref);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-shown={shown}
      data-variant={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  variant = "rise",
  stagger = 60,
  cap = 360,
  delay = 0,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** Per-child step in ms. */
  stagger?: number;
  /** Hard ceiling on the accumulated stagger, in ms. */
  cap?: number;
  /** Base delay applied to every child, in ms. */
  delay?: number;
  className?: string;
  as?: RevealTag;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children" | "style">) {
  const ref = useRef<HTMLElement>(null);
  const shown = useShown(ref);

  const items = Children.toArray(children).map((child, i) => {
    if (!isValidElement<{ style?: React.CSSProperties }>(child)) return child;
    return cloneElement(child, {
      style: { ...(child.props.style ?? {}), "--i": i } as React.CSSProperties,
    });
  });

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-shown={shown}
      data-variant={variant}
      className={`reveal-group ${className}`}
      style={
        {
          "--stagger": `${stagger}ms`,
          "--stagger-cap": `${cap}ms`,
          "--reveal-delay": `${delay}ms`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {items}
    </Tag>
  );
}

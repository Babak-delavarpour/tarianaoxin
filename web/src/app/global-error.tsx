"use client";

import { useEffect, useState } from "react";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";

/**
 * The app's only root layout lives under [locale], so this boundary has to
 * ship its own document shell, its own head and its own styles — the
 * Tailwind layer and the font variables are both gone by the time this
 * renders. Everything below is therefore inline, in the MEASURED palette:
 * ink-950 field, two mesh radials, a hairline plate with a drawn tick rule,
 * and 10px controls. Farsi only, by design.
 */

const INK_950 = "#041624";
const INK_900 = "#08243b";
const HAIRLINE = "rgba(255,255,255,0.13)";
const HAIRLINE_STRONG = "rgba(255,255,255,0.26)";
const ONINK_100 = "#d6e4ef";
const ONINK_300 = "#94adc1";
const AQUA_300 = "#6bd3e5";

/* The approved PNG, kept independent of Next's image runtime in this boundary. */
function Mark() {
  return (
    <img
      src="/brand/tarianaoxin-to-concept.png"
      alt=""
      width="48"
      height="48"
      aria-hidden="true"
      style={{ borderRadius: "0.4rem" }}
    />
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [home, setHome] = useState(localePath(defaultLocale));

  /* Keep the reader in the language they were already browsing. */
  useEffect(() => {
    const segment = window.location.pathname.split("/")[1] ?? "";
    if (isLocale(segment)) setHome(localePath(segment));
  }, []);

  const control: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "3rem",
    paddingInline: "1.75rem",
    borderRadius: "0.625rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <html lang="fa-IR" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>خطایی رخ داد · تاریانا اکسین</title>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; }
          a, button { transition: background-color .2s linear, border-color .2s linear, color .2s linear; }
          a:focus-visible, button:focus-visible { outline: 2px solid ${AQUA_300}; outline-offset: 3px; border-radius: 4px; }
          .tx-primary:hover { background: #eefbfe; }
          .tx-secondary:hover { border-color: #35bad5; background: rgba(255,255,255,0.12); }
          @media (prefers-reduced-motion: reduce) { a, button { transition: none; } }
        `}</style>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "clamp(1.25rem, 5vw, 3rem)",
          backgroundColor: INK_950,
          backgroundImage:
            "radial-gradient(70rem 46rem at 8% -14%, rgba(23,162,191,0.17), transparent 60%), radial-gradient(52rem 40rem at 96% 6%, rgba(15,59,92,0.55), transparent 58%)",
          color: "#f4f9fd",
          // The root layout's font variables are gone with it — name only
          // faces that actually ship with the OS.
          fontFamily: "Tahoma, 'Segoe UI', sans-serif",
          lineHeight: 1.9,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "34rem",
            display: "grid",
            gap: "1.75rem",
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <Mark />

          <div
            style={{
              width: "100%",
              border: `1px solid ${HAIRLINE}`,
              borderRadius: "1.75rem",
              backgroundColor: INK_900,
              overflow: "hidden",
            }}
          >
            {/* drawn measurement rule — symmetric, no direction */}
            <div
              aria-hidden="true"
              style={{
                height: "1rem",
                borderBottom: `1px solid ${HAIRLINE}`,
                backgroundImage:
                  "repeating-linear-gradient(to right, #35bad5 0 1px, transparent 1px 2.75rem)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "100% 0.55rem",
                opacity: 0.45,
              }}
            />

            <div
              style={{
                display: "grid",
                gap: "1.15rem",
                justifyItems: "center",
                padding: "clamp(1.5rem, 5vw, 2.75rem)",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(1.7rem, 1.26rem + 1.95vw, 2.4rem)",
                  lineHeight: 1.46,
                  fontWeight: 700,
                }}
              >
                خطایی رخ داد
              </h1>

              <p
                style={{
                  margin: 0,
                  maxWidth: "40ch",
                  fontSize: "1rem",
                  color: ONINK_100,
                }}
              >
                یک خطای پیش‌بینی‌نشده نمایش این صفحه را متوقف کرد. دوباره
                تلاش کنید یا به صفحه اصلی بازگردید.
              </p>

              {error.digest ? (
                <code
                  dir="ltr"
                  style={{
                    fontSize: "0.76rem",
                    letterSpacing: "0.04em",
                    color: ONINK_300,
                    opacity: 0.65,
                    fontFamily: "'Consolas', 'Courier New', monospace",
                  }}
                >
                  {error.digest}
                </code>
              ) : null}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  justifyContent: "center",
                  marginBlockStart: "0.5rem",
                }}
              >
                <button
                  type="button"
                  onClick={reset}
                  className="tx-primary"
                  style={{
                    ...control,
                    border: 0,
                    color: INK_900,
                    backgroundColor: "#ffffff",
                  }}
                >
                  تلاش دوباره
                </button>

                <a
                  href={home}
                  className="tx-secondary"
                  style={{
                    ...control,
                    border: `1px solid ${HAIRLINE_STRONG}`,
                    color: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  صفحه اصلی
                </a>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

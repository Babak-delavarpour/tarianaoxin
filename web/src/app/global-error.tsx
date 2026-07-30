"use client";

/**
 * The app's only root layout lives under [locale], so this boundary has to
 * ship its own document shell and styles.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          backgroundColor: "#041624",
          backgroundImage:
            "radial-gradient(50rem 36rem at 20% -10%, rgba(23,162,191,0.28), transparent 62%)",
          color: "#eef4f9",
          // This boundary replaces the root layout, so the font variables are
          // gone — fall back to faces that ship with the OS.
          fontFamily: "Vazirmatn, Tahoma, 'Segoe UI', sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem", display: "grid", gap: "1.25rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>
            خطایی رخ داد
          </h1>
          <p style={{ margin: 0, opacity: 0.65, lineHeight: 1.9 }}>
            یک خطای پیش‌بینی‌نشده نمایش این صفحه را متوقف کرد. دوباره تلاش کنید
            یا به صفحه اصلی بازگردید.
          </p>
          {error.digest ? (
            <code style={{ fontSize: "0.75rem", opacity: 0.4 }}>
              {error.digest}
            </code>
          ) : null}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 0,
                cursor: "pointer",
                borderRadius: "999px",
                padding: "0.9rem 2rem",
                fontWeight: 700,
                color: "#fff",
                backgroundImage:
                  "linear-gradient(100deg, #08243b, #0f3b5c 40%, #17a2bf)",
              }}
            >
              تلاش دوباره
            </button>
            <a
              href="/fa"
              style={{
                borderRadius: "999px",
                padding: "0.9rem 2rem",
                fontWeight: 700,
                color: "#eef4f9",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              صفحه اصلی
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

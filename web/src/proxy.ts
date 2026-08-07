import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const DEFAULT_LOCALE_REWRITE_HEADER = "x-tarianaoxin-default-locale-rewrite";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const defaultPrefix = `/${defaultLocale}`;

  // A rewrite can pass through the proxy again with its internal `/fa` path.
  // Let that marked request continue instead of redirecting it back to the
  // already-clean public URL and creating a self-redirect loop.
  if (request.headers.get(DEFAULT_LOCALE_REWRITE_HEADER) === "1") {
    return NextResponse.next();
  }

  // Keep the public Persian URL canonical and free of a locale prefix.
  if (pathname === defaultPrefix || pathname.startsWith(`${defaultPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasSecondaryLocale = locales.some(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );
  if (hasSecondaryLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Render the existing Persian route internally while the browser keeps the
  // clean URL: `/` stays `/`, `/shop` stays `/shop`, and so on.
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(DEFAULT_LOCALE_REWRITE_HEADER, "1");
  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon.svg|.*\\..*).*)"],
};

import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";
import type { NextRequest } from "next/server";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "fa",
});

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(fa|en)/:path*"],
};

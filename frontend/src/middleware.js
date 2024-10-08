import createMiddleware from "next-intl/middleware";

export default async function middleware(request) {
  const handleI18nRouting = createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "en",
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*"],
};

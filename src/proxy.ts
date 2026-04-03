import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareType } from './middlewares/config';
import { translationsMiddleware } from './middlewares/translations';
import { i18n } from '../i18n-config';

const activatedMiddleware: MiddlewareType[] = [translationsMiddleware];

const excludedPaths = [
  '/manifest.json',
  '/favicon.ico',
  '/api/',
  '/_next/',
  '/static/',
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect root locale paths (e.g. /en, /es, /cat) to /svg-component
  const isRootLocale = i18n.locales.some(
    locale => pathname === `/${locale}` || pathname === `/${locale}/`
  );
  if (isRootLocale || pathname === '/') {
    const locale =
      i18n.locales.find(l => pathname.startsWith(`/${l}`)) ??
      i18n.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/image-converter`;
    return NextResponse.redirect(url);
  }

  for (const middleware of activatedMiddleware) {
    if (middleware.matcher) {
      const regex = new RegExp(middleware.matcher);
      if (!regex.test(pathname)) {
        continue;
      }
    }

    const response = await middleware.middleware(request);
    if (response) {
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|_vercel).*)'],
};

import createIntlMiddleware from 'next-intl/middleware';
import { MiddlewareType } from './config';
import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '../../i18n-config';

const intlMiddleware = createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'always'
});

async function _middleware(request: NextRequest): Promise<NextResponse | null> {
  try {
    const response = intlMiddleware(request);
    
    if (response.headers.has('Link')) {
      response.headers.delete('Link');
    }
    
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return null;
  }
}

export const translationsMiddleware: MiddlewareType = {
  middleware: _middleware,
  matcher: '/((?!api|static|.*\\..*|_next|_vercel).*)'
};
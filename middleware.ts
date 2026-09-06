import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { decrypt } from './src/lib/session';

const intlMiddleware = createMiddleware(routing);

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/setup', '/settings'];
// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Strip locale prefix to get bare pathname for matching
  const locales = routing.locales as readonly string[];
  const pathnameWithoutLocale = locales.reduce(
    (p, locale) => p.replace(new RegExp(`^/${locale}`), '') || '/',
    pathname,
  );

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + '/'),
  );
  const isAuthRoute = authRoutes.some(
    (route) =>
      pathnameWithoutLocale === route ||
      pathnameWithoutLocale.startsWith(route + '/'),
  );

  const sessionCookie = req.cookies.get('session')?.value;
  const session = sessionCookie ? await decrypt(sessionCookie) : null;

  if (isProtectedRoute && !session) {
    // Redirect to login, preserve locale
    const locale =
      locales.find((l) => pathname.startsWith(`/${l}`)) ??
      routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && session) {
    // Already logged in — redirect to dashboard
    const locale =
      locales.find((l) => pathname.startsWith(`/${l}`)) ??
      routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};

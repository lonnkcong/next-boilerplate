# Next.js + Tailwind Landing Page — Full Setup Guide

Stack: **Next.js (App Router) + TypeScript + Tailwind CSS + pnpm + next-intl + next-themes + shadcn/ui + Lucide React + Motion + next/font**

---

## 1. Scaffold the project

```bash
pnpm dlx create-next-app@latest my-landing-page
```

Answer the prompts:

```
✔ Would you like to use TypeScript?           › Yes
✔ Would you like to use ESLint?               › Yes
✔ Would you like to use React Compiler?       › Yes
✔ Would you like to use Tailwind CSS?         › Yes
✔ Would you like your code inside a `src/` directory? › Yes
✔ Would you like to use App Router?           › Yes
✔ Would you like to use Turbopack for next dev? › Yes
✔ Would you like to customize the import alias? › No (@/*)
```

```bash
cd my-landing-page
pnpm install
```

This gives you Next.js, TypeScript, and Tailwind CSS 4 already wired up — no separate `tailwindcss init` needed on recent Next.js versions.

---

## 2. Install the remaining dependencies

```bash
pnpm add next-intl next-themes lucide-react motion
```

- **next-intl** — i18n for App Router (server + client components)
- **next-themes** — light/dark/system theme switching without flash-of-wrong-theme
- **lucide-react** — icon set
- **motion** — the renamed/successor package to Framer Motion (`import { motion } from "motion/react"`)

shadcn/ui is installed separately in step 4 since it uses a CLI generator rather than a runtime package.

---

## 3. Set up next-intl (i18n)

### 3.1 Folder structure

Move your routes under a `[locale]` segment:

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
    layout.tsx        # minimal root layout (just passes children through)
  i18n/
    routing.ts
    navigation.ts
    request.ts
  messages/
    en.json
    fr.json
```

### 3.2 `src/i18n/routing.ts`

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
});
```

### 3.3 `src/i18n/navigation.ts`

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### 3.4 `src/i18n/request.ts`

```ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 3.5 `middleware.ts` (project root)

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
```

### 3.6 `next.config.ts`

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

### 3.7 `src/messages/en.json`

```json
{
  "Hero": {
    "title": "Build faster, ship sooner",
    "subtitle": "The landing page starter kit that gets out of your way.",
    "cta": "Get Started"
  }
}
```

### 3.8 `src/app/[locale]/layout.tsx`

```tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { fontSans } from '@/lib/fonts';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontSans.variable}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

## 4. Install shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

Choose the defaults it suggests (Tailwind CSS variables, `@/components`, `@/lib/utils`). This adds `components.json`, sets up `cn()` in `src/lib/utils.ts`, and wires CSS variables in `globals.css`.

Then add components as you need them, e.g.:

```bash
pnpm dlx shadcn@latest add button card navigation-menu sheet
```

---

## 5. Light/Dark theme with next-themes

### 5.1 `src/components/theme-provider.tsx`

```tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

Already wired into `[locale]/layout.tsx` above.

### 5.2 Theme toggle component — `src/components/theme-toggle.tsx`

```tsx
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid hydration mismatch

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
```

---

## 6. next/font setup

`src/lib/fonts.ts`:

```ts
import { Inter, Sora } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontHeading = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});
```

In `globals.css`, extend Tailwind's font tokens:

```css
@theme inline {
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
}
```

Apply `fontSans.variable` on `<body>` (already done in the layout above) and use `font-heading` utility class on headline elements.

---

## 7. Motion (animation)

```tsx
// src/components/hero.tsx
'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-heading text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {t('title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="text-muted-foreground max-w-xl sm:text-lg"
      >
        {t('subtitle')}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        <Button size="lg">{t('cta')}</Button>
      </motion.div>
    </section>
  );
}
```

---

## 8. Responsive layout basics

- Use Tailwind's breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) mobile-first — write the smallest-screen styles unprefixed, then layer on larger breakpoints.
- Use `max-w-3xl mx-auto px-4 sm:px-6 lg:px-8` as a standard content container.
- For nav, pair shadcn's `Sheet` component for a mobile drawer with a `NavigationMenu` (or plain flex links) hidden below `md:` and shown above it:

```tsx
<nav className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
  <Logo />
  <div className="hidden md:flex md:gap-6">{/* desktop links */}</div>
  <div className="md:hidden">{/* Sheet-based mobile menu trigger */}</div>
  <ThemeToggle />
</nav>
```

---

## 9. Example `src/app/[locale]/page.tsx`

```tsx
import { Hero } from '@/components/hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Features, Pricing, Testimonials, Footer sections follow the same pattern */}
    </main>
  );
}
```

---

## 10. package.json scripts (recap)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Run it:

```bash
pnpm dev
```

---

## Final structure

```
my-landing-page/
├── middleware.ts
├── next.config.ts
├── components.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── hero.tsx
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── navigation.ts
│   │   └── request.ts
│   └── lib/
│       ├── utils.ts           # shadcn cn()
│       └── fonts.ts
└── messages/
    ├── en.json
    └── fr.json
```

## Notes / gotchas

- **Root `layout.tsx`** (outside `[locale]`) should stay minimal — just `<html><body>{children}</body></html>` — since the real `<html lang>` and providers live in `[locale]/layout.tsx`.
- **`suppressHydrationWarning`** on `<html>` is required by next-themes to avoid a console warning on first paint.
- **Middleware matcher**: exclude `/api`, `/_next`, and static files so locale detection doesn't run on assets.
- If you add more locales later, just add another `messages/xx.json` and append the code to `routing.ts`'s `locales` array.

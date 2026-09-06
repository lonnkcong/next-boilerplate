# Voxudio UI Guidelines

A practical reference for developers building or modifying pages in this codebase. Read this before creating a new page or component.

---

## Table of Contents

1. [Project Stack](#1-project-stack)
2. [File & Route Structure](#2-file--route-structure)
3. [Layout System](#3-layout-system)
4. [Theme & Design Tokens](#4-theme--design-tokens)
5. [Typography](#5-typography)
6. [Color & Accent Palette](#6-color--accent-palette)
7. [Shadcn / Base UI Components](#7-shadcn--base-ui-components)
8. [Responsiveness](#8-responsiveness)
9. [Internationalisation (next-intl)](#9-internationalisation-next-intl)
10. [Authentication & Session](#10-authentication--session)
11. [Icons](#11-icons)
12. [Dos and Donts](#12-dos-and-donts)
13. [New Page Checklist](#13-new-page-checklist)

---

## 1. Project Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| Framework         | Next.js 16 (App Router, Turbopack)         |
| Language          | TypeScript                                 |
| Styling           | Tailwind CSS v4                            |
| Component library | shadcn/ui wrappers over Base UI primitives |
| i18n              | next-intl                                  |
| Auth              | JWT cookie session (src/lib/session.ts)    |
| Package manager   | pnpm                                       |

> **Next.js version note**: This project uses Next.js 16, which has breaking changes vs v13-15. Always read `node_modules/next/dist/docs/` when unsure. The `AGENTS.md` at the repo root has more details.

---

## 2. File & Route Structure

```
src/
├── app/
│   ├── [locale]/                  ← locale segment (en, zh-CN, zh-TW)
│   │   ├── layout.tsx             ← sets html lang, fonts, ThemeProvider, NextIntlClientProvider
│   │   ├── (app)/                 ← authenticated shell (TopNav + LeftRail)
│   │   │   ├── layout.tsx         ← adds TopNav, LeftRail, main offset
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── (auth)/                ← unauthenticated pages (login, signup)
│   └── globals.css                ← Tailwind imports + CSS design tokens
├── components/
│   ├── ui/                        ← shadcn components (do not edit lightly)
│   ├── top-nav.tsx
│   ├── left-rail.tsx
│   └── theme-toggle.tsx
├── i18n/
│   ├── routing.ts                 ← defineRouting (locales, defaultLocale)
│   └── navigation.ts              ← re-exported Link, useRouter, usePathname
├── lib/
│   ├── fonts.ts                   ← Inter (sans) + Sora (heading)
│   ├── session.ts                 ← JWT cookie helpers
│   └── utils.ts                   ← cn() helper (clsx + tailwind-merge)
└── messages/
    ├── en.json
    ├── zh-CN.json
    └── zh-TW.json
```

**Rule**: every new authenticated page goes inside `src/app/[locale]/(app)/`. It automatically inherits TopNav + LeftRail from the group layout — no extra wiring needed.

---

## 3. Layout System

### Shell offsets (handled by the `(app)` layout — do not add manually)

```
TopNav   → fixed, h-14, z-50
LeftRail → fixed, w-14, top-14, z-40
main     → pt-14 pl-14, inner padding p-6
```

### Content max-width

All content pages use **`max-w-3xl mx-auto`** as the standard container. This keeps readable line lengths on wide monitors.

```tsx
// Standard page wrapper
<div className="mx-auto max-w-3xl space-y-8">
  <h1 className="font-heading text-2xl font-bold tracking-tight">Title</h1>
  ...
</div>
```

Deviations:

- `max-w-5xl` — data-heavy pages (large tables, project grids)
- `max-w-full` — full-bleed dashboards

Always document why you deviated.

### Spacing scale

| Purpose                 | Class                     |
| ----------------------- | ------------------------- |
| Between page sections   | `space-y-8`               |
| Between form fields     | `space-y-5`               |
| Between label and input | `space-y-1.5`             |
| Inside tight groups     | `gap-1.5` or `gap-2`      |
| Inside card padding     | auto via `--card-spacing` |

---

## 4. Theme & Design Tokens

Tokens are defined as CSS custom properties in `src/app/globals.css` under `:root` (light) and `.dark`. Tailwind maps them via `@theme inline`.

### Key token → Tailwind class

| Token                | Tailwind class                        | Usage               |
| -------------------- | ------------------------------------- | ------------------- |
| `--background`       | `bg-background`                       | Page background     |
| `--foreground`       | `text-foreground`                     | Body text           |
| `--card`             | `bg-card`                             | Card surfaces       |
| `--muted`            | `bg-muted`                            | Subtle backgrounds  |
| `--muted-foreground` | `text-muted-foreground`               | Secondary/hint text |
| `--border`           | `border-border`                       | Default borders     |
| `--destructive`      | `text-destructive` / `bg-destructive` | Errors, delete      |
| `--primary`          | `bg-primary` / `text-primary`         | CTA color           |
| `--ring`             | `ring-ring`                           | Focus rings         |

### Dark-mode-safe borders

Always use `border-white/8` on custom panels and cards:

```tsx
<div className="rounded-xl border border-white/8 bg-card">
```

This uses 8% white opacity which reads correctly in both light and dark modes without needing a dark: variant.

### Border radius scale

| Class          | Use case                            |
| -------------- | ----------------------------------- |
| `rounded-lg`   | Inputs, chips                       |
| `rounded-xl`   | Custom stat panels                  |
| `rounded-full` | Avatars, pills, icon buttons        |
| `rounded-4xl`  | shadcn Card (applied automatically) |

---

## 5. Typography

| Font  | CSS variable     | Tailwind class | Role                          |
| ----- | ---------------- | -------------- | ----------------------------- |
| Inter | `--font-sans`    | `font-sans`    | Body text (default on `html`) |
| Sora  | `--font-heading` | `font-heading` | All headings, card titles     |

Both are loaded via `next/font/google` with `display: swap` in `src/lib/fonts.ts`.

### Heading hierarchy

```tsx
// One per page
<h1 className="font-heading text-2xl font-bold tracking-tight">Page Title</h1>

// Section title inside a card
<h2 className="font-heading text-base font-semibold">Section</h2>

// Micro-label in a list
<h3 className="font-heading text-sm font-medium">Item Name</h3>

// Descriptive body text
<p className="text-muted-foreground text-sm">Supporting copy.</p>

// Field hint / helper
<p className="text-muted-foreground text-xs">Required field.</p>
```

Do not use bare `<b>` or `<strong>` for visual weight — use Tailwind weight utilities.

---

## 6. Color & Accent Palette

The product accent is **violet → indigo**.

```
Active nav states:    bg-violet-500/15  text-violet-400  ring-violet-500/20
Gradient avatars:     from-violet-500 to-indigo-600
Primary buttons:      bg-violet-600 hover:bg-violet-500
Bullet/dot accents:   bg-violet-400
Gradient stat cards:  from-violet-500/20 to-violet-600/5
```

Supporting colors for stat cards and data visualization:

| Color       | Examples                                   | Use for              |
| ----------- | ------------------------------------------ | -------------------- |
| Violet      | `text-violet-400` `from-violet-500/20`     | Primary metric       |
| Indigo      | `text-indigo-400` `from-indigo-500/20`     | Secondary metric     |
| Sky         | `text-sky-400` `from-sky-500/20`           | Processing / neutral |
| Emerald     | `text-emerald-400` `from-emerald-500/20`   | Success / growth     |
| Destructive | `text-destructive` `border-destructive/30` | Errors, danger zones |

Avoid raw `red-500`, `blue-500`, or `green-500`. Use semantic tokens or the palette above.

---

## 7. Shadcn / Base UI Components

All components are in `src/components/ui/`. They wrap **Base UI** primitives — not Radix UI. The API is different.

### Available components

| Component                | File                            | Key notes                                                                                                                                    |
| ------------------------ | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                 | `button.tsx`                    | Variants: `default` `outline` `secondary` `ghost` `destructive` `link`. Sizes: `xs` `sm` `default` `lg` `icon` `icon-xs` `icon-sm` `icon-lg` |
| `Input`                  | `input.tsx`                     | Standard: `h-9 text-sm`                                                                                                                      |
| `Textarea`               | `textarea.tsx`                  | Add `resize-none`                                                                                                                            |
| `Label`                  | `label.tsx`                     | Standard: `text-xs font-medium`                                                                                                              |
| `Select`                 | `select.tsx`                    | `SelectTrigger` + `SelectContent` + `SelectItem`                                                                                             |
| `Switch`                 | `switch.tsx`                    | `size="sm"` or `size="default"`                                                                                                              |
| `Card`                   | `card.tsx`                      | `Card` `CardHeader` `CardTitle` `CardDescription` `CardContent` `CardFooter` `CardAction`                                                    |
| `Avatar`                 | `avatar.tsx`                    | `Avatar` + `AvatarFallback` (+`AvatarImage` for photos)                                                                                      |
| `Separator`              | `separator.tsx`                 | Add `opacity-30` for subtle dividers                                                                                                         |
| `DropdownMenu`           | `dropdown-menu.tsx`             | Base UI render prop — see below                                                                                                              |
| `Tooltip`                | `tooltip.tsx`                   | Must wrap with `<TooltipProvider delay={200}>`                                                                                               |
| `Sheet`                  | `sheet.tsx`                     | Drawer / side panel                                                                                                                          |
| `Alert` / `AlertDialog`  | `alert.tsx` `alert-dialog.tsx`  | Standard use                                                                                                                                 |
| `Toggle` / `ToggleGroup` | `toggle.tsx` `toggle-group.tsx` | Standard use                                                                                                                                 |

### Base UI render prop (critical difference from shadcn v1)

Base UI uses **`render` prop** instead of `asChild` for element composition:

```tsx
// Correct — Base UI pattern
<DropdownMenuItem
  render={
    <Link href="/profile" className="flex cursor-pointer items-center gap-2" />
  }
>
  <User className="h-4 w-4" />
  Profile
</DropdownMenuItem>

// Wrong — Radix / shadcn v1 (not supported here)
<DropdownMenuItem asChild>
  <Link href="/profile">Profile</Link>
</DropdownMenuItem>
```

This applies to: `DropdownMenuTrigger`, `DropdownMenuItem`, `TooltipTrigger`, and any other trigger / item component.

### cn() utility

```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', isActive && 'active-class', className)} />;
```

---

## 8. Responsiveness

The shell has a fixed left rail (`w-14`) and top nav (`h-14`). The `(app)` layout applies `pl-14 pt-14` automatically.

### Breakpoints

| Prefix   | Min-width | Common use               |
| -------- | --------- | ------------------------ |
| _(none)_ | 0px       | Mobile-first base        |
| `sm:`    | 640px     | Two-column form grids    |
| `md:`    | 768px     | General purpose          |
| `lg:`    | 1024px    | Two-column content grids |
| `xl:`    | 1280px    | Four-column stat grids   |

### Standard responsive patterns

```tsx
// 2-col form grid (sm+)
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

// 2-col content grid (lg+)
<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

// 4-col stat grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
```

For horizontally scrollable table-like content, wrap in `overflow-x-auto`.

---

## 9. Internationalisation (next-intl)

### Supported locales

```ts
// src/i18n/routing.ts
locales: ['en', 'zh-CN', 'zh-TW'];
defaultLocale: 'en';
```

Every URL is prefixed with the locale segment: `/en/dashboard`, `/zh-CN/settings`.

### Always use i18n-aware navigation

```tsx
// Correct
import { Link, useRouter, usePathname } from '@/i18n/navigation';
<Link href="/dashboard">Dashboard</Link>;

// Wrong — skips locale prefix
import Link from 'next/link';
<Link href="/dashboard">Dashboard</Link>;
```

`@/i18n/navigation` exports: `Link`, `redirect`, `useRouter`, `usePathname`, `getPathname`.

### Adding translated strings

1. Add keys to **all three** files: `en.json`, `zh-CN.json`, `zh-TW.json`.
2. Use the right hook/function for the component type:

```tsx
// Server component
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('ProfilePage');
return <h1>{t('title')}</h1>;

// Client component
('use client');
import { useTranslations } from 'next-intl';
const t = useTranslations('ProfilePage');
return <button>{t('save')}</button>;
```

3. Namespace keys: **PascalCase** matching the page or component name — e.g., `"ProfilePage"`, `"TopNav"`.

For placeholder text not yet ready for translation, hardcode English and add `// TODO: i18n`.

---

## 10. Authentication & Session

Session is a cookie-based JWT, readable **server-side only**.

```tsx
import { getSession } from '@/lib/session';

export default async function MyPage() {
  const session = await getSession(); // null if unauthenticated
  const email = session?.email ?? '';
}
```

```ts
// SessionPayload shape
type SessionPayload = {
  userId: string;
  email: string;
  expiresAt: Date;
};
```

Do **not** add redirect logic to individual pages. Auth redirect is handled globally by `middleware.ts`.

---

## 11. Icons

Use **Lucide React** only. Import individually, not as a wildcard.

```tsx
import { Settings, User, LogOut, AudioWaveform } from 'lucide-react';

// Size by context
<Settings className="h-4 w-4" />           // nav and button icons
<AudioWaveform className="h-5 w-5" />      // stat card icons
<User className="h-[18px] w-[18px]" />     // left rail icons (exact sizing)
```

Icon color conventions:

| Context                | Class                   |
| ---------------------- | ----------------------- |
| Accent (inside cards)  | `text-violet-400`       |
| Secondary / decorative | `text-muted-foreground` |
| Danger zone            | `text-destructive`      |

---

## 12. Dos and Donts

### Do

- Use `cn()` for all conditional className merging
- Use `font-heading` on all headings (h1–h3)
- Give every interactive element a unique `id` — required for automated browser testing
- Use `border-white/8` for card/panel borders (dark-mode safe without dark: variants)
- Default to `mx-auto max-w-3xl space-y-8` for page content containers
- Import navigation from `@/i18n/navigation` for locale-aware routing
- Default to async Server Components; add `'use client'` only where hooks or event handlers are required

### Don't

- Don't import `Link` from `next/link` — use `@/i18n/navigation`
- Don't use `asChild` — use the Base UI `render` prop pattern
- Don't use Radix UI primitives — all primitives in this project are Base UI
- Don't manually add `pt-14` or `pl-14` in page files — the shell layout handles this
- Don't use ad-hoc colors like `text-red-500` or `bg-blue-600` — use semantic tokens or the violet/indigo palette
- Don't use `<style>` tags or inline `style={{}}` for anything Tailwind can handle
- Don't add i18n keys to only `en.json` — always update all three locale files

---

## 13. New Page Checklist

```
[ ] File at: src/app/[locale]/(app)/<route>/page.tsx
[ ] h1 uses: font-heading text-2xl font-bold tracking-tight
[ ] Outer div: mx-auto max-w-3xl space-y-8 (or deviation documented)
[ ] Every interactive element has a unique id attribute
[ ] All links use @/i18n/navigation, not next/link
[ ] No ad-hoc colors outside violet/indigo/semantic token palette
[ ] Server Component by default; 'use client' only where needed
[ ] Session via getSession() (server only) if user data is needed
[ ] i18n keys added to en.json, zh-CN.json, zh-TW.json (or TODO: i18n comment)
[ ] pnpm format run before committing
```

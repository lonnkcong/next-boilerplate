'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Settings2,
  Sparkles,
  Mic2,
  FileAudio,
  HelpCircle,
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FileAudio },
  { label: 'Record', href: '/record', icon: Mic2 },
  { label: 'Setup', href: '/setup', icon: Sparkles },
];

const bottomItems: NavItem[] = [
  { label: 'Help', href: '/help', icon: HelpCircle },
  { label: 'Settings', href: '/settings', icon: Settings2 },
];

function NavItemButton({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isActive =
    pathname === item.href ||
    (item.href !== '/dashboard' && pathname.startsWith(item.href));

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={item.href}
            id={`nav-${item.href.replace('/', '')}`}
            className={cn(
              'group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150',
              isActive
                ? 'bg-violet-500/15 text-violet-400 shadow-sm ring-1 ring-violet-500/20'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          />
        }
      >
        {isActive && (
          <span className="absolute left-0 h-5 w-0.5 rounded-r-full bg-violet-500" />
        )}
        <item.icon
          className="h-[18px] w-[18px]"
          strokeWidth={isActive ? 2.5 : 2}
        />
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

export function LeftRail() {
  const pathname = usePathname();

  return (
    <TooltipProvider delay={200}>
      <aside
        id="left-rail"
        className="bg-background/90 fixed top-14 bottom-0 left-0 z-40 flex w-14 flex-col items-center border-r border-white/8 py-3 backdrop-blur-md"
      >
        {/* Main nav */}
        <nav className="flex flex-1 flex-col items-center gap-1.5">
          {navItems.map((item) => (
            <NavItemButton key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="flex flex-col items-center gap-1.5">
          <Separator className="mb-1.5 w-6 opacity-30" />
          {bottomItems.map((item) => (
            <NavItemButton key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </aside>
    </TooltipProvider>
  );
}

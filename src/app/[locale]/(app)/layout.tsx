import { getSession } from '@/lib/session';
import { TopNav } from '@/components/top-nav';
import { LeftRail } from '@/components/left-rail';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col">
      <TopNav userEmail={session?.email} />
      <LeftRail />
      {/* Content offset: top-14 for navbar, pl-14 for left rail */}
      <main className="flex-1 pt-14 pl-14">
        <div className="mx-auto max-w-3xl p-6">{children}</div>
      </main>
    </div>
  );
}

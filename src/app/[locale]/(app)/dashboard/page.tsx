import { getSession } from '@/lib/session';
import { AudioWaveform, Mic2, FileAudio, TrendingUp } from 'lucide-react';

const stats = [
  {
    id: 'stat-projects',
    label: 'Total Projects',
    value: '12',
    change: '+2 this week',
    icon: FileAudio,
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
  },
  {
    id: 'stat-recordings',
    label: 'Recordings',
    value: '48',
    change: '+8 this week',
    icon: Mic2,
    color: 'from-indigo-500/20 to-indigo-600/5',
    iconColor: 'text-indigo-400',
  },
  {
    id: 'stat-processed',
    label: 'Hours Processed',
    value: '3.2h',
    change: '+0.8h this week',
    icon: AudioWaveform,
    color: 'from-sky-500/20 to-sky-600/5',
    iconColor: 'text-sky-400',
  },
  {
    id: 'stat-growth',
    label: 'Accuracy',
    value: '97.4%',
    change: '+1.2% vs last month',
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
];

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Welcome back, {session?.email?.split('@')[0] ?? 'there'} 👋
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            className={`relative overflow-hidden rounded-xl border border-white/8 bg-gradient-to-br p-5 ${stat.color}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-medium">
                  {stat.label}
                </p>
                <p className="font-heading mt-1.5 text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {stat.change}
                </p>
              </div>
              <div className={`rounded-lg bg-white/5 p-2 ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder content cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="bg-card rounded-xl border border-white/8 p-6">
          <h2 className="font-heading mb-4 text-sm font-semibold">
            Recent Projects
          </h2>
          <div className="space-y-3">
            {[
              'Podcast Episode 12',
              'Interview: John Doe',
              'Product Demo Audio',
            ].map((name, i) => (
              <div
                key={i}
                className="bg-muted/40 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
              >
                <FileAudio className="text-muted-foreground h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{name}</span>
                <span className="text-muted-foreground text-xs">
                  Placeholder
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-white/8 p-6">
          <h2 className="font-heading mb-4 text-sm font-semibold">Activity</h2>
          <div className="space-y-3">
            {[
              'Transcription completed for Episode 12',
              'New recording uploaded',
              'Project settings updated',
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                <span className="text-muted-foreground">{event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

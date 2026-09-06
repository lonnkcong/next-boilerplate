import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Palette, Globe, KeyRound, Shield, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Configure your workspace preferences and account options.
        </p>
      </div>

      {/* Appearance */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Palette className="h-4 w-4 text-violet-400" />
            Appearance
          </CardTitle>
          <CardDescription className="text-xs">
            Customize how Voxudio looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-muted-foreground text-xs">
                Choose between light, dark, or system default.
              </p>
            </div>
            <Select defaultValue="system">
              <SelectTrigger
                id="settings-theme-select"
                className="h-9 w-36 text-sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator className="opacity-30" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Language</p>
              <p className="text-muted-foreground text-xs">
                Set your preferred interface language.
              </p>
            </div>
            <Select defaultValue="en">
              <SelectTrigger
                id="settings-language-select"
                className="h-9 w-36 text-sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh-CN">中文 (简体)</SelectItem>
                <SelectItem value="zh-TW">中文 (繁體)</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-violet-400" />
            Notifications
          </CardTitle>
          <CardDescription className="text-xs">
            Choose what activity you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              id: 'notif-transcription',
              label: 'Transcription complete',
              description: 'When a recording finishes processing.',
              defaultValue: 'email',
            },
            {
              id: 'notif-project',
              label: 'Project activity',
              description: 'Comments and updates on your projects.',
              defaultValue: 'none',
            },
            {
              id: 'notif-product',
              label: 'Product updates',
              description: 'New features and announcements.',
              defaultValue: 'email',
            },
          ].map((item, i, arr) => (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
                <Select defaultValue={item.defaultValue}>
                  <SelectTrigger id={item.id} className="h-9 w-28 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="in-app">In-app</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {i < arr.length - 1 && <Separator className="mt-4 opacity-30" />}
            </div>
          ))}
          <Separator className="opacity-30" />
          <div className="flex justify-end">
            <Button
              id="save-notifications-btn"
              className="bg-violet-600 px-5 text-sm text-white hover:bg-violet-500"
            >
              Save preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4 text-violet-400" />
            Security
          </CardTitle>
          <CardDescription className="text-xs">
            Update your password and manage active sessions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label
              htmlFor="settings-current-password"
              className="text-xs font-medium"
            >
              Current password
            </Label>
            <Input
              id="settings-current-password"
              type="password"
              placeholder="••••••••"
              className="h-9 text-sm"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="settings-new-password"
                className="text-xs font-medium"
              >
                New password
              </Label>
              <Input
                id="settings-new-password"
                type="password"
                placeholder="••••••••"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="settings-confirm-password"
                className="text-xs font-medium"
              >
                Confirm new password
              </Label>
              <Input
                id="settings-confirm-password"
                type="password"
                placeholder="••••••••"
                className="h-9 text-sm"
              />
            </div>
          </div>
          <Separator className="opacity-30" />
          <div className="flex justify-end">
            <Button
              id="update-password-btn"
              className="bg-violet-600 px-5 text-sm text-white hover:bg-violet-500"
            >
              Update password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations placeholder */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-violet-400" />
            Integrations
          </CardTitle>
          <CardDescription className="text-xs">
            Connect third-party services to your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 'integration-google',
                name: 'Google Drive',
                desc: 'Sync projects to your Drive.',
                connected: false,
              },
              {
                id: 'integration-notion',
                name: 'Notion',
                desc: 'Export transcripts to Notion pages.',
                connected: true,
              },
              {
                id: 'integration-slack',
                name: 'Slack',
                desc: 'Receive notifications in Slack.',
                connected: false,
              },
            ].map((svc) => (
              <div
                key={svc.id}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{svc.name}</p>
                  <p className="text-muted-foreground text-xs">{svc.desc}</p>
                </div>
                <Button
                  id={svc.id}
                  variant={svc.connected ? 'outline' : 'secondary'}
                  size="sm"
                  className={`ml-4 shrink-0 text-xs ${
                    svc.connected
                      ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                      : ''
                  }`}
                >
                  {svc.connected ? 'Connected' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Shield className="text-destructive h-4 w-4" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-xs">
            These actions are permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Export all data</p>
              <p className="text-muted-foreground text-xs">
                Download a full archive of your projects and transcripts.
              </p>
            </div>
            <Button
              id="export-data-btn"
              variant="outline"
              size="sm"
              className="ml-4 shrink-0 text-xs"
            >
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Delete workspace</p>
              <p className="text-muted-foreground text-xs">
                Permanently delete this workspace and all its data.
              </p>
            </div>
            <Button
              id="delete-workspace-btn"
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 ml-4 shrink-0 text-xs"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

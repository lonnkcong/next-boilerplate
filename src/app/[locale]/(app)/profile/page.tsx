import { getSession } from '@/lib/session';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Mail, User, Shield } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();
  const email = session?.email ?? '';
  const username = email.split('@')[0] ?? 'User';
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Profile
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your public profile and personal information.
        </p>
      </div>

      {/* Avatar & display name */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-violet-400" />
            Profile Picture
          </CardTitle>
          <CardDescription className="text-xs">
            Your avatar is shown across Voxudio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                id="upload-avatar-btn"
                aria-label="Upload avatar"
                className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-violet-600 shadow-lg transition-colors hover:bg-violet-500"
              >
                <Camera className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-muted-foreground text-xs">{email}</p>
              <div className="flex gap-2 pt-1">
                <Button
                  id="upload-photo-btn"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                >
                  Upload photo
                </Button>
                <Button
                  id="remove-photo-btn"
                  variant="ghost"
                  size="sm"
                  className="text-destructive h-7 text-xs hover:text-red-400"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal information */}
      <Card className="bg-card border-white/8">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-violet-400" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-xs">
            Update your name, username and bio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-display-name"
                className="text-xs font-medium"
              >
                Display name
              </Label>
              <Input
                id="profile-display-name"
                placeholder="Your display name"
                defaultValue={username}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-username" className="text-xs font-medium">
                Username
              </Label>
              <Input
                id="profile-username"
                placeholder="username"
                defaultValue={username}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email" className="text-xs font-medium">
              Email address
            </Label>
            <Input
              id="profile-email"
              type="email"
              placeholder="you@example.com"
              defaultValue={email}
              disabled
              className="h-9 text-sm opacity-60"
            />
            <p className="text-muted-foreground text-xs">
              Email changes require verification and are managed in{' '}
              <span className="text-violet-400">Settings → Account</span>.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-bio" className="text-xs font-medium">
              Bio
            </Label>
            <Textarea
              id="profile-bio"
              placeholder="Tell us a little about yourself…"
              rows={3}
              className="resize-none text-sm"
            />
            <p className="text-muted-foreground text-right text-xs">0 / 160</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-website" className="text-xs font-medium">
              Website
            </Label>
            <Input
              id="profile-website"
              type="url"
              placeholder="https://yoursite.com"
              className="h-9 text-sm"
            />
          </div>
          <Separator className="opacity-30" />
          <div className="flex justify-end">
            <Button
              id="save-profile-btn"
              className="bg-violet-600 px-5 text-sm text-white hover:bg-violet-500"
            >
              Save changes
            </Button>
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
            Irreversible actions — proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-white/8 bg-white/2 px-4 py-3">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-muted-foreground text-xs">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Button
              id="delete-account-btn"
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 ml-4 shrink-0 text-xs"
            >
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

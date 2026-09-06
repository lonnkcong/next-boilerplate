'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AudioWaveform } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function SignupPage() {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[oklch(0.12_0.02_265)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[oklch(0.45_0.25_265)] opacity-20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-[oklch(0.55_0.22_315)] opacity-15 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.6_0.2_200)] opacity-10 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm px-4"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
              <AudioWaveform className="h-6 w-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="font-heading text-xl font-bold text-white">
                Create account
              </h1>
              <p className="mt-1 text-sm text-white/50">Sign up for Voxudio</p>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white/70"
              >
                Email
              </Label>
              <Input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className="border-white/10 bg-white/8 text-white placeholder:text-white/25 focus-visible:border-violet-500/60 focus-visible:ring-violet-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white/70"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="border-white/10 bg-white/8 text-white placeholder:text-white/25 focus-visible:border-violet-500/60 focus-visible:ring-violet-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium text-white/70"
              >
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="border-white/10 bg-white/8 text-white placeholder:text-white/25 focus-visible:border-violet-500/60 focus-visible:ring-violet-500/20"
              />
            </div>

            <Button
              type="submit"
              id="signup-submit"
              className="mt-2 w-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 active:scale-[0.98]"
            >
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-white/40">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-violet-300 underline-offset-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

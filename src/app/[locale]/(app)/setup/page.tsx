'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronRight, Building2, Mic2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 'workspace',
    label: 'Workspace',
    icon: Building2,
    description: 'Name your workspace',
  },
  {
    id: 'audio',
    label: 'Audio',
    icon: Mic2,
    description: 'Configure audio settings',
  },
  {
    id: 'team',
    label: 'Team',
    icon: Users,
    description: 'Invite collaborators',
  },
];

export default function SetupPage() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<Set<number>>(new Set());

  const handleNext = () => {
    setCompleted((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">
          Account Setup
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Complete these steps to get your workspace ready.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <button
              id={`setup-step-${step.id}`}
              onClick={() => setCurrentStep(i)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1.5 py-3 text-center transition-colors',
                currentStep === i
                  ? 'text-foreground'
                  : completed.has(i)
                    ? 'text-violet-400'
                    : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                  currentStep === i
                    ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                    : completed.has(i)
                      ? 'border-violet-500 bg-violet-500 text-white'
                      : 'border-border bg-muted/50',
                )}
              >
                {completed.has(i) ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="text-xs font-medium">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'mb-5 h-px flex-1 transition-colors',
                  completed.has(i) ? 'bg-violet-500/50' : 'bg-border',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <Separator />

      {/* Step content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-card rounded-xl border border-white/8 p-6"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            {React.createElement(steps[currentStep].icon, {
              className: 'h-5 w-5',
            })}
          </div>
          <div>
            <h2 className="font-heading font-semibold">
              {steps[currentStep].label}
            </h2>
            <p className="text-muted-foreground text-sm">
              {steps[currentStep].description}
            </p>
          </div>
        </div>

        {/* Step-specific placeholder content */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="workspace-name">Workspace name</Label>
              <Input id="workspace-name" placeholder="Acme Studio" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="workspace-url">Workspace URL</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  voxudio.io/
                </span>
                <Input
                  id="workspace-url"
                  placeholder="acme-studio"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Default language</Label>
              <Input
                id="default-language"
                placeholder="English (US)"
                defaultValue="English (US)"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Audio quality</Label>
              <div className="grid grid-cols-3 gap-2">
                {['Standard', 'High', 'Lossless'].map((q, i) => (
                  <button
                    key={q}
                    id={`quality-${q.toLowerCase()}`}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                      i === 1
                        ? 'border-violet-500/60 bg-violet-500/10 text-violet-400'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-border/80',
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="invite-email">Invite by email</Label>
              <div className="flex gap-2">
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@company.com"
                  className="flex-1"
                />
                <Button variant="outline" id="invite-btn">
                  Invite
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Invited members will receive an email to join your workspace.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          id="setup-back-btn"
          variant="ghost"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => s - 1)}
        >
          Back
        </Button>
        <Button
          id="setup-next-btn"
          onClick={handleNext}
          className="gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500"
        >
          {currentStep === steps.length - 1 ? 'Finish Setup' : 'Continue'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRoadmapProgress, setFocusCert } from "@/lib/progress";
import { ProgressBar, Icon, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * The "Your Preparation" sidebar card on a certification page. Reads the same
 * local progress store as the roadmap, so ticking a step updates both.
 */
export function PreparationPanel({
  certSlug,
  certName,
  totalSteps,
  questionCount,
}: {
  certSlug: string;
  certName: string;
  totalSteps: number;
  questionCount: number;
}) {
  const { completed, percent, ready } = useRoadmapProgress(certSlug, totalSteps);

  return (
    <div className="rounded-card border border-ink-200 bg-white p-5">
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
        Your Preparation
      </h2>

      <p className="mt-3 text-2xl font-semibold text-ink-900">
        {ready ? `${percent}%` : "—"}
        <span className="ml-1.5 text-[0.8125rem] font-normal text-ink-500">
          complete
        </span>
      </p>

      <ProgressBar value={ready ? percent : 0} label={`${certName} progress`} className="mt-3" />

      <p className="mt-2.5 text-[0.8125rem] text-ink-500">
        {ready
          ? `${completed.length} of ${totalSteps} roadmap steps`
          : "Loading your progress…"}
      </p>

      <Link
        href="#preparation-roadmap"
        onClick={() => setFocusCert(certSlug)}
        className={cn(buttonClass("primary", "md"), "mt-4 w-full")}
      >
        {completed.length > 0 ? "Continue Learning" : "Start Learning"}
        <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
      </Link>

      {questionCount > 0 ? (
        <Link
          href={`/practice-tests/${certSlug}`}
          className={cn(buttonClass("secondary", "md"), "mt-2 w-full")}
        >
          Practice test · {questionCount} questions
        </Link>
      ) : null}

      <p className="mt-4 border-t border-ink-200 pt-3.5 text-[0.75rem] leading-relaxed text-ink-500">
        Progress is stored in this browser. Accounts with synced progress across
        devices are on the way.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { RoadmapStep } from "@/types";
import { useRoadmapProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Interactive study roadmap. Completion is stored locally in the browser —
 * see lib/progress.ts — so it works without an account today and can be moved
 * behind an API later without changing this component.
 */
export function StudyRoadmap({
  certSlug,
  steps,
  learnTitles,
}: {
  certSlug: string;
  steps: RoadmapStep[];
  /** slug → title lookup, resolved on the server. */
  learnTitles: Record<string, string>;
}) {
  const { completed, toggle, percent, ready } = useRoadmapProgress(
    certSlug,
    steps.length,
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3">
        <p className="text-[0.875rem] text-ink-600">
          {ready ? (
            <>
              <span className="font-semibold text-ink-900">
                {completed.length} of {steps.length}
              </span>{" "}
              steps complete ({percent}%)
            </>
          ) : (
            <span className="text-ink-500">Loading your progress…</span>
          )}
        </p>
        <p className="text-[0.75rem] text-ink-500">
          Progress is saved in this browser
        </p>
      </div>

      <ol className="relative">
        {steps.map((step, i) => {
          const done = completed.includes(i);
          const last = i === steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
              {!last ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[1.0625rem] top-9 h-[calc(100%-1.75rem)] w-px",
                    done ? "bg-success-200" : "bg-ink-200",
                  )}
                />
              ) : null}

              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={done}
                aria-label={
                  done
                    ? `Mark step ${i + 1}, ${step.title}, as not complete`
                    : `Mark step ${i + 1}, ${step.title}, as complete`
                }
                className={cn(
                  "relative z-10 flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full border-2 text-[0.75rem] font-semibold transition-colors",
                  done
                    ? "border-success-500 bg-success-500 text-white"
                    : "border-ink-300 bg-white text-ink-500 hover:border-brand-400 hover:text-brand-600",
                )}
              >
                {done ? (
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
                ) : (
                  i + 1
                )}
              </button>

              <div className="min-w-0 flex-1 pt-1">
                <h3
                  className={cn(
                    "text-[1rem] leading-snug",
                    done && "text-ink-500 line-through decoration-ink-300",
                  )}
                >
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-600">
                  {step.summary}
                </p>
                {step.learn.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {step.learn.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/learn/${slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[0.75rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                        >
                          <Icon
                            name="book"
                            className="h-3.5 w-3.5 text-ink-400"
                            strokeWidth={1.8}
                          />
                          {learnTitles[slug] ?? slug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 flex items-center gap-3 rounded-xl border border-success-200 bg-success-50 px-4 py-3">
        <Icon name="flag" className="h-5 w-5 text-success-500" />
        <p className="text-[0.9rem] font-medium text-success-700">
          Certification ready
        </p>
      </div>
    </div>
  );
}

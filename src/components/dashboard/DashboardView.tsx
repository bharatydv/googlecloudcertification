"use client";

import Link from "next/link";
import {
  averageScore,
  clearProgress,
  questionsAnswered,
  studyStreak,
  useHydrated,
  useProgress,
  weakTopics,
} from "@/lib/progress";
import { formatDate, pluralize } from "@/lib/utils";
import { Icon, ProgressBar, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CertMeta {
  slug: string;
  name: string;
  shortName: string;
  roadmapSteps: number;
  questionCount: number;
}

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: "chart" | "list" | "spark" | "target";
}) {
  return (
    <div className="rounded-card border border-ink-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Icon name={icon} className="h-4 w-4 text-brand-500" />
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
          {label}
        </p>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink-900">{value}</p>
      {hint ? <p className="mt-1 text-[0.8125rem] text-ink-500">{hint}</p> : null}
    </div>
  );
}

export function DashboardView({
  certs,
  topicLabels,
}: {
  certs: CertMeta[];
  topicLabels: Record<string, string>;
}) {
  const { progress } = useProgress();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="rounded-card border border-ink-200 bg-white p-10 text-center">
        <p className="text-[0.9375rem] text-ink-500">Loading your progress…</p>
      </div>
    );
  }

  const certsByProgress = certs
    .map((cert) => {
      const completed = progress.roadmap[cert.slug]?.length ?? 0;
      return {
        ...cert,
        completed,
        percent:
          cert.roadmapSteps > 0
            ? Math.round((completed / cert.roadmapSteps) * 100)
            : 0,
      };
    })
    .filter((c) => c.completed > 0)
    .sort((a, b) => b.percent - a.percent);

  const focus =
    certsByProgress.find((c) => c.slug === progress.focusCert) ??
    certsByProgress[0];

  const answered = questionsAnswered(progress);
  const average = averageScore(progress);
  const streak = studyStreak(progress);
  const weak = weakTopics(progress).slice(0, 4);
  const hasActivity =
    answered > 0 || certsByProgress.length > 0 || progress.readTopics.length > 0;

  if (!hasActivity) {
    return (
      <div className="rounded-card border border-dashed border-ink-300 bg-white p-10 text-center">
        <Icon name="compass" className="mx-auto h-8 w-8 text-brand-400" />
        <h2 className="mt-4 text-[1.25rem]">Nothing tracked yet</h2>
        <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
          Your dashboard fills in as you use the site. Tick roadmap steps on a
          certification page or complete a practice test, and your progress
          appears here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/certifications" className={buttonClass("primary", "md")}>
            Choose a certification
          </Link>
          <Link href="/practice-tests" className={buttonClass("secondary", "md")}>
            Take a practice test
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* --------------------------- Focus card --------------------------- */}
      {focus ? (
        <div className="rounded-card border border-ink-200 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-7">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-brand-600">
            Continue where you left off
          </p>
          <h2 className="mt-2 text-[1.5rem]">{focus.name}</h2>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-semibold text-ink-900">
              {focus.percent}%
            </span>
            <span className="text-[0.875rem] text-ink-600">
              {focus.completed} of {focus.roadmapSteps} roadmap steps complete
            </span>
          </div>

          <ProgressBar
            value={focus.percent}
            label={`${focus.name} progress`}
            className="mt-3"
            tone={focus.percent >= 80 ? "success" : "brand"}
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/certifications/${focus.slug}#preparation-roadmap`}
              className={buttonClass("primary", "md")}
            >
              Continue Learning
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>
            {focus.questionCount > 0 ? (
              <Link
                href={`/practice-tests/${focus.slug}`}
                className={buttonClass("secondary", "md")}
              >
                Practice questions
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* ----------------------------- Stats ------------------------------ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="chart"
          label="Practice performance"
          value={average === null ? "—" : `${average}%`}
          hint={
            average === null
              ? "Complete a test to see this"
              : `Across ${pluralize(progress.attempts.length, "attempt")}`
          }
        />
        <StatCard
          icon="list"
          label="Questions completed"
          value={String(answered)}
          hint={answered === 0 ? "No questions yet" : "Across all attempts"}
        />
        <StatCard
          icon="spark"
          label="Study streak"
          value={streak === 0 ? "—" : pluralize(streak, "day")}
          hint={
            streak === 0
              ? "Come back tomorrow to start one"
              : "Consecutive days of activity"
          }
        />
        <StatCard
          icon="target"
          label="Topics read"
          value={String(progress.readTopics.length)}
          hint="Learning hub topics opened"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* -------------------------- Weak topics ------------------------- */}
        <div className="rounded-card border border-ink-200 bg-white p-6">
          <h2 className="text-[1.125rem]">Weak topics</h2>
          <p className="mt-1.5 text-[0.875rem] text-ink-600">
            Lowest accuracy first, from your practice attempts.
          </p>

          {weak.length === 0 ? (
            <p className="mt-5 text-[0.9rem] text-ink-500">
              Complete a practice test to see which topics need work.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {weak.map((row) => (
                <li key={row.topic}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <Link
                      href={`/practice-tests/topics/${row.topic}`}
                      className="text-[0.9rem] font-medium text-ink-800 hover:text-brand-600"
                    >
                      {topicLabels[row.topic] ?? row.topic}
                    </Link>
                    <span className="text-[0.8125rem] tabular-nums text-ink-500">
                      {row.accuracy}% of {row.answered}
                    </span>
                  </div>
                  <ProgressBar
                    value={row.accuracy}
                    label={`${topicLabels[row.topic] ?? row.topic} accuracy`}
                    tone={row.accuracy >= 80 ? "success" : "brand"}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ------------------------ Recent activity ----------------------- */}
        <div className="rounded-card border border-ink-200 bg-white p-6">
          <h2 className="text-[1.125rem]">Recent activity</h2>

          {progress.attempts.length === 0 ? (
            <p className="mt-5 text-[0.9rem] text-ink-500">
              No practice attempts recorded yet.
            </p>
          ) : (
            <ul className="mt-5 divide-y divide-ink-200">
              {progress.attempts.slice(0, 6).map((attempt, i) => {
                const percent = Math.round(
                  (attempt.correct / Math.max(1, attempt.total)) * 100,
                );
                const isTopic = attempt.subject.startsWith("topic:");
                const label = isTopic
                  ? (topicLabels[attempt.subject.slice(6)] ??
                    attempt.subject.slice(6))
                  : (certs.find((c) => c.slug === attempt.subject)?.shortName ??
                    attempt.subject);

                return (
                  <li
                    key={`${attempt.date}-${i}`}
                    className="flex items-center gap-4 py-3"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.75rem] font-semibold",
                        percent >= 80
                          ? "bg-success-50 text-success-700"
                          : percent >= 65
                            ? "bg-warning-50 text-warning-700"
                            : "bg-danger-50 text-danger-700",
                      )}
                    >
                      {percent}%
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.9rem] font-medium text-ink-800">
                        {label}
                      </p>
                      <p className="text-[0.8125rem] text-ink-500">
                        {attempt.correct}/{attempt.total} correct ·{" "}
                        {formatDate(attempt.date.slice(0, 10))}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* --------------------------- All progress ------------------------- */}
      {certsByProgress.length > 1 ? (
        <div className="rounded-card border border-ink-200 bg-white p-6">
          <h2 className="text-[1.125rem]">All certification progress</h2>
          <ul className="mt-5 space-y-4">
            {certsByProgress.map((cert) => (
              <li key={cert.slug}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <Link
                    href={`/certifications/${cert.slug}`}
                    className="text-[0.9rem] font-medium text-ink-800 hover:text-brand-600"
                  >
                    {cert.name}
                  </Link>
                  <span className="text-[0.8125rem] tabular-nums text-ink-500">
                    {cert.completed}/{cert.roadmapSteps}
                  </span>
                </div>
                <ProgressBar value={cert.percent} label={`${cert.name} progress`} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* --------------------------- Bookmarks ---------------------------- */}
      {progress.bookmarks.length > 0 ? (
        <div className="rounded-card border border-ink-200 bg-white p-6">
          <h2 className="text-[1.125rem]">Bookmarks</h2>
          <ul className="mt-4 space-y-1">
            {progress.bookmarks.map((bookmark) => (
              <li key={bookmark.href}>
                <Link
                  href={bookmark.href}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-[0.9rem] text-ink-700 hover:bg-ink-50 hover:text-brand-700"
                >
                  <Icon name="bookmark" className="h-4 w-4 text-ink-400" />
                  {bookmark.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-ink-200 bg-ink-50 p-5">
        <p className="text-[0.8125rem] leading-relaxed text-ink-600">
          Progress is stored in this browser only. It is not sent anywhere and
          will not follow you to another device.
        </p>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Clear all locally stored progress? This cannot be undone.",
              )
            ) {
              clearProgress();
            }
          }}
          className="text-[0.8125rem] font-medium text-danger-500 underline underline-offset-2 hover:text-danger-700"
        >
          Clear my progress
        </button>
      </div>
    </div>
  );
}

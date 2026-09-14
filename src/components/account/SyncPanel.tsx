"use client";

import { useState } from "react";
import { useHydrated, useProgress } from "@/lib/progress";
import {
  clearProgressEverywhere,
  pushNow,
  useSyncStatus,
  type SyncStatus,
} from "@/lib/progress-sync";
import { Button, Icon } from "@/components/ui";

/**
 * What is being synced, and whether it worked.
 *
 * Sync is invisible by design — it happens in the background on every page —
 * so this is the one place that says out loud what is stored and gives a way
 * to force it or wipe it.
 */

const statusCopy: Record<SyncStatus, { label: string; tone: string }> = {
  off: { label: "Not syncing", tone: "text-ink-500" },
  syncing: { label: "Syncing…", tone: "text-ink-500" },
  synced: { label: "Synced", tone: "text-success-700" },
  error: { label: "Could not sync", tone: "text-danger-500" },
};

function formatTime(epochMs: number) {
  return new Date(epochMs).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function SyncPanel({ signedIn }: { signedIn: boolean }) {
  const { progress } = useProgress();
  const hydrated = useHydrated();
  const { status, lastSyncedAt } = useSyncStatus();
  const [confirming, setConfirming] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Progress lives in localStorage, which does not exist during the server
  // render. Counting before hydration would print zeroes and then correct
  // itself, so the placeholder holds until the real numbers are readable.
  if (!hydrated) {
    return (
      <p className="text-[0.9375rem] text-ink-500">Reading your progress…</p>
    );
  }

  const counts = [
    { value: progress.attempts.length, singular: "practice attempt" },
    { value: progress.readTopics.length, singular: "topic read", plural: "topics read" },
    { value: progress.bookmarks.length, singular: "bookmark" },
    { value: progress.activeDays.length, singular: "day studied", plural: "days studied" },
  ];

  const copy = statusCopy[status];

  const clear = async () => {
    setClearing(true);
    try {
      await clearProgressEverywhere(signedIn);
      setConfirming(false);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem]">
        <span className={copy.tone}>{copy.label}</span>
        {lastSyncedAt ? (
          <span className="text-ink-500">· last at {formatTime(lastSyncedAt)}</span>
        ) : null}
        {signedIn ? (
          <button
            type="button"
            onClick={() => void pushNow()}
            disabled={status === "syncing"}
            className="ml-auto text-[0.8125rem] font-medium text-brand-600 underline underline-offset-2 disabled:opacity-50"
          >
            Sync now
          </button>
        ) : null}
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map((count) => (
          <div
            key={count.singular}
            className="rounded-lg border border-ink-200 bg-ink-50 px-3.5 py-3"
          >
            <dt className="text-[1.25rem] font-semibold text-ink-900">
              {count.value}
            </dt>
            <dd className="mt-0.5 text-[0.8125rem] leading-snug text-ink-600">
              {count.value === 1
                ? count.singular
                : (count.plural ?? `${count.singular}s`)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="rounded-lg border border-danger-200 bg-danger-50/60 p-4">
        <p className="text-[0.875rem] font-semibold text-danger-700">
          Clear your study progress
        </p>
        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-danger-700/90">
          {signedIn
            ? "Removes everything above from this browser and from your account, on every device. Your account itself stays."
            : "Removes everything above from this browser."}{" "}
          This cannot be undone.
        </p>

        {confirming ? (
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            <Button
              variant="danger"
              size="sm"
              onClick={() => void clear()}
              disabled={clearing}
            >
              {clearing ? "Clearing…" : "Yes, clear everything"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConfirming(false)}
              disabled={clearing}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-3.5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-danger-700 underline underline-offset-2"
          >
            <Icon name="warning" className="h-4 w-4" />
            Clear progress
          </button>
        )}
      </div>
    </div>
  );
}

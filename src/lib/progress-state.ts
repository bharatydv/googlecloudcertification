/**
 * The shape of a learner's progress, and the pure functions over it.
 *
 * Split out of `progress.ts` — which is a `"use client"` module — because the
 * same types and the same merge have to run on the server too, inside the
 * Server Actions that read and write the synced copy. Nothing in this file
 * touches `window`, React, or the network.
 */

export interface AttemptRecord {
  /** Certification slug, or `topic:<id>` for a topic drill. */
  subject: string;
  date: string;
  correct: number;
  total: number;
  /** Correct/total per question topic, for weak-topic analysis. */
  byTopic: Record<string, { correct: number; total: number }>;
}

export interface ProgressState {
  /** Completed roadmap steps, keyed by cert slug. */
  roadmap: Record<string, number[]>;
  /** Learning topics marked as read. */
  readTopics: string[];
  /** Bookmarked pages. */
  bookmarks: { href: string; title: string }[];
  /** Practice attempts, newest first. */
  attempts: AttemptRecord[];
  /** Dates (YYYY-MM-DD) on which any activity was recorded. */
  activeDays: string[];
  /** The certification the learner is currently focused on. */
  focusCert?: string;
}

export const EMPTY_PROGRESS: ProgressState = {
  roadmap: {},
  readTopics: [],
  bookmarks: [],
  attempts: [],
  activeDays: [],
};

/** Matches the caps applied on write in `progress.ts`. */
const LIMITS = { attempts: 50, bookmarks: 60, activeDays: 400 } as const;

/* ------------------------------------------------------------------ */
/* Parsing                                                             */
/* ------------------------------------------------------------------ */

/**
 * Coerces arbitrary JSON into a valid `ProgressState`, dropping anything that
 * does not fit.
 *
 * Both sources of progress are untrusted in the same way: localStorage can be
 * edited by hand, and the synced row — while readable and writable only by its
 * owner under row level security — is still reachable with that user's own
 * token. Neither can be assumed to hold what we last wrote, and a malformed
 * record must degrade rather than throw somewhere deep in a component.
 */
export function normalizeProgress(input: unknown): ProgressState {
  if (!isRecord(input)) return EMPTY_PROGRESS;

  const roadmap: Record<string, number[]> = {};
  if (isRecord(input.roadmap)) {
    for (const [slug, steps] of Object.entries(input.roadmap)) {
      if (!Array.isArray(steps)) continue;
      const clean = [...new Set(steps.filter(isIndex))].sort((a, b) => a - b);
      if (clean.length > 0) roadmap[slug] = clean;
    }
  }

  return {
    roadmap,
    readTopics: stringList(input.readTopics),
    bookmarks: asArray(input.bookmarks)
      .filter(
        (b): b is { href: string; title: string } =>
          isRecord(b) &&
          typeof b.href === "string" &&
          typeof b.title === "string",
      )
      .map((b) => ({ href: b.href, title: b.title }))
      .slice(0, LIMITS.bookmarks),
    attempts: asArray(input.attempts)
      .filter(isAttempt)
      .map(cleanAttempt)
      .slice(0, LIMITS.attempts),
    activeDays: stringList(input.activeDays).slice(-LIMITS.activeDays),
    ...(typeof input.focusCert === "string"
      ? { focusCert: input.focusCert }
      : {}),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isIndex(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

function stringList(value: unknown): string[] {
  return [...new Set(asArray(value).filter((v): v is string => typeof v === "string"))];
}

function isAttempt(value: unknown): value is AttemptRecord {
  return (
    isRecord(value) &&
    typeof value.subject === "string" &&
    typeof value.date === "string" &&
    typeof value.correct === "number" &&
    typeof value.total === "number"
  );
}

function cleanAttempt(attempt: AttemptRecord): AttemptRecord {
  const byTopic: AttemptRecord["byTopic"] = {};
  if (isRecord(attempt.byTopic)) {
    for (const [topic, counts] of Object.entries(attempt.byTopic)) {
      if (
        isRecord(counts) &&
        typeof counts.correct === "number" &&
        typeof counts.total === "number"
      ) {
        byTopic[topic] = { correct: counts.correct, total: counts.total };
      }
    }
  }
  return {
    subject: attempt.subject,
    date: attempt.date,
    correct: attempt.correct,
    total: attempt.total,
    byTopic,
  };
}

/* ------------------------------------------------------------------ */
/* Merging                                                             */
/* ------------------------------------------------------------------ */

/**
 * An attempt's identity. Two records describing the same sitting must collapse
 * into one when a device syncs, or every attempt would double on each sync and
 * the dashboard averages would be meaningless. `date` is a full ISO timestamp
 * taken at the moment the attempt was recorded, so subject plus timestamp is
 * unique in practice.
 */
function attemptKey(attempt: AttemptRecord) {
  return `${attempt.subject}@${attempt.date}`;
}

/**
 * Combines two copies of a learner's progress.
 *
 * The merge is a union rather than a last-write-wins overwrite, and that is the
 * important property: someone who studies signed-out on a laptop and then signs
 * in on a phone must not lose either side. Progress here is only ever additive
 * — a step gets completed, a topic gets read, an attempt happens — so a union
 * is also the semantically correct answer, not just the safe one.
 *
 * The cost of that choice is that un-completing a roadmap step on one device
 * will not propagate: the other device still has it completed, and the union
 * brings it back. Deletion is rare enough, and silently losing a month of work
 * is bad enough, that the trade is worth making in this direction. Clearing
 * progress explicitly is handled separately, as a write of an empty state.
 *
 * `local` wins only where a single value must be picked, on the reasoning that
 * it reflects the device in front of the learner right now.
 */
export function mergeProgress(
  local: ProgressState,
  remote: ProgressState,
): ProgressState {
  const roadmap: Record<string, number[]> = {};
  for (const slug of new Set([
    ...Object.keys(local.roadmap),
    ...Object.keys(remote.roadmap),
  ])) {
    roadmap[slug] = [
      ...new Set([...(local.roadmap[slug] ?? []), ...(remote.roadmap[slug] ?? [])]),
    ].sort((a, b) => a - b);
  }

  const bookmarks: { href: string; title: string }[] = [];
  const seenBookmarks = new Set<string>();
  for (const bookmark of [...local.bookmarks, ...remote.bookmarks]) {
    if (seenBookmarks.has(bookmark.href)) continue;
    seenBookmarks.add(bookmark.href);
    bookmarks.push(bookmark);
  }

  const attempts = new Map<string, AttemptRecord>();
  for (const attempt of [...local.attempts, ...remote.attempts]) {
    attempts.set(attemptKey(attempt), attempt);
  }

  return {
    roadmap,
    readTopics: [...new Set([...local.readTopics, ...remote.readTopics])],
    bookmarks: bookmarks.slice(0, LIMITS.bookmarks),
    attempts: [...attempts.values()]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, LIMITS.attempts),
    activeDays: [...new Set([...local.activeDays, ...remote.activeDays])]
      .sort()
      .slice(-LIMITS.activeDays),
    ...(local.focusCert ?? remote.focusCert
      ? { focusCert: local.focusCert ?? remote.focusCert }
      : {}),
  };
}

/**
 * True when two states carry the same information, ignoring ordering that the
 * merge does not preserve. Lets the sync skip a write when a merge turned out
 * to be a no-op, which is the common case on every page navigation.
 */
export function sameProgress(a: ProgressState, b: ProgressState): boolean {
  return stableKey(a) === stableKey(b);
}

function stableKey(state: ProgressState) {
  return JSON.stringify({
    roadmap: Object.entries(state.roadmap).sort(([x], [y]) => x.localeCompare(y)),
    readTopics: [...state.readTopics].sort(),
    bookmarks: [...state.bookmarks].map((b) => b.href).sort(),
    attempts: state.attempts.map(attemptKey).sort(),
    activeDays: [...state.activeDays].sort(),
    focusCert: state.focusCert ?? null,
  });
}

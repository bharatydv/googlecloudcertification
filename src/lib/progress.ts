"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Local progress tracking.
 *
 * Until accounts exist, study progress lives in the browser. The shape below
 * is intentionally the shape we would persist server-side, so the storage
 * layer can be swapped for an API call without touching any component:
 * every consumer goes through the hooks in this file.
 *
 * Reads go through `useSyncExternalStore` rather than an effect, so React
 * handles the server/client snapshot difference itself and there is no
 * cascading render on mount.
 */

const STORAGE_KEY = "gcpprep:progress:v1";

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

/* ------------------------------------------------------------------ */
/* Storage access                                                      */
/* ------------------------------------------------------------------ */

function rawValue(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * `useSyncExternalStore` compares snapshots by identity, so parsing on every
 * call would loop forever. We cache the parsed value against the raw string
 * and only re-parse when the underlying string actually changes.
 */
let cachedRaw: string | null = null;
let cachedState: ProgressState = EMPTY_PROGRESS;

function getSnapshot(): ProgressState {
  const raw = rawValue();
  if (raw === cachedRaw) return cachedState;

  cachedRaw = raw;
  if (!raw) {
    cachedState = EMPTY_PROGRESS;
    return cachedState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    cachedState = { ...EMPTY_PROGRESS, ...parsed };
  } catch {
    cachedState = EMPTY_PROGRESS;
  }
  return cachedState;
}

function getServerSnapshot(): ProgressState {
  return EMPTY_PROGRESS;
}

function subscribe(onChange: () => void) {
  window.addEventListener("gcpprep:progress", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("gcpprep:progress", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function read(): ProgressState {
  return getSnapshot();
}

function write(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage can be unavailable (private mode, blocked cookies). Progress
       tracking is a convenience, so failing silently is the right behaviour. */
  }
  // Notify subscribers in this tab; the `storage` event only fires in others.
  window.dispatchEvent(new CustomEvent("gcpprep:progress"));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function touchDay(state: ProgressState): ProgressState {
  const d = today();
  if (state.activeDays.includes(d)) return state;
  return { ...state, activeDays: [...state.activeDays, d].slice(-400) };
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

const noopSubscribe = () => () => {};

/**
 * False during server rendering and on the first client render, true
 * afterwards. Lets components render a stable placeholder without a
 * hydration mismatch and without setting state from an effect.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const update = useCallback((fn: (prev: ProgressState) => ProgressState) => {
    write(touchDay(fn(read())));
  }, []);

  return { progress, update };
}

export function useRoadmapProgress(certSlug: string, totalSteps: number) {
  const { progress, update } = useProgress();
  const ready = useHydrated();
  const completed = progress.roadmap[certSlug] ?? [];

  const toggle = useCallback(
    (index: number) => {
      update((prev) => {
        const current = prev.roadmap[certSlug] ?? [];
        const next = current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index].sort((a, b) => a - b);
        return { ...prev, roadmap: { ...prev.roadmap, [certSlug]: next } };
      });
    },
    [certSlug, update],
  );

  const percent =
    totalSteps > 0 ? Math.round((completed.length / totalSteps) * 100) : 0;

  return { completed, toggle, percent, ready };
}

/* ------------------------------------------------------------------ */
/* Imperative writes                                                   */
/* ------------------------------------------------------------------ */

export function recordAttempt(attempt: AttemptRecord) {
  const state = read();
  write(
    touchDay({
      ...state,
      attempts: [attempt, ...state.attempts].slice(0, 50),
    }),
  );
}

export function markTopicRead(slug: string) {
  const state = read();
  if (state.readTopics.includes(slug)) return;
  write(touchDay({ ...state, readTopics: [...state.readTopics, slug] }));
}

export function setFocusCert(slug: string) {
  const state = read();
  write(touchDay({ ...state, focusCert: slug }));
}

export function toggleBookmark(href: string, title: string) {
  const state = read();
  const exists = state.bookmarks.some((b) => b.href === href);
  write(
    touchDay({
      ...state,
      bookmarks: exists
        ? state.bookmarks.filter((b) => b.href !== href)
        : [{ href, title }, ...state.bookmarks].slice(0, 60),
    }),
  );
}

export function clearProgress() {
  write({ ...EMPTY_PROGRESS });
}

/* ------------------------------------------------------------------ */
/* Derived statistics used by the dashboard                            */
/* ------------------------------------------------------------------ */

export function questionsAnswered(state: ProgressState) {
  return state.attempts.reduce((sum, a) => sum + a.total, 0);
}

export function averageScore(state: ProgressState) {
  if (state.attempts.length === 0) return null;
  const totals = state.attempts.reduce(
    (acc, a) => ({ correct: acc.correct + a.correct, total: acc.total + a.total }),
    { correct: 0, total: 0 },
  );
  if (totals.total === 0) return null;
  return Math.round((totals.correct / totals.total) * 100);
}

/**
 * Consecutive days of activity ending today or yesterday. A streak that ended
 * two or more days ago has been broken and reads as zero.
 */
export function studyStreak(state: ProgressState) {
  if (state.activeDays.length === 0) return 0;
  const days = new Set(state.activeDays);
  const cursor = new Date();

  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0;
  }

  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Topics with the lowest accuracy across all attempts, worst first. */
export function weakTopics(state: ProgressState, minAnswered = 2) {
  const totals = new Map<string, { correct: number; total: number }>();

  for (const attempt of state.attempts) {
    for (const [topic, counts] of Object.entries(attempt.byTopic)) {
      const existing = totals.get(topic) ?? { correct: 0, total: 0 };
      totals.set(topic, {
        correct: existing.correct + counts.correct,
        total: existing.total + counts.total,
      });
    }
  }

  return [...totals.entries()]
    .filter(([, c]) => c.total >= minAnswered)
    .map(([topic, c]) => ({
      topic,
      accuracy: Math.round((c.correct / c.total) * 100),
      answered: c.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

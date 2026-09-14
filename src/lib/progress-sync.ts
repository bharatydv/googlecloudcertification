"use client";

import { useSyncExternalStore } from "react";
import { clearProgress, readProgress, writeProgress } from "./progress";
import { mergeProgress, sameProgress } from "./progress-state";
import {
  clearRemoteProgress,
  loadRemoteProgress,
  saveRemoteProgress,
} from "./progress-remote";

/**
 * Mirrors local study progress to the signed-in learner's account.
 *
 * The browser stays the working copy — every read in the UI still comes
 * straight from localStorage, so nothing waits on the network and nothing
 * breaks when the network is gone. This layer only pulls the server's copy in
 * on sign-in, merges it, and pushes changes back.
 */

/* ------------------------------------------------------------------ */
/* Status store                                                        */
/* ------------------------------------------------------------------ */

export type SyncStatus = "off" | "syncing" | "synced" | "error";

export interface SyncSnapshot {
  status: SyncStatus;
  /** Epoch ms of the last successful push or pull, or null. */
  lastSyncedAt: number | null;
}

const listeners = new Set<() => void>();

/*
 * `useSyncExternalStore` compares snapshots by identity, so this object is
 * replaced only when something actually changes — returning a fresh object per
 * call would loop forever.
 */
let snapshot: SyncSnapshot = { status: "off", lastSyncedAt: null };

const OFF: SyncSnapshot = { status: "off", lastSyncedAt: null };

function setSnapshot(next: Partial<SyncSnapshot>) {
  const merged = { ...snapshot, ...next };
  if (merged.status === snapshot.status && merged.lastSyncedAt === snapshot.lastSyncedAt) {
    return;
  }
  snapshot = merged;
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Current sync state, for the account page's "last synced" line. */
export function useSyncStatus(): SyncSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => OFF,
  );
}

/* ------------------------------------------------------------------ */
/* Push / pull                                                         */
/* ------------------------------------------------------------------ */

/**
 * Set while a merged state is being written locally.
 *
 * `writeProgress` dispatches the change event synchronously, which would
 * otherwise make the push listener immediately schedule a save of the state we
 * have just saved.
 */
let applyingRemote = false;

let pushTimer: ReturnType<typeof setTimeout> | null = null;

/** Long enough to collapse a burst of answers into one write, short enough
 *  that closing the tab rarely beats it. `flushPush` covers the rest. */
const PUSH_DELAY_MS = 1500;

/**
 * Pulls the account's progress, merges it with what is on this device, and
 * writes the result to both sides.
 *
 * Runs once per sign-in. The merge is a union (see `mergeProgress`), which is
 * what lets someone study signed-out and keep that work when they later create
 * an account.
 */
export async function pullAndMerge(): Promise<void> {
  setSnapshot({ status: "syncing" });

  try {
    const remote = await loadRemoteProgress();
    const local = readProgress();

    // null means "no account, or no row yet" — not "you have done nothing".
    const merged = remote ? mergeProgress(local, remote) : local;

    if (!sameProgress(merged, local)) {
      applyingRemote = true;
      try {
        writeProgress(merged);
      } finally {
        applyingRemote = false;
      }
    }

    // Skip the write when the server already holds exactly this.
    if (!remote || !sameProgress(merged, remote)) {
      const { ok } = await saveRemoteProgress(merged);
      if (!ok) {
        setSnapshot({ status: "error" });
        return;
      }
    }

    setSnapshot({ status: "synced", lastSyncedAt: Date.now() });
  } catch {
    setSnapshot({ status: "error" });
  }
}

/** Pushes the current local state now, cancelling any pending debounce. */
export async function pushNow(): Promise<void> {
  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
  }

  setSnapshot({ status: "syncing" });
  try {
    const { ok } = await saveRemoteProgress(readProgress());
    setSnapshot(
      ok
        ? { status: "synced", lastSyncedAt: Date.now() }
        : { status: "error" },
    );
  } catch {
    setSnapshot({ status: "error" });
  }
}

/** Debounced push, called for every local progress change. */
export function schedulePush() {
  if (applyingRemote) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    void pushNow();
  }, PUSH_DELAY_MS);
}

/** Runs a pending debounced push immediately, e.g. as the page is hidden. */
export function flushPush() {
  if (!pushTimer) return;
  clearTimeout(pushTimer);
  pushTimer = null;
  void pushNow();
}

/** Drops any pending work and returns the status store to its signed-out state. */
export function stopSync() {
  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
  }
  setSnapshot(OFF);
}

/**
 * Clears progress on this device and, when signed in, on the account too.
 *
 * Both halves are required. Because the merge is a union, clearing only the
 * browser would restore everything from the server on the next sync — the
 * learner would watch their "cleared" history come straight back.
 */
export async function clearProgressEverywhere(signedIn: boolean) {
  clearProgress();

  if (!signedIn) return;

  if (pushTimer) {
    clearTimeout(pushTimer);
    pushTimer = null;
  }
  const { ok } = await clearRemoteProgress();
  setSnapshot(ok ? { status: "synced", lastSyncedAt: Date.now() } : { status: "error" });
}

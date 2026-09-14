"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import type { AuthUser, SessionPayload } from "./types";

/**
 * Client-side knowledge of who is signed in.
 *
 * An external store rather than a context provider, for the same reason
 * `progress.ts` is one: the session is fetched once per page load and shared by
 * unrelated components — the header and the progress sync — that sit on
 * opposite sides of the tree. `useSyncExternalStore` lets React subscribe to
 * that without a provider wrapping the app and without setting state from an
 * effect.
 *
 * The session is read from the browser rather than in the layout on purpose;
 * see `app/api/auth/session/route.ts` for why.
 */

export interface SessionState {
  /** "loading" until the first response lands, so nothing flashes. */
  status: "loading" | "ready";
  user: AuthUser | null;
  /** False on deployments with no Supabase credentials; hides account UI. */
  configured: boolean;
}

const LOADING: SessionState = {
  status: "loading",
  user: null,
  configured: false,
};

/*
 * Module scope, so a navigation between pages reuses what we already know
 * rather than re-fetching. Snapshot identity only changes when a fetch
 * completes, which is what `useSyncExternalStore` compares on.
 */
let snapshot: SessionState = LOADING;
let inflight: Promise<void> | null = null;

/**
 * Set when something has been submitted that may change who is signed in.
 *
 * Sign-in and sign-up finish with a server-side `redirect`, which the router
 * performs as a client-side navigation — this module survives it, so without a
 * marker the header would keep showing "Sign in" to someone who has just
 * signed in. The old snapshot is deliberately left in place rather than
 * blanked: if the submission turns out to have failed, the header stays
 * correct instead of showing a placeholder forever.
 */
let stale = false;
const listeners = new Set<() => void>();

async function load(): Promise<void> {
  try {
    const response = await fetch("/api/auth/session", {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!response.ok) throw new Error(String(response.status));
    const payload = (await response.json()) as SessionPayload;
    snapshot = {
      status: "ready",
      user: payload.user,
      configured: payload.configured,
    };
  } catch {
    /*
     * A failed session read means "we do not know", and the honest rendering
     * of that is the signed-out header. Everything on this site works signed
     * out anyway, so there is nothing to recover from and nothing worth
     * showing an error about.
     */
    snapshot = { status: "ready", user: null, configured: false };
  }
  for (const listener of listeners) listener();
}

function ensureLoaded() {
  if (snapshot.status === "ready" || inflight) return;
  inflight = load().finally(() => {
    inflight = null;
  });
}

/** Marks the session as worth re-reading after the next navigation. */
export function invalidateSession() {
  stale = true;
}

/**
 * Re-reads the session after a navigation that followed an auth submission.
 *
 * Called once from the header, which is mounted on every page. Checking the
 * pathname rather than re-fetching on every render keeps this to one request
 * per actual sign-in instead of one per page view — which matters, because for
 * a signed-in visitor each read costs a round trip to Supabase.
 */
export function useSessionRevalidation() {
  const pathname = usePathname();

  useEffect(() => {
    if (!stale) return;
    stale = false;
    void refreshSession();
  }, [pathname]);
}

/**
 * Records locally that the user is now signed out, without a round trip.
 *
 * Called as the sign-out form is submitted. The server action clears the
 * cookie and redirects, but that redirect is a client-side navigation — this
 * module's state would survive it, and the header would go on showing an
 * avatar for someone who has just signed out until they reloaded the page.
 */
export function markSignedOut() {
  stale = false;
  snapshot = { status: "ready", user: null, configured: snapshot.configured };
  for (const listener of listeners) listener();
}

/** Re-reads the session. Call after anything that changes who is signed in. */
export function refreshSession(): Promise<void> {
  inflight = load().finally(() => {
    inflight = null;
  });
  return inflight;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // React calls this from an effect, which makes it the correct place to start
  // talking to an external system — the fetch is guarded so only the first
  // subscriber triggers it.
  ensureLoaded();
  return () => {
    listeners.delete(onChange);
  };
}

export function useSession(): SessionState {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    // The server has no session to report; every consumer renders its
    // "loading" branch, which matches the first client render exactly.
    () => LOADING,
  );
}

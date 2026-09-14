"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth/session";
import {
  flushPush,
  pullAndMerge,
  schedulePush,
  stopSync,
} from "@/lib/progress-sync";

/**
 * Keeps the signed-in learner's progress mirrored to their account.
 *
 * Renders nothing; it exists to own the sync lifecycle from inside the React
 * tree. Mounted once in the root layout, so it follows the learner across
 * every page without each page having to opt in.
 *
 * Does nothing at all when signed out, which is the whole site's default
 * state — progress simply stays in localStorage as it always has.
 */
export function ProgressSync() {
  const { user } = useSession();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) {
      stopSync();
      return;
    }

    // Pull the account's copy and fold it into this device's. Runs on sign-in
    // and on any later change of user.
    void pullAndMerge();

    const onProgressChange = () => schedulePush();
    const onVisibilityChange = () => {
      // Hiding the tab is the last reliable moment to save; a close may follow
      // before the debounce would have fired.
      if (document.visibilityState === "hidden") flushPush();
    };

    // Dispatched by lib/progress.ts on every local write, in this tab only —
    // other tabs see a `storage` event instead, so a change is pushed once by
    // whichever tab made it rather than once per open tab.
    window.addEventListener("gcpprep:progress", onProgressChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flushPush);

    return () => {
      window.removeEventListener("gcpprep:progress", onProgressChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flushPush);
      stopSync();
    };
  }, [userId]);

  return null;
}

"use server";

import { createClient } from "@/lib/supabase/server";
import {
  normalizeProgress,
  type ProgressState,
} from "@/lib/progress-state";

/**
 * Server Actions for the synced copy of a learner's progress.
 *
 * Every query runs as the signed-in user against a table with row level
 * security enabled (see `supabase/schema.sql`), so the policies — not this
 * code — are what guarantee one learner cannot read or write another's row.
 * The `user_id` is taken from the validated session, never from the client.
 */

const TABLE = "progress";

/**
 * The stored progress for the current user.
 *
 * Returns null — meaning "there is nothing to sync with" — when accounts are
 * not configured, nobody is signed in, or the row does not exist yet. That is
 * different from returning empty progress, which would mean "the server says
 * you have done nothing" and would be indistinguishable from a brand-new
 * account. The caller only merges when it gets a state back.
 */
export async function loadRemoteProgress(): Promise<ProgressState | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const { data, error } = await supabase
    .from(TABLE)
    .select("state")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (error || !data) return null;
  return normalizeProgress(data.state);
}

/**
 * Writes the merged progress back for the current user.
 *
 * The incoming state crosses the network from the browser, so it is re-parsed
 * here rather than trusted: a Server Action is a public HTTP endpoint, and its
 * argument is user input like any other.
 */
export async function saveRemoteProgress(
  state: ProgressState,
): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  if (!supabase) return { ok: false };

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { ok: false };

  const { error } = await supabase.from(TABLE).upsert(
    {
      user_id: auth.user.id,
      state: normalizeProgress(state),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  return { ok: !error };
}

/**
 * Empties the stored progress.
 *
 * Needed because the merge is a union: deleting locally and then syncing would
 * pull everything straight back from the server. Clearing has to happen on
 * both sides to mean anything.
 */
export async function clearRemoteProgress(): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  if (!supabase) return { ok: false };

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { ok: false };

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("user_id", auth.user.id);

  return { ok: !error };
}

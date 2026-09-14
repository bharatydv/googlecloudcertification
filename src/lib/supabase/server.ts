import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";

/**
 * A Supabase client bound to the current request's cookies.
 *
 * Must be created per request — never module-scoped and never shared — because
 * the client carries the caller's session. `cookies()` is async in Next 16, so
 * this function is too.
 *
 * Returns null when Supabase is not configured; callers treat that as "signed
 * out, accounts unavailable".
 */
export async function createClient(): Promise<SupabaseClient | null> {
  const config = supabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          /*
           * Server Components get a read-only cookie store, so a token
           * refresh triggered from one lands here. That is safe to swallow:
           * proxy.ts runs before every request that carries a session cookie
           * and performs the same refresh where the write *does* stick.
           */
        }
      },
    },
  });
}

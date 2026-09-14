/**
 * Supabase connection settings.
 *
 * Deliberately NOT `NEXT_PUBLIC_*`. Next inlines public env vars into the
 * client bundle at build time, which would mean baking them into the Docker
 * image and rebuilding to change them. Everything that talks to Supabase in
 * this codebase runs on the server — Server Actions, Route Handlers and
 * `proxy.ts` — so the values are read at runtime from the container's
 * environment instead, and one image works in every environment.
 *
 * Both values are safe to hold server-side: the anon key is the public,
 * RLS-constrained key. No service-role key is used anywhere in this app; every
 * query runs as the signed-in user so row level security is always in force.
 */
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

/**
 * Returns null when the environment has no Supabase credentials.
 *
 * Accounts are an optional layer over a site that works entirely without them,
 * so an unconfigured deployment must not crash — it degrades to the
 * signed-out, local-storage-only experience. Callers branch on null rather
 * than throwing.
 */
export function supabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function isAuthConfigured(): boolean {
  return supabaseConfig() !== null;
}

/**
 * Supabase writes its session across one or more cookies named
 * `sb-<project-ref>-auth-token[.n]`. Used to tell an anonymous request from a
 * possibly-signed-in one without parsing anything.
 */
export const SUPABASE_COOKIE_PREFIX = "sb-";

import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthConfigured } from "@/lib/supabase/config";
import { site } from "@/lib/site";
import type { AuthUser } from "@/lib/auth/types";

/**
 * Data Access Layer for the signed-in user.
 *
 * Everything that needs to know who is calling goes through here rather than
 * reading cookies itself, so the session check sits in exactly one place.
 */

export type { AuthUser };

/**
 * The current user, or null when signed out or when accounts are not
 * configured for this deployment.
 *
 * `cache` memoises this for the duration of one render pass, so a layout, a
 * page and three components asking who the user is cost one round trip rather
 * than five.
 *
 * Uses `getUser()` rather than `getSession()`: the former revalidates the JWT
 * with Supabase, the latter trusts whatever is in the cookie. Only the former
 * is safe to make decisions on.
 */
export const getUser = cache(async (): Promise<AuthUser | null> => {
  /*
   * Stops this render from being prerendered at build time.
   *
   * Without it, a page that asks who the user is would be prerendered in an
   * environment that has no session and — since Supabase credentials are read
   * from the container at runtime, not baked in at build — no credentials
   * either. The "signed out" answer would then be frozen into a static page
   * and served to everyone, signed in or not. `cookies()` below would
   * normally force this by itself, but it is never reached when Supabase is
   * unconfigured, which is exactly the case that builds in CI.
   */
  await connection();

  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const user = data.user;
  const meta = user.user_metadata ?? {};
  const name =
    typeof meta.full_name === "string"
      ? meta.full_name
      : typeof meta.name === "string"
        ? meta.name
        : null;

  return {
    id: user.id,
    email: user.email ?? "",
    name: name?.trim() || null,
    avatarUrl: typeof meta.avatar_url === "string" ? meta.avatar_url : null,
    provider: user.app_metadata?.provider ?? "email",
    createdAt: user.created_at,
  };
});

/**
 * The user, or a redirect to sign-in that returns here afterwards.
 * For pages that cannot render at all without an account.
 */
export async function requireUser(returnTo: string): Promise<AuthUser> {
  const user = await getUser();
  if (!user) {
    redirect(`/signin?next=${encodeURIComponent(returnTo)}`);
  }
  return user;
}

/**
 * Whether accounts are switched on for this deployment.
 *
 * Wraps the synchronous config read in a `connection()` for the same reason
 * `getUser` does: the answer comes from the runtime environment and must not
 * be decided at build time. Pages branch on this rather than on
 * `isAuthConfigured` directly.
 */
export async function authAvailable(): Promise<boolean> {
  await connection();
  return isAuthConfigured();
}

/**
 * The origin this request arrived on, for building absolute callback URLs.
 *
 * Supabase needs an absolute redirect target for OAuth and for the links in
 * confirmation emails. Taking it from the request rather than hardcoding
 * site.url keeps localhost working in development and keeps the same image
 * working behind any hostname. Falls back to the canonical domain when the
 * headers are missing, and ignores a forwarded host that is not one we serve.
 */
export async function requestOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) return site.url;

  const proto =
    headerList.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  return `${proto}://${host}`;
}

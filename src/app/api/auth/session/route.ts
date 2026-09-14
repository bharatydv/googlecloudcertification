import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth/dal";
import { isAuthConfigured } from "@/lib/supabase/config";
import type { SessionPayload } from "@/lib/auth/types";

/**
 * Who is signed in, for the client.
 *
 * The header and the progress sync both need to know, and both live in the
 * root layout. Reading the session there with `getUser()` would call
 * `cookies()` in a layout, which opts every route in the app out of static
 * generation — catastrophic for a site that is almost entirely static content
 * and depends on being crawlable and fast. Fetching it from the browser
 * instead keeps all of that static and confines the cost to one small request.
 *
 * The trade is a brief moment after load where the header does not yet know
 * who you are; it renders a neutral placeholder rather than flashing "Sign in"
 * at someone who is already signed in.
 */
export async function GET() {
  const payload: SessionPayload = {
    configured: isAuthConfigured(),
    user: await getUser(),
  };

  return NextResponse.json(payload, {
    // Per-user and cheap to recompute. Must never be held by a shared cache.
    headers: { "Cache-Control": "no-store, private" },
  });
}

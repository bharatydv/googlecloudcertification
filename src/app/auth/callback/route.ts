import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeRedirectPath } from "@/lib/auth/validation";

/**
 * Where every link that Supabase sends a person back on lands: the Google
 * OAuth return, the sign-up confirmation email, and the password recovery
 * email all point here.
 *
 * All three arrive carrying a one-time `code`, which is exchanged for a
 * session. The exchange writes the session cookies through the request's
 * cookie store, and Next applies those to the redirect this returns.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const origin = resolveOrigin(request);
  const next = safeRedirectPath(searchParams.get("next"));

  // Supabase reports a refused consent screen or an expired link this way,
  // rather than by omitting the code.
  if (searchParams.get("error")) {
    return NextResponse.redirect(new URL("/signin?error=callback", origin));
  }

  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/signin?error=callback", origin));
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/signin?error=unavailable", origin));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    // Most often a link that has already been used, or one opened in a
    // different browser from the one that requested it — the code verifier
    // lives in this browser's cookies.
    return NextResponse.redirect(new URL("/signin?error=callback", origin));
  }

  return NextResponse.redirect(new URL(next, origin));
}

/**
 * The public origin, not the container's.
 *
 * Azure Container Apps terminates TLS at its ingress and forwards to the app
 * over plain HTTP, so `request.nextUrl.origin` reads as the internal address.
 * Redirecting to that would send people somewhere unreachable, so the
 * forwarded headers win where they are present.
 */
function resolveOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (!forwardedHost) return request.nextUrl.origin;

  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${forwardedHost}`;
}

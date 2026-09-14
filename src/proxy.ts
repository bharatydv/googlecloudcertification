import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_COOKIE_PREFIX, supabaseConfig } from "@/lib/supabase/config";

/**
 * Proxy — what earlier Next.js versions called Middleware. Renamed in 16; the
 * file must sit next to `app/` and export `proxy` (or a default).
 *
 * Its only job here is refreshing the Supabase access token and writing the
 * rotated cookies onto the response. Server Components cannot write cookies,
 * so without this a session would silently expire mid-visit.
 *
 * Deliberately *not* doing route protection: every page on this site is
 * readable signed-out, and the pages that do need a user check it at the data
 * layer (lib/auth/dal.ts), which is closer to the data and cannot be fooled by
 * a forged cookie.
 */
export async function proxy(request: NextRequest) {
  // Named `settings` rather than `config` so it does not read as the exported
  // `config` below, which is the matcher and an entirely different thing.
  const settings = supabaseConfig();
  if (!settings) return NextResponse.next();

  /*
   * Skip the refresh entirely for requests with no Supabase cookie. This is a
   * public content site, so the overwhelming majority of traffic — readers and
   * crawlers alike — is anonymous, and a token refresh is a network round trip
   * to Supabase. Without this guard every page view of every static page would
   * pay for it.
   */
  const hasSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith(SUPABASE_COOKIE_PREFIX));
  if (!hasSession) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(settings.url, settings.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Update the request so anything rendering downstream in this same
        // pass sees the new token, then rebuild the response around it.
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() — not getSession() — because it validates the JWT against the
  // auth server, and it is what triggers the refresh when the token is stale.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  /*
   * Everything except Next's own assets and static files. Auth cookies need
   * refreshing on document requests; there is nothing to refresh on an image.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};

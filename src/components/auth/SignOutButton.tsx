"use client";

import { signOutAction } from "@/lib/auth/actions";
import { markSignedOut } from "@/lib/auth/session";

/**
 * Sign out.
 *
 * A real form pointed at the Server Action, because clearing an HttpOnly
 * cookie is something only the server can do — and because a plain form still
 * submits if the page's JavaScript never arrives.
 *
 * The `onClick` is belt and braces on top of that: it runs before the
 * submission and tells the client session store what is about to be true, so
 * the header updates immediately rather than after the next full page load.
 * Without JavaScript it simply never fires, and the form works anyway.
 */
export function SignOutButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        onClick={() => markSignedOut()}
        className={className}
      >
        {children}
      </button>
    </form>
  );
}

/**
 * Shapes shared between the server auth layer and the client components that
 * render it.
 *
 * Kept in its own module — free of `server-only` and of any Supabase import —
 * so a Client Component can name these types without dragging a server module
 * into the browser bundle.
 */

/**
 * A Data Transfer Object, not the Supabase user.
 *
 * The raw user carries app metadata, identity providers, tokens and the full
 * confirmation history. Only these fields are ever handed to a component, so
 * nothing extra can leak into a payload sent to the browser.
 */
export interface AuthUser {
  id: string;
  email: string;
  /** Display name from sign-up or the OAuth provider; null if never set. */
  name: string | null;
  avatarUrl: string | null;
  /** "email", "google", … — used to hide the password form for OAuth users. */
  provider: string;
  createdAt: string;
}

/** Response body of `GET /api/auth/session`. */
export interface SessionPayload {
  /** False when this deployment has no Supabase credentials configured. */
  configured: boolean;
  user: AuthUser | null;
}

/** A person's display name, falling back to the local part of their email. */
export function displayName(user: AuthUser): string {
  return user.name ?? user.email.split("@")[0] ?? "there";
}

/** Up to two initials for the avatar fallback. */
export function initialsOf(user: AuthUser): string {
  const source = displayName(user);
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]);
  return letters.join("").toUpperCase() || "?";
}

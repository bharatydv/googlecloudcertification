import * as z from "zod";

/**
 * Form schemas for the auth pages.
 *
 * Validation runs on the server inside the Server Action, which is the only
 * place it counts — the browser-side `required`/`type="email"` attributes are
 * there for immediate feedback, not for enforcement.
 */

const password = z
  .string()
  .min(8, { error: "Use at least 8 characters." })
  .max(72, { error: "Passwords are limited to 72 characters." })
  .regex(/[a-zA-Z]/, { error: "Include at least one letter." })
  .regex(/[0-9]/, { error: "Include at least one number." });

const email = z
  .email({ error: "Enter a valid email address." })
  .trim()
  .toLowerCase();

export const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your name." })
    .max(80, { error: "That name is too long." }),
  email,
  password,
});

/*
 * Sign-in deliberately does not reuse the strength rules. Tightening the
 * policy later would otherwise lock out everyone whose existing password no
 * longer passes, and reporting "your password is too short" on a login form
 * tells an attacker something about the account.
 */
export const SignInSchema = z.object({
  email,
  password: z.string().min(1, { error: "Enter your password." }),
});

export const ForgotPasswordSchema = z.object({ email });

export const NewPasswordSchema = z.object({ password });

export const ProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your name." })
    .max(80, { error: "That name is too long." }),
});

/** Password requirements, shown under the field so the rules are not a guess. */
export const PASSWORD_HINT =
  "At least 8 characters, including a letter and a number.";

/**
 * Sanitises a `?next=` destination.
 *
 * Anything that is not a plain in-site path is discarded, so the parameter
 * cannot be used to bounce a freshly authenticated user to another origin.
 * Protocol-relative URLs (`//evil.test`) and backslash variants that some
 * browsers normalise to slashes are rejected along with absolute URLs.
 */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}

/** Shape returned by every auth Server Action to its `useActionState` form. */
export interface AuthFormState {
  /** A message about the submission as a whole, not one field. */
  error?: string;
  success?: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Record<string, string[]>;
  /** Non-secret values echoed back so the form is not cleared on error. */
  values?: Record<string, string>;
}

/** Flattens a Zod failure into the field-error shape the forms render. */
export function fieldErrorsOf(error: z.ZodError): Record<string, string[]> {
  const flattened: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (flattened[key] ??= []).push(issue.message);
  }
  return flattened;
}

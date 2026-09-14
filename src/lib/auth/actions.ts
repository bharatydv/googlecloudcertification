"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requestOrigin } from "@/lib/auth/dal";
import {
  ForgotPasswordSchema,
  NewPasswordSchema,
  ProfileSchema,
  SignInSchema,
  SignUpSchema,
  type AuthFormState,
  fieldErrorsOf,
  safeRedirectPath,
} from "@/lib/auth/validation";

/**
 * Server Actions behind the auth forms.
 *
 * All of them run on the server, so credentials never touch client JavaScript
 * and the forms keep working with JavaScript disabled.
 */

const UNAVAILABLE =
  "Accounts are not available on this deployment yet. Everything else on the site works without one.";

/**
 * Deliberately vague, and identical whether the email is unknown or the
 * password is wrong. A form that distinguishes the two is an account
 * enumeration oracle.
 */
const BAD_CREDENTIALS = "That email and password do not match an account.";

const SERVICE_DOWN =
  "We could not reach the sign-in service. That one is on us — try again in a moment.";

const RATE_LIMITED = "Too many attempts. Wait a minute and try again.";

/** The error shape Supabase returns; narrowed to what we branch on. */
interface AuthError {
  name?: string;
  status?: number;
  code?: string;
  message?: string;
}

/**
 * True when the failure was the network or Supabase itself, not the input.
 *
 * Worth separating: telling someone their password is wrong because the auth
 * service is unreachable sends them off resetting a password that was fine.
 */
function isServiceFailure(error: AuthError): boolean {
  return (
    error.name === "AuthRetryableFetchError" ||
    error.status === 0 ||
    (error.status ?? 0) >= 500
  );
}

/**
 * A message safe to show for a sign-up failure.
 *
 * Supabase's raw `message` is written for developers and occasionally names
 * internals, so only the cases worth acting on are spelled out and everything
 * else falls back to something plain.
 */
function describeSignUpError(error: AuthError): string {
  if (isServiceFailure(error)) return SERVICE_DOWN;
  if (error.status === 429 || error.code === "over_email_send_rate_limit") {
    return "Too many sign-up attempts from here. Wait a few minutes and try again.";
  }
  if (error.code === "weak_password") {
    return "That password is too easy to guess. Try a longer one.";
  }
  if (error.code === "email_address_invalid") {
    return "That email address was rejected. Check it for a typo.";
  }
  if (error.code === "signup_disabled") {
    return "New accounts are paused at the moment. Everything on the site still works without one.";
  }
  return "We could not create that account. Check your details and try again.";
}

/*
 * Note the absence of `revalidatePath` after sign-in and sign-out.
 *
 * It is the reflex here, but on this site it would be actively harmful:
 * `revalidatePath("/", "layout")` invalidates every one of the ~114
 * prerendered content pages, and none of them render anything that depends on
 * who is signed in. The header reads the session in the browser and the pages
 * that do need a user (/account, /signin, /signup) are dynamic already, so
 * there is nothing cached to correct — only a full static rebuild to pay for
 * on the next request to each page.
 */

function callbackUrl(origin: string, next: string) {
  return `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
}

/* ------------------------------------------------------------------ */
/* Sign up                                                             */
/* ------------------------------------------------------------------ */

export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  // Never echoed back to the form; only the non-secret fields are.
  const echo = { name: raw.name, email: raw.email };

  const parsed = SignUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error), values: echo };
  }

  const supabase = await createClient();
  if (!supabase) return { error: UNAVAILABLE, values: echo };

  const next = safeRedirectPath(String(formData.get("next") ?? ""));
  const origin = await requestOrigin();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      // Stored on the user record itself, so no separate profile table is
      // needed just to hold a display name.
      data: { full_name: parsed.data.name },
      emailRedirectTo: callbackUrl(origin, next),
    },
  });

  if (error) return { error: describeSignUpError(error), values: echo };

  /*
   * When the email is already registered, Supabase returns a success response
   * with an empty `identities` array rather than an error — by design, so the
   * form cannot be used to test which addresses have accounts. The same
   * "check your inbox" message goes back for both cases; the real owner of the
   * address gets a "someone tried to sign up" email and nobody else learns
   * anything.
   */
  if (!data.session) {
    return {
      success:
        "Check your inbox — we have sent a link to confirm your address. It expires in an hour.",
    };
  }

  // Email confirmation is switched off for this project, so sign-up logs the
  // user straight in.
  redirect(next);
}

/* ------------------------------------------------------------------ */
/* Sign in                                                             */
/* ------------------------------------------------------------------ */

export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const echo = { email: raw.email };

  const parsed = SignInSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error), values: echo };
  }

  const supabase = await createClient();
  if (!supabase) return { error: UNAVAILABLE, values: echo };

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    if (isServiceFailure(error)) return { error: SERVICE_DOWN, values: echo };
    // An unconfirmed address is the one input failure worth naming: the
    // credentials were right, and without the explanation there is nothing the
    // person can do about it.
    if (error.code === "email_not_confirmed") {
      return {
        error:
          "Confirm your email address first — check your inbox for the link we sent when you signed up.",
        values: echo,
      };
    }
    if (error.status === 429) return { error: RATE_LIMITED, values: echo };
    return { error: BAD_CREDENTIALS, values: echo };
  }

  redirect(safeRedirectPath(String(formData.get("next") ?? "")));
}

/* ------------------------------------------------------------------ */
/* Google                                                              */
/* ------------------------------------------------------------------ */

export async function signInWithGoogleAction(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) redirect("/signin?error=unavailable");

  const next = safeRedirectPath(String(formData.get("next") ?? ""));
  const origin = await requestOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl(origin, next),
      // This runs on the server; there is no browser here to redirect. Ask for
      // the URL and hand it to Next's redirect instead.
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) redirect("/signin?error=oauth");
  redirect(data.url);
}

/* ------------------------------------------------------------------ */
/* Sign out                                                            */
/* ------------------------------------------------------------------ */

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();

  redirect("/");
}

/* ------------------------------------------------------------------ */
/* Password reset                                                      */
/* ------------------------------------------------------------------ */

export async function forgotPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const echo = { email: String(formData.get("email") ?? "") };
  const parsed = ForgotPasswordSchema.safeParse(echo);

  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error), values: echo };
  }

  const supabase = await createClient();
  if (!supabase) return { error: UNAVAILABLE, values: echo };

  const origin = await requestOrigin();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: callbackUrl(origin, "/reset-password"),
  });

  /*
   * The result of the call is ignored on purpose. Reporting "no such account"
   * would turn this form into the enumeration oracle the sign-in form avoids
   * being, so the answer is the same either way.
   */
  return {
    success:
      "If that address has an account, a reset link is on its way. The link is valid for one hour.",
  };
}

export async function updatePasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = NewPasswordSchema.safeParse({
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error) };
  }

  const supabase = await createClient();
  if (!supabase) return { error: UNAVAILABLE };

  // Authorised by the recovery session the callback exchanged the emailed code
  // for; without it Supabase rejects the change.
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    if (isServiceFailure(error)) return { error: SERVICE_DOWN };
    return {
      error:
        error.code === "same_password"
          ? "That is already your password. Choose a different one."
          : "That reset link has expired. Request a new one and try again.",
    };
  }

  redirect("/account?updated=password");
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export async function updateProfileAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const raw = { name: String(formData.get("name") ?? "") };
  const parsed = ProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error), values: raw };
  }

  const supabase = await createClient();
  if (!supabase) return { error: UNAVAILABLE, values: raw };

  const { error } = await supabase.auth.updateUser({
    data: { full_name: parsed.data.name },
  });
  if (error) return { error: "Could not save that. Try again.", values: raw };

  // No revalidatePath: /account is dynamic, and the caller refreshes the
  // client session so the header picks the new name up straight away.
  return { success: "Saved.", values: { name: parsed.data.name } };
}

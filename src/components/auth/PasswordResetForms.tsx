"use client";

import { useActionState } from "react";
import {
  forgotPasswordAction,
  updatePasswordAction,
} from "@/lib/auth/actions";
import { PASSWORD_HINT, type AuthFormState } from "@/lib/auth/validation";
import { Field, FormAlert, SubmitButton } from "./fields";

const initialState: AuthFormState = {};

/** Step one: ask for the address to send a recovery link to. */
export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  // The response is identical for known and unknown addresses, so there is
  // nothing more for this form to do once it has been submitted.
  if (state.success) {
    return <FormAlert tone="success">{state.success}</FormAlert>;
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <FormAlert tone="error">{state.error}</FormAlert> : null}

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
        autoFocus
      />

      <SubmitButton pending={pending} pendingLabel="Sending…">
        Send reset link
      </SubmitButton>
    </form>
  );
}

/**
 * Step two: choose the new password.
 *
 * Reached only from the emailed link, which the callback route has already
 * exchanged for a short-lived recovery session — that session is what
 * authorises the change.
 */
export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    updatePasswordAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <FormAlert tone="error">{state.error}</FormAlert> : null}

      <Field
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Choose a new password"
        hint={PASSWORD_HINT}
        errors={state.fieldErrors?.password}
        autoFocus
      />

      <SubmitButton pending={pending} pendingLabel="Saving…">
        Save new password
      </SubmitButton>
    </form>
  );
}

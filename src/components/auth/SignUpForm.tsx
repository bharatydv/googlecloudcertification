"use client";

import { useActionState } from "react";
import { signUpAction } from "@/lib/auth/actions";
import { PASSWORD_HINT, type AuthFormState } from "@/lib/auth/validation";
import { invalidateSession } from "@/lib/auth/session";
import { Field, FormAlert, OrDivider, SubmitButton } from "./fields";
import { GoogleButton } from "./GoogleButton";

const initialState: AuthFormState = {};

export function SignUpForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  /*
   * Once the confirmation email is out there is nothing left to fill in, and
   * leaving the form on screen invites a second submission that only sends a
   * second email. The message replaces it.
   */
  if (state.success) {
    return <FormAlert tone="success">{state.success}</FormAlert>;
  }

  return (
    <div className="space-y-5">
      <GoogleButton next={next} label="Sign up with Google" />

      <OrDivider />

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {state.error ? <FormAlert tone="error">{state.error}</FormAlert> : null}

        <Field
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="How should we greet you?"
          defaultValue={state.values?.name}
          errors={state.fieldErrors?.name}
          autoFocus
        />

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.values?.email}
          errors={state.fieldErrors?.email}
        />

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Choose a password"
          hint={PASSWORD_HINT}
          errors={state.fieldErrors?.password}
        />

        <SubmitButton
          pending={pending}
          pendingLabel="Creating your account…"
          // A success ends in a server-side redirect, so the client never
          // gets to react to it. Flagging the session here means the header
          // re-reads it the moment that redirect lands.
          onPress={invalidateSession}
        >
          Create account
        </SubmitButton>

        <p className="text-[0.8125rem] leading-relaxed text-ink-500">
          Any progress already saved in this browser is merged into your new
          account — nothing you have studied so far is lost.
        </p>
      </form>
    </div>
  );
}

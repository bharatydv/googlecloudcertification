"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { invalidateSession } from "@/lib/auth/session";
import { Field, FormAlert, OrDivider, SubmitButton } from "./fields";
import { GoogleButton } from "./GoogleButton";

const initialState: AuthFormState = {};

export function SignInForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <div className="space-y-5">
      <GoogleButton next={next} label="Sign in with Google" />

      <OrDivider />

      {/*
        A plain `action` — no onSubmit, no fetch. The credentials go straight
        to the Server Action, so they never pass through client JavaScript and
        the form still works before hydration.
      */}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

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

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          errors={state.fieldErrors?.password}
          labelAction={
            <Link
              href="/forgot-password"
              className="text-[0.8125rem] font-medium text-brand-600 underline underline-offset-2"
            >
              Forgot password?
            </Link>
          }
        />

        <SubmitButton
          pending={pending}
          pendingLabel="Signing in…"
          // A success ends in a server-side redirect, so the client never
          // gets to react to it. Flagging the session here means the header
          // re-reads it the moment that redirect lands.
          onPress={invalidateSession}
        >
          Sign in
        </SubmitButton>
      </form>
    </div>
  );
}

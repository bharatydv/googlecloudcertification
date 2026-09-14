"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/lib/auth/actions";
import type { AuthFormState } from "@/lib/auth/validation";
import { refreshSession } from "@/lib/auth/session";
import { Field, FormAlert, SubmitButton } from "@/components/auth/fields";

export function ProfileForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    // Wrapping the action rather than reacting to `state` in an effect: the
    // header greets you by name from the client session store, which would
    // otherwise keep showing the old one until the next full page load.
    async (previous, formData) => {
      const result = await updateProfileAction(previous, formData);
      if (result.success) await refreshSession();
      return result;
    },
    { values: { name } },
  );

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? <FormAlert tone="error">{state.error}</FormAlert> : null}
      {state.success ? (
        <FormAlert tone="success">{state.success}</FormAlert>
      ) : null}

      <Field
        label="Display name"
        name="name"
        autoComplete="name"
        // The action echoes the saved value back, so the field keeps showing
        // what is actually stored rather than reverting to the page's props.
        defaultValue={state.values?.name ?? name}
        errors={state.fieldErrors?.name}
      />

      <div className="sm:w-48">
        <SubmitButton pending={pending} pendingLabel="Saving…">
          Save
        </SubmitButton>
      </div>
    </form>
  );
}

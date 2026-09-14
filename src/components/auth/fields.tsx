"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { Icon, buttonClass } from "@/components/ui";

/**
 * Shared pieces of the auth forms.
 *
 * Kept deliberately plain: an auth form is the one place on a site where
 * people are most likely to be stuck, so every error is attached to the field
 * it belongs to and announced, rather than collected in a banner at the top.
 */

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400";

export function Field({
  label,
  name,
  type = "text",
  errors,
  defaultValue,
  hint,
  autoComplete,
  placeholder,
  required = true,
  autoFocus,
  labelAction,
}: {
  label: string;
  name: string;
  type?: string;
  errors?: string[];
  defaultValue?: string;
  hint?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  /** Rendered on the label's line, e.g. a "Forgot password?" link. */
  labelAction?: React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(errors?.length);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.875rem] font-medium text-ink-800">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={cn(hint && hintId, invalid && errorId) || undefined}
        className={cn(inputClass, invalid && "border-danger-500")}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.8125rem] text-ink-500">
          {hint}
        </p>
      ) : null}
      {invalid ? (
        <ul id={errorId} className="mt-1.5 space-y-1">
          {errors?.map((message) => (
            <li key={message} className="text-[0.8125rem] text-danger-500">
              {message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * A message about the submission as a whole.
 *
 * `role="alert"` so a screen reader hears "that email and password do not
 * match an account" without having to go looking for it.
 */
export function FormAlert({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-2.5 rounded-lg border px-3.5 py-3 text-[0.875rem] leading-relaxed",
        tone === "error"
          ? "border-danger-200 bg-danger-50 text-danger-700"
          : "border-success-200 bg-success-50 text-success-700",
      )}
    >
      <Icon
        name={tone === "error" ? "warning" : "check"}
        className="mt-0.5 h-4 w-4 shrink-0"
        strokeWidth={2.2}
      />
      <span>{children}</span>
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
  pendingLabel,
  onPress,
}: {
  pending: boolean;
  children: React.ReactNode;
  pendingLabel: string;
  /** Runs as the form is submitted, before the action does. */
  onPress?: () => void;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={onPress}
      // aria-live so the change from "Sign in" to "Signing in…" is announced,
      // which is the only feedback a screen reader gets while the action runs.
      aria-live="polite"
      className={cn(buttonClass("primary", "md"), "w-full")}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

/** "or" rule between the OAuth button and the email form. */
export function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-ink-200" />
      <span className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-400">
        or
      </span>
      <span className="h-px flex-1 bg-ink-200" />
    </div>
  );
}

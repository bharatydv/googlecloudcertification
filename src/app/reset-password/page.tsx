import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { authAvailable, getUser } from "@/lib/auth/dal";
import { AuthShell, AuthUnavailable } from "@/components/auth/AuthShell";
import { ResetPasswordForm } from "@/components/auth/PasswordResetForms";

export const metadata: Metadata = pageMetadata({
  title: "Choose a New Password",
  description: "Set a new password for your account.",
  path: "/reset-password",
  index: false,
});

/**
 * Reached from the emailed recovery link, which `/auth/callback` has already
 * exchanged for a short-lived session. Without that session there is nothing
 * to authorise the change, so the page explains rather than showing a form
 * that would fail on submit.
 */
export default async function ResetPasswordPage() {
  const subtitle = "Choose something you have not used on this site before.";

  if (!(await authAvailable())) {
    return (
      <AuthShell title="Choose a new password" subtitle={subtitle}>
        <AuthUnavailable />
      </AuthShell>
    );
  }

  const user = await getUser();

  if (!user) {
    return (
      <AuthShell
        title="That link has expired"
        subtitle="Reset links are valid for one hour and can only be used once."
        footer={
          <Link
            href="/forgot-password"
            className="font-medium text-brand-600 underline underline-offset-2"
          >
            Send a new reset link
          </Link>
        }
      >
        <p className="text-center text-[0.9375rem] leading-relaxed text-ink-700">
          Request another link and open it from the same device you are
          reading this on.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Choose a new password" subtitle={subtitle}>
      <ResetPasswordForm />
    </AuthShell>
  );
}

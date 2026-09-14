import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { authAvailable } from "@/lib/auth/dal";
import { AuthShell, AuthUnavailable } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/PasswordResetForms";

export const metadata: Metadata = pageMetadata({
  title: "Reset Your Password",
  description: "Send yourself a link to choose a new password.",
  path: "/forgot-password",
  index: false,
});

export default async function ForgotPasswordPage() {
  const available = await authAvailable();

  const subtitle =
    "Enter the address you signed up with and we will send you a link to choose a new password.";

  return (
    <AuthShell
      title="Reset your password"
      subtitle={subtitle}
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/signin"
            className="font-medium text-brand-600 underline underline-offset-2"
          >
            Back to sign in
          </Link>
        </>
      }
    >
      {available ? <ForgotPasswordForm /> : <AuthUnavailable />}
    </AuthShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { authAvailable, getUser } from "@/lib/auth/dal";
import { safeRedirectPath } from "@/lib/auth/validation";
import { AuthShell, AuthUnavailable } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";
import { FormAlert } from "@/components/auth/fields";

export const metadata: Metadata = pageMetadata({
  title: "Sign In",
  description:
    "Sign in to carry your study progress, bookmarks and practice history across every device.",
  path: "/signin",
  // Nothing here for a search engine, and not a page anyone should arrive at
  // from a result.
  index: false,
});

const OAUTH_ERRORS: Record<string, string> = {
  oauth: "Google sign-in could not be started. Try again, or use your email address below.",
  callback:
    "That sign-in link could not be completed. It may have already been used — start again below.",
  unavailable: "Accounts are not switched on for this site yet.",
};

export default async function SignInPage({
  searchParams,
}: {
  // A Promise in Next 16 — it has to be awaited before use.
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeRedirectPath(params.next);

  const subtitle =
    "Your roadmap progress, saved pages and practice history, on every device you study from.";

  if (!(await authAvailable())) {
    return (
      <AuthShell title="Sign in" subtitle={subtitle}>
        <AuthUnavailable />
      </AuthShell>
    );
  }

  // Already signed in: send them on rather than showing a form they cannot use.
  if (await getUser()) redirect(next);

  const error = params.error ? OAUTH_ERRORS[params.error] : undefined;

  return (
    <AuthShell
      title="Sign in"
      subtitle={subtitle}
      footer={
        <>
          New here?{" "}
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="font-medium text-brand-600 underline underline-offset-2"
          >
            Create a free account
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        {error ? <FormAlert tone="error">{error}</FormAlert> : null}
        <SignInForm next={next} />
      </div>
    </AuthShell>
  );
}

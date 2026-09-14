import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { authAvailable, getUser } from "@/lib/auth/dal";
import { safeRedirectPath } from "@/lib/auth/validation";
import { AuthShell, AuthUnavailable } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = pageMetadata({
  title: "Create Account",
  description:
    "Create a free GCP Prep account to sync your study progress across devices.",
  path: "/signup",
  index: false,
});

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = safeRedirectPath(params.next);

  const subtitle =
    "Free, and it takes a moment. Everything you have already studied in this browser comes with you.";

  if (!(await authAvailable())) {
    return (
      <AuthShell title="Create your account" subtitle={subtitle}>
        <AuthUnavailable />
      </AuthShell>
    );
  }

  if (await getUser()) redirect(next);

  return (
    <AuthShell
      title="Create your account"
      subtitle={subtitle}
      footer={
        <>
          Already have one?{" "}
          <Link
            href={`/signin?next=${encodeURIComponent(next)}`}
            className="font-medium text-brand-600 underline underline-offset-2"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm next={next} />
    </AuthShell>
  );
}

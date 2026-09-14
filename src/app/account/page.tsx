import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { requireUser } from "@/lib/auth/dal";
import { displayName } from "@/lib/auth/types";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  Section,
  buttonClass,
} from "@/components/ui";
import { FormAlert } from "@/components/auth/fields";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { ProfileForm } from "@/components/account/ProfileForm";
import { SyncPanel } from "@/components/account/SyncPanel";

export const metadata: Metadata = pageMetadata({
  title: "Account",
  description: "Manage your account and your synced study progress.",
  path: "/account",
  index: false,
});

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-card border border-ink-200 bg-white p-6">
      <h2 className="text-[1.0625rem] font-semibold text-ink-900">{title}</h2>
      {description ? (
        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
          {description}
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string }>;
}) {
  // Redirects to sign-in — and back here afterwards — when there is no session.
  const user = await requireUser("/account");
  const params = await searchParams;

  // Google accounts have no password on this site to change, and the email
  // address belongs to the provider rather than to us.
  const isPasswordAccount = user.provider === "email";

  return (
    <Section className="py-10">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Account", path: "/account" },
          ]}
        />

        <h1 className="text-[2rem] leading-tight">
          {displayName(user)}&rsquo;s account
        </h1>
        <p className="mt-3 text-[1.0625rem] text-ink-600">
          Signed in as {user.email}
          {isPasswordAccount ? "" : " via Google"}.
        </p>

        <div className="mt-8 space-y-5">
          {params.updated === "password" ? (
            <FormAlert tone="success">
              Your password has been changed. You are signed in with it now.
            </FormAlert>
          ) : null}

          <Panel
            title="Profile"
            description="The name we greet you by. Nothing here is shown publicly — this site has no public profiles."
          >
            <ProfileForm name={user.name ?? ""} />
          </Panel>

          <Panel
            title="Study progress"
            description="Your roadmap steps, read topics, bookmarks and practice history, kept in step across every device you sign in on."
          >
            <SyncPanel signedIn />
          </Panel>

          {isPasswordAccount ? (
            <Panel
              title="Password"
              description="We send a link to your email address rather than asking for your current password here."
            >
              <ButtonLink href="/forgot-password" variant="secondary" size="md">
                Send me a reset link
              </ButtonLink>
            </Panel>
          ) : null}

          <Panel title="Session">
            <div className="flex flex-wrap items-center gap-4">
              <SignOutButton className={buttonClass("secondary", "md")}>
                Sign out
              </SignOutButton>
              <p className="text-[0.8125rem] text-ink-500">
                Your progress stays on this device after signing out, and syncs
                again next time you sign in.
              </p>
            </div>
          </Panel>

          <p className="text-center text-[0.8125rem] leading-relaxed text-ink-500">
            To delete your account entirely, email us from{" "}
            <span className="font-medium text-ink-700">{user.email}</span> via
            the{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-600 underline underline-offset-2"
            >
              contact page
            </Link>{" "}
            and we will remove it and everything attached to it.
          </p>
        </div>
      </Container>
    </Section>
  );
}

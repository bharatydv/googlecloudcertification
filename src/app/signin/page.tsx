import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import {
  ButtonLink,
  Callout,
  Container,
  Icon,
  Section,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Sign In",
  description:
    "Accounts are not live yet. Everything on GCP Prep works without one, and your progress is saved in your browser.",
  path: "/signin",
  index: false,
});

/**
 * Placeholder for authentication.
 *
 * The architecture supports accounts — progress, attempts and bookmarks all
 * live behind the hooks in lib/progress.ts, which can be pointed at an API
 * without touching any component. Until that backend exists we say so plainly
 * rather than showing a form that cannot work.
 */
export default function SignInPage() {
  return (
    <Section className="py-16">
      <Container size="narrow">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
            <Icon name="graduation" className="h-6 w-6 text-brand-600" />
          </div>

          <h1 className="mt-5 text-[1.75rem] leading-tight">
            Accounts are not live yet
          </h1>

          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
            You do not need one. Every guide, learning topic and practice
            question on this site is available without signing in, and your
            study progress is saved automatically in your browser.
          </p>
        </div>

        <Callout tone="info" title="What an account will add" className="mt-8">
          Progress synced across your devices, saved questions and bookmarks
          that follow you, longer attempt history, and personalised study plans.
          None of that is available yet, and we are not collecting email
          addresses for a waitlist.
        </Callout>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard"
            className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
          >
            <Icon name="chart" className="h-5 w-5 text-brand-500" />
            <h2 className="mt-3 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
              Your dashboard
            </h2>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
              Progress, practice performance and weak topics — all from local
              storage, no account needed.
            </p>
          </Link>

          <Link
            href="/privacy-policy"
            className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
          >
            <Icon name="shield" className="h-5 w-5 text-brand-500" />
            <h2 className="mt-3 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
              What we store
            </h2>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
              Nothing on our servers. Read exactly what stays in your browser
              and how to clear it.
            </p>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/certifications" size="md">
            Explore certifications
          </ButtonLink>
          <ButtonLink href="/practice-tests" variant="secondary" size="md">
            Start practising
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

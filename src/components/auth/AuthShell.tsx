import Link from "next/link";
import { Container, Icon, Section } from "@/components/ui";

/**
 * The frame every auth page sits in: narrow, centred, and free of the
 * distractions a page whose only job is one form does not need.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Section className="py-12 sm:py-16">
      <Container size="narrow">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
              <Icon name="graduation" className="h-6 w-6 text-brand-600" />
            </div>
            <h1 className="mt-5 text-[1.75rem] leading-tight">{title}</h1>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
              {subtitle}
            </p>
          </div>

          <div className="mt-7 rounded-card border border-ink-200 bg-white p-6 shadow-subtle sm:p-7">
            {children}
          </div>

          {footer ? (
            <div className="mt-5 text-center text-[0.875rem] text-ink-600">
              {footer}
            </div>
          ) : null}

          <p className="mt-8 text-center text-[0.8125rem] leading-relaxed text-ink-500">
            An account is optional. Every guide, topic and practice question on
            this site is free to use without one — signing in only carries your
            progress between devices. See our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-brand-600 underline underline-offset-2"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Shown in place of a form when the deployment has no Supabase credentials.
 *
 * Accounts are an optional layer here, so an unconfigured environment is a
 * legitimate state rather than an error — and saying so plainly beats a form
 * that silently cannot work.
 */
export function AuthUnavailable() {
  return (
    <div className="text-center">
      <p className="text-[0.9375rem] leading-relaxed text-ink-700">
        Accounts are not switched on for this site yet.
      </p>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600">
        Nothing is lost in the meantime: your roadmap progress, saved pages and
        practice history are all being kept in this browser, and your{" "}
        <Link
          href="/dashboard"
          className="font-medium text-brand-600 underline underline-offset-2"
        >
          dashboard
        </Link>{" "}
        works exactly as it does with an account — it just stays on this device.
      </p>
    </div>
  );
}

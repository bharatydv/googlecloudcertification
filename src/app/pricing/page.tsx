import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { questions } from "@/lib/data/questions";
import {
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  FaqList,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "GCP Prep is free today. Here is what stays free permanently and what will sit behind a paid tier when premium launches.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Free",
    price: "£0",
    cadence: "always",
    summary:
      "Everything currently on the site. The educational content stays free permanently.",
    cta: { label: "Start learning", href: "/certifications" },
    featured: false,
    features: [
      "All certification study guides",
      "All learning-hub topics",
      "All long-form guides and articles",
      "Career resources",
      `${questions.length} practice questions with full explanations`,
      "Basic progress tracking in your browser",
      "GCP Prep AI library search",
    ],
  },
  {
    name: "Premium",
    price: "TBC",
    cadence: "not yet available",
    summary:
      "The expensive things to produce. Not launched, not taking payment, and we will not pre-sell it.",
    cta: { label: "Tell us what you need", href: "/contact" },
    featured: true,
    features: [
      "Full question bank as it grows",
      "Full-length mock exams per certification",
      "Advanced analytics across attempts",
      "Personalised study plans with scheduling",
      "Weak-topic analysis and targeted drills",
      "Conversational AI tutor grounded in our library",
      "Progress synced across devices",
    ],
  },
];

const faqs = [
  {
    q: "Is the site free right now?",
    a: "Yes, entirely. Every page, every guide and every practice question is available with no account and no payment. There is no trial that expires.",
  },
  {
    q: "What will stay free when premium launches?",
    a: "All the educational content — certification guides, learning topics, long-form guides, career material — plus a meaningful set of practice questions. We are not planning to move existing free content behind a paywall.",
  },
  {
    q: "Why is there no price yet?",
    a: "Because premium does not exist yet, and we would rather show you an honest 'not available' than take money for something we have not built. When it launches, the price will be on this page before anyone can pay it.",
  },
  {
    q: "Do you run ads?",
    a: "No. There is no advertising and no third-party tracking on this site. If that changes we will say so clearly rather than quietly.",
  },
  {
    q: "Do you offer discounts for students?",
    a: "When premium launches, yes — we intend to have a substantially reduced student rate. Cost should not be the reason someone cannot prepare properly.",
  },
];

export default function PricingPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">Pricing</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            Everything on GCP Prep is free today. This page explains what
            will stay free and what we plan to charge for, so you know before
            you invest time here.
          </p>

          <Callout tone="info" className="mt-7 max-w-3xl">
            <strong className="font-semibold">
              Payment processing is not enabled.
            </strong>{" "}
            The premium tier below is a published plan, not a product you can
            buy. Nothing on this site takes payment, and no card details are
            collected anywhere.
          </Callout>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-card border bg-white p-6 sm:p-7",
                  tier.featured
                    ? "border-brand-300 shadow-raised"
                    : "border-ink-200",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[1.25rem]">{tier.name}</h2>
                  {tier.featured ? (
                    <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[0.6875rem] font-medium text-ink-600">
                      Planned
                    </span>
                  ) : (
                    <span className="rounded-full bg-success-50 px-2.5 py-1 text-[0.6875rem] font-medium text-success-700">
                      Available now
                    </span>
                  )}
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[2.5rem] font-semibold leading-none text-ink-900">
                    {tier.price}
                  </span>
                  <span className="text-[0.875rem] text-ink-500">
                    {tier.cadence}
                  </span>
                </p>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {tier.summary}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Icon
                        name="check"
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0",
                          tier.featured ? "text-ink-400" : "text-success-500",
                        )}
                        strokeWidth={2.2}
                      />
                      <span className="text-[0.9rem] leading-relaxed text-ink-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={tier.cta.href}
                  variant={tier.featured ? "secondary" : "primary"}
                  size="md"
                  className="mt-7 w-full"
                >
                  {tier.cta.label}
                </ButtonLink>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-[1.5rem]">Questions about pricing</h2>
            <FaqList faqs={faqs} className="mt-5" />
          </div>

          <div className="mt-10 rounded-card border border-ink-200 bg-ink-50 p-6">
            <h2 className="text-[1.125rem]">Help us build the right thing</h2>
            <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
              If there is something you would genuinely pay for that is not on
              the list above, we would like to know. It is a better use of our
              time than guessing.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
            >
              Tell us what you need
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import {
  Breadcrumbs,
  Container,
  FaqList,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with GCP Prep — report a content error, suggest a topic, or ask a question about cloud certification preparation.",
  path: "/contact",
});

const faqs = [
  {
    q: "I found an error on a page. What should I do?",
    a: "Tell us, with a link to the page and what you believe is wrong. Corrections are the messages we prioritise most — accuracy is the only thing this site really has to offer.",
  },
  {
    q: "Can you tell me whether I am ready for an exam?",
    a: "Not reliably, and we would not want to guess. The honest answer is that if you are consistently clearing a comfortable margin above pass on full-length timed mocks, without notes, you are in a reasonable position to book.",
  },
  {
    q: "Do you sell exam questions or dumps?",
    a: "No, and we never will. All our questions are written from scratch to test understanding of publicly documented concepts. Please do not ask us for real exam content.",
  },
  {
    q: "Can I write for GCP Prep?",
    a: "Possibly. Send us something you have written about a cloud topic and tell us what you would want to cover. We care more about clear thinking than credentials.",
  },
  {
    q: "Are you affiliated with Google Cloud?",
    a: "No. GCP Prep is an independent educational website and is not affiliated with, endorsed by, or sponsored by Google LLC or Google Cloud. If you need official information, go to the official certification pages.",
  },
];

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container size="narrow">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">Contact</h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
            Questions, corrections and suggestions are all welcome. We read
            everything and reply to most messages within a few days.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="narrow">
          <div className="rounded-card border border-ink-200 bg-white p-6 sm:p-8">
            <ContactForm email={site.contactEmail} />
          </div>

          <div className="mt-10">
            <h2 className="text-[1.4rem]">Before you write</h2>
            <p className="mt-2 text-[0.9375rem] text-ink-600">
              These come up often enough that the answer may already be here.
            </p>
            <FaqList faqs={faqs} className="mt-5" />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/about"
              className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
            >
              <Icon name="info" className="h-5 w-5 text-brand-500" />
              <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
                About GCP Prep
              </h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                Who we are, what we publish and what we will not publish.
              </p>
            </Link>
            <Link
              href="/disclaimer"
              className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
            >
              <Icon name="shield" className="h-5 w-5 text-brand-500" />
              <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
                Disclaimer
              </h3>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                Our independent status and the limits of what we publish.
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

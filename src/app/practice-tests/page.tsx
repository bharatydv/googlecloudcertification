import type { Metadata } from "next";
import Link from "next/link";
import { certLevelMeta, certLevelOrder, certifications } from "@/lib/data/certifications";
import { countQuestionsForCert, questions, topicBreakdown } from "@/lib/data/questions";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import {
  Badge,
  Breadcrumbs,
  Callout,
  Container,
  Icon,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Certification Practice Tests",
  description:
    "Original practice questions and timed mock exams for Google Cloud certifications, with full explanations for every answer. No exam dumps.",
  path: "/practice-tests",
});

export default function PracticeTestsPage() {
  const topics = topicBreakdown();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Practice Tests", path: "/practice-tests" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            Practice Tests
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            {questions.length} original questions across {topics.length} topics.
            Practise at your own pace with immediate explanations, or sit a
            timed mock exam and get a per-topic breakdown at the end.
          </p>

          <Callout tone="info" className="mt-7 max-w-3xl">
            <strong className="font-semibold">
              Every question here is written from scratch.
            </strong>{" "}
            We do not publish, resell or reproduce real exam questions, leaked
            material or exam dumps. Using such material breaches certification
            agreements and can invalidate your certification.
          </Callout>
        </Container>
      </Section>

      {/* ------------------------ By certification ------------------------ */}
      <Section className="pt-4">
        <Container>
          <SectionHeading
            eyebrow="By certification"
            title="Certification practice tests"
            description="Questions relevant to a specific exam, drawn from the topics that exam covers."
          />

          <div className="flex flex-col gap-10">
            {certLevelOrder.map((level) => {
              const certs = certifications.filter(
                (c) => c.level === level && countQuestionsForCert(c.slug) > 0,
              );
              if (certs.length === 0) return null;

              return (
                <div key={level}>
                  <h3 className="mb-4 border-l-2 border-brand-300 pl-4 text-lg">
                    {certLevelMeta[level].label}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {certs.map((cert) => {
                      const count = countQuestionsForCert(cert.slug);
                      return (
                        <article
                          key={cert.slug}
                          className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <Badge tone="brand">{count} questions</Badge>
                            <span className="text-[0.75rem] text-ink-500">
                              ~{Math.max(1, Math.round(count * 2))} min
                            </span>
                          </div>
                          <h4 className="text-[1rem] leading-snug">
                            <Link
                              href={`/practice-tests/${cert.slug}`}
                              className="before:absolute before:inset-0 before:rounded-card"
                            >
                              {cert.shortName} Practice Test
                            </Link>
                          </h4>
                          <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                            {cert.tagline}
                          </p>
                          <div className="mt-4 flex items-center gap-3 border-t border-ink-200 pt-3.5 text-[0.8125rem]">
                            <span className="flex items-center gap-1.5 font-medium text-brand-600">
                              Start practising
                              <Icon
                                name="arrow-right"
                                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                                strokeWidth={2}
                              />
                            </span>
                            <Link
                              href={`/practice-tests/${cert.slug}?mode=exam`}
                              className="relative z-10 ml-auto text-ink-500 underline underline-offset-2 hover:text-ink-700"
                            >
                              Timed mock
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------------------- By topic ---------------------------- */}
      <Section tone="subtle">
        <Container>
          <SectionHeading
            eyebrow="By topic"
            title="Topic drills"
            description="Work through one subject at a time. The fastest way to close a gap you have already identified."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              /* The card is a div, not a link. The heading's link stretches a
                 pseudo-element over the whole card for the click target, which
                 keeps the secondary link a sibling rather than a nested <a>. */
              <div
                key={topic.topic}
                className="group relative flex items-start gap-4 rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.9375rem] font-medium text-ink-900 group-hover:text-brand-700">
                    <Link
                      href={`/practice-tests/topics/${topic.topic}`}
                      className="before:absolute before:inset-0 before:rounded-card"
                    >
                      {topic.label}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">
                    {topic.blurb}
                  </p>
                  <Link
                    href={`/learn/${topic.learn}`}
                    className="relative z-10 mt-2.5 inline-block text-[0.75rem] font-medium text-brand-600 hover:text-brand-700"
                  >
                    Read the topic first →
                  </Link>
                </div>
                <span className="shrink-0 rounded-full bg-ink-100 px-2.5 py-1 text-[0.75rem] font-medium text-ink-600">
                  {topic.count}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------- How it works ------------------------ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How to use these"
            title="Practice questions are a diagnostic, not a score to collect"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "target" as const,
                title: "Read every explanation",
                text: "Including for questions you answered correctly. Confirming your reasoning matters as much as correcting it.",
              },
              {
                icon: "list" as const,
                title: "Write down the concept",
                text: "When you get one wrong, note the underlying concept rather than the answer. The exam phrases it differently.",
              },
              {
                icon: "terminal" as const,
                title: "Go back to the console",
                text: "For topics you keep missing, build the thing rather than re-reading notes. Recognition comes from doing.",
              },
              {
                icon: "clock" as const,
                title: "Finish with timed mocks",
                text: "Full length, no notes, no pauses. Stamina is a real factor in a two-hour scenario exam.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-ink-200 bg-white p-5"
              >
                <Icon name={item.icon} className="h-6 w-6 text-brand-500" />
                <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "Cloud certification practice tests",
            items: certifications
              .filter((c) => countQuestionsForCert(c.slug) > 0)
              .map((c) => ({
                name: `${c.shortName} Practice Test`,
                path: `/practice-tests/${c.slug}`,
              })),
          }),
        ]}
      />
    </>
  );
}

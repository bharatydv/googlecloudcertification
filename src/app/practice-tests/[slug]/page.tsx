import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { certifications, getCertification } from "@/lib/data/certifications";
import {
  buildPracticeTest,
  countQuestionsForCert,
  questionTopicMeta,
  questionTopicOrder,
} from "@/lib/data/questions";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs, Callout, Container, Icon, JsonLd } from "@/components/ui";
import { PracticeRunner } from "@/components/practice/PracticeRunner";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return certifications
    .filter((c) => countQuestionsForCert(c.slug) > 0)
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) return {};

  const count = countQuestionsForCert(cert.slug);
  return pageMetadata({
    title: `${cert.name} Practice Test`,
    description: `${count} original ${cert.name} practice questions with detailed explanations for every answer. Practise freely or sit a timed mock exam.`,
    path: `/practice-tests/${cert.slug}`,
  });
}

const topicLabels = Object.fromEntries(
  questionTopicOrder.map((t) => [t, questionTopicMeta[t].label]),
);

export default async function CertPracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;

  const cert = getCertification(slug);
  if (!cert) notFound();

  const questions = buildPracticeTest(cert.slug, 50, 7);
  if (questions.length === 0) notFound();

  const examMode = mode === "exam";

  // Distinct concepts under test — crawlable, and useful before you start.
  const concepts = [...new Set(questions.map((q) => q.concept))];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Practice Tests", path: "/practice-tests" },
    { name: cert.shortName, path: `/practice-tests/${cert.slug}` },
  ];

  return (
    <>
      <div className="border-b border-ink-200 bg-ink-50">
        <Container className="py-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[1.6rem] leading-tight sm:text-[2rem]">
                {cert.name} Practice Test
              </h1>
              <p className="mt-2 text-[0.9375rem] text-ink-600">
                {questions.length} original questions ·{" "}
                {examMode ? "Timed mock exam" : "Practice mode with instant explanations"}
              </p>
            </div>
            <div className="flex gap-3 text-[0.875rem]">
              <Link
                href={`/certifications/${cert.slug}`}
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                Study guide
              </Link>
              <Link
                href={
                  examMode
                    ? `/practice-tests/${cert.slug}`
                    : `/practice-tests/${cert.slug}?mode=exam`
                }
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                {examMode ? "Switch to practice mode" : "Switch to timed mock"}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <PracticeRunner
          testId={`cert:${cert.slug}:${examMode ? "exam" : "practice"}`}
          title={`${cert.name} Practice Test`}
          subject={cert.slug}
          questions={questions}
          mode={examMode ? "exam" : "practice"}
          topicLabels={topicLabels}
        />

        <section className="mt-10">
          <h2 className="text-[1.25rem]">What this test covers</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
            One concept per question, across the topics {cert.name} draws on.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {concepts.map((concept) => (
              <li
                key={concept}
                className="flex gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3"
              >
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
                  strokeWidth={2.2}
                />
                <span className="text-[0.9rem] leading-relaxed text-ink-700">
                  {concept}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Callout tone="info" className="mt-10">
          These questions are written by GCP Prep to test understanding of
          publicly documented concepts. They are not real exam questions and are
          not a prediction of what any exam contains.
        </Callout>

        <RelatedContent
          className="mt-8"
          certs={[cert.slug, ...cert.relatedCerts.slice(0, 2)]}
          learn={cert.relatedLearn}
          guides={cert.relatedGuides.slice(0, 2)}
        />
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { QuestionTopic } from "@/types";
import {
  buildTopicDrill,
  getQuestionsByTopic,
  questionTopicMeta,
  questionTopicOrder,
} from "@/lib/data/questions";
import { getLearnTopic } from "@/lib/data/learn";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Breadcrumbs, Callout, Container, Icon, JsonLd } from "@/components/ui";
import { PracticeRunner } from "@/components/practice/PracticeRunner";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return questionTopicOrder
    .filter((topic) => getQuestionsByTopic(topic).length > 0)
    .map((topic) => ({ topic }));
}

function isTopic(value: string): value is QuestionTopic {
  return questionTopicOrder.includes(value as QuestionTopic);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  const meta = questionTopicMeta[topic];
  const count = getQuestionsByTopic(topic).length;

  return pageMetadata({
    title: `${meta.label} Practice Questions`,
    description: `${count} original ${meta.label} practice questions for Google Cloud certifications, with a full explanation for every answer.`,
    path: `/practice-tests/topics/${topic}`,
  });
}

const topicLabels = Object.fromEntries(
  questionTopicOrder.map((t) => [t, questionTopicMeta[t].label]),
);

export default async function TopicDrillPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();

  const questions = buildTopicDrill(topic, 3);
  if (questions.length === 0) notFound();

  const meta = questionTopicMeta[topic];
  const learnTopic = getLearnTopic(meta.learn);

  // Distinct concepts under test, in question order.
  const concepts = [...new Set(questions.map((q) => q.concept))];

  // Certifications this topic contributes to, for related links.
  const relatedCerts = [
    ...new Set(questions.flatMap((q) => q.certs)),
  ].slice(0, 4);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Practice Tests", path: "/practice-tests" },
    { name: meta.label, path: `/practice-tests/topics/${topic}` },
  ];

  return (
    <>
      <div className="border-b border-ink-200 bg-ink-50">
        <Container className="py-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[1.6rem] leading-tight sm:text-[2rem]">
                {meta.label} Practice Questions
              </h1>
              <p className="mt-2 max-w-2xl text-[0.9375rem] text-ink-600">
                {meta.blurb} {questions.length} original questions with full
                explanations.
              </p>
            </div>
            {learnTopic ? (
              <Link
                href={`/learn/${learnTopic.slug}`}
                className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
              >
                <Icon name="book" className="h-4 w-4" strokeWidth={1.8} />
                Read {learnTopic.title} first
              </Link>
            ) : null}
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <PracticeRunner
          testId={`topic:${topic}`}
          title={`${meta.label} Practice Questions`}
          subject={`topic:${topic}`}
          questions={questions}
          mode="practice"
          topicLabels={topicLabels}
        />

        <Callout tone="info" className="mt-10">
          These questions are written by GCP Prep to test understanding of
          publicly documented concepts. They are not real exam questions.
        </Callout>

        <section className="mt-10">
          <h2 className="text-[1.25rem]">What this test covers</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
            One concept per question. If you can explain each of these without
            hesitating, you are in good shape on {meta.label}.
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

        <div className="mt-8">
          <h2 className="mb-4 text-[1.125rem]">Other topics</h2>
          <ul className="flex flex-wrap gap-2">
            {questionTopicOrder
              .filter(
                (t) => t !== topic && getQuestionsByTopic(t).length > 0,
              )
              .map((t) => (
                <li key={t}>
                  <Link
                    href={`/practice-tests/topics/${t}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-[0.8125rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {questionTopicMeta[t].label}
                    <span className="text-ink-400">
                      {getQuestionsByTopic(t).length}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <RelatedContent
          className="mt-8"
          certs={relatedCerts}
          learn={learnTopic ? [learnTopic.slug, ...learnTopic.related.slice(0, 2)] : []}
        />
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

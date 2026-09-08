import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearnTopic, learnCategoryMeta, learnTopics } from "@/lib/data/learn";
import { getCertification } from "@/lib/data/certifications";
import { getQuestionsByTopic, questionTopicMeta } from "@/lib/data/questions";
import { pageMetadata, metaDescription } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import {
  Badge,
  Breadcrumbs,
  Callout,
  Container,
  Icon,
  JsonLd,
} from "@/components/ui";
import { SectionedContent, sectionId } from "@/components/content/Blocks";
import { LearnSidebar } from "@/components/learn/LearnSidebar";
import { TopicActions } from "@/components/learn/TopicActions";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return learnTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getLearnTopic(slug);
  if (!topic) return {};

  return pageMetadata({
    title: topic.title,
    description: metaDescription(topic.summary),
    path: `/learn/${topic.slug}`,
    type: "article",
    modifiedTime: topic.updated,
  });
}

export default async function LearnTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getLearnTopic(slug);
  if (!topic) notFound();

  const questionCount = getQuestionsByTopic(topic.questionTopic).length;
  const questionMeta = questionTopicMeta[topic.questionTopic];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: topic.title, path: `/learn/${topic.slug}` },
  ];

  const toc = [
    ...topic.sections.map((s) => ({ id: sectionId(s.heading), label: s.heading })),
    { id: "certification-relevance", label: "Certification relevance" },
    ...(questionCount > 0
      ? [{ id: "practice", label: "Practice questions" }]
      : []),
  ];

  return (
    <>
      <Container size="wide" className="py-10">
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)_13rem]">
          {/* --------------------------- Sidebar -------------------------- */}
          <div>
            <LearnSidebar currentSlug={topic.slug} />
          </div>

          {/* --------------------------- Content -------------------------- */}
          <article className="min-w-0">
            <Breadcrumbs items={crumbs} />

            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{learnCategoryMeta[topic.category].label}</Badge>
              <span className="text-[0.8125rem] text-ink-500">
                {readingTime(topic.readingWords)}
              </span>
              <span className="text-[0.8125rem] text-ink-500">
                Updated {formatDate(topic.updated)}
              </span>
            </div>

            <h1 className="mt-3 text-[2rem] leading-tight sm:text-[2.3rem]">
              {topic.title}
            </h1>

            <div className="mt-4">
              <TopicActions slug={topic.slug} title={topic.title} />
            </div>

            <Callout tone="info" title="In one sentence" className="mt-6">
              {topic.oneLiner}
            </Callout>

            <div className="mt-8">
              <SectionedContent sections={topic.sections} />
            </div>

            {/* Certification relevance */}
            <section id="certification-relevance" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.4rem]">Certification relevance</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                Where this topic appears, and how deeply each exam goes into it.
                These are our own assessments based on published exam guides.
              </p>
              <ul className="mt-5 space-y-3">
                {topic.certRelevance.map((item) => {
                  const cert = getCertification(item.cert);
                  if (!cert) return null;
                  return (
                    <li
                      key={item.cert}
                      className="rounded-card border border-ink-200 bg-white p-4"
                    >
                      <Link
                        href={`/certifications/${cert.slug}`}
                        className="text-[0.9375rem] font-semibold text-ink-900 hover:text-brand-700"
                      >
                        {cert.name}
                      </Link>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                        {item.note}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Practice */}
            {questionCount > 0 ? (
              <section id="practice" className="mt-12 scroll-mt-24">
                <h2 className="text-[1.4rem]">Practice questions</h2>
                <Link
                  href={`/practice-tests/topics/${topic.questionTopic}`}
                  className="group mt-4 flex items-center gap-4 rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                >
                  <Icon name="list" className="h-6 w-6 shrink-0 text-brand-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-medium text-ink-900">
                      {questionMeta.label} practice questions
                    </p>
                    <p className="mt-0.5 text-[0.875rem] text-ink-600">
                      {questionCount} original questions with full explanations.
                    </p>
                  </div>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                    strokeWidth={2}
                  />
                </Link>
              </section>
            ) : null}

            <RelatedContent
              className="mt-12"
              learn={topic.related}
              certs={topic.certRelevance.map((c) => c.cert).slice(0, 3)}
            />
          </article>

          {/* ------------------------ On this page ------------------------ */}
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
            >
              <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                On this page
              </p>
              <ul className="space-y-2 border-l border-ink-200">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent pl-3 text-[0.8125rem] leading-snug text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Container>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: topic.title,
            description: topic.summary,
            path: `/learn/${topic.slug}`,
            published: topic.updated,
            modified: topic.updated,
          }),
        ]}
      />
    </>
  );
}

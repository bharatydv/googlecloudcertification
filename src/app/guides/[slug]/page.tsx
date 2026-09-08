import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/data/guides";
import { pageMetadata, metaDescription } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  FaqList,
  Icon,
  JsonLd,
} from "@/components/ui";
import { SectionedContent, sectionId } from "@/components/content/Blocks";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return pageMetadata({
    title: guide.seoTitle,
    description: metaDescription(guide.description),
    path: `/guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.updated,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ];

  const toc = [
    ...guide.sections.map((s) => ({ id: sectionId(s.heading), label: s.heading })),
    ...(guide.faqs.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <Container size="wide" className="py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="mx-auto min-w-0 max-w-3xl">
            <Breadcrumbs items={crumbs} />

            <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
              {guide.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-ink-500">
              <span>{site.name}</span>
              <span aria-hidden="true">·</span>
              <span>{readingTime(guide.readingWords)}</span>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(guide.updated)}</span>
            </div>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-700">
              {guide.intro}
            </p>

            {/* Mobile contents */}
            <details className="group mt-8 rounded-card border border-ink-200 bg-ink-50 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[0.875rem] font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-2">
                  <Icon name="list" className="h-4 w-4 text-ink-500" />
                  Table of contents
                </span>
                <Icon
                  name="chevron-down"
                  className="h-4 w-4 text-ink-400 transition-transform group-open:rotate-180"
                  strokeWidth={2}
                />
              </summary>
              <ul className="space-y-2 border-t border-ink-200 px-4 py-4">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[0.875rem] text-ink-600 hover:text-brand-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>

            <div className="mt-8">
              <SectionedContent sections={guide.sections} />
            </div>

            {guide.faqs.length > 0 ? (
              <section id="faq" className="mt-12 scroll-mt-24">
                <h2 className="text-[1.4rem]">Frequently Asked Questions</h2>
                <FaqList faqs={guide.faqs} className="mt-5" />
              </section>
            ) : null}

            <div className="mt-10 rounded-card border border-brand-200 bg-brand-50 p-6">
              <h2 className="text-[1.125rem] text-brand-900">
                Put this into practice
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-brand-900/80">
                Reading is the easy part. Work through original practice
                questions with full explanations to find out what you actually
                know.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/practice-tests" size="md">
                  Start practising
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </ButtonLink>
                <ButtonLink href="/certifications" variant="secondary" size="md">
                  Browse certifications
                </ButtonLink>
              </div>
            </div>

            <RelatedContent
              className="mt-10"
              certs={guide.relatedCerts}
              guides={guide.relatedGuides}
              learn={guide.relatedLearn}
            />
          </article>

          <aside className="hidden lg:block">
            <nav
              aria-label="Table of contents"
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
            title: guide.title,
            description: guide.description,
            path: `/guides/${guide.slug}`,
            published: guide.published,
            modified: guide.updated,
          }),
          ...(guide.faqs.length > 0 ? [faqSchema(guide.faqs)] : []),
        ]}
      />
    </>
  );
}

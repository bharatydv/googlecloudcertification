import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerPages, getCareerPage } from "@/lib/data/careers";
import { pageMetadata, metaDescription } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import { Breadcrumbs, Container, Icon, JsonLd } from "@/components/ui";
import { SectionedContent, sectionId } from "@/components/content/Blocks";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return careerPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getCareerPage(slug);
  if (!page) return {};

  return pageMetadata({
    title: page.title,
    description: metaDescription(page.description),
    path: `/careers/${page.slug}`,
    type: "article",
    modifiedTime: page.updated,
  });
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getCareerPage(slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: page.title, path: `/careers/${page.slug}` },
  ];

  const toc = page.sections.map((s) => ({
    id: sectionId(s.heading),
    label: s.heading,
  }));

  return (
    <>
      <Container size="wide" className="py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="mx-auto min-w-0 max-w-3xl">
            <Breadcrumbs items={crumbs} />

            <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
              {page.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-ink-500">
              <span>{readingTime(page.readingWords)}</span>
              <span aria-hidden="true">·</span>
              <span>Updated {formatDate(page.updated)}</span>
            </div>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-700">
              {page.intro}
            </p>

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
              <SectionedContent sections={page.sections} />
            </div>

            <RelatedContent
              className="mt-10"
              certs={page.relatedCerts}
              careers={page.relatedCareers}
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
            title: page.title,
            description: page.description,
            path: `/careers/${page.slug}`,
            published: page.updated,
            modified: page.updated,
          }),
        ]}
      />
    </>
  );
}

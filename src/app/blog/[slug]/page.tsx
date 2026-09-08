import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/data/blog";
import { pageMetadata, metaDescription } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import { site } from "@/lib/site";
import { Badge, Breadcrumbs, Container, Icon, JsonLd } from "@/components/ui";
import { SectionedContent, sectionId } from "@/components/content/Blocks";
import { RelatedContent } from "@/components/content/Related";
import { ShareLinks } from "@/components/content/ShareLinks";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: metaDescription(post.description),
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const toc = post.sections.map((s) => ({
    id: sectionId(s.heading),
    label: s.heading,
  }));

  return (
    <>
      <Container size="wide" className="py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="mx-auto min-w-0 max-w-3xl">
            <Breadcrumbs items={crumbs} />

            <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
              <Badge tone="brand">{post.category}</Badge>
            </Link>

            <h1 className="mt-4 text-[2rem] leading-tight sm:text-[2.4rem]">
              {post.title}
            </h1>

            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-600">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-ink-200 py-4 text-[0.8125rem] text-ink-500">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-[0.6875rem] font-semibold text-brand-700">
                  GCP
                </span>
                <span className="font-medium text-ink-700">{post.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>Published {formatDate(post.published)}</span>
              {post.updated !== post.published ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(post.updated)}</span>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.readingWords)}</span>
            </div>

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
              <SectionedContent sections={post.sections} />
            </div>

            <div className="mt-10 border-t border-ink-200 pt-6">
              <ShareLinks
                url={`${site.url}/blog/${post.slug}`}
                title={post.title}
              />
            </div>

            <RelatedContent
              className="mt-8"
              certs={post.relatedCerts}
              posts={post.relatedPosts}
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
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            published: post.published,
            modified: post.updated,
            author: post.author,
          }),
        ]}
      />
    </>
  );
}

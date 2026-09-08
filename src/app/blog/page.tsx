import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, populatedBlogCategories } from "@/lib/data/blog";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import { Badge, Breadcrumbs, Container, JsonLd, Section } from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Articles on cloud certification, exam preparation, architecture, data, security and careers — written independently by the GCP Prep team.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categories = populatedBlogCategories();
  const selected = categories.find((c) => c.category === params.category)?.category;

  const posts = selected
    ? blogPosts.filter((p) => p.category === selected)
    : blogPosts;

  const sorted = [...posts].sort((a, b) =>
    b.published.localeCompare(a.published),
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">Blog</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            What we learn from studying how these exams are written, and from
            the mistakes people make preparing for them.
          </p>

          <nav aria-label="Categories" className="mt-7">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "inline-block rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                    !selected
                      ? "border-brand-500 bg-brand-600 text-white"
                      : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                  )}
                >
                  All posts
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.category}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(c.category)}`}
                    className={cn(
                      "inline-block rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                      selected === c.category
                        ? "border-brand-500 bg-brand-600 text-white"
                        : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                    )}
                  >
                    {c.category}
                    <span className="ml-1.5 text-ink-400">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
              >
                <Badge tone="brand" className="self-start">
                  {post.category}
                </Badge>

                <h2 className="mt-3 text-[1.0625rem] leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="before:absolute before:inset-0 before:rounded-card"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {post.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-200 pt-3.5 text-[0.75rem] text-ink-500">
                  <span>{formatDate(post.published)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readingTime(post.readingWords)}</span>
                </div>
              </article>
            ))}
          </div>

          {sorted.length === 0 ? (
            <div className="rounded-card border border-dashed border-ink-300 p-10 text-center">
              <p className="text-[0.9375rem] text-ink-600">
                No posts in that category yet.
              </p>
              <Link
                href="/blog"
                className="mt-3 inline-block text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
              >
                View all posts
              </Link>
            </div>
          ) : null}
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "GCP Prep blog",
            items: blogPosts.map((p) => ({
              name: p.title,
              path: `/blog/${p.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import type { LearnCategory } from "@/types";
import {
  getPopulatedLearnCategories,
  learnCategoryMeta,
  learnTopics,
} from "@/lib/data/learn";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import {
  Badge,
  Breadcrumbs,
  Container,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Learning Hub — Cloud Concepts Explained",
  description:
    "Plain-language explanations of cloud services: compute, storage, databases, networking, security, data and AI — and which certification tests each.",
  path: "/learn",
});

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const groups = getPopulatedLearnCategories();
  const selected = groups.find((g) => g.category === params.category)?.category;

  const visible = selected
    ? groups.filter((g) => g.category === selected)
    : groups;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            Learning Hub
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            {learnTopics.length} topics explaining what each cloud service does,
            why it exists, and which certification tests it. Written in our own
            words — we explain concepts rather than paraphrasing documentation.
          </p>

          <nav aria-label="Categories" className="mt-7">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/learn"
                  className={cn(
                    "inline-block rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                    !selected
                      ? "border-brand-500 bg-brand-600 text-white"
                      : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                  )}
                >
                  All topics
                </Link>
              </li>
              {groups.map((group) => (
                <li key={group.category}>
                  <Link
                    href={`/learn?category=${group.category}`}
                    className={cn(
                      "inline-block rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                      selected === group.category
                        ? "border-brand-500 bg-brand-600 text-white"
                        : "border-ink-200 bg-white text-ink-600 hover:border-ink-300",
                    )}
                  >
                    {group.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="flex flex-col gap-12">
            {visible.map((group) => (
              <div key={group.category}>
                <div className="mb-5 border-l-2 border-brand-300 pl-4">
                  <h2 className="text-lg">{group.label}</h2>
                  <p className="mt-1 text-[0.875rem] text-ink-600">
                    {group.blurb}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.topics.map((topic) => (
                    <article
                      key={topic.slug}
                      className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
                    >
                      <h3 className="text-[1rem] leading-snug">
                        <Link
                          href={`/learn/${topic.slug}`}
                          className="before:absolute before:inset-0 before:rounded-card"
                        >
                          {topic.title}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                        {topic.summary}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-3.5">
                        <Badge tone="outline">
                          {learnCategoryMeta[topic.category as LearnCategory].label}
                        </Badge>
                        <Icon
                          name="arrow-right"
                          className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                          strokeWidth={2}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "Cloud learning topics",
            items: learnTopics.map((t) => ({
              name: t.title,
              path: `/learn/${t.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/data/guides";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { formatDate, readingTime } from "@/lib/utils";
import {
  Breadcrumbs,
  Container,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Certification Guides",
  description:
    "In-depth independent guides to Google Cloud certification: which exam to choose, roadmaps, costs, renewal, study plans and career value.",
  path: "/guides",
});

export default function GuidesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];

  const [featured, ...rest] = guides;

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">Guides</h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            Long-form answers to the questions people actually ask about cloud
            certification — written independently, with our reasoning shown
            rather than hidden.
          </p>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          {/* Featured */}
          <article className="group relative overflow-hidden rounded-card border border-ink-200 bg-gradient-to-br from-brand-50 to-white p-6 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-raised sm:p-8">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.09em] text-brand-600">
              Start here
            </p>
            <h2 className="mt-3 max-w-2xl text-[1.5rem] leading-snug sm:text-[1.75rem]">
              <Link
                href={`/guides/${featured.slug}`}
                className="before:absolute before:inset-0 before:rounded-card"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-600">
              {featured.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-[0.8125rem] text-ink-500">
              <span>{readingTime(featured.readingWords)}</span>
              <span>Updated {formatDate(featured.updated)}</span>
              <span className="flex items-center gap-1.5 font-medium text-brand-600">
                Read guide
                <Icon
                  name="arrow-right"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
            </div>
          </article>

          {/* The rest */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((guide) => (
              <article
                key={guide.slug}
                className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
              >
                <h2 className="text-[1rem] leading-snug">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="before:absolute before:inset-0 before:rounded-card"
                  >
                    {guide.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {guide.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-3.5 text-[0.75rem] text-ink-500">
                  <span>{readingTime(guide.readingWords)}</span>
                  <span>Updated {formatDate(guide.updated)}</span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "Cloud certification guides",
            items: guides.map((g) => ({
              name: g.title,
              path: `/guides/${g.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

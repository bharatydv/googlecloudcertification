import type { Metadata } from "next";
import Link from "next/link";
import { careerPages } from "@/lib/data/careers";
import { careerTrackMeta } from "@/lib/data/certifications";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { readingTime } from "@/lib/utils";
import {
  Breadcrumbs,
  Container,
  Icon,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Career Resources",
  description:
    "Career roadmaps, skills guides, interview preparation and CV advice for cloud engineering, architecture, data, security and DevOps roles.",
  path: "/careers",
});

export default function CareersPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            Career Resources
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            A certification is a signal. What converts it into a job is knowing
            which roles value it, what those roles actually require, and how to
            talk about what you can do.
          </p>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {careerPages.map((page) => (
              <article
                key={page.slug}
                className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-6 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
              >
                <h2 className="text-[1.0625rem] leading-snug">
                  <Link
                    href={`/careers/${page.slug}`}
                    className="before:absolute before:inset-0 before:rounded-card"
                  >
                    {page.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-600">
                  {page.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-3.5 text-[0.8125rem] text-ink-500">
                  <span>{readingTime(page.readingWords)}</span>
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                    strokeWidth={2}
                  />
                </div>
              </article>
            ))}

            {/* Lives in Guides because it is long-form, but it belongs to this
                section as much as to that one, so it is surfaced here too. */}
            <article className="group relative flex flex-col rounded-card border border-brand-200 bg-brand-50/60 p-6 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-raised">
              <h2 className="text-[1.0625rem] leading-snug">
                <Link
                  href="/guides/certification-career-guide"
                  className="before:absolute before:inset-0 before:rounded-card"
                >
                  Certifications and Your Cloud Career
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-600">
                What cloud certifications actually do for a career, which roles
                value them most, and how to combine them with experience.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-brand-200 pt-3.5 text-[0.8125rem] text-ink-500">
                <span>In Guides</span>
                <Icon
                  name="arrow-right"
                  className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                  strokeWidth={2}
                />
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHeading
            eyebrow="By direction"
            title="Cloud is not one career"
            description="Each direction has a different daily rhythm. Browse certifications by the track that matches the work you want to do."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(careerTrackMeta) as (keyof typeof careerTrackMeta)[]).map(
              (track) => (
                <Link
                  key={track}
                  href={`/certifications?career=${track}`}
                  className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                >
                  <h3 className="text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
                    {careerTrackMeta[track].label}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-600">
                    {careerTrackMeta[track].blurb}
                  </p>
                </Link>
              ),
            )}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema({
            name: "Cloud career resources",
            items: careerPages.map((c) => ({
              name: c.title,
              path: `/careers/${c.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

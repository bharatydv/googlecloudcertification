import type { Metadata } from "next";
import Link from "next/link";
import type { CareerTrack, CertLevel } from "@/types";
import {
  careerTrackMeta,
  certLevelMeta,
  certLevelOrder,
  certifications,
} from "@/lib/data/certifications";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import {
  Badge,
  Breadcrumbs,
  Container,
  JsonLd,
  Section,
} from "@/components/ui";
import { CertificationCard } from "@/components/cert/CertificationCard";
import { cn } from "@/lib/utils";
import { PartnerNote } from "@/components/marketing/InferaCloud";
import { partnerLinks } from "@/lib/partner";

export const metadata: Metadata = pageMetadata({
  title: "Cloud Certifications",
  description:
    "Explore every Google Cloud certification — level, difficulty, skills covered, preparation time, study guides and practice questions.",
  path: "/certifications",
});

const levels = certLevelOrder;
const tracks = Object.keys(careerTrackMeta) as CareerTrack[];

function isLevel(value: string | undefined): value is CertLevel {
  return !!value && levels.includes(value as CertLevel);
}

function isTrack(value: string | undefined): value is CareerTrack {
  return !!value && tracks.includes(value as CareerTrack);
}

function filterHref(level?: string, career?: string) {
  const params = new URLSearchParams();
  if (level) params.set("level", level);
  if (career) params.set("career", career);
  const qs = params.toString();
  return qs ? `/certifications?${qs}` : "/certifications";
}

export default async function CertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; career?: string }>;
}) {
  const params = await searchParams;
  const level = isLevel(params.level) ? params.level : undefined;
  const career = isTrack(params.career) ? params.career : undefined;

  const filtered = certifications.filter(
    (cert) =>
      (!level || cert.level === level) &&
      (!career || cert.tracks.includes(career)),
  );

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Certifications", path: "/certifications" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            Cloud Certifications
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
            Explore certification paths and find the right starting point for
            your cloud career.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            {/* -------------------------- Filters ------------------------- */}
            <aside aria-label="Filters" className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-ink-200 bg-white p-5">
                <div>
                  <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                    Level
                  </h2>
                  <ul className="mt-3 space-y-1">
                    <li>
                      <Link
                        href={filterHref(undefined, career)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-[0.875rem] transition-colors",
                          !level
                            ? "bg-brand-50 font-medium text-brand-700"
                            : "text-ink-600 hover:bg-ink-100",
                        )}
                      >
                        All levels
                      </Link>
                    </li>
                    {levels.map((value) => (
                      <li key={value}>
                        <Link
                          href={filterHref(value, career)}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-[0.875rem] transition-colors",
                            level === value
                              ? "bg-brand-50 font-medium text-brand-700"
                              : "text-ink-600 hover:bg-ink-100",
                          )}
                        >
                          {certLevelMeta[value].label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-ink-200 pt-5">
                  <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                    Career
                  </h2>
                  <ul className="mt-3 space-y-1">
                    <li>
                      <Link
                        href={filterHref(level, undefined)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-[0.875rem] transition-colors",
                          !career
                            ? "bg-brand-50 font-medium text-brand-700"
                            : "text-ink-600 hover:bg-ink-100",
                        )}
                      >
                        All careers
                      </Link>
                    </li>
                    {tracks.map((value) => (
                      <li key={value}>
                        <Link
                          href={filterHref(level, value)}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-[0.875rem] transition-colors",
                            career === value
                              ? "bg-brand-50 font-medium text-brand-700"
                              : "text-ink-600 hover:bg-ink-100",
                          )}
                        >
                          {careerTrackMeta[value].label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* -------------------------- Results ------------------------- */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <p className="text-[0.875rem] text-ink-600">
                  Showing {filtered.length} of {certifications.length}{" "}
                  certifications
                </p>
                {level ? (
                  <Badge tone="brand">{certLevelMeta[level].label}</Badge>
                ) : null}
                {career ? (
                  <Badge tone="brand">{careerTrackMeta[career].label}</Badge>
                ) : null}
                {level || career ? (
                  <Link
                    href="/certifications"
                    className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
                  >
                    Clear filters
                  </Link>
                ) : null}
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-card border border-dashed border-ink-300 p-10 text-center">
                  <p className="text-[0.9375rem] text-ink-600">
                    No certifications match that combination.
                  </p>
                  <Link
                    href="/certifications"
                    className="mt-3 inline-block text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
                  >
                    Clear filters
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filtered.map((cert) => (
                    <CertificationCard key={cert.slug} cert={cert} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <PartnerNote
            className="mt-10"
            icon="bookmark"
            href={partnerLinks.certifications("certifications-index")}
            cta="See discounted Google Cloud exam vouchers"
          >
            Every guide on this page is free. The exams themselves are not, and
            Google&apos;s fees run from $99 for the foundational certifications
            to $200 for the professional ones. Our sister site InferaCloud sells
            vouchers for them below list price.
          </PartnerNote>

        </Container>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          /*
           * This is the "summary page" form of Google's course list: an
           * ItemList whose entries carry only a position and a URL, with the
           * Course markup itself living on each detail page. That split is
           * required — the carousel is only eligible if the linked pages
           * really do describe a Course, which they now do.
           */
          itemListSchema({
            name: "Google Cloud certification courses and study guides",
            description:
              "Free, independent study guides and practice tests for every Google Cloud certification.",
            items: certifications.map((c) => ({
              name: c.name,
              path: `/certifications/${c.slug}`,
            })),
          }),
        ]}
      />
    </>
  );
}

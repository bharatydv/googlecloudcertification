import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  careerTrackMeta,
  certLevelMeta,
  certifications,
  getCertification,
} from "@/lib/data/certifications";
import { getLearnTopic } from "@/lib/data/learn";
import { countQuestionsForCert } from "@/lib/data/questions";
import { pageMetadata, metaDescription } from "@/lib/seo";
import {
  breadcrumbSchema,
  courseSchema,
  faqSchema,
} from "@/lib/schema";
import {
  Badge,
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  FaqList,
  Icon,
  JsonLd,
} from "@/components/ui";
import { StudyRoadmap } from "@/components/cert/StudyRoadmap";
import { PreparationPanel } from "@/components/cert/PreparationPanel";
import { RelatedContent } from "@/components/content/Related";

export function generateStaticParams() {
  return certifications.map((cert) => ({ slug: cert.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) return {};

  return pageMetadata({
    title: `${cert.name} Study Guide`,
    description: metaDescription(
      `${cert.description} Independent study guide, exam topics, preparation roadmap and original practice questions.`,
    ),
    path: `/certifications/${cert.slug}`,
  });
}

/** Section headings rendered in the on-page contents nav. */
const sections = [
  { id: "overview", label: "Overview" },
  { id: "audience", label: "Who should take it" },
  { id: "skills", label: "Skills covered" },
  { id: "exam-topics", label: "Exam topics" },
  { id: "preparation-roadmap", label: "Preparation roadmap" },
  { id: "study-resources", label: "Study resources" },
  { id: "practice", label: "Practice & mock exam" },
  { id: "careers", label: "Career opportunities" },
  { id: "faq", label: "FAQ" },
];

export default async function CertificationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) notFound();

  const questionCount = countQuestionsForCert(cert.slug);

  // Resolve learn slugs to titles on the server so the client component stays small.
  const learnTitles: Record<string, string> = {};
  for (const step of cert.roadmap) {
    for (const s of step.learn) {
      const topic = getLearnTopic(s);
      if (topic) learnTitles[s] = topic.title;
    }
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Certifications", path: "/certifications" },
    { name: cert.name, path: `/certifications/${cert.slug}` },
  ];

  const facts = [
    { label: "Level", value: certLevelMeta[cert.level].label },
    { label: "Exam length", value: `${cert.facts.durationMinutes} minutes` },
    { label: "Questions", value: cert.facts.questions },
    { label: "Registration fee", value: cert.facts.price },
    { label: "Valid for", value: cert.facts.validity },
    { label: "Delivery", value: cert.facts.delivery },
  ];

  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      <div className="border-b border-ink-200 bg-gradient-to-b from-brand-50/50 to-white">
        <Container className="py-10">
          <Breadcrumbs items={crumbs} />

          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{certLevelMeta[cert.level].label}</Badge>
            {cert.tracks.map((track) => (
              <Badge key={track} tone="outline">
                {careerTrackMeta[track].label}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 max-w-3xl text-[2rem] leading-tight sm:text-[2.4rem]">
            {cert.name}
          </h1>

          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-600">
            {cert.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#preparation-roadmap" size="lg">
              Study Guide
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
            {questionCount > 0 ? (
              <ButtonLink
                href={`/practice-tests/${cert.slug}`}
                variant="secondary"
                size="lg"
              >
                Practice Test
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          {/* ----------------------- Main content ---------------------- */}
          <div className="min-w-0">
            <nav
              aria-label="On this page"
              className="mb-10 rounded-card border border-ink-200 bg-ink-50 p-4 lg:hidden"
            >
              <p className="mb-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                On this page
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[0.8125rem] text-ink-600 hover:text-brand-600"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-[1.5rem]">Overview</h2>
              {cert.overview.map((para) => (
                <p key={para} className="mt-4 leading-[1.75] text-ink-700">
                  {para}
                </p>
              ))}

              <dl className="mt-6 grid gap-x-6 gap-y-4 rounded-card border border-ink-200 bg-white p-5 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem] text-ink-800">
                      {fact.value}
                    </dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Recommended experience (official)
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink-800">
                    {cert.facts.recommendedExperience}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-card border border-ink-200 bg-ink-50 p-5">
                  <p className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Our difficulty rating
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-semibold text-ink-900">
                      {cert.difficulty}
                      <span className="text-[0.875rem] font-normal text-ink-500">
                        /5
                      </span>
                    </span>
                    <span className="flex gap-1" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={
                            i <= cert.difficulty
                              ? "h-1.5 w-4 rounded-full bg-brand-500"
                              : "h-1.5 w-4 rounded-full bg-ink-200"
                          }
                        />
                      ))}
                    </span>
                  </div>
                </div>
                <div className="rounded-card border border-ink-200 bg-ink-50 p-5">
                  <p className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Our recommended preparation
                  </p>
                  <p className="mt-2 text-xl font-semibold text-ink-900">
                    {cert.prepWeeks[0]}–{cert.prepWeeks[1]}
                    <span className="ml-1.5 text-[0.875rem] font-normal text-ink-500">
                      weeks
                    </span>
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[0.8125rem] text-ink-500">
                Difficulty and preparation time are GCP Prep&apos;s own
                editorial assessments, not official figures.
              </p>
            </section>

            {/* Audience */}
            <section id="audience" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">
                Who Should Take This Certification?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {cert.audience.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-700">
                    <Icon
                      name="check"
                      className="mt-1 h-4 w-4 shrink-0 text-brand-500"
                      strokeWidth={2.2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section id="skills" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Skills Covered</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {cert.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.9rem] leading-relaxed text-ink-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {/* Exam topics */}
            <section id="exam-topics" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Exam Topics</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                Weightings are shown only where they are officially published —
                we do not estimate them.
              </p>

              <div className="mt-5 space-y-4">
                {cert.examTopics.map((topic, i) => (
                  <div
                    key={topic.title}
                    className="rounded-card border border-ink-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[1rem] leading-snug">
                        <span className="mr-2 text-ink-400">{i + 1}.</span>
                        {topic.title}
                      </h3>
                      {topic.weight ? (
                        <Badge tone="neutral">{topic.weight}</Badge>
                      ) : null}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {topic.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-600"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap */}
            <section id="preparation-roadmap" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Preparation Roadmap</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                Our suggested order of study. Tick steps as you complete them —
                progress is saved in this browser.
              </p>
              <div className="mt-6">
                <StudyRoadmap
                  certSlug={cert.slug}
                  steps={cert.roadmap}
                  learnTitles={learnTitles}
                />
              </div>
            </section>

            {/* Study resources */}
            <section id="study-resources" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Study Resources</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                Learning-hub topics that cover this certification&apos;s
                material, written by us.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {cert.relatedLearn.map((s) => {
                  const topic = getLearnTopic(s);
                  if (!topic) return null;
                  return (
                    <li key={s}>
                      <Link
                        href={`/learn/${topic.slug}`}
                        className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-4 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                      >
                        <span className="text-[0.9375rem] font-medium text-ink-900 group-hover:text-brand-700">
                          {topic.title}
                        </span>
                        <span className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">
                          {topic.summary}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Callout tone="info" className="mt-5">
                Official documentation and training remain the authoritative
                source for exam content. Our material explains concepts in our
                own words and is designed to sit alongside it, not replace it.
              </Callout>
            </section>

            {/* Practice */}
            <section id="practice" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Practice Questions &amp; Mock Exam</h2>
              {questionCount > 0 ? (
                <>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    We have {questionCount} original questions relevant to this
                    certification, each with an explanation of why the correct
                    answer is correct and why every distractor is not.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={`/practice-tests/${cert.slug}`}
                      className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon name="list" className="h-5 w-5 text-brand-500" />
                        <h3 className="text-[1rem]">Practice test</h3>
                      </div>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                        Work through questions at your own pace with immediate
                        explanations.
                      </p>
                    </Link>
                    <Link
                      href={`/practice-tests/${cert.slug}?mode=exam`}
                      className="group rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon name="clock" className="h-5 w-5 text-brand-500" />
                        <h3 className="text-[1rem]">Timed mock exam</h3>
                      </div>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                        Full-length, timed, with results and per-topic breakdown
                        at the end.
                      </p>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  We are still writing questions for this certification. In the
                  meantime, the{" "}
                  <Link
                    href="/practice-tests"
                    className="font-medium text-brand-600 underline underline-offset-2"
                  >
                    topic practice sets
                  </Link>{" "}
                  cover much of the same material.
                </p>
              )}
            </section>

            {/* Careers */}
            <section id="careers" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Career Opportunities</h2>
              <div className="mt-4 space-y-3">
                {cert.careers.map((career) => (
                  <div
                    key={career.role}
                    className="rounded-xl border border-ink-200 bg-white p-4"
                  >
                    <h3 className="text-[0.9375rem] font-semibold text-ink-900">
                      {career.role}
                    </h3>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-600">
                      {career.summary}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/careers"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
              >
                Explore career resources
                <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </section>

            {/* FAQ */}
            <section id="faq" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.5rem]">Frequently Asked Questions</h2>
              <FaqList faqs={cert.faqs} className="mt-5" />
            </section>

            <RelatedContent
              className="mt-12"
              certs={cert.relatedCerts}
              guides={cert.relatedGuides}
              learn={cert.relatedLearn}
              practice={questionCount > 0 ? [cert.slug] : []}
            />
          </div>

          {/* -------------------------- Sidebar ------------------------- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <PreparationPanel
                certSlug={cert.slug}
                certName={cert.name}
                totalSteps={cert.roadmap.length}
                questionCount={questionCount}
              />

              <nav
                aria-label="On this page"
                className="rounded-card border border-ink-200 bg-white p-5"
              >
                <p className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                  On this page
                </p>
                <ul className="space-y-1.5">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block rounded px-1 py-0.5 text-[0.875rem] text-ink-600 transition-colors hover:text-brand-600"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </Container>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          courseSchema({
            name: `${cert.name} study guide`,
            description: cert.description,
            path: `/certifications/${cert.slug}`,
          }),
          faqSchema(cert.faqs),
        ]}
      />
    </>
  );
}

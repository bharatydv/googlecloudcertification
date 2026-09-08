import Link from "next/link";
import type { CareerTrack, Experience } from "@/types";
import {
  certLevelMeta,
  certLevelOrder,
  careerTrackMeta,
  getCertificationsByLevel,
  recommendCertifications,
} from "@/lib/data/certifications";
import { getPopulatedLearnCategories, learnTopics } from "@/lib/data/learn";
import { guides } from "@/lib/data/guides";
import { questions, topicBreakdown } from "@/lib/data/questions";
import {
  ButtonLink,
  Container,
  Icon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { CertificationCard } from "@/components/cert/CertificationCard";
import {
  CertificationFinder,
  type FinderCert,
} from "@/components/cert/CertificationFinder";
import { HeroVisual } from "@/components/marketing/HeroVisual";
import { HomeSearch } from "@/components/search/HomeSearch";

/**
 * Precompute every finder combination on the server. There are 21 of them, so
 * this is cheap, and it keeps the ranking logic out of the client bundle.
 *
 * Each result is narrowed to the four fields the finder renders. Passing whole
 * Certification objects here serialised every roadmap, FAQ and exam-topic list
 * into the homepage payload 60 times over.
 */
function finderRecommendations() {
  const map: Record<string, FinderCert[]> = {};
  const experiences: Experience[] = ["beginner", "intermediate", "advanced"];
  const tracks = Object.keys(careerTrackMeta) as CareerTrack[];
  for (const experience of experiences) {
    for (const track of tracks) {
      map[`${experience}:${track}`] = recommendCertifications(
        experience,
        track,
      ).map(({ slug, name, level, tagline }) => ({
        slug,
        name,
        level,
        tagline,
      }));
    }
  }
  return map;
}

export default function HomePage() {
  const recommendations = finderRecommendations();
  const learnCategories = getPopulatedLearnCategories();
  const topics = topicBreakdown();
  const featuredGuides = guides.slice(0, 6);

  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-gradient-to-b from-brand-50/60 to-white">
        <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="text-[2.1rem] leading-[1.12] sm:text-[2.75rem] lg:text-[3.1rem]">
                Prepare for Cloud Certification With Confidence
              </h1>

              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-600">
                Independent study guides, practice questions, mock exams, and
                cloud learning resources for your certification journey.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/certifications" size="lg">
                  Explore Certifications
                  <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
                </ButtonLink>
                <ButtonLink href="/practice-tests" variant="secondary" size="lg">
                  Practice Questions
                </ButtonLink>
              </div>

              <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-ink-200 pt-6">
                <div>
                  <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Certifications
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-ink-900">12</dd>
                </div>
                <div>
                  <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Practice questions
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-ink-900">
                    {questions.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    Learning topics
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-ink-900">
                    {learnTopics.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                    In-depth guides
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-ink-900">
                    {guides.length}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="hidden justify-center lg:flex">
              <HeroVisual className="h-auto w-full max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------ Search ----------------------------- */}
      <Section className="py-12 sm:py-14">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl sm:text-2xl">What do you want to learn?</h2>
            <p className="mt-2 text-[0.9375rem] text-ink-600">
              Search across certifications, cloud topics, guides and practice
              questions.
            </p>
            <div className="mt-6">
              <HomeSearch />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------- Certification Finder -------------------- */}
      <Section tone="subtle">
        <Container>
          <SectionHeading
            eyebrow="Certification Finder"
            title="Find the Right Certification for You"
            description="Answer two questions and we will suggest where to start. These are our own editorial recommendations based on how the exams are structured and what each one assumes."
          />
          <CertificationFinder recommendations={recommendations} />
        </Container>
      </Section>

      {/* --------------------- Certification Categories -------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Certifications"
            title="Browse by level"
            description="Three tiers, differing mainly in how much hands-on experience the questions assume."
            action={
              <ButtonLink href="/certifications" variant="secondary" size="sm">
                All certifications
              </ButtonLink>
            }
          />

          <div className="flex flex-col gap-12">
            {certLevelOrder.map((level) => {
              const certs = getCertificationsByLevel(level);
              if (certs.length === 0) return null;
              return (
                <div key={level}>
                  <div className="mb-5 flex flex-col gap-1.5 border-l-2 border-brand-300 pl-4">
                    <h3 className="text-lg">{certLevelMeta[level].label}</h3>
                    <p className="max-w-2xl text-[0.875rem] leading-relaxed text-ink-600">
                      {certLevelMeta[level].blurb}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {certs.map((cert) => (
                      <CertificationCard key={cert.slug} cert={cert} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --------------------------- Practice tests ------------------------ */}
      <Section tone="subtle">
        <Container>
          <SectionHeading
            eyebrow="Practice"
            title="Practice questions written from first principles"
            description="Every question is original, scenario-based, and comes with an explanation of why the correct answer is correct and why each distractor is not. We never publish exam dumps."
            action={
              <ButtonLink href="/practice-tests" variant="secondary" size="sm">
                All practice tests
              </ButtonLink>
            }
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.topic}
                href={`/practice-tests/topics/${topic.topic}`}
                className="group flex items-center gap-4 rounded-xl border border-ink-200 bg-white p-4 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[0.9375rem] font-medium text-ink-900">
                    {topic.label}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[0.8125rem] text-ink-500">
                    {topic.blurb}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-ink-100 px-2.5 py-1 text-[0.75rem] font-medium text-ink-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-700">
                  {topic.count}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------- Learn ----------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Learning Hub"
            title="Understand the technology, not just the exam"
            description="Plain-language explanations of what each service does, why it exists, and which certification tests it."
            action={
              <ButtonLink href="/learn" variant="secondary" size="sm">
                Browse the hub
              </ButtonLink>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learnCategories.map((group) => (
              <div
                key={group.category}
                className="rounded-card border border-ink-200 bg-white p-5"
              >
                <h3 className="text-[0.9375rem] font-semibold text-ink-900">
                  {group.label}
                </h3>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">
                  {group.blurb}
                </p>
                <ul className="mt-3.5 space-y-1.5">
                  {group.topics.slice(0, 4).map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/learn/${topic.slug}`}
                        className="flex items-center gap-1.5 text-[0.875rem] text-ink-600 transition-colors hover:text-brand-600"
                      >
                        <Icon
                          name="chevron-right"
                          className="h-3.5 w-3.5 text-ink-300"
                          strokeWidth={2}
                        />
                        {topic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Guides ----------------------------- */}
      <Section tone="subtle">
        <Container>
          <SectionHeading
            eyebrow="Guides"
            title="Answers to the questions people actually ask"
            action={
              <ButtonLink href="/guides" variant="secondary" size="sm">
                All guides
              </ButtonLink>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((guide) => (
              <article
                key={guide.slug}
                className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised"
              >
                <h3 className="text-[1rem] leading-snug">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="before:absolute before:inset-0 before:rounded-card"
                  >
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {guide.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.8125rem] font-medium text-brand-600">
                  Read guide
                  <Icon
                    name="arrow-right"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ----------------------------- Closing ----------------------------- */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl text-white sm:text-3xl">
                Independent, and clear about it
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-brand-200">
                We write everything here ourselves. Where we summarise official
                exam requirements, we say so and link to the source. Where we
                give an opinion — difficulty ratings, study timelines, roadmaps
                — we say that too. We do not publish exam dumps or leaked
                questions, and we are not affiliated with any certification
                provider.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/about" variant="onDark" size="md">
                  About GCP Prep
                </ButtonLink>
                <ButtonLink
                  href="/disclaimer"
                  variant="ghost"
                  size="md"
                  className="text-brand-100 hover:bg-brand-800 hover:text-white"
                >
                  Read our disclaimer
                </ButtonLink>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                {
                  icon: "check" as const,
                  text: "Original questions with full explanations — never exam dumps",
                },
                {
                  icon: "external" as const,
                  text: "Official requirements always attributed and linked",
                },
                {
                  icon: "target" as const,
                  text: "Our own difficulty ratings, clearly labelled as ours",
                },
                {
                  icon: "book" as const,
                  text: "Concepts explained, not documentation paraphrased",
                },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 rounded-xl bg-brand-800/60 px-4 py-3"
                >
                  <Icon
                    name={item.icon}
                    className="mt-0.5 h-[1.15rem] w-[1.15rem] text-brand-300"
                  />
                  <span className="text-[0.9rem] leading-relaxed text-brand-100">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { DISCLAIMER, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { certifications } from "@/lib/data/certifications";
import { learnTopics } from "@/lib/data/learn";
import { questions } from "@/lib/data/questions";
import { guides } from "@/lib/data/guides";
import {
  Breadcrumbs,
  ButtonLink,
  Callout,
  Container,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About GCP Prep",
  description:
    "GCP Prep is an independent educational platform helping learners understand cloud technologies, explore certification paths and prepare with original resources.",
  path: "/about",
});

export default function AboutPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container size="narrow">
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            About GCP Prep
          </h1>
          <p className="mt-5 text-[1.125rem] leading-relaxed text-ink-700">
            An independent educational platform helping learners understand
            cloud technologies, explore certification paths, and prepare through
            original learning resources and practice materials.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="narrow">
          <div className="prose-gcp">
            <h2>Who runs this</h2>
            <p>
              GCP Prep is built and operated by <strong>{site.operator}</strong>,
              a consultancy working in cloud engineering and training.
              BikerTechie is a <strong>Google Cloud Partner</strong>.
            </p>
            <p>
              That partnership is worth being precise about, because it is easy
              to over-read. It covers BikerTechie&apos;s own consulting and
              delivery work with Google Cloud. It does not extend to this
              website. Nothing published here is written, reviewed, approved or
              endorsed by Google, and you should not treat anything on this site
              as carrying Google&apos;s authority.
            </p>
            <p>
              What the partnership does mean for you is that the people writing
              this material work on Google Cloud professionally rather than only
              studying it. Where our editorial judgement shows up — difficulty
              ratings, roadmaps, the order we suggest learning things in — it
              comes from delivery experience. It is still judgement, and you are
              free to disagree with it.
            </p>

            <h2>Why this site exists</h2>
            <p>
              Cloud certification study material tends to fall into two
              categories. There is official documentation, which is
              authoritative and comprehensive but not written to teach. And
              there is a large amount of third-party material of varying
              quality, some of which is simply copied documentation, and some of
              which is exam dumps sold as practice tests.
            </p>
            <p>
              We wanted something in between: explanations written to be
              understood, practice questions written to teach rather than to
              leak, and honest guidance about what these certifications actually
              do for a career.
            </p>

            <h2>What we publish</h2>
            <p>
              Everything on this site is written by us. That is a constraint we
              have deliberately accepted, and it is why the library grows slowly
              rather than by the thousand pages.
            </p>
            <ul>
              <li>
                <strong>Learning topics</strong> that explain what a service
                does, why it exists, and where it fits — in our own words, not
                paraphrased documentation.
              </li>
              <li>
                <strong>Practice questions</strong> written from first
                principles to test understanding of publicly documented
                concepts, each with a full explanation of the correct answer and
                every distractor.
              </li>
              <li>
                <strong>Study guides and roadmaps</strong> reflecting our own
                editorial judgement about difficulty, sequencing and time
                required.
              </li>
              <li>
                <strong>Career material</strong> about what certifications
                genuinely do and do not do.
              </li>
            </ul>

            <h2>How we handle official information</h2>
            <p>
              Two kinds of information appear on this site and we render them
              differently on purpose.
            </p>
            <p>
              <strong>Official information</strong> — exam duration, fees,
              validity periods, published topic weightings — is summarised from
              the certification provider&apos;s own pages. Wherever we show it,
              we say where it came from and link to the source, and we tell you
              to verify it before you register, because these details change
              without notice. Where a weighting is not officially published, we
              leave it out rather than estimate it.
            </p>
            <p>
              <strong>Independent content</strong> — difficulty ratings,
              preparation timelines, roadmaps, recommendations, explanations and
              practice questions — is our own work and is labelled as such.
            </p>
          </div>

          <Callout tone="warning" title="What we will not publish" className="mt-8">
            We do not publish, resell or reproduce real exam questions, leaked
            material or exam dumps, and we never will. That material breaches
            certification agreements, can invalidate the certification of anyone
            who uses it, and produces people who pass exams without being able
            to do the work.
          </Callout>

          <div className="prose-gcp mt-8">
            <h2>How we are funded</h2>
            <p>
              The site is currently free and unfunded. We intend to introduce
              paid tiers for the more expensive things to produce — large
              question banks, full mock exams, detailed analytics. The
              educational content, guides and learning topics will stay free.
            </p>
            <p>
              We will always tell you when something is paid before you spend
              time on it, and we do not run advertising or third-party tracking
              scripts.
            </p>

            <h2>What the site contains today</h2>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Certifications", value: certifications.length },
              { label: "Learning topics", value: learnTopics.length },
              { label: "Practice questions", value: questions.length },
              { label: "In-depth guides", value: guides.length },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-card border border-ink-200 bg-white p-4"
              >
                <dt className="text-[0.75rem] uppercase tracking-[0.08em] text-ink-500">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold text-ink-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="prose-gcp mt-10">
            <h2>Corrections</h2>
            <p>
              We get things wrong. Cloud platforms change, exam guides are
              revised, and our own judgement is sometimes off. If you find an
              error, tell us and we will fix it and note the change.{" "}
              <Link href="/contact">Get in touch</Link>.
            </p>
          </div>

          <div className="mt-10 rounded-card border border-ink-200 bg-ink-50 p-6">
            <div className="flex gap-3">
              <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" />
              <p className="text-[0.875rem] leading-relaxed text-ink-600">
                {DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/certifications" size="md">
              Explore certifications
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="md">
              Contact {site.shortName}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

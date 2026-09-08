import type { Metadata } from "next";
import { certifications } from "@/lib/data/certifications";
import {
  countQuestionsForCert,
  questionTopicMeta,
  questionTopicOrder,
} from "@/lib/data/questions";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, Container, Section } from "@/components/ui";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata: Metadata = pageMetadata({
  title: "Your Dashboard",
  description:
    "Track your certification study progress, practice performance and weak topics.",
  path: "/dashboard",
  // Personal, low-value-to-index page.
  index: false,
});

const topicLabels = Object.fromEntries(
  questionTopicOrder.map((t) => [t, questionTopicMeta[t].label]),
);

export default function DashboardPage() {
  const certs = certifications.map((cert) => ({
    slug: cert.slug,
    name: cert.name,
    shortName: cert.shortName,
    roadmapSteps: cert.roadmap.length,
    questionCount: countQuestionsForCert(cert.slug),
  }));

  return (
    <Section className="py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Dashboard", path: "/dashboard" },
          ]}
        />
        <h1 className="text-[2rem] leading-tight sm:text-[2.3rem]">
          Welcome back
        </h1>
        <p className="mt-3 text-[1.0625rem] text-ink-600">
          Continue your certification journey.
        </p>

        <div className="mt-8">
          <DashboardView certs={certs} topicLabels={topicLabels} />
        </div>
      </Container>
    </Section>
  );
}

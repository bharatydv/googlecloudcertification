import type { Metadata } from "next";
import { learnTopics } from "@/lib/data/learn";
import { questions } from "@/lib/data/questions";
import { certifications } from "@/lib/data/certifications";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import {
  Breadcrumbs,
  Callout,
  Container,
  Icon,
  JsonLd,
  Section,
} from "@/components/ui";
import {
  AssistantConsole,
  type AiCert,
  type AiQuestion,
  type AiTopic,
} from "@/components/ai/AssistantConsole";

export const metadata: Metadata = pageMetadata({
  title: "GCP Prep AI — Cloud Learning Assistant",
  description:
    "Ask a cloud question and get a plain-language explanation, key concepts, a practice question and a study plan — drawn from GCP Prep's own library.",
  path: "/ai",
});

/**
 * Build a slim payload for the client. We send only what the assistant needs,
 * so the page stays fast despite the size of the underlying content.
 */
function buildPayload() {
  const topics: AiTopic[] = learnTopics.map((topic) => {
    const keyConcepts = topic.sections.find((s) =>
      /key concept/i.test(s.heading),
    );
    const points =
      keyConcepts?.body.flatMap((block) =>
        block.type === "ul" || block.type === "ol" ? block.items : [],
      ) ?? [];

    return {
      slug: topic.slug,
      title: topic.title,
      oneLiner: topic.oneLiner,
      summary: topic.summary,
      keywords: [topic.title, topic.category, ...topic.related],
      keyPoints: points.slice(0, 6),
      questionTopic: topic.questionTopic,
      related: topic.related.slice(0, 4),
    };
  });

  const aiQuestions: AiQuestion[] = questions.map((q) => ({
    id: q.id,
    topic: q.topic,
    stem: q.stem,
    options: q.options.map((o) => ({ id: o.id, text: o.text })),
    correct: q.correct,
    explanation: q.explanation,
    concept: q.concept,
  }));

  const certs: AiCert[] = certifications.map((cert) => ({
    slug: cert.slug,
    name: cert.name,
    prepWeeks: cert.prepWeeks,
    roadmap: cert.roadmap.map((step) => ({
      title: step.title,
      summary: step.summary,
    })),
  }));

  return { topics, aiQuestions, certs };
}

export default function AiPage() {
  const { topics, aiQuestions, certs } = buildPayload();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "GCP Prep AI", path: "/ai" },
  ];

  return (
    <>
      <Section className="pb-8 pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <h1 className="text-[2rem] leading-tight sm:text-[2.4rem]">
            GCP Prep AI
          </h1>
          <p className="mt-3 text-[1.0625rem] text-ink-600">
            Your personal cloud learning assistant.
          </p>

          <Callout tone="warning" title="How this works, honestly" className="mt-7 max-w-3xl">
            GCP Prep AI searches our own library and returns explanations,
            practice questions and study plans that we wrote. It does not
            generate new text with a language model. We built it this way
            deliberately: an answer we can attribute and you can verify is worth
            more than a fluent one that might be wrong. Conversational answers
            are on our roadmap, and they will be grounded in this same library.
          </Callout>
        </Container>
      </Section>

      <Section className="pt-2">
        <Container>
          <AssistantConsole
            topics={topics}
            questions={aiQuestions}
            certs={certs}
          />
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <h2 className="text-[1.5rem]">What it can do</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "book" as const,
                title: "Explain concepts",
                text: "Ask about any service or concept and get the plain-language explanation plus the key points.",
                live: true,
              },
              {
                icon: "list" as const,
                title: "Generate quizzes",
                text: "Turn any topic into a set of practice questions with explanations.",
                live: true,
              },
              {
                icon: "compass" as const,
                title: "Create study plans",
                text: "Get a sequenced plan for any certification, based on our roadmaps.",
                live: true,
              },
              {
                icon: "target" as const,
                title: "Explain practice answers",
                text: "Every practice question already carries a full explanation of the correct answer and each distractor.",
                live: true,
              },
              {
                icon: "chart" as const,
                title: "Identify weak topics",
                text: "Your dashboard tracks per-topic accuracy across practice attempts.",
                live: true,
              },
              {
                icon: "spark" as const,
                title: "Conversational answers",
                text: "Follow-up questions and free-form discussion, grounded in this library and citing its sources.",
                live: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-ink-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon name={item.icon} className="h-6 w-6 text-brand-500" />
                  <span
                    className={
                      item.live
                        ? "rounded-full bg-success-50 px-2.5 py-1 text-[0.6875rem] font-medium text-success-700"
                        : "rounded-full bg-ink-100 px-2.5 py-1 text-[0.6875rem] font-medium text-ink-600"
                    }
                  >
                    {item.live ? "Available now" : "On the roadmap"}
                  </span>
                </div>
                <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-[0.8125rem] leading-relaxed text-ink-500">
            GCP Prep AI is an independent feature of GoogleCloudCertification.com.
            It is not affiliated with, endorsed by, or sponsored by Google LLC or
            Google Cloud, and it is not built on or connected to any Google
            product.
          </p>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, buttonClass } from "@/components/ui";

/**
 * GCP Prep AI.
 *
 * This is a retrieval assistant over our own library rather than a generative
 * model. It matches a question against our learning topics and question bank
 * and returns real content we wrote, with a link to the source page.
 *
 * That is a deliberate choice: a generative answer we cannot verify would be
 * worse than a correct one we can attribute. The interface is built so a
 * generative layer can be added behind it later without changing the surface —
 * see `answer()` below, which is the single point that would call a model.
 */

export interface AiTopic {
  slug: string;
  title: string;
  oneLiner: string;
  summary: string;
  keywords: string[];
  keyPoints: string[];
  questionTopic: string;
  related: string[];
}

export interface AiQuestion {
  id: string;
  topic: string;
  stem: string;
  options: { id: string; text: string }[];
  correct: string;
  explanation: string;
  concept: string;
}

export interface AiCert {
  slug: string;
  name: string;
  prepWeeks: [number, number];
  roadmap: { title: string; summary: string }[];
}

type View =
  | { kind: "idle" }
  | { kind: "answer"; topic: AiTopic; question?: AiQuestion }
  | { kind: "quiz"; topic: AiTopic; questions: AiQuestion[] }
  | { kind: "plan"; cert: AiCert }
  | { kind: "empty"; query: string };

const examples = [
  "Explain IAM like I'm a beginner",
  "What is the difference between Cloud Run and GKE?",
  "How does BigQuery pricing work?",
  "When should I use Bigtable instead of Cloud SQL?",
  "What is grounding in generative AI?",
];

function scoreTopic(topic: AiTopic, terms: string[]) {
  const haystack = [
    topic.title,
    topic.summary,
    topic.oneLiner,
    topic.keywords.join(" "),
    topic.keyPoints.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  const title = topic.title.toLowerCase();

  for (const term of terms) {
    if (term.length < 3) continue;
    if (title.includes(term)) score += 18;
    if (topic.keywords.some((k) => k.toLowerCase().includes(term))) score += 8;
    if (haystack.includes(term)) score += 4;
  }
  return score;
}

export function AssistantConsole({
  topics,
  questions,
  certs,
}: {
  topics: AiTopic[];
  questions: AiQuestion[];
  certs: AiCert[];
}) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>({ kind: "idle" });
  const [planCert, setPlanCert] = useState(certs[0]?.slug ?? "");

  const questionsByTopic = useMemo(() => {
    const map = new Map<string, AiQuestion[]>();
    for (const q of questions) {
      const list = map.get(q.topic) ?? [];
      list.push(q);
      map.set(q.topic, list);
    }
    return map;
  }, [questions]);

  /** The single retrieval point. A generative layer would slot in here. */
  const answer = (raw: string): View => {
    const q = raw.trim();
    if (q.length < 3) return { kind: "idle" };

    const terms = q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const ranked = topics
      .map((topic) => ({ topic, score: scoreTopic(topic, terms) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);

    const best = ranked[0]?.topic;
    if (!best) return { kind: "empty", query: q };

    const pool = questionsByTopic.get(best.questionTopic) ?? [];
    return { kind: "answer", topic: best, question: pool[0] };
  };

  const ask = (value?: string) => {
    const text = value ?? query;
    if (value !== undefined) setQuery(value);
    setView(answer(text));
  };

  const generateQuiz = () => {
    const topic = view.kind === "answer" ? view.topic : undefined;
    if (!topic) return;
    const pool = questionsByTopic.get(topic.questionTopic) ?? [];
    setView({ kind: "quiz", topic, questions: pool.slice(0, 5) });
  };

  const showPlan = () => {
    const cert = certs.find((c) => c.slug === planCert);
    if (cert) setView({ kind: "plan", cert });
  };

  return (
    <div className="rounded-card border border-ink-200 bg-white shadow-subtle">
      {/* ------------------------------ Input ----------------------------- */}
      <form
        className="border-b border-ink-200 p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          ask();
        }}
      >
        <label
          htmlFor="ai-question"
          className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500"
        >
          Ask a cloud question
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="ai-question"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Explain IAM like I'm a beginner"
            className="h-12 flex-1 rounded-lg border border-ink-200 px-4 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400"
          />
          <button type="submit" className={buttonClass("primary", "md")}>
            Ask
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {examples.map((example) => (
            <li key={example}>
              <button
                type="button"
                onClick={() => ask(example)}
                className="rounded-full border border-ink-200 px-3 py-1.5 text-[0.8125rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {example}
              </button>
            </li>
          ))}
        </ul>
      </form>

      {/* ----------------------------- Output ----------------------------- */}
      <div className="p-5 sm:p-6">
        {view.kind === "idle" ? (
          <div className="py-10 text-center">
            <Icon name="spark" className="mx-auto h-8 w-8 text-brand-400" />
            <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
              Ask a question, or pick one of the examples above. GCP Prep AI
              finds the relevant explanation from our own library and shows you
              a practice question on the same concept.
            </p>
          </div>
        ) : null}

        {view.kind === "empty" ? (
          <div className="py-10 text-center">
            <p className="text-[0.9375rem] text-ink-600">
              Nothing in our library matches &ldquo;{view.query}&rdquo; yet.
            </p>
            <Link
              href="/learn"
              className="mt-3 inline-block text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
            >
              Browse all learning topics
            </Link>
          </div>
        ) : null}

        {view.kind === "answer" ? (
          <div>
            <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-5">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-brand-600">
                Simple explanation
              </p>
              <p className="mt-2 text-[1rem] leading-relaxed text-brand-900">
                {view.topic.oneLiner}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                Key concepts
              </h3>
              <ul className="mt-3 space-y-2">
                {view.topic.keyPoints.slice(0, 5).map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300"
                    />
                    <span className="text-[0.9rem] leading-relaxed text-ink-700">
                      {point.replace(/\*\*/g, "")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {view.question ? (
              <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-5">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                  Practice question on this concept
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-900">
                  {view.question.stem}
                </p>
                <details className="group mt-3">
                  <summary className="cursor-pointer list-none text-[0.875rem] font-medium text-brand-600 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    Show the answer
                  </summary>
                  <div className="mt-3">
                    <p className="text-[0.9rem] font-medium text-ink-900">
                      {view.question.correct.toUpperCase()}.{" "}
                      {
                        view.question.options.find(
                          (o) => o.id === view.question?.correct,
                        )?.text
                      }
                    </p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">
                      {view.question.explanation}
                    </p>
                  </div>
                </details>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/learn/${view.topic.slug}`}
                className={buttonClass("primary", "sm")}
              >
                Read the full topic
                <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={generateQuiz}
                className={buttonClass("secondary", "sm")}
              >
                Generate Quiz
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setView({ kind: "idle" });
                }}
                className={buttonClass("ghost", "sm")}
              >
                Ask another question
              </button>
            </div>

            {view.topic.related.length > 0 ? (
              <div className="mt-6 border-t border-ink-200 pt-4">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                  Related topics
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {view.topic.related.map((slug) => {
                    const related = topics.find((t) => t.slug === slug);
                    if (!related) return null;
                    return (
                      <li key={slug}>
                        <button
                          type="button"
                          onClick={() => ask(related.title)}
                          className="rounded-full border border-ink-200 px-3 py-1.5 text-[0.8125rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                        >
                          {related.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {view.kind === "quiz" ? (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[1.125rem]">
                Quiz: {view.topic.title}
              </h3>
              <button
                type="button"
                onClick={() => setView(answer(view.topic.title))}
                className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
              >
                Back to explanation
              </button>
            </div>

            {view.questions.length === 0 ? (
              <p className="text-[0.9rem] text-ink-600">
                We do not have questions on this topic yet.
              </p>
            ) : (
              <ol className="space-y-5">
                {view.questions.map((question, i) => (
                  <li
                    key={question.id}
                    className="rounded-xl border border-ink-200 p-5"
                  >
                    <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                      Question {i + 1}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-900">
                      {question.stem}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {question.options.map((option) => (
                        <li
                          key={option.id}
                          className="text-[0.875rem] leading-relaxed text-ink-600"
                        >
                          <span className="mr-2 font-semibold uppercase text-ink-500">
                            {option.id}
                          </span>
                          {option.text}
                        </li>
                      ))}
                    </ul>
                    <details className="group mt-3">
                      <summary className="cursor-pointer list-none text-[0.875rem] font-medium text-brand-600 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                        Show the answer
                      </summary>
                      <div className="mt-2 rounded-lg bg-ink-50 p-4">
                        <p className="text-[0.875rem] font-medium text-ink-900">
                          Correct: {question.correct.toUpperCase()}
                        </p>
                        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                          {question.explanation}
                        </p>
                      </div>
                    </details>
                  </li>
                ))}
              </ol>
            )}

            <Link
              href={`/practice-tests/topics/${view.topic.questionTopic}`}
              className={cn(buttonClass("primary", "md"), "mt-6")}
            >
              Take the full {view.topic.title} test
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        ) : null}

        {view.kind === "plan" ? (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[1.125rem]">Study plan: {view.cert.name}</h3>
              <button
                type="button"
                onClick={() => setView({ kind: "idle" })}
                className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
              >
                Clear
              </button>
            </div>

            <p className="text-[0.9rem] leading-relaxed text-ink-600">
              We suggest {view.cert.prepWeeks[0]}–{view.cert.prepWeeks[1]} weeks
              for this certification. Each step below is roughly one study block
              — cover the material, then build something with it.
            </p>

            <ol className="mt-5 space-y-3">
              {view.cert.roadmap.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-ink-200 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[0.75rem] font-semibold text-brand-700">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] font-medium text-ink-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-600">
                      {step.summary}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href={`/certifications/${view.cert.slug}#preparation-roadmap`}
              className={cn(buttonClass("primary", "md"), "mt-6")}
            >
              Open the interactive roadmap
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        ) : null}
      </div>

      {/* --------------------------- Study plan tool ---------------------- */}
      <div className="border-t border-ink-200 bg-ink-50 p-5 sm:p-6">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
          Create a study plan
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="plan-cert" className="sr-only">
            Choose a certification
          </label>
          <select
            id="plan-cert"
            value={planCert}
            onChange={(e) => setPlanCert(e.target.value)}
            className="h-11 flex-1 rounded-lg border border-ink-200 bg-white px-3 text-[0.9375rem] text-ink-900 outline-none focus:border-brand-400"
          >
            {certs.map((cert) => (
              <option key={cert.slug} value={cert.slug}>
                {cert.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={showPlan}
            className={buttonClass("secondary", "md")}
          >
            Create Study Plan
          </button>
        </div>
      </div>
    </div>
  );
}

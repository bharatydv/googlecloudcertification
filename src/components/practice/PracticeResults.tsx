"use client";

import { useState } from "react";
import Link from "next/link";
import type { PracticeQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { Icon, ProgressBar, buttonClass } from "@/components/ui";
import { Explanation } from "./Explanation";

interface Score {
  correct: number;
  total: number;
  byTopic: Record<string, { correct: number; total: number }>;
}

export function PracticeResults({
  title,
  questions,
  answers,
  score,
  topicLabels,
  onRetake,
}: {
  title: string;
  questions: PracticeQuestion[];
  answers: Record<string, string>;
  score: Score;
  topicLabels: Record<string, string>;
  onRetake: () => void;
}) {
  const [filter, setFilter] = useState<"incorrect" | "all">("incorrect");

  const percent =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  const topicRows = Object.entries(score.byTopic)
    .map(([topic, counts]) => ({
      topic,
      label: topicLabels[topic] ?? topic,
      percent: Math.round((counts.correct / counts.total) * 100),
      ...counts,
    }))
    .sort((a, b) => a.percent - b.percent);

  const incorrect = questions.filter((q) => answers[q.id] !== q.correct);
  const shown = filter === "incorrect" ? incorrect : questions;

  const verdict =
    percent >= 80
      ? { label: "Strong", tone: "success" as const }
      : percent >= 65
        ? { label: "Nearly there", tone: "warning" as const }
        : { label: "Keep working", tone: "danger" as const };

  return (
    <div>
      {/* ------------------------------ Score ----------------------------- */}
      <div className="rounded-card border border-ink-200 bg-white p-6 sm:p-8">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
          {title}
        </p>
        <h2 className="mt-2 text-[1.5rem]">Your Score</h2>

        <div className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className="text-[3.25rem] font-semibold leading-none text-ink-900">
              {percent}
              <span className="text-2xl text-ink-400">%</span>
            </p>
            <p className="mt-2 text-[0.9375rem] text-ink-600">
              {score.correct} / {score.total} correct
            </p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1.5 text-[0.8125rem] font-medium",
              verdict.tone === "success" && "bg-success-50 text-success-700",
              verdict.tone === "warning" && "bg-warning-50 text-warning-700",
              verdict.tone === "danger" && "bg-danger-50 text-danger-700",
            )}
          >
            {verdict.label}
          </span>
        </div>

        <ProgressBar
          value={percent}
          label="Overall score"
          tone={percent >= 80 ? "success" : "brand"}
          className="mt-6"
        />

        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-500">
          This is a GCP Prep practice score. It is not a prediction of any
          real exam result, and no official pass mark is published for these
          exams.
        </p>
      </div>

      {/* --------------------------- Topic breakdown ---------------------- */}
      <div className="mt-6 rounded-card border border-ink-200 bg-white p-6">
        <h3 className="text-[1.125rem]">Topic Performance</h3>
        <p className="mt-1.5 text-[0.875rem] text-ink-600">
          Weakest first. These are the topics to revisit before you retake.
        </p>

        <ul className="mt-5 space-y-4">
          {topicRows.map((row) => (
            <li key={row.topic}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <Link
                  href={`/practice-tests/topics/${row.topic}`}
                  className="text-[0.9rem] font-medium text-ink-800 hover:text-brand-600"
                >
                  {row.label}
                </Link>
                <span className="text-[0.8125rem] tabular-nums text-ink-500">
                  {row.correct}/{row.total} · {row.percent}%
                </span>
              </div>
              <ProgressBar
                value={row.percent}
                label={`${row.label} score`}
                tone={row.percent >= 80 ? "success" : "brand"}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------ Actions --------------------------- */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onRetake} className={buttonClass("primary", "md")}>
          Retake Test
        </button>
        <Link href="/practice-tests" className={buttonClass("secondary", "md")}>
          Other practice tests
        </Link>
        <Link href="/learn" className={buttonClass("ghost", "md")}>
          Continue Learning
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>

      {/* ------------------------------ Review ---------------------------- */}
      <div className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[1.25rem]">
            {filter === "incorrect" ? "Review Incorrect Answers" : "Review All Questions"}
          </h3>
          <div className="flex rounded-lg border border-ink-200 p-0.5">
            <button
              type="button"
              onClick={() => setFilter("incorrect")}
              className={cn(
                "rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
                filter === "incorrect"
                  ? "bg-brand-600 text-white"
                  : "text-ink-600 hover:bg-ink-100",
              )}
            >
              Incorrect ({incorrect.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
                filter === "all"
                  ? "bg-brand-600 text-white"
                  : "text-ink-600 hover:bg-ink-100",
              )}
            >
              All ({questions.length})
            </button>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="rounded-card border border-success-200 bg-success-50 p-8 text-center">
            <Icon
              name="check"
              className="mx-auto h-8 w-8 text-success-500"
              strokeWidth={2.2}
            />
            <p className="mt-3 text-[0.9375rem] font-medium text-success-700">
              Every question correct. Try a harder set or a full timed mock.
            </p>
          </div>
        ) : (
          <ol className="space-y-6">
            {shown.map((question) => {
              const given = answers[question.id];
              const wasCorrect = given === question.correct;
              const originalIndex = questions.indexOf(question) + 1;

              return (
                <li
                  key={question.id}
                  className="rounded-card border border-ink-200 bg-white p-5 sm:p-6"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="text-[0.8125rem] font-medium text-ink-500">
                      Question {originalIndex}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.75rem] font-medium",
                        wasCorrect
                          ? "bg-success-50 text-success-700"
                          : "bg-danger-50 text-danger-700",
                      )}
                    >
                      {wasCorrect ? "Correct" : given ? "Incorrect" : "Not answered"}
                    </span>
                    <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[0.75rem] text-ink-600">
                      {topicLabels[question.topic] ?? question.topic}
                    </span>
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed text-ink-900">
                    {question.stem}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {question.options.map((option) => {
                      const isCorrect = option.id === question.correct;
                      const wasChosen = given === option.id;
                      return (
                        <li
                          key={option.id}
                          className={cn(
                            "flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-[0.875rem] leading-relaxed",
                            isCorrect && "border-success-200 bg-success-50 text-ink-800",
                            wasChosen && !isCorrect && "border-danger-200 bg-danger-50",
                            !isCorrect && !wasChosen && "border-ink-200 text-ink-600",
                          )}
                        >
                          <span className="font-semibold uppercase text-ink-500">
                            {option.id}
                          </span>
                          <span className="flex-1">{option.text}</span>
                          {isCorrect ? (
                            <span className="shrink-0 text-[0.75rem] font-medium text-success-700">
                              Correct
                            </span>
                          ) : wasChosen ? (
                            <span className="shrink-0 text-[0.75rem] font-medium text-danger-700">
                              Your answer
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  <Explanation question={question} />
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

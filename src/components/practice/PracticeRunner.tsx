"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { AnswerOption, PracticeQuestion } from "@/types";
import { cn } from "@/lib/utils";
import { Icon, buttonClass } from "@/components/ui";
import { recordAttempt, useHydrated } from "@/lib/progress";
import { Explanation } from "./Explanation";
import { PracticeResults } from "./PracticeResults";

type Mode = "practice" | "exam";

/** The part of a test run that is persisted so it can be resumed. */
interface RunState {
  answers: Record<string, string>;
  marked: string[];
  index: number;
  startedAt: number;
  submitted: boolean;
}

interface RunnerProps {
  /** Stable id used for saving progress. */
  testId: string;
  title: string;
  /** Certification slug or `topic:<id>`, recorded against the attempt. */
  subject: string;
  questions: PracticeQuestion[];
  mode?: Mode;
  minutesPerQuestion?: number;
  topicLabels: Record<string, string>;
}

function storageKey(testId: string) {
  return `gcpprep:test:${testId}`;
}

function freshRun(): RunState {
  return {
    answers: {},
    marked: [],
    index: 0,
    startedAt: Date.now(),
    submitted: false,
  };
}

function loadRun(testId: string, questionCount: number): RunState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(testId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RunState>;
    return {
      answers: parsed.answers ?? {},
      marked: parsed.marked ?? [],
      index: Math.min(Math.max(0, parsed.index ?? 0), Math.max(0, questionCount - 1)),
      startedAt: parsed.startedAt ?? Date.now(),
      submitted: Boolean(parsed.submitted),
    };
  } catch {
    return null;
  }
}

function saveRun(testId: string, run: RunState) {
  try {
    window.localStorage.setItem(storageKey(testId), JSON.stringify(run));
  } catch {
    /* storage unavailable — the test still works, it just will not resume */
  }
}

function formatTime(seconds: number) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

/**
 * Public entry point.
 *
 * The server and the first client render both start from a fresh run, so the
 * markup matches and hydration is clean. Once hydrated we remount with a
 * changed key, which lets the inner component seed its state directly from
 * saved progress in a lazy initialiser rather than through an effect.
 */
export function PracticeRunner(props: RunnerProps) {
  const hydrated = useHydrated();

  if (props.questions.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-ink-300 p-10 text-center">
        <p className="text-[0.9375rem] text-ink-600">
          No questions are available for this set yet.
        </p>
        <Link
          href="/practice-tests"
          className="mt-3 inline-block text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
        >
          Browse all practice tests
        </Link>
      </div>
    );
  }

  return (
    <Runner
      key={hydrated ? "resumed" : "initial"}
      {...props}
      resume={hydrated}
    />
  );
}

function Runner({
  testId,
  title,
  subject,
  questions,
  mode: initialMode = "practice",
  minutesPerQuestion = 2,
  topicLabels,
  resume,
}: RunnerProps & { resume: boolean }) {
  const total = questions.length;
  const timeLimit = total * minutesPerQuestion * 60;

  const [run, setRun] = useState<RunState>(() =>
    resume ? (loadRun(testId, total) ?? freshRun()) : freshRun(),
  );
  const [mode, setMode] = useState<Mode>(initialMode);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const recorded = useRef(false);

  const question = questions[run.index];

  /* --------------------------- Persistence --------------------------- */

  useEffect(() => {
    if (!resume) return;
    saveRun(testId, run);
  }, [run, testId, resume]);

  /* ------------------------------ Timer ------------------------------ */

  useEffect(() => {
    if (mode !== "exam" || run.submitted) return;

    const id = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - run.startedAt) / 1000);
      if (timeLimit - elapsed <= 0) {
        // Out of time. Submitting from the interval callback rather than
        // from an effect body keeps this out of the render path.
        setRun((prev) => (prev.submitted ? prev : { ...prev, submitted: true }));
      } else {
        setNow(Date.now());
      }
    }, 1000);

    return () => window.clearInterval(id);
  }, [mode, run.submitted, run.startedAt, timeLimit]);

  const remaining = timeLimit - Math.floor((now - run.startedAt) / 1000);

  /* ----------------------------- Scoring ----------------------------- */

  const score = useMemo(() => {
    let correct = 0;
    const byTopic: Record<string, { correct: number; total: number }> = {};
    for (const q of questions) {
      const isCorrect = run.answers[q.id] === q.correct;
      if (isCorrect) correct += 1;
      const bucket = byTopic[q.topic] ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (isCorrect) bucket.correct += 1;
      byTopic[q.topic] = bucket;
    }
    return { correct, total, byTopic };
  }, [run.answers, questions, total]);

  // Record the attempt once, after submission. This writes to the progress
  // store — an external system — and sets no React state.
  useEffect(() => {
    if (!run.submitted || recorded.current || !resume) return;
    recorded.current = true;
    recordAttempt({
      subject,
      date: new Date().toISOString(),
      correct: score.correct,
      total: score.total,
      byTopic: score.byTopic,
    });
  }, [run.submitted, score, subject, resume]);

  /* ----------------------------- Actions ----------------------------- */

  const submit = useCallback(() => {
    setRun((prev) => ({ ...prev, submitted: true }));
    setNavOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const choose = (optionId: AnswerOption["id"]) => {
    if (run.submitted) return;
    setRun((prev) => ({
      ...prev,
      answers: { ...prev.answers, [question.id]: optionId },
    }));
    if (mode === "practice") {
      setRevealed((prev) =>
        prev.includes(question.id) ? prev : [...prev, question.id],
      );
    }
  };

  const toggleMark = () => {
    setRun((prev) => ({
      ...prev,
      marked: prev.marked.includes(question.id)
        ? prev.marked.filter((id) => id !== question.id)
        : [...prev.marked, question.id],
    }));
  };

  const goTo = (index: number) =>
    setRun((prev) => ({ ...prev, index: Math.max(0, Math.min(total - 1, index)) }));

  const retake = () => {
    setRun(freshRun());
    setRevealed([]);
    setNow(Date.now());
    recorded.current = false;
    try {
      window.localStorage.removeItem(storageKey(testId));
    } catch {
      /* no-op */
    }
    window.scrollTo({ top: 0 });
  };

  const startTimedMode = () => {
    setMode("exam");
    setRun((prev) => ({ ...prev, startedAt: Date.now() }));
    setNow(Date.now());
  };

  const answeredCount = Object.keys(run.answers).length;
  const showFeedback =
    run.submitted || (mode === "practice" && revealed.includes(question.id));

  if (run.submitted) {
    return (
      <PracticeResults
        title={title}
        questions={questions}
        answers={run.answers}
        score={score}
        topicLabels={topicLabels}
        onRetake={retake}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_13rem]">
      {/* ---------------------------- Question ---------------------------- */}
      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-ink-200 bg-white px-4 py-3">
          <p className="text-[0.875rem] font-medium text-ink-900">
            Question {run.index + 1} of {total}
          </p>
          <p className="text-[0.8125rem] text-ink-500">
            {answeredCount} answered · {total - answeredCount} remaining
          </p>

          {mode === "exam" ? (
            <p
              className={cn(
                "flex items-center gap-1.5 text-[0.875rem] font-medium tabular-nums",
                remaining < 300 ? "text-danger-500" : "text-ink-700",
              )}
              aria-live="polite"
            >
              <Icon name="clock" className="h-4 w-4" />
              {formatTime(remaining)}
            </p>
          ) : (
            <button
              type="button"
              onClick={startTimedMode}
              className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
            >
              Switch to timed mode
            </button>
          )}

          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            className="ml-auto text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700 lg:hidden"
            aria-expanded={navOpen}
          >
            {navOpen ? "Hide" : "Show"} question list
          </button>
        </div>

        <div
          className="h-1 w-full overflow-hidden rounded-full bg-ink-200"
          role="progressbar"
          aria-valuenow={run.index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Test progress"
        >
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
            style={{ width: `${((run.index + 1) / total) * 100}%` }}
          />
        </div>

        {navOpen ? (
          <div className="mt-5 lg:hidden">
            <QuestionNav
              questions={questions}
              answers={run.answers}
              marked={run.marked}
              current={run.index}
              onSelect={(i) => {
                goTo(i);
                setNavOpen(false);
              }}
            />
          </div>
        ) : null}

        <div className="mt-6 rounded-card border border-ink-200 bg-white p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink-100 px-2.5 py-1 text-[0.75rem] font-medium text-ink-600">
              {topicLabels[question.topic] ?? question.topic}
            </span>
            <span className="rounded-full border border-ink-200 px-2.5 py-1 text-[0.75rem] capitalize text-ink-500">
              {question.difficulty}
            </span>
            <button
              type="button"
              onClick={toggleMark}
              aria-pressed={run.marked.includes(question.id)}
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.75rem] font-medium transition-colors",
                run.marked.includes(question.id)
                  ? "border-warning-200 bg-warning-50 text-warning-700"
                  : "border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-ink-50",
              )}
            >
              <Icon name="bookmark" className="h-3.5 w-3.5" strokeWidth={1.8} />
              {run.marked.includes(question.id) ? "Marked" : "Mark for review"}
            </button>
          </div>

          <h2 className="text-[1.0625rem] leading-relaxed text-ink-900">
            {question.stem}
          </h2>

          <fieldset className="mt-5">
            <legend className="sr-only">Select one answer</legend>
            <div className="space-y-2.5">
              {question.options.map((option) => {
                const selected = run.answers[question.id] === option.id;
                const isCorrect = option.id === question.correct;

                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors",
                      showFeedback ? "cursor-default" : "cursor-pointer",
                      !showFeedback &&
                        (selected
                          ? "border-brand-400 bg-brand-50"
                          : "border-ink-200 hover:border-ink-300 hover:bg-ink-50"),
                      showFeedback && isCorrect && "border-success-200 bg-success-50",
                      showFeedback &&
                        selected &&
                        !isCorrect &&
                        "border-danger-200 bg-danger-50",
                      showFeedback &&
                        !isCorrect &&
                        !selected &&
                        "border-ink-200 opacity-70",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={selected}
                      onChange={() => choose(option.id)}
                      disabled={showFeedback}
                      className="mt-1 h-4 w-4 shrink-0 accent-brand-600"
                    />
                    <span className="flex-1 text-[0.9375rem] leading-relaxed text-ink-800">
                      <span className="mr-2 font-semibold uppercase text-ink-500">
                        {option.id}
                      </span>
                      {option.text}
                    </span>
                    {showFeedback && isCorrect ? (
                      <Icon
                        name="check"
                        className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-success-500"
                        strokeWidth={2.2}
                      />
                    ) : null}
                    {showFeedback && selected && !isCorrect ? (
                      <Icon
                        name="close"
                        className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-danger-500"
                        strokeWidth={2.2}
                      />
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {showFeedback ? (
            <Explanation question={question} />
          ) : mode === "practice" ? (
            <p className="mt-4 text-[0.8125rem] text-ink-500">
              Select an answer to see the explanation.
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(run.index - 1)}
            disabled={run.index === 0}
            className={buttonClass("secondary", "md")}
          >
            <Icon name="arrow-left" className="h-4 w-4" strokeWidth={2} />
            Previous
          </button>

          {run.index < total - 1 ? (
            <button
              type="button"
              onClick={() => goTo(run.index + 1)}
              className={buttonClass("primary", "md")}
            >
              Next
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className={buttonClass("primary", "md")}
            >
              Submit Test
            </button>
          )}

          {run.index < total - 1 ? (
            <button
              type="button"
              onClick={submit}
              className="ml-auto text-[0.8125rem] font-medium text-ink-500 underline underline-offset-2 hover:text-ink-700"
            >
              Submit early
            </button>
          ) : null}
        </div>
      </div>

      {/* ----------------------- Question navigator ---------------------- */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <QuestionNav
            questions={questions}
            answers={run.answers}
            marked={run.marked}
            current={run.index}
            onSelect={goTo}
          />
          <button
            type="button"
            onClick={submit}
            className={cn(buttonClass("primary", "md"), "mt-4 w-full")}
          >
            Submit Test
          </button>
        </div>
      </aside>
    </div>
  );
}

function QuestionNav({
  questions,
  answers,
  marked,
  current,
  onSelect,
}: {
  questions: PracticeQuestion[];
  answers: Record<string, string>;
  marked: string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav
      aria-label="Question navigation"
      className="rounded-card border border-ink-200 bg-white p-4"
    >
      <p className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
        Questions
      </p>
      <ol className="grid grid-cols-8 gap-1.5 lg:grid-cols-5">
        {questions.map((q, i) => {
          const answered = Boolean(answers[q.id]);
          const isMarked = marked.includes(q.id);
          return (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={i === current ? "true" : undefined}
                aria-label={`Question ${i + 1}${answered ? ", answered" : ", unanswered"}${isMarked ? ", marked for review" : ""}`}
                className={cn(
                  "flex h-8 w-full items-center justify-center rounded-md border text-[0.75rem] font-medium transition-colors",
                  i === current && "ring-2 ring-brand-400 ring-offset-1",
                  isMarked
                    ? "border-warning-200 bg-warning-50 text-warning-700"
                    : answered
                      ? "border-brand-200 bg-brand-100 text-brand-700"
                      : "border-ink-200 bg-white text-ink-500 hover:bg-ink-50",
                )}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>

      <dl className="mt-4 space-y-1.5 border-t border-ink-200 pt-3 text-[0.75rem] text-ink-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-brand-200 bg-brand-100" />
          <dt>Answered</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-ink-200 bg-white" />
          <dt>Unanswered</dt>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-warning-200 bg-warning-50" />
          <dt>Marked for review</dt>
        </div>
      </dl>
    </nav>
  );
}

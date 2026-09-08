import Link from "next/link";
import type { PracticeQuestion } from "@/types";
import { Icon } from "@/components/ui/Icon";

/**
 * The answer explanation shown after a question is answered or the test is
 * submitted. Every question explains the concept, why the correct answer is
 * correct, and why each distractor is not.
 */
export function Explanation({ question }: { question: PracticeQuestion }) {
  const wrong = question.options.filter((o) => o.id !== question.correct);

  return (
    <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50 p-5">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
        Concept
      </p>
      <p className="mt-1 text-[0.9375rem] font-medium text-ink-900">
        {question.concept}
      </p>

      <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-success-700">
        Why {question.correct.toUpperCase()} is correct
      </p>
      <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-700">
        {question.explanation}
      </p>

      <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
        Why the others are not
      </p>
      <ul className="mt-2 space-y-2.5">
        {wrong.map((option) => {
          const reason = question.whyWrong[option.id];
          if (!reason) return null;
          return (
            <li key={option.id} className="flex gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-ink-200 text-[0.6875rem] font-semibold uppercase text-ink-600">
                {option.id}
              </span>
              <span className="text-[0.875rem] leading-relaxed text-ink-600">
                {reason}
              </span>
            </li>
          );
        })}
      </ul>

      {question.learnMore ? (
        <Link
          href={`/learn/${question.learnMore}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
        >
          <Icon name="book" className="h-4 w-4" strokeWidth={1.8} />
          Read more about this topic
        </Link>
      ) : null}
    </div>
  );
}

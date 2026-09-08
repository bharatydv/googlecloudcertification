import Link from "next/link";
import type { Certification } from "@/types";
import { certLevelMeta } from "@/lib/data/certifications";
import { countQuestionsForCert } from "@/lib/data/questions";
import { Badge, Icon } from "@/components/ui";
import { cn } from "@/lib/utils";

function DifficultyMeter({ value }: { value: number }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`Difficulty ${value} out of 5, our own assessment`}
      title={`Difficulty ${value}/5 — GCP Prep's own assessment`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "h-1.5 w-3.5 rounded-full",
            i <= value ? "bg-brand-500" : "bg-ink-200",
          )}
        />
      ))}
    </span>
  );
}

export function CertificationCard({ cert }: { cert: Certification }) {
  const questionCount = countQuestionsForCert(cert.slug);

  return (
    <article className="group relative flex flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color,transform] duration-150 focus-within:border-brand-400 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge tone="brand">{certLevelMeta[cert.level].label}</Badge>
        <span className="text-[0.75rem] text-ink-500">
          {cert.prepWeeks[0]}–{cert.prepWeeks[1]} weeks
        </span>
      </div>

      <h3 className="text-[1.0625rem] leading-snug">
        <Link
          href={`/certifications/${cert.slug}`}
          className="before:absolute before:inset-0 before:rounded-card"
        >
          {cert.name}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
        {cert.tagline}
      </p>

      <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-200 pt-3.5 text-[0.75rem] text-ink-500">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Difficulty</dt>
          <dd>
            <DifficultyMeter value={cert.difficulty} />
          </dd>
        </div>
        {questionCount > 0 ? (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Practice questions</dt>
            <dd className="flex items-center gap-1.5">
              <Icon name="list" className="h-3.5 w-3.5" />
              {questionCount} questions
            </dd>
          </div>
        ) : null}
        <div className="ml-auto flex items-center gap-1 font-medium text-brand-600 transition-transform duration-150 group-hover:translate-x-0.5">
          Explore
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </dl>
    </article>
  );
}

export function CertificationRow({ cert }: { cert: Certification }) {
  return (
    <article className="group relative flex items-center gap-4 rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-ink-300 hover:bg-ink-50">
      <div className="min-w-0 flex-1">
        <h3 className="text-[0.9375rem] font-medium leading-snug text-ink-900">
          <Link
            href={`/certifications/${cert.slug}`}
            className="before:absolute before:inset-0 before:rounded-xl"
          >
            {cert.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-[0.8125rem] text-ink-500">
          {cert.tagline}
        </p>
      </div>
      <Icon
        name="arrow-right"
        className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-600"
      />
    </article>
  );
}

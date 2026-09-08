"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CareerTrack, CertLevel, Experience } from "@/types";
import { careerTrackMeta, certLevelMeta } from "@/lib/data/certifications";
import { Badge, Icon, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

const experiences: { value: Experience; label: string; hint: string }[] = [
  { value: "beginner", label: "Beginner", hint: "New to cloud" },
  { value: "intermediate", label: "Intermediate", hint: "Some hands-on use" },
  { value: "advanced", label: "Advanced", hint: "Production experience" },
];

const tracks = Object.keys(careerTrackMeta) as CareerTrack[];

/**
 * The finder renders four fields per certification. Passing the full
 * Certification object would serialise every roadmap, FAQ and exam-topic list
 * into the homepage payload for all 21 answer combinations — several hundred
 * kilobytes the visitor almost never uses. This is the shape it actually needs.
 */
export interface FinderCert {
  slug: string;
  name: string;
  level: CertLevel;
  tagline: string;
}

/**
 * The finder runs entirely on the client against data passed from the server,
 * so results appear instantly with no request. Recommendations are computed on
 * the server and passed in as a lookup, keeping the ranking logic in one place.
 */
export function CertificationFinder({
  recommendations,
}: {
  recommendations: Record<string, FinderCert[]>;
}) {
  const [experience, setExperience] = useState<Experience>("beginner");
  const [track, setTrack] = useState<CareerTrack>("cloud-engineer");
  const [revealed, setRevealed] = useState(false);

  const results = useMemo(
    () => recommendations[`${experience}:${track}`] ?? [],
    [experience, track, recommendations],
  );

  return (
    <div className="overflow-hidden rounded-card border border-ink-200 bg-white shadow-subtle">
      <div className="grid gap-6 p-6 sm:p-7 md:grid-cols-2">
        <fieldset>
          <legend className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
            Your experience
          </legend>
          <div className="flex flex-col gap-2">
            {experiences.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors",
                  experience === option.value
                    ? "border-brand-400 bg-brand-50"
                    : "border-ink-200 hover:border-ink-300 hover:bg-ink-50",
                )}
              >
                <input
                  type="radio"
                  name="experience"
                  value={option.value}
                  checked={experience === option.value}
                  onChange={() => {
                    setExperience(option.value);
                    setRevealed(false);
                  }}
                  className="h-4 w-4 accent-brand-600"
                />
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] font-medium text-ink-900">
                    {option.label}
                  </span>
                  <span className="text-[0.8125rem] text-ink-500">
                    {option.hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
            Your goal
          </legend>
          <div className="flex flex-wrap gap-2">
            {tracks.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={track === value}
                onClick={() => {
                  setTrack(value);
                  setRevealed(false);
                }}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                  track === value
                    ? "border-brand-500 bg-brand-600 text-white"
                    : "border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-ink-50",
                )}
              >
                {careerTrackMeta[value].label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-500">
            {careerTrackMeta[track].blurb}
          </p>
        </fieldset>
      </div>

      <div className="border-t border-ink-200 bg-ink-50 px-6 py-5 sm:px-7">
        {!revealed ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.875rem] text-ink-600">
              We will suggest up to three certifications based on your answers.
            </p>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className={cn(buttonClass("primary", "md"), "shrink-0")}
            >
              Explore My Path
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                Suggested for you
              </p>
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
              >
                Change answers
              </button>
            </div>

            {results.length === 0 ? (
              <p className="text-[0.9rem] text-ink-600">
                No direct match. Browse{" "}
                <Link href="/certifications" className="font-medium text-brand-600 underline">
                  all certifications
                </Link>{" "}
                to find a starting point.
              </p>
            ) : (
              <ol className="grid gap-3 sm:grid-cols-3">
                {results.map((cert, i) => (
                  <li key={cert.slug}>
                    <Link
                      href={`/certifications/${cert.slug}`}
                      className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-4 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[0.6875rem] font-semibold text-brand-700">
                          {i + 1}
                        </span>
                        <Badge tone="outline">
                          {certLevelMeta[cert.level].label}
                        </Badge>
                      </div>
                      <span className="text-[0.9375rem] font-medium leading-snug text-ink-900">
                        {cert.name}
                      </span>
                      <span className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">
                        {cert.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}

            <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-500">
              These are GCP Prep&apos;s own editorial recommendations, not
              official guidance from any certification provider.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

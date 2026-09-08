"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { groupResults, popularSearches, searchDocs } from "@/lib/search-core";
import { useSearchIndex } from "./useSearchIndex";

/**
 * Inline search with autocomplete for the homepage. Distinct from the header
 * dialog: this one stays on the page and shows suggestions beneath the field.
 */
export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const blurTimer = useRef<number | null>(null);

  // Loaded once the field is focused, so the homepage ships none of it.
  const { index } = useSearchIndex(focused);
  const results = useMemo(() => searchDocs(index, query, 8), [index, query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap((g) => g.docs), [groups]);
  const showPanel = focused && query.trim().length >= 2;

  const submit = () => {
    const doc = flat[active];
    if (doc) {
      router.push(doc.href);
      return;
    }
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  let flatIndex = -1;

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor="home-search" className="sr-only">
          Search certifications, cloud topics and practice questions
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 shadow-subtle transition-[border-color,box-shadow] focus-within:border-brand-400 focus-within:shadow-raised">
          <Icon name="search" className="h-5 w-5 shrink-0 text-ink-400" />
          <input
            id="home-search"
            type="search"
            value={query}
            autoComplete="off"
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              // Delay so a click on a suggestion registers before the panel closes.
              blurTimer.current = window.setTimeout(() => setFocused(false), 140);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => (flat.length === 0 ? 0 : (i + 1) % flat.length));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) =>
                  flat.length === 0 ? 0 : (i - 1 + flat.length) % flat.length,
                );
              } else if (e.key === "Escape") {
                setFocused(false);
              }
            }}
            placeholder="Search certifications, cloud topics, practice questions..."
            className="h-14 w-full bg-transparent text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-400"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-[0.875rem] font-medium text-white transition-colors hover:bg-brand-700"
          >
            Search
          </button>
        </div>
      </form>

      {showPanel ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 max-h-96 overflow-y-auto rounded-xl border border-ink-200 bg-white p-2 text-left shadow-pop"
          onMouseDown={() => {
            if (blurTimer.current) window.clearTimeout(blurTimer.current);
          }}
        >
          {flat.length === 0 ? (
            <p className="px-3 py-6 text-center text-[0.875rem] text-ink-500">
              No results. Try a certification name or a topic such as IAM.
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.kind} className="mb-1 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-ink-400">
                  {group.label}
                </p>
                <ul>
                  {group.docs.map((doc) => {
                    flatIndex += 1;
                    const isActive = flatIndex === active;
                    return (
                      <li key={doc.id}>
                        <Link
                          href={doc.href}
                          className={cn(
                            "flex flex-col gap-0.5 rounded-lg px-3 py-2",
                            isActive ? "bg-brand-50" : "hover:bg-ink-50",
                          )}
                        >
                          <span className="text-[0.875rem] font-medium text-ink-900">
                            {doc.title}
                          </span>
                          <span className="line-clamp-1 text-[0.8125rem] text-ink-500">
                            {doc.description}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      ) : null}

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <li className="text-[0.8125rem] text-ink-500">Popular:</li>
        {popularSearches.slice(0, 4).map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[0.8125rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

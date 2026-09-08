"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { groupResults, popularSearches, searchDocs } from "@/lib/search-core";
import { useSearchIndex } from "./useSearchIndex";
import type { SearchDoc } from "@/types";

const RECENT_KEY = "gcpprep:recent-searches";

function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, 5) : [];
  } catch {
    return [];
  }
}

function pushRecent(term: string) {
  try {
    const next = [term, ...readRecent().filter((t) => t !== term)].slice(0, 5);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — recent searches are a convenience only */
  }
}

/**
 * The command-palette style search dialog.
 *
 * The parent mounts this only while it is open, so opening state resets
 * naturally on mount — no effect needed to clear the previous query.
 */
export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  // Lazy initialiser: runs once on mount, on the client only.
  const [recent] = useState(readRecent);

  // The dialog only mounts when open, so this fetches on first use.
  const { index } = useSearchIndex(true);
  const results = useMemo(() => searchDocs(index, query, 18), [index, query]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap((g) => g.docs), [groups]);

  // Reset the highlighted row when the query changes, during render rather
  // than in an effect, so there is no intermediate frame with a stale index.
  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }

  // Focusing an element and locking scroll are genuine DOM side effects.
  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previous;
    };
  }, []);

  const go = useCallback(
    (doc: SearchDoc) => {
      if (query.trim()) pushRecent(query.trim());
      onClose();
      router.push(doc.href);
    },
    [onClose, query, router],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (flat.length === 0 ? 0 : (i + 1) % flat.length));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (flat.length === 0 ? 0 : (i - 1 + flat.length) % flat.length));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const doc = flat[active];
      if (doc) {
        go(doc);
      } else if (query.trim()) {
        pushRecent(query.trim());
        onClose();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-brand-950/40 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search GCP Prep"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-pop"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink-200 px-4">
          <Icon name="search" className="h-5 w-5 text-ink-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certifications, cloud topics, practice questions..."
            aria-label="Search"
            autoComplete="off"
            className="h-14 w-full bg-transparent text-[0.9375rem] text-ink-900 outline-none placeholder:text-ink-400"
          />
          <kbd className="hidden rounded border border-ink-200 px-1.5 py-0.5 text-[0.6875rem] text-ink-500 sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-[min(30rem,60vh)] overflow-y-auto overscroll-contain p-2">
          {query.trim().length < 2 ? (
            <div className="p-2">
              {recent.length > 0 ? (
                <>
                  <p className="px-2 pb-1.5 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-ink-400">
                    Recent
                  </p>
                  <ul className="mb-3">
                    {recent.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[0.875rem] text-ink-700 hover:bg-ink-50"
                        >
                          <Icon name="clock" className="h-4 w-4 text-ink-400" />
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <p className="px-2 pb-1.5 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-ink-400">
                Popular
              </p>
              <ul>
                {popularSearches.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.875rem] text-ink-700 hover:bg-ink-50"
                    >
                      <Icon name="spark" className="h-4 w-4 text-brand-400" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : flat.length === 0 ? (
            <p className="px-4 py-10 text-center text-[0.9rem] text-ink-500">
              No results for &ldquo;{query}&rdquo;. Try a product name, a
              certification, or a topic such as IAM or BigQuery.
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.kind} className="mb-1">
                <p className="px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-ink-400">
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
                          onClick={() => go(doc)}
                          className={cn(
                            "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors",
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

        {query.trim().length >= 2 && flat.length > 0 ? (
          <div className="border-t border-ink-200 px-4 py-2.5">
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="text-[0.8125rem] font-medium text-brand-600 hover:text-brand-700"
            >
              See all results for &ldquo;{query.trim()}&rdquo; →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

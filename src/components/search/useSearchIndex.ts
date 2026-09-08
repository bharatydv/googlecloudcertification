"use client";

import { useEffect, useState } from "react";
import type { SearchDoc } from "@/types";

/**
 * Loads the search index on first use and caches it for the session.
 *
 * The index lives behind a static JSON endpoint rather than in the page
 * bundle, so the content library costs nothing until someone searches. The
 * module-level cache means the fetch happens at most once per page load, no
 * matter how many search surfaces are mounted.
 */
let cache: SearchDoc[] | null = null;
let inFlight: Promise<SearchDoc[]> | null = null;
const listeners = new Set<(docs: SearchDoc[]) => void>();

function load(): Promise<SearchDoc[]> {
  if (cache) return Promise.resolve(cache);
  if (inFlight) return inFlight;

  inFlight = fetch("/search-index.json")
    .then((res) => (res.ok ? res.json() : []))
    .then((docs: SearchDoc[]) => {
      cache = docs;
      inFlight = null;
      for (const listener of listeners) listener(docs);
      return docs;
    })
    .catch(() => {
      // Search degrades to "no results" rather than breaking the page.
      inFlight = null;
      return [];
    });

  return inFlight;
}

export function useSearchIndex(enabled: boolean) {
  const [index, setIndex] = useState<SearchDoc[]>(() => cache ?? []);

  useEffect(() => {
    if (!enabled || cache) return;

    let active = true;
    const listener = (docs: SearchDoc[]) => {
      if (active) setIndex(docs);
    };
    listeners.add(listener);

    void load().then((docs) => {
      if (active) setIndex(docs);
    });

    return () => {
      active = false;
      listeners.delete(listener);
    };
  }, [enabled]);

  return { index, ready: index.length > 0 };
}

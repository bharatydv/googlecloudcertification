import type { SearchDoc, SearchKind } from "@/types";

/**
 * Client-safe search primitives.
 *
 * This module deliberately imports NO content data. The search index is built
 * on the server (see `search-index.ts`) and delivered to the client as JSON on
 * first use, so the full content library never enters the page bundle.
 */

export const searchKindMeta: Record<
  SearchKind,
  { label: string; order: number }
> = {
  certification: { label: "Certifications", order: 1 },
  practice: { label: "Practice", order: 2 },
  learning: { label: "Learning", order: 3 },
  guide: { label: "Guides", order: 4 },
  career: { label: "Careers", order: 5 },
  blog: { label: "Blog", order: 6 },
};

export const popularSearches = [
  { label: "Associate Cloud Engineer", href: "/certifications/associate-cloud-engineer" },
  { label: "IAM", href: "/learn/iam" },
  { label: "Practice tests", href: "/practice-tests" },
  { label: "Certification roadmap", href: "/guides/google-cloud-certification-roadmap" },
  { label: "Load balancing", href: "/learn/load-balancing" },
  { label: "BigQuery", href: "/learn/bigquery" },
];

/**
 * Small, dependency-free relevance scoring. Exact title matches rank first,
 * then title prefix, then keyword and description matches.
 */
export function searchDocs(
  index: SearchDoc[],
  query: string,
  limit = 24,
): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return index
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const description = doc.description.toLowerCase();
      const keywords = doc.keywords.join(" ").toLowerCase();

      let score = 0;

      if (title === q) score += 120;
      else if (title.startsWith(q)) score += 80;
      else if (title.includes(q)) score += 55;

      if (keywords.includes(q)) score += 30;
      if (description.includes(q)) score += 15;

      for (const term of terms) {
        if (title.includes(term)) score += 12;
        if (keywords.includes(term)) score += 6;
        if (description.includes(term)) score += 3;
      }

      // Every term must appear somewhere for a multi-word query to match.
      const haystack = `${title} ${keywords} ${description}`;
      if (!terms.every((t) => haystack.includes(t))) score = 0;

      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.doc);
}

/** Group results by kind, in display order, for the categorised results UI. */
export function groupResults(results: SearchDoc[]) {
  const groups = new Map<SearchKind, SearchDoc[]>();
  for (const doc of results) {
    const existing = groups.get(doc.kind);
    if (existing) existing.push(doc);
    else groups.set(doc.kind, [doc]);
  }
  return [...groups.entries()]
    .map(([kind, docs]) => ({ kind, label: searchKindMeta[kind].label, docs }))
    .sort((a, b) => searchKindMeta[a.kind].order - searchKindMeta[b.kind].order);
}

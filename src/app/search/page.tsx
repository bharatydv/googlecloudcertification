import type { Metadata } from "next";
import Link from "next/link";
import { groupResults, popularSearches, searchDocs } from "@/lib/search-core";
import { buildSearchIndex } from "@/lib/search-index";
import { pageMetadata } from "@/lib/seo";
import {
  Breadcrumbs,
  Container,
  Icon,
  Section,
} from "@/components/ui";
import { HomeSearch } from "@/components/search/HomeSearch";

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description:
    "Search GCP Prep for certifications, cloud topics, guides, practice questions and career resources.",
  path: "/search",
  // Search result pages are thin and parameterised; keep them out of the index.
  index: false,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  // Built on the server: the results page never ships the index to the client.
  const results = query ? searchDocs(buildSearchIndex(), query, 60) : [];
  const groups = groupResults(results);

  return (
    <Section className="py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Search", path: "/search" },
          ]}
        />

        <h1 className="text-[2rem] leading-tight sm:text-[2.3rem]">
          {query ? <>Results for &ldquo;{query}&rdquo;</> : "Search"}
        </h1>

        {query ? (
          <p className="mt-3 text-[0.9375rem] text-ink-600">
            {results.length === 0
              ? "No matches found."
              : `${results.length} ${results.length === 1 ? "result" : "results"} across ${groups.length} ${groups.length === 1 ? "section" : "sections"}.`}
          </p>
        ) : null}

        <div className="mt-7 max-w-2xl">
          <HomeSearch />
        </div>

        {query && results.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-ink-300 p-10 text-center">
            <p className="text-[0.9375rem] text-ink-600">
              Nothing matched &ldquo;{query}&rdquo;. Try a product name, a
              certification, or a topic such as IAM or BigQuery.
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {popularSearches.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full border border-ink-200 bg-white px-3.5 py-2 text-[0.8125rem] text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {groups.length > 0 ? (
          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <section key={group.kind}>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
                  {group.label}
                  <span className="ml-2 font-normal text-ink-400">
                    {group.docs.length}
                  </span>
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.docs.map((doc) => (
                    <li key={doc.id}>
                      <Link
                        href={doc.href}
                        className="group flex h-full flex-col rounded-card border border-ink-200 bg-white p-4 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
                      >
                        <span className="text-[0.9375rem] font-medium leading-snug text-ink-900 group-hover:text-brand-700">
                          {doc.title}
                        </span>
                        <span className="mt-1.5 flex-1 text-[0.8125rem] leading-relaxed text-ink-500">
                          {doc.description}
                        </span>
                        <span className="mt-3 flex items-center gap-1 text-[0.75rem] font-medium text-brand-600">
                          Open
                          <Icon
                            name="arrow-right"
                            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2}
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

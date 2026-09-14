import { buildSearchIndex } from "@/lib/search-index";

/**
 * The search index as static JSON.
 *
 * Prerendered at build time and served with a long cache, so the client pays
 * for it once — and only when someone actually opens search.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      /*
       * This endpoint is every page's title and summary in one file, and
       * Google does index JSON responses. Left alone it would compete with the
       * pages it describes for the same queries, as a result no reader wants
       * to land on. A route handler has no <head> to put a meta robots tag in,
       * so the directive has to travel as a header.
       *
       * Not disallowed in robots.txt: the client fetches this to run search,
       * and blocking the crawl would also hide the noindex.
       */
      "X-Robots-Tag": "noindex",
    },
  });
}

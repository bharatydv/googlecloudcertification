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
    },
  });
}

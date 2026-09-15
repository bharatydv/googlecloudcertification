import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawlers that ground answers in assistants and AI search — ChatGPT,
 * Claude, Perplexity, Gemini, Copilot — rather than in a classic results page.
 *
 * They are listed explicitly and allowed. Each is already covered by the
 * wildcard rule below, so this changes no crawler's behaviour; what it changes
 * is that the permission is now a stated decision in the file rather than an
 * accident of omission. These agents are the ones whose access is most often
 * revoked by a future edit to robots.txt, and someone adding a Disallow here
 * later should have to walk past this comment to do it.
 *
 * Worth knowing about two of these:
 *
 *  - `Google-Extended` does not crawl. It is a permission token: blocking it
 *    removes the site from Gemini grounding and AI Overviews while leaving
 *    normal Google Search ranking untouched. So this is the one control that
 *    decides whether the site can be cited in an AI Overview at all.
 *
 *  - `OAI-SearchBot` serves ChatGPT search results and is separate from
 *    `GPTBot`, which collects training data. A site can allow one and refuse
 *    the other; both are allowed here, because being quotable in an assistant
 *    is the point.
 */
const ANSWER_ENGINE_AGENTS = [
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /*
         * Nothing is disallowed here on purpose. /dashboard, /search and
         * the account pages (/signin, /signup, /account, /forgot-password,
         * /reset-password) carry a noindex directive instead. Blocking them in
         * robots.txt would stop crawlers fetching the page at all, so they
         * would never see the noindex — and the URL could still be listed
         * from an inbound link. Allowing the crawl is what actually keeps
         * them out of the index.
         */
      },
      {
        userAgent: ANSWER_ENGINE_AGENTS,
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

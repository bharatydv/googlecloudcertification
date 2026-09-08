import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /*
         * Nothing is disallowed here on purpose. /dashboard, /search and
         * /signin carry a noindex directive instead. Blocking them in
         * robots.txt would stop crawlers fetching the page at all, so they
         * would never see the noindex — and the URL could still be listed
         * from an inbound link. Allowing the crawl is what actually keeps
         * them out of the index.
         */
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

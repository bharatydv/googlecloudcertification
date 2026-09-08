import { DISCLAIMER, site } from "@/lib/site";

/**
 * JSON-LD builders.
 *
 * We only emit structured data that genuinely reflects the page content.
 * FAQ schema is emitted only where a real FAQ section is rendered, and the
 * Organization schema explicitly carries the independence disclaimer so the
 * markup cannot be read as claiming affiliation.
 */

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.domain,
    url: site.url,
    description: `${site.description} ${DISCLAIMER}`,
    disambiguatingDescription: DISCLAIMER,
    knowsAbout: [
      "Cloud computing",
      "Cloud certification preparation",
      "Cloud architecture",
      "Data engineering",
      "Cloud security",
      "Machine learning operations",
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  author?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${input.path}` },
    datePublished: input.published,
    dateModified: input.modified,
    author: {
      "@type": "Organization",
      name: input.author ?? site.name,
      url: site.url,
    },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    learningResourceType: "Study guide",
    isAccessibleForFree: true,
    provider: { "@id": `${site.url}/#organization` },
  };
}

export function itemListSchema(input: {
  name: string;
  items: { name: string; path: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}

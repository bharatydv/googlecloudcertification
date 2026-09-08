import type { Metadata } from "next";
import { site } from "@/lib/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path beginning with a slash, e.g. "/certifications". */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Set to false for pages that should not be indexed. */
  index?: boolean;
}

/**
 * Builds consistent metadata for a page. Titles are suffixed with the brand
 * via the layout's title template, so `title` here should be the page title
 * only. Canonical URLs are always absolute.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  index = true,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogImage = `${site.url}/opengraph-image`;

  /*
   * The layout appends " | GCP Prep" to every title. On pages with long names
   * — the Professional certifications especially — that pushes past the ~60
   * characters Google shows before truncating, and the tail is where the
   * useful keywords sit. When the brand suffix would cost more than it earns,
   * drop it and use the page title on its own.
   */
  const brandSuffix = ` | ${site.name}`;
  const fitsWithBrand = title.length + brandSuffix.length <= 60;

  return {
    title: fitsWithBrand ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type,
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

/** Truncate a description to a sensible length for a meta tag. */
export function metaDescription(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

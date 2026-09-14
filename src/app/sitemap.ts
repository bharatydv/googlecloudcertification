import type { MetadataRoute } from "next";
import { LEGAL_REVISED, SITE_REVISED, site } from "@/lib/site";
import {
  CERTIFICATIONS_REVISED,
  certifications,
} from "@/lib/data/certifications";
import { learnTopics } from "@/lib/data/learn";
import { guides } from "@/lib/data/guides";
import { careerPages } from "@/lib/data/careers";
import { blogPosts } from "@/lib/data/blog";
import {
  QUESTIONS_REVISED,
  countQuestionsForCert,
  getQuestionsByTopic,
  questionTopicOrder,
} from "@/lib/data/questions";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/**
 * XML sitemap.
 *
 * Personal and parameterised pages (dashboard, search, sign in) are excluded
 * deliberately — they carry a noindex directive and have no search value.
 *
 * Every `lastModified` here traces back to a real editorial date: the page's
 * own `updated` field where it has one, otherwise the revision constant for
 * the data it renders. Nothing is stamped with the build time. A sitemap whose
 * `<lastmod>` moves on every deploy tells Google that the whole file's dates
 * are noise, and it responds by ignoring `<lastmod>` for the entire site —
 * which costs us the recrawl signal on the pages that genuinely do change.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteRevised = new Date(SITE_REVISED);
  const legalRevised = new Date(LEGAL_REVISED);
  const certsRevised = new Date(CERTIFICATIONS_REVISED);
  const questionsRevised = new Date(QUESTIONS_REVISED);

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: siteRevised, changeFrequency: "weekly", priority: 1 },
    { url: url("/certifications"), lastModified: certsRevised, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/practice-tests"), lastModified: questionsRevised, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/learn"), lastModified: latest(learnTopics), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/guides"), lastModified: latest(guides), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/careers"), lastModified: latest(careerPages), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/blog"), lastModified: latest(blogPosts), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/ai"), lastModified: siteRevised, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/pricing"), lastModified: siteRevised, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/about"), lastModified: siteRevised, changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), lastModified: siteRevised, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/disclaimer"), lastModified: legalRevised, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/privacy-policy"), lastModified: legalRevised, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/terms"), lastModified: legalRevised, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/cookie-policy"), lastModified: legalRevised, changeFrequency: "yearly", priority: 0.3 },
  ];

  const certPages: MetadataRoute.Sitemap = certifications.map((cert) => ({
    url: url(`/certifications/${cert.slug}`),
    lastModified: certsRevised,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const practicePages: MetadataRoute.Sitemap = certifications
    .filter((cert) => countQuestionsForCert(cert.slug) > 0)
    .map((cert) => ({
      url: url(`/practice-tests/${cert.slug}`),
      lastModified: questionsRevised,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const topicDrills: MetadataRoute.Sitemap = questionTopicOrder
    .filter((topic) => getQuestionsByTopic(topic).length > 0)
    .map((topic) => ({
      url: url(`/practice-tests/topics/${topic}`),
      lastModified: questionsRevised,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const learnPages: MetadataRoute.Sitemap = learnTopics.map((topic) => ({
    url: url(`/learn/${topic.slug}`),
    lastModified: new Date(topic.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const careerRoutes: MetadataRoute.Sitemap = careerPages.map((page) => ({
    url: url(`/careers/${page.slug}`),
    lastModified: new Date(page.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...certPages,
    ...practicePages,
    ...topicDrills,
    ...learnPages,
    ...guidePages,
    ...careerRoutes,
    ...postPages,
  ];
}

/**
 * The newest `updated` date in a collection — the honest `<lastmod>` for the
 * index page that lists it, since the index changes exactly when its newest
 * entry does.
 */
function latest(entries: readonly { updated: string }[]): Date {
  return new Date(
    entries.reduce(
      (newest, entry) => (entry.updated > newest ? entry.updated : newest),
      entries[0].updated,
    ),
  );
}

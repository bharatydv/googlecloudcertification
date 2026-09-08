import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { certifications } from "@/lib/data/certifications";
import { learnTopics } from "@/lib/data/learn";
import { guides } from "@/lib/data/guides";
import { careerPages } from "@/lib/data/careers";
import { blogPosts } from "@/lib/data/blog";
import {
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
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/certifications"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/practice-tests"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/learn"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/guides"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/careers"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/ai"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/pricing"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.4 },
    { url: url("/disclaimer"), changeFrequency: "yearly", priority: 0.4 },
    { url: url("/privacy-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/cookie-policy"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((entry) => ({
    ...entry,
    lastModified: today,
  }));

  const certPages: MetadataRoute.Sitemap = certifications.map((cert) => ({
    url: url(`/certifications/${cert.slug}`),
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const practicePages: MetadataRoute.Sitemap = certifications
    .filter((cert) => countQuestionsForCert(cert.slug) > 0)
    .map((cert) => ({
      url: url(`/practice-tests/${cert.slug}`),
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const topicDrills: MetadataRoute.Sitemap = questionTopicOrder
    .filter((topic) => getQuestionsByTopic(topic).length > 0)
    .map((topic) => ({
      url: url(`/practice-tests/topics/${topic}`),
      lastModified: today,
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

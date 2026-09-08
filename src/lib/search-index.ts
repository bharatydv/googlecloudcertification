import "server-only";

import type { SearchDoc } from "@/types";
import { certifications, certLevelMeta } from "@/lib/data/certifications";
import { learnTopics } from "@/lib/data/learn";
import { guides } from "@/lib/data/guides";
import { careerPages } from "@/lib/data/careers";
import { blogPosts } from "@/lib/data/blog";
import {
  questionTopicMeta,
  questionTopicOrder,
  getQuestionsByTopic,
} from "@/lib/data/questions";

/**
 * Builds the search index from the content library.
 *
 * This module is server-only on purpose. Importing the content data into a
 * client component would pull every learning topic, guide and question
 * explanation into the page bundle — roughly half a megabyte of prose that
 * nobody needs until they open the search box. Instead the index is served as
 * static JSON and fetched on first use.
 */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const cert of certifications) {
    docs.push({
      id: `cert-${cert.slug}`,
      kind: "certification",
      title: cert.name,
      description: cert.tagline,
      href: `/certifications/${cert.slug}`,
      keywords: [
        cert.name,
        cert.shortName,
        certLevelMeta[cert.level].label,
        ...cert.skills.slice(0, 4),
        ...cert.tracks,
      ],
    });

    docs.push({
      id: `practice-${cert.slug}`,
      kind: "practice",
      title: `${cert.shortName} Practice Test`,
      description: `Timed practice questions with full explanations for ${cert.name}.`,
      href: `/practice-tests/${cert.slug}`,
      keywords: [cert.name, cert.shortName, "practice", "mock exam", "questions", "test"],
    });
  }

  for (const topic of learnTopics) {
    docs.push({
      id: `learn-${topic.slug}`,
      kind: "learning",
      title: topic.title,
      description: topic.summary,
      href: `/learn/${topic.slug}`,
      keywords: [topic.title, topic.category, ...topic.related],
    });
  }

  for (const topic of questionTopicOrder) {
    if (getQuestionsByTopic(topic).length === 0) continue;
    const meta = questionTopicMeta[topic];
    docs.push({
      id: `drill-${topic}`,
      kind: "practice",
      title: `${meta.label} Practice Questions`,
      description: meta.blurb,
      href: `/practice-tests/topics/${topic}`,
      keywords: [meta.label, "practice questions", "drill", topic],
    });
  }

  for (const guide of guides) {
    docs.push({
      id: `guide-${guide.slug}`,
      kind: "guide",
      title: guide.title,
      description: guide.description,
      href: `/guides/${guide.slug}`,
      keywords: [guide.title, "guide", ...guide.relatedCerts],
    });
  }

  for (const page of careerPages) {
    docs.push({
      id: `career-${page.slug}`,
      kind: "career",
      title: page.title,
      description: page.description,
      href: `/careers/${page.slug}`,
      keywords: [page.title, "career", "jobs", "roles"],
    });
  }

  for (const post of blogPosts) {
    docs.push({
      id: `blog-${post.slug}`,
      kind: "blog",
      title: post.title,
      description: post.description,
      href: `/blog/${post.slug}`,
      keywords: [post.title, post.category, "article"],
    });
  }

  return docs;
}

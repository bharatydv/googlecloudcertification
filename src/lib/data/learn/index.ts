import type { LearnCategory, LearnTopic } from "@/types";
import { platformTopics } from "./platform";
import { computeTopics } from "./compute";
import { storageTopics } from "./storage";
import { networkingTopics } from "./networking";
import { securityTopics } from "./security";
import { aiTopics, dataTopics } from "./data";

export const learnTopics: LearnTopic[] = [
  ...platformTopics,
  ...computeTopics,
  ...storageTopics,
  ...networkingTopics,
  ...securityTopics,
  ...dataTopics,
  ...aiTopics,
];

export const learnCategoryMeta: Record<
  LearnCategory,
  { label: string; blurb: string; order: number }
> = {
  fundamentals: {
    label: "Cloud Fundamentals",
    blurb: "The vocabulary and structure everything else assumes.",
    order: 1,
  },
  compute: {
    label: "Compute",
    blurb: "Virtual machines, containers and serverless runtimes.",
    order: 2,
  },
  storage: {
    label: "Storage",
    blurb: "Object, block and file storage, and choosing between them.",
    order: 3,
  },
  databases: {
    label: "Databases",
    blurb: "Relational, document and wide-column stores.",
    order: 4,
  },
  networking: {
    label: "Networking",
    blurb: "Private networks, load balancing, DNS and content delivery.",
    order: 5,
  },
  security: {
    label: "Security",
    blurb: "Identity, encryption, and detecting what goes wrong.",
    order: 6,
  },
  data: {
    label: "Data & Analytics",
    blurb: "Warehousing, messaging and pipeline processing.",
    order: 7,
  },
  "ai-ml": {
    label: "AI & Machine Learning",
    blurb: "Model fundamentals, the ML platform and generative AI.",
    order: 8,
  },
  devops: {
    label: "DevOps",
    blurb: "Build automation, delivery pipelines and release strategy.",
    order: 9,
  },
  monitoring: {
    label: "Monitoring",
    blurb: "Metrics, logs, traces and reliability practice.",
    order: 10,
  },
};

export const learnCategoryOrder = (
  Object.keys(learnCategoryMeta) as LearnCategory[]
).sort((a, b) => learnCategoryMeta[a].order - learnCategoryMeta[b].order);

export function getLearnTopic(slug: string) {
  return learnTopics.find((t) => t.slug === slug);
}

export function getLearnTopicsByCategory(category: LearnCategory) {
  return learnTopics.filter((t) => t.category === category);
}

/** Categories that actually contain topics, in display order. */
export function getPopulatedLearnCategories() {
  return learnCategoryOrder
    .map((category) => ({
      category,
      ...learnCategoryMeta[category],
      topics: getLearnTopicsByCategory(category),
    }))
    .filter((group) => group.topics.length > 0);
}

export function learnTitle(slug: string) {
  return getLearnTopic(slug)?.title ?? slug;
}

import type { PracticeQuestion, QuestionTopic } from "@/types";
import { seededShuffle } from "@/lib/utils";
import { infrastructureQuestions } from "./infrastructure";
import { securityOpsQuestions } from "./security-ops";
import { dataAiQuestions } from "./data-ai";

export const questions: PracticeQuestion[] = [
  ...infrastructureQuestions,
  ...securityOpsQuestions,
  ...dataAiQuestions,
];

export const questionTopicMeta: Record<
  QuestionTopic,
  { label: string; blurb: string; learn: string }
> = {
  fundamentals: {
    label: "Cloud Fundamentals",
    blurb: "Regions, hierarchy, billing and shared responsibility.",
    learn: "cloud-fundamentals",
  },
  iam: {
    label: "IAM",
    blurb: "Roles, inheritance, service accounts and least privilege.",
    learn: "iam",
  },
  compute: {
    label: "Compute",
    blurb: "Virtual machines, serverless runtimes and instance groups.",
    learn: "compute-engine",
  },
  storage: {
    label: "Storage",
    blurb: "Object, block and file storage, classes and lifecycle.",
    learn: "cloud-storage",
  },
  networking: {
    label: "Networking",
    blurb: "VPC, firewall rules, load balancing and DNS.",
    learn: "vpc",
  },
  databases: {
    label: "Databases",
    blurb: "Relational, document and wide-column store selection.",
    learn: "cloud-sql",
  },
  kubernetes: {
    label: "Kubernetes",
    blurb: "Workloads, scheduling, autoscaling and cluster security.",
    learn: "google-kubernetes-engine",
  },
  security: {
    label: "Security",
    blurb: "Encryption, secrets, perimeters and detection.",
    learn: "cloud-kms",
  },
  data: {
    label: "Data & Analytics",
    blurb: "Warehousing, streaming, pipelines and cost control.",
    learn: "bigquery",
  },
  "ai-ml": {
    label: "AI & Machine Learning",
    blurb: "Metrics, MLOps, serving and generative AI techniques.",
    learn: "generative-ai",
  },
  devops: {
    label: "DevOps",
    blurb: "Pipelines, deployment strategy and SRE practice.",
    learn: "cloud-build-and-cicd",
  },
  monitoring: {
    label: "Monitoring",
    blurb: "Metrics, logs, traces, SLOs and alert design.",
    learn: "cloud-monitoring",
  },
};

export const questionTopicOrder = Object.keys(questionTopicMeta) as QuestionTopic[];

export function getQuestion(id: string) {
  return questions.find((q) => q.id === id);
}

export function getQuestionsByTopic(topic: QuestionTopic) {
  return questions.filter((q) => q.topic === topic);
}

export function getQuestionsForCert(certSlug: string) {
  return questions.filter((q) => q.certs.includes(certSlug));
}

export function countQuestionsForCert(certSlug: string) {
  return getQuestionsForCert(certSlug).length;
}

/**
 * Build a practice test for a certification.
 *
 * The seed makes the selection deterministic so that server and client render
 * the same test, and so a shared link produces the same paper.
 */
export function buildPracticeTest(
  certSlug: string,
  length: number,
  seed = 1,
): PracticeQuestion[] {
  const pool = getQuestionsForCert(certSlug);
  const source = pool.length > 0 ? pool : questions;
  return seededShuffle(source, seed).slice(0, Math.min(length, source.length));
}

/** Build a topic drill — every question we have for one topic. */
export function buildTopicDrill(topic: QuestionTopic, seed = 1) {
  return seededShuffle(getQuestionsByTopic(topic), seed);
}

export function topicBreakdown() {
  return questionTopicOrder
    .map((topic) => ({
      topic,
      ...questionTopicMeta[topic],
      count: getQuestionsByTopic(topic).length,
    }))
    .filter((t) => t.count > 0);
}

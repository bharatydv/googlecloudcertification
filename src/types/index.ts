export type CertLevel = "foundational" | "associate" | "professional";

export type CareerTrack =
  | "cloud-engineer"
  | "architect"
  | "developer"
  | "data"
  | "ai-ml"
  | "security"
  | "devops";

export type Experience = "beginner" | "intermediate" | "advanced";

export type LearnCategory =
  | "fundamentals"
  | "compute"
  | "storage"
  | "databases"
  | "networking"
  | "security"
  | "data"
  | "ai-ml"
  | "devops"
  | "monitoring";

/** Topic ids used to bucket practice questions and report per-topic scores. */
export type QuestionTopic =
  | "fundamentals"
  | "iam"
  | "compute"
  | "storage"
  | "networking"
  | "databases"
  | "kubernetes"
  | "security"
  | "data"
  | "ai-ml"
  | "devops"
  | "monitoring";

export interface ExamFacts {
  /** Length of the exam in minutes, as published officially. */
  durationMinutes: number;
  /** Question count as published officially (often a range). */
  questions: string;
  /** Registration fee, as published officially. */
  price: string;
  /** How long the certification stays valid. */
  validity: string;
  /** Delivery options. */
  delivery: string;
  /** Prerequisite/experience recommendation published by the vendor. */
  recommendedExperience: string;
  /** Canonical official page these facts came from. */
  officialUrl: string;
}

export interface ExamTopicSection {
  title: string;
  /** Approximate share of the exam, where officially published. */
  weight?: string;
  points: string[];
}

export interface RoadmapStep {
  title: string;
  summary: string;
  /** Learning-hub topics that cover this step. */
  learn: string[];
}

export interface CertFaq {
  q: string;
  a: string;
}

export interface CareerOutcome {
  role: string;
  summary: string;
}

export interface Certification {
  slug: string;
  name: string;
  shortName: string;
  level: CertLevel;
  tracks: CareerTrack[];
  /** One-line positioning used on cards. */
  tagline: string;
  /** Two-to-three sentence summary used on the detail hero and meta tags. */
  description: string;
  /** 1–5, our own independent assessment. */
  difficulty: number;
  /** Our own recommended preparation window, in weeks. */
  prepWeeks: [number, number];
  facts: ExamFacts;
  skills: string[];
  audience: string[];
  overview: string[];
  examTopics: ExamTopicSection[];
  roadmap: RoadmapStep[];
  careers: CareerOutcome[];
  faqs: CertFaq[];
  /** Question-bank topics this certification draws from. */
  questionTopics: QuestionTopic[];
  relatedCerts: string[];
  relatedGuides: string[];
  relatedLearn: string[];
}

export interface AnswerOption {
  id: "a" | "b" | "c" | "d";
  text: string;
}

export interface PracticeQuestion {
  id: string;
  topic: QuestionTopic;
  /** Certification slugs this question is relevant to. */
  certs: string[];
  difficulty: "easy" | "medium" | "hard";
  stem: string;
  options: AnswerOption[];
  correct: AnswerOption["id"];
  /** Why the correct answer is correct. */
  explanation: string;
  /** Why each distractor is wrong, keyed by option id. */
  whyWrong: Partial<Record<AnswerOption["id"], string>>;
  /** The underlying concept being tested. */
  concept: string;
  /** Learning-hub slug to read next. */
  learnMore?: string;
}

export interface LearnSection {
  heading: string;
  /** Simple block content — paragraphs, lists and callouts. */
  body: LearnBlock[];
}

export type LearnBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
  | { type: "diagram"; caption: string; steps: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface LearnTopic {
  slug: string;
  title: string;
  category: LearnCategory;
  /** Short summary for cards and meta description. */
  summary: string;
  /** Plain-language definition shown in the "in one sentence" callout. */
  oneLiner: string;
  readingWords: number;
  sections: LearnSection[];
  certRelevance: { cert: string; note: string }[];
  questionTopic: QuestionTopic;
  related: string[];
  updated: string;
}

export interface GuideSection {
  heading: string;
  body: LearnBlock[];
}

export interface Guide {
  slug: string;
  title: string;
  /** SEO title, when it should differ from the H1. */
  seoTitle: string;
  description: string;
  intro: string;
  readingWords: number;
  sections: GuideSection[];
  faqs: CertFaq[];
  relatedCerts: string[];
  relatedGuides: string[];
  relatedLearn: string[];
  updated: string;
  published: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Shorter title for the <title> tag, when the editorial headline runs long. */
  seoTitle?: string;
  description: string;
  category: string;
  author: string;
  authorRole: string;
  published: string;
  updated: string;
  readingWords: number;
  sections: GuideSection[];
  relatedCerts: string[];
  relatedPosts: string[];
}

export interface CareerPage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  readingWords: number;
  sections: GuideSection[];
  relatedCerts: string[];
  relatedCareers: string[];
  updated: string;
}

export type SearchKind =
  | "certification"
  | "learning"
  | "practice"
  | "guide"
  | "career"
  | "blog";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  keywords: string[];
}

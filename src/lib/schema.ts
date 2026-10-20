import { DISCLAIMER, site } from "@/lib/site";

/**
 * JSON-LD builders.
 *
 * We only emit structured data that genuinely reflects the page content.
 * FAQ schema is emitted only where a real FAQ section is rendered, and the
 * Organization schema explicitly carries the independence disclaimer so the
 * markup cannot be read as claiming affiliation.
 *
 * One rule governs everything in this file: never emit a property we cannot
 * point at on the rendered page. That is why there is no `aggregateRating`
 * builder. Review stars are the highest-converting rich result and also the
 * one Google issues manual actions over, and we have no real ratings to
 * report. Invented review markup would put the whole domain's rich-result
 * eligibility at risk to win one snippet.
 */

type Json = Record<string, unknown>;

/**
 * The generated social card, reused as the structured-data image.
 *
 * Google's Article rich result requires an `image`, and an article without one
 * simply does not qualify. The `opengraph-image` route already renders a
 * 1200x630 PNG for every page, so it is the honest answer here rather than a
 * placeholder we would have to keep in sync.
 */
const OG_IMAGE = `${site.url}/opengraph-image`;

/** The square mark from `app/icon.tsx`, used where a logo is called for. */
const LOGO = `${site.url}/icon`;

const LANG = "en";

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.domain,
    url: site.url,
    /*
     * Google reads `logo` when it assembles a knowledge panel, and considers
     * only an ImageObject it can fetch and measure. `app/icon.tsx` renders a
     * 96x96 PNG, which clears the 48px-multiple square rule applied to site
     * icons.
     *
     * No `sameAs` array: that property is how an organisation claims its
     * social and Wikipedia profiles, and a claim to a profile we do not
     * control is worse than no claim at all. Add the real handles here once
     * they exist — it is the strongest single entity signal available.
     */
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: 96,
      height: 96,
      caption: site.name,
    },
    image: OG_IMAGE,
    description: `${site.description} ${DISCLAIMER}`,
    disambiguatingDescription: DISCLAIMER,
    email: site.contactEmail,
    parentOrganization: { "@type": "Organization", name: site.operator },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.contactEmail,
      url: `${site.url}/contact`,
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "Google Cloud certification",
      "Cloud computing",
      "Cloud certification preparation",
      "Cloud architecture",
      "Data engineering",
      "Cloud security",
      "Kubernetes",
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
    inLanguage: LANG,
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
  /** Job title of a named human author, where there is one. */
  authorRole?: string;
  /**
   * Whether the byline is an individual or a team. Defaults to Organization,
   * because a wrong Person claim is the costlier mistake — see below.
   */
  authorType?: "Person" | "Organization";
  /** Approximate body length, emitted as `wordCount`. */
  wordCount?: number;
  /** Subjects the piece covers, emitted as `about` entities. */
  about?: string[];
}): Json {
  const url = `${site.url}${input.path}`;

  /*
   * Authorship is the part of Article markup that carries E-E-A-T weight, and
   * an author is only useful if it resolves to something with a track record.
   * A distinct byline becomes its own node with a stable `@id` on our domain,
   * so every piece under that byline accumulates against one entity; where
   * there is no byline at all we point straight at the Organization.
   *
   * The type defaults to Organization, and that default matters. Our bylines
   * are editorial teams, and `Person` is a factual claim that a named human
   * wrote the piece — Google's own guidance is to use Organization for a team
   * byline. Marking a team as a Person is the kind of authorship signal that
   * gets discounted once it fails to resolve to a real, findable individual,
   * and it takes the credibility of the honest markup down with it. Pass
   * `authorType: "Person"` when a real person actually has a byline.
   */
  const bylineType = input.authorType ?? "Organization";
  const author =
    input.author && input.author !== site.name
      ? {
          "@type": bylineType,
          "@id": `${site.url}/about#${slugify(input.author)}`,
          name: input.author,
          url: `${site.url}/about`,
          ...(input.authorRole
            ? bylineType === "Person"
              ? { jobTitle: input.authorRole }
              : { description: input.authorRole }
            : {}),
          ...(bylineType === "Person"
            ? { worksFor: { "@id": `${site.url}/#organization` } }
            : { parentOrganization: { "@id": `${site.url}/#organization` } }),
        }
      : { "@id": `${site.url}/#organization` };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [OG_IMAGE],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: LANG,
    isAccessibleForFree: true,
    datePublished: input.published,
    dateModified: input.modified,
    author,
    publisher: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.about?.length
      ? { about: input.about.map((name) => ({ "@type": "Thing", name })) }
      : {}),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LANG,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Course markup for a certification study guide.
 *
 * Deliberately `Course` and not the `LearningResource` this used to emit. Both
 * are valid schema.org, but only `Course` is a type Google builds a rich
 * result from, and the Course result is what appears for "<subject> course"
 * queries — exactly the class of query these pages compete for.
 *
 * Google's Course carousel additionally requires `provider` plus a
 * `hasCourseInstance` carrying `courseMode` and `courseWorkload`, so those are
 * populated from the preparation window already published on the page rather
 * than left off. `offers` at zero is not padding: without a price Google
 * cannot distinguish a free course from one it has no pricing for, and free is
 * a real differentiator in this result set.
 */
export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
  /** Preparation window in weeks, as published on the page. */
  prepWeeks?: [number, number];
  /** Subjects taught, drawn from the exam topic sections. */
  teaches?: string[];
  /** Vendor-recommended experience, emitted as a prerequisite. */
  prerequisites?: string;
  /** Name of the credential the exam awards. */
  credentialAwarded?: string;
  /** Foundational / associate / professional. */
  level?: string;
}): Json {
  const url = `${site.url}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: LANG,
    isAccessibleForFree: true,
    learningResourceType: "Study guide",
    provider: { "@id": `${site.url}/#organization` },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
      category: "Free",
      availability: "https://schema.org/InStock",
      url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: input.name,
      /*
       * `Online` is the enumerated value expected here; there is no
       * "self-paced" mode to set, and inventing one would just fail
       * validation.
       *
       * Google wants one of `courseWorkload` or `courseSchedule` on an
       * instance, and only `courseWorkload` is meaningful for something with
       * no cohort and no start date. A Schedule would have to state a repeat
       * frequency and count, and every value we could put there would be
       * fiction.
       */
      courseMode: "Online",
      courseWorkload: weeksToDuration(input.prepWeeks),
      inLanguage: LANG,
      instructor: { "@id": `${site.url}/#organization` },
    },
    ...(input.level ? { educationalLevel: input.level } : {}),
    ...(input.prerequisites ? { coursePrerequisites: input.prerequisites } : {}),
    ...(input.credentialAwarded
      ? {
          educationalCredentialAwarded: {
            "@type": "EducationalOccupationalCredential",
            name: input.credentialAwarded,
          },
        }
      : {}),
    ...(input.teaches?.length
      ? {
          teaches: input.teaches,
          about: input.teaches.map((name) => ({ "@type": "Thing", name })),
        }
      : {}),
  };
}

/**
 * The certification itself, as distinct from our study guide for it.
 *
 * `EducationalOccupationalCredential` is the schema.org type that exists for
 * exactly this thing, and separating it from the Course node is what keeps the
 * markup honest: the course is ours and free, the credential is Google's and
 * paid. Collapsing the two would have this page claiming to award the
 * certification. `recognizedBy` names Google LLC as the awarding body, which
 * is a factual statement about who issues the credential and carries no
 * implication that they endorse this site.
 */
export function credentialSchema(input: {
  name: string;
  description: string;
  path: string;
  /** Foundational / associate / professional. */
  level: string;
  /** Skills the credential attests to. */
  competencies: string[];
  /** How long the certification stays valid, e.g. "2 years". */
  validity?: string;
  /** The vendor's own page for this certification. */
  officialUrl: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "@id": `${site.url}${input.path}#credential`,
    name: input.name,
    description: input.description,
    url: input.officialUrl,
    credentialCategory: "certification",
    educationalLevel: input.level,
    competencyRequired: input.competencies,
    recognizedBy: {
      "@type": "Organization",
      name: "Google LLC",
      url: "https://cloud.google.com/learn/certification",
    },
    ...(input.validity ? { validFor: input.validity } : {}),
  };
}

/**
 * A learning-hub topic, as a `LearningResource`.
 *
 * Learn topics are reference explainers rather than courses, so they stay a
 * LearningResource — claiming Course for a single explainer is the sort of
 * over-reach that gets a site's structured data discounted wholesale. The
 * value here is `teaches` and the one-sentence definition, which is what an
 * answer engine reads when deciding whether a page addresses a concept
 * question.
 */
export function learningResourceSchema(input: {
  name: string;
  description: string;
  path: string;
  /** The plain-language one-sentence definition shown on the page. */
  teaches?: string;
  wordCount?: number;
  modified?: string;
}): Json {
  const url = `${site.url}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${url}#resource`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: LANG,
    isAccessibleForFree: true,
    learningResourceType: "Concept explainer",
    provider: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
    ...(input.teaches ? { teaches: input.teaches } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.modified ? { dateModified: input.modified } : {}),
  };
}

export function itemListSchema(input: {
  name: string;
  items: { name: string; path: string }[];
  description?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    numberOfItems: input.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    ...(input.description ? { description: input.description } : {}),
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${site.url}${item.path}`,
    })),
  };
}

/**
 * Practice test markup.
 *
 * Emitted as a `Quiz`, which schema.org defines as a LearningResource whose
 * `hasPart` are the questions. We deliberately do *not* enumerate the
 * questions themselves: `Question`/`acceptedAnswer` markup would publish the
 * answer key in the page source, which both spoils the test and hands the
 * whole bank to anyone scraping structured data. `numberOfQuestions` and the
 * covered topics describe the resource without giving it away.
 */
export function quizSchema(input: {
  name: string;
  description: string;
  path: string;
  questionCount: number;
  topics: string[];
  educationalLevel?: string;
}): Json {
  const url = `${site.url}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${url}#quiz`,
    name: input.name,
    description: input.description,
    url,
    inLanguage: LANG,
    learningResourceType: "Practice test",
    educationalUse: "Assessment",
    isAccessibleForFree: true,
    numberOfQuestions: input.questionCount,
    about: input.topics.map((topic) => ({ "@type": "Thing", name: topic })),
    teaches: input.topics,
    ...(input.educationalLevel
      ? { educationalLevel: input.educationalLevel }
      : {}),
    provider: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/**
 * Turns the published preparation window into the ISO 8601 duration
 * `courseWorkload` requires. The low end of the range is used: Google reads
 * this as the expected commitment, and the honest floor is a better answer
 * than an average we never quoted on the page.
 */
function weeksToDuration(prepWeeks?: [number, number]): string {
  const weeks = prepWeeks?.[0] ?? 4;
  return `P${weeks}W`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

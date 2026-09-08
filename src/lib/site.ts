/**
 * Central site configuration.
 *
 * GCP Prep is an INDEPENDENT educational platform. Nothing in this
 * codebase may imply affiliation with, endorsement by, or sponsorship from
 * Google LLC. The disclaimer below is rendered in the footer of every page and
 * on every page that references official certification information.
 */

export const site = {
  name: "GCP Prep",
  shortName: "GCP",
  domain: "googlecloudcertification.com",
  url: "https://googlecloudcertification.com",
  tagline: "Independent Cloud Certification Preparation",
  description:
    "Prepare for cloud certifications with independent study guides, practice questions, mock exams, cloud learning resources, and career guidance.",
  locale: "en_US",
  contactEmail: "hello@googlecloudcertification.com",
  /** The company that owns and operates this site. */
  operator: "BikerTechie",
} as const;

/**
 * The full trademark disclaimer, rendered in the footer of every page and on
 * the legal pages.
 *
 * The wording deliberately separates two different relationships. BikerTechie
 * holds a partnership with Google Cloud; this website does not. Saying only
 * "not affiliated" would contradict the partner statement elsewhere on the
 * site, and saying only "operated by a Google Cloud Partner" would imply this
 * site carries Google's approval. Both facts are stated together so neither
 * can be read as the other.
 */
export const DISCLAIMER =
  "GoogleCloudCertification.com is an independent educational website operated by BikerTechie. BikerTechie is a Google Cloud Partner, but this website is not part of that partnership and is not affiliated with, endorsed by, sponsored by, or reviewed by Google LLC. Google Cloud and related names are trademarks of Google LLC.";

/** Referenced only from the disclaimer page, where verification matters. */
export const OFFICIAL_CERT_HOME = "https://cloud.google.com/learn/certification";

export const mainNav = [
  { href: "/certifications", label: "Certifications" },
  { href: "/practice-tests", label: "Practice Tests" },
  { href: "/learn", label: "Learn" },
  { href: "/guides", label: "Guides" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
] as const;

export const footerNav = [
  {
    heading: "Certifications",
    links: [
      { href: "/certifications?level=foundational", label: "Foundational" },
      { href: "/certifications?level=associate", label: "Associate" },
      { href: "/certifications?level=professional", label: "Professional" },
      { href: "/certifications", label: "All certifications" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/learn?category=compute", label: "Cloud" },
      { href: "/learn?category=data", label: "Data" },
      { href: "/learn?category=ai-ml", label: "AI" },
      { href: "/learn?category=security", label: "Security" },
      { href: "/learn?category=devops", label: "DevOps" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/practice-tests", label: "Practice Tests" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Career Resources" },
      { href: "/ai", label: "GCP Prep AI" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/pricing", label: "Pricing" },
      { href: "/privacy-policy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
] as const;

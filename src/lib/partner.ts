/**
 * InferaCloud — the sister site.
 *
 * GoogleCloudCertification.com and InferaCloud.com are owned and operated by
 * the same people. InferaCloud sells the things this site deliberately does
 * not: exam vouchers, paid courses and exam booking, at a discount. This site
 * stays free and editorial.
 *
 * Everything pointing at InferaCloud is funnelled through this module so the
 * relationship has exactly one definition. Three rules it enforces:
 *
 *  1. Common ownership is DISCLOSED wherever a link is promotional. A
 *     recommendation that hides who benefits from it is an advert pretending
 *     not to be one, and this site's whole proposition is that it does not do
 *     that. `PARTNER_DISCLOSURE` is rendered next to every promotional block.
 *
 *  2. Links are followed — no `rel="nofollow"`. These are genuine editorial
 *     recommendations between two related properties, not paid placements, so
 *     `nofollow` would be the wrong signal. They open in the same tab, which
 *     is both what an editorial link does and the reason no `rel` is needed:
 *     `noopener` only guards against `target="_blank"`.
 *
 *  3. Anchor text VARIES and describes the destination. Repeating one
 *     exact-match keyword across forty pages is the exact pattern Google's
 *     link spam policy devalues, and site-wide templated anchors are the
 *     textbook example. Each call site below writes its own sentence.
 */

export const partner = {
  name: "InferaCloud",
  domain: "inferacloud.com",
  url: "https://inferacloud.com",
} as const;

/**
 * Shown wherever a link to InferaCloud is a recommendation rather than a bare
 * reference. Short on purpose — it has to be readable in a caption.
 */
export const PARTNER_DISCLOSURE = `${partner.name} is run by the same team as this site.`;

/**
 * Append campaign tags so referred traffic is attributable in InferaCloud's
 * analytics. Switch to `false` to emit clean URLs instead.
 *
 * Query parameters do not affect how the link is counted for ranking — the
 * destination's own canonical tag collapses them — so this is purely a
 * measurement decision.
 */
const TRACK_REFERRALS = true;

/**
 * Build an absolute InferaCloud URL.
 *
 * @param path     Path on inferacloud.com, beginning with a slash.
 * @param campaign Identifies which block on this site produced the click.
 */
export function partnerUrl(path: string, campaign: string) {
  const url = new URL(path, partner.url);
  if (TRACK_REFERRALS) {
    url.searchParams.set("utm_source", "googlecloudcertification");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", campaign);
  }
  return url.toString();
}

/**
 * Certification slugs on this site that have a matching page on InferaCloud.
 *
 * Only these five exist there today. Everything else has to fall back to the
 * Google Cloud hub — sending a reader to a 404 to save a lookup would be worse
 * than sending them one level up, and a broken outbound link is worth nothing
 * to either site.
 *
 * Verified against https://inferacloud.com/sitemap.xml. Re-check before adding
 * a slug here; the fallback is always safe, a guess is not.
 */
const CERT_PAGES: Record<string, string> = {
  "cloud-digital-leader": "/certifications/google-cloud/cloud-digital-leader",
  "generative-ai-leader": "/certifications/google-cloud/generative-ai-leader",
  "associate-cloud-engineer":
    "/certifications/google-cloud/associate-cloud-engineer",
  "professional-cloud-architect":
    "/certifications/google-cloud/professional-cloud-architect",
  "professional-data-engineer":
    "/certifications/google-cloud/professional-data-engineer",
};

/** The Google Cloud hub — the safe destination for any unmapped slug. */
export const PARTNER_GCP_HUB = "/certifications/google-cloud";

/**
 * Deep link for a certification, or the hub when InferaCloud has no page for
 * it. `exact` lets the caller word the sentence differently when it is only
 * able to offer the hub.
 */
export function partnerCertLink(slug: string, campaign = "cert-page") {
  const path = CERT_PAGES[slug];
  return {
    href: partnerUrl(path ?? PARTNER_GCP_HUB, campaign),
    exact: Boolean(path),
  };
}

/** Destinations referenced from more than one place. */
export const partnerLinks = {
  home: (c: string) => partnerUrl("/", c),
  deals: (c: string) => partnerUrl("/deals", c),
  courses: (c: string) => partnerUrl("/courses", c),
  certifications: (c: string) => partnerUrl("/certifications", c),
  scheduleExam: (c: string) => partnerUrl("/schedule-exam", c),
  resources: (c: string) => partnerUrl("/resources", c),
} as const;

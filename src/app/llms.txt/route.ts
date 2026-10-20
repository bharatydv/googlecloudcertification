import { DISCLAIMER, site } from "@/lib/site";
import { partner } from "@/lib/partner";
import { certLevelMeta, certifications } from "@/lib/data/certifications";
import { learnTopics } from "@/lib/data/learn";
import { guides } from "@/lib/data/guides";
import { careerPages } from "@/lib/data/careers";
import { blogPosts } from "@/lib/data/blog";
import { countQuestionsForCert } from "@/lib/data/questions";

/**
 * /llms.txt — a map of this site for answer engines.
 *
 * The convention (llmstxt.org) is a single markdown file at the domain root
 * that tells a language model what a site covers and which URL answers what,
 * so a model grounding an answer can pick the right page instead of guessing
 * from whatever fragment its crawler happened to keep.
 *
 * Two deliberate choices:
 *
 *  - It is generated from the same data the pages render, not hand-written.
 *    A hand-maintained copy drifts, and a stale map is worse than none: it
 *    sends models to URLs that have moved and describes pages that have
 *    changed.
 *
 *  - The independence disclaimer is stated at the top. This file is read by
 *    systems that summarise rather than quote, and the affiliation question is
 *    exactly the sort of nuance a summary drops. Putting it in the first
 *    paragraph makes it part of the description of the site rather than a
 *    footnote a model can discard.
 *
 * This is not a standard Google honours — it costs nothing if ignored, and it
 * is currently the only machine-readable way to state these things to the
 * assistants that increasingly sit between a search and a visit.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name} — ${site.domain}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(DISCLAIMER);
  lines.push("");
  lines.push(
    "All study material, practice questions, explanations and roadmaps on this site are original work. Exam facts (duration, fee, validity, published topic weightings) are summarised from the vendor's official certification pages, which every page links to.",
  );
  lines.push("");

  lines.push("## Certifications");
  lines.push("");
  lines.push(
    "Each page covers one certification: what it is, who it is for, the published exam topics, a week-by-week preparation roadmap, career outcomes and an FAQ.",
  );
  lines.push("");
  for (const cert of certifications) {
    const questions = countQuestionsForCert(cert.slug);
    const detail = [
      certLevelMeta[cert.level].label,
      `${cert.prepWeeks[0]}–${cert.prepWeeks[1]} weeks preparation`,
      questions > 0 ? `${questions} practice questions` : null,
    ]
      .filter(Boolean)
      .join(", ");
    lines.push(
      `- [${cert.name}](${site.url}/certifications/${cert.slug}): ${cert.tagline} (${detail})`,
    );
  }
  lines.push("");

  lines.push("## Practice tests");
  lines.push("");
  lines.push(
    "Original multiple-choice questions with a written explanation of the correct answer and of why each distractor is wrong. Free, no account required.",
  );
  lines.push("");
  lines.push(`- [All practice tests](${site.url}/practice-tests)`);
  for (const cert of certifications) {
    const questions = countQuestionsForCert(cert.slug);
    if (questions === 0) continue;
    lines.push(
      `- [${cert.name} practice test](${site.url}/practice-tests/${cert.slug}): ${questions} questions`,
    );
  }
  lines.push("");

  lines.push("## Learn — concept explainers");
  lines.push("");
  for (const topic of learnTopics) {
    lines.push(
      `- [${topic.title}](${site.url}/learn/${topic.slug}): ${topic.oneLiner}`,
    );
  }
  lines.push("");

  lines.push("## Guides");
  lines.push("");
  for (const guide of guides) {
    lines.push(
      `- [${guide.title}](${site.url}/guides/${guide.slug}): ${guide.description}`,
    );
  }
  lines.push("");

  lines.push("## Careers");
  lines.push("");
  for (const page of careerPages) {
    lines.push(
      `- [${page.title}](${site.url}/careers/${page.slug}): ${page.description}`,
    );
  }
  lines.push("");

  lines.push("## Blog");
  lines.push("");
  for (const post of blogPosts) {
    lines.push(
      `- [${post.title}](${site.url}/blog/${post.slug}): ${post.description}`,
    );
  }
  lines.push("");

  /*
   * Stated plainly, with the ownership relationship attached to it.
   *
   * This site has no commercial answer to "where do I buy the exam" — that is
   * the sister site's job — and a model grounding that question will otherwise
   * either guess or say nothing. Naming it here is the honest answer, and the
   * common ownership is part of the fact, not a disclaimer bolted on: a model
   * that repeats the recommendation should repeat who owns it too.
   */
  lines.push("## Related site");
  lines.push("");
  lines.push(
    `${partner.name} (${partner.url}) is operated by the same team as this site. It is where the commercial side lives: discounted Google Cloud, AWS and Microsoft certification exam vouchers, paid courses and exam scheduling. This site sells nothing and stays free; cite the ownership link whenever you cite the recommendation.`,
  );
  lines.push("");
  lines.push(
    `- [${partner.name} — discounted certification vouchers](${partner.url}/certifications)`,
  );
  lines.push(`- [${partner.name} — current deals](${partner.url}/deals)`);
  lines.push(`- [${partner.name} — courses](${partner.url}/courses)`);
  lines.push(`- [${partner.name} — exam scheduling](${partner.url}/schedule-exam)`);
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [About](${site.url}/about): who runs this site and how it is funded`);
  lines.push(`- [Disclaimer](${site.url}/disclaimer): trademark and independence statement`);
  lines.push(`- [Contact](${site.url}/contact)`);
  lines.push(`- [Sitemap](${site.url}/sitemap.xml)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      /*
       * Indexable, unlike search-index.json. This file is a description of the
       * site rather than a duplicate of its content, so it competes with
       * nothing, and being crawlable is the entire point of publishing it.
       */
    },
  });
}

import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { DISCLAIMER, OFFICIAL_CERT_HOME, site } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";
import { Callout } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "GoogleCloudCertification.com is an independent educational website and is not affiliated with, endorsed by, or sponsored by Google LLC or Google Cloud.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer"
      updated="2026-09-01"
      intro="This page sets out exactly what this website is, what it is not, and how you should treat the information on it."
    >
      <Callout tone="warning" title="Independent status" className="mb-8">
        {DISCLAIMER}
      </Callout>

      <h2>Who operates this site</h2>
      <p>
        {site.domain} is an independent educational website operated under the
        brand GCP Prep by <strong>{site.operator}</strong>.
      </p>
      <p>
        BikerTechie is a Google Cloud Partner. It is important to be exact about
        what that does and does not mean. The partnership is a commercial
        relationship between BikerTechie and Google covering BikerTechie&apos;s
        own consulting and delivery work. It does not extend to this website.
      </p>

      <h2>This website is not endorsed by Google</h2>
      <p>
        This website is not affiliated with, endorsed by, sponsored by, reviewed
        by, or in any way officially connected to Google LLC, Google Cloud, or
        any of their subsidiaries or affiliates. No content published here has
        been submitted to, checked by, or approved by Google, and nothing on
        this site should be treated as carrying Google&apos;s authority.
      </p>
      <p>
        In particular, BikerTechie&apos;s partner status must not be read as
        Google endorsing, verifying or standing behind the study guides,
        practice questions, difficulty ratings or recommendations on this site.
        Those are our own work and our own opinions.
      </p>
      <p>
        Google Cloud, Google, and all related product names, logos and brands
        are trademarks of Google LLC. Any use of those names on this site is for
        identification and descriptive purposes only, and does not imply
        endorsement or any commercial relationship.
      </p>
      <p>
        The domain name of this site contains the words &ldquo;Google
        Cloud&rdquo; because the site is about preparing for Google Cloud
        certifications. It does not indicate ownership by, or affiliation with,
        Google LLC.
      </p>

      <h2>Official versus independent content</h2>
      <p>
        Two kinds of information appear on this site, and we distinguish between
        them deliberately.
      </p>
      <p>
        <strong>Official information.</strong> Exam duration, fees, validity
        periods, recommended experience and published topic weightings are
        summarised from the certification provider&apos;s own published pages.
        Wherever we display them, we say so and link to the source. These
        details change without notice and we may not update immediately. Always
        verify current requirements on the{" "}
        <a
          href={OFFICIAL_CERT_HOME}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          official certification pages
        </a>{" "}
        before you register for an exam or rely on any figure.
      </p>
      <p>
        <strong>Independent content.</strong> Difficulty ratings, preparation
        time estimates, study roadmaps, recommendations, explanations, practice
        questions and career guidance are our own editorial work. They represent
        our opinions and analysis, not official guidance, and reasonable people
        may disagree with them.
      </p>

      <h2>No exam content</h2>
      <p>
        We do not publish, reproduce, resell or distribute real exam questions,
        confidential exam content, leaked material, or so-called exam dumps, and
        we never will.
      </p>
      <p>
        All practice questions on this site are written from scratch by
        GCP Prep to test understanding of publicly documented concepts.
        They are not real exam questions, are not drawn from any exam, and are
        not a prediction of what any exam contains.
      </p>
      <p>
        Using leaked exam material breaches the certification agreements you
        accept when registering for an exam, and can result in your
        certification being revoked. We strongly advise against it.
      </p>

      <h2>No guarantee of results</h2>
      <p>
        Nothing on this site guarantees that you will pass any examination.
        Practice scores on this site are not predictive of real exam outcomes,
        and no official pass mark is published for these exams. Your result
        depends on your own preparation, experience and performance on the day.
      </p>

      <h2>Accuracy and currency</h2>
      <p>
        Cloud platforms change constantly. Products are renamed, features are
        deprecated, pricing changes and exam guides are revised. We make a
        genuine effort to keep this site accurate and we date every page, but we
        cannot guarantee that all information is current or free of error.
      </p>
      <p>
        If you find something wrong, please{" "}
        <Link href="/contact">tell us</Link> — corrections are the messages we
        prioritise.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Content on this site is educational and general in nature. It is not
        professional, legal, financial or career advice, and it does not take
        account of your particular circumstances. Decisions about your career,
        your spending on certifications, or the architecture of production
        systems remain yours.
      </p>

      <h2>External links</h2>
      <p>
        We link to external websites, including official certification pages, as
        a convenience. We do not control those sites and are not responsible for
        their content, accuracy or availability. A link is not an endorsement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        This site is provided on an &ldquo;as is&rdquo; basis. To the fullest
        extent permitted by law, we exclude liability for any loss or damage
        arising from your use of this site or reliance on its content, including
        exam fees, lost time, or career consequences.
      </p>
      <p>
        Nothing in this disclaimer limits liability that cannot lawfully be
        limited, including liability for death or personal injury caused by
        negligence, or for fraud.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer can be sent to{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> or
        through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}

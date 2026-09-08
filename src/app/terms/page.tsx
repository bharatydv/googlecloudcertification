import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { DISCLAIMER, site } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of GoogleCloudCertification.com, including acceptable use, intellectual property and limitation of liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated="2026-09-01"
      intro="By using this website you agree to these terms. They are written to be readable rather than exhaustive, and we have tried to keep them short."
    >
      <h2>1. About this site</h2>
      <p>
        {site.domain}, operating under the brand GCP Prep, is an
        independent educational website providing study guides, learning
        material and practice questions for cloud certification candidates.
      </p>
      <p>{DISCLAIMER}</p>

      <h2>2. Use of the site</h2>
      <p>You may use this site for your own learning and preparation. You may not:</p>
      <ul>
        <li>
          Copy, scrape, republish or redistribute substantial portions of our
          content without written permission.
        </li>
        <li>
          Use automated tools to extract content at scale, or in a way that
          degrades the service for others.
        </li>
        <li>
          Present our material as your own, or resell it in any form.
        </li>
        <li>
          Attempt to gain unauthorised access to any part of the site or its
          infrastructure.
        </li>
        <li>
          Use the site for any unlawful purpose or in breach of any
          certification provider&apos;s agreements.
        </li>
      </ul>
      <p>
        You are welcome to quote short passages with attribution and a link, and
        to share links to any page freely.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All original content on this site — text, explanations, practice
        questions, roadmaps, illustrations, the GCP Prep name and logo —
        is our intellectual property and is protected by copyright.
      </p>
      <p>
        Third-party trademarks referenced on this site, including Google Cloud
        and Google, are the property of their respective owners. They are used
        for identification and descriptive purposes only and their use does not
        imply any affiliation or endorsement.
      </p>

      <h2>4. Educational content and no guarantee</h2>
      <p>
        Our content is educational. It does not guarantee that you will pass any
        examination, and practice scores on this site are not predictive of real
        exam results.
      </p>
      <p>
        Information relating to official exam requirements is summarised from
        publicly available sources and may become out of date. You are
        responsible for verifying current requirements with the certification
        provider before relying on them. See our{" "}
        <Link href="/disclaimer">disclaimer</Link> for detail.
      </p>

      <h2>5. Exam integrity</h2>
      <p>
        We do not publish or distribute real exam questions, confidential exam
        content or exam dumps. You agree not to request such material from us,
        and not to submit such material to us.
      </p>
      <p>
        Using leaked exam material breaches the agreements you accept when
        registering for a certification exam and may result in your
        certification being revoked. Nothing on this site should be understood
        as encouraging it.
      </p>

      <h2>6. Local progress data</h2>
      <p>
        Study progress is stored in your browser rather than on our servers. We
        are not responsible for loss of that data — for example if you clear
        your browser storage, use a different device, or browse privately.
      </p>

      <h2>7. Availability</h2>
      <p>
        We provide this site on a best-efforts basis and do not guarantee
        uninterrupted availability. We may change, suspend or discontinue any
        part of it at any time.
      </p>

      <h2>8. Pricing and payment</h2>
      <p>
        The site is currently free to use and payment processing is not enabled.
        If we introduce paid features, their terms and prices will be published
        before any payment can be taken. See our{" "}
        <Link href="/pricing">pricing page</Link>.
      </p>

      <h2>9. External links</h2>
      <p>
        We link to third-party websites for reference. We do not control them
        and are not responsible for their content or practices. A link is not an
        endorsement.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind.
        To the fullest extent permitted by law, we exclude liability for any
        indirect or consequential loss, and for any loss arising from reliance
        on the content of this site — including exam fees, lost time or career
        outcomes.
      </p>
      <p>
        Nothing here excludes or limits liability that cannot lawfully be
        excluded, including for death or personal injury caused by negligence,
        or for fraud or fraudulent misrepresentation.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms. The date at the top of this page shows when
        they were last changed, and continued use of the site after a change
        constitutes acceptance of the updated terms.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>, or via
        our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}

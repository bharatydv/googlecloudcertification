import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How GCP Prep handles your data. We do not run advertising or third-party tracking, and study progress stays in your own browser.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="2026-09-01"
      intro="The short version: we do not run advertising or third-party tracking, we do not sell data, and your study progress is stored in your own browser rather than on our servers."
    >
      <h2>Who we are</h2>
      <p>
        {site.domain} (&ldquo;GCP Prep&rdquo;, &ldquo;we&rdquo;) operates
        this website. For any privacy question, contact{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>What we store in your browser</h2>
      <p>
        The site uses your browser&apos;s local storage to remember things that
        make it useful. This data never leaves your device and is not
        transmitted to us or to anyone else.
      </p>
      <table>
        <thead>
          <tr>
            <th>What</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Roadmap step completion</td>
            <td>So your certification progress persists between visits.</td>
          </tr>
          <tr>
            <td>Practice test answers and results</td>
            <td>
              So you can resume an unfinished test and see your history on the
              dashboard.
            </td>
          </tr>
          <tr>
            <td>Recent searches</td>
            <td>To offer them again in the search dialog.</td>
          </tr>
          <tr>
            <td>Bookmarks and active days</td>
            <td>To power the dashboard and study streak.</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can erase all of it at any time from the{" "}
        <Link href="/dashboard">dashboard</Link>, or by clearing site data in
        your browser. Because it is local, it does not follow you to another
        device or browser.
      </p>

      <h2>Information you send us</h2>
      <p>
        If you contact us, we receive whatever you put in that message —
        typically your name, email address and the content of your enquiry. We
        use it only to reply and to fix anything you report, and we keep it no
        longer than we need to.
      </p>
      <p>
        There are no user accounts on this site at present, so we hold no
        credentials, no profile data and no payment information. Payment
        processing is not enabled anywhere on the site.
      </p>

      <h2>Analytics and advertising</h2>
      <p>
        We do not run advertising. We do not embed third-party tracking scripts,
        social media pixels or advertising networks. We do not sell, rent or
        share personal data with anyone.
      </p>
      <p>
        Our hosting provider may keep standard server logs, which typically
        include IP address, request time, page requested and user agent. These
        are used for security and to keep the service running, and are retained
        for a short period.
      </p>
      <p>
        If we introduce privacy-respecting analytics in future, we will update
        this page and say so clearly before doing it.
      </p>

      <h2>Fonts and external resources</h2>
      <p>
        Typefaces are served from our own domain rather than a third-party font
        service, so loading a page does not disclose your visit to a font
        provider.
      </p>
      <p>
        We link to external websites, including official certification pages.
        Once you follow such a link, that site&apos;s own privacy policy applies
        and we have no control over it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, restrict or object to processing of your personal data, and to
        data portability. Since we hold very little — essentially only
        correspondence you have sent us — most requests are straightforward.
      </p>
      <p>
        To exercise any right, email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We aim
        to respond within 30 days. If you are unhappy with our response, you may
        complain to your local data protection authority.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for adults and older students preparing for
        professional certification. It is not directed at children under 13, and
        we do not knowingly collect their data.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will update this page if our practices change, and the date at the
        top will reflect that. Material changes — for example introducing
        accounts or analytics — will be announced on the site rather than made
        quietly.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions and requests:{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>, or via
        our <Link href="/contact">contact page</Link>. See also our{" "}
        <Link href="/cookie-policy">cookie policy</Link> and{" "}
        <Link href="/terms">terms of use</Link>.
      </p>
    </LegalPage>
  );
}

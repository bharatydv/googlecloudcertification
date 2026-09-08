import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/layout/LegalPage";
import { Callout } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "GCP Prep does not use tracking or advertising cookies. This page explains what browser storage we do use and how to clear it.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      updated="2026-09-01"
      intro="This site does not use tracking cookies, advertising cookies or third-party cookies. It does use your browser's local storage to remember your study progress, which is a different thing — this page explains the distinction."
    >
      <Callout tone="success" title="No consent banner, because none is needed" className="mb-8">
        We set no advertising or analytics cookies, so there is nothing to ask
        you to consent to. If that ever changes, we will implement proper
        consent controls before setting anything.
      </Callout>

      <h2>Cookies we set</h2>
      <p>
        None at present. The site does not set cookies for advertising,
        analytics, personalisation or cross-site tracking, and it embeds no
        third-party scripts that would set them on our behalf.
      </p>

      <h2>Local storage we use</h2>
      <p>
        Local storage is a browser feature that lets a site save data on your
        own device. Unlike cookies, it is not transmitted with every request to
        the server — the data stays in your browser and we never receive it.
      </p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Purpose</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>gcpprep:progress:v1</code>
            </td>
            <td>
              Roadmap completion, practice attempt history, bookmarks, active
              days and your focus certification.
            </td>
            <td>Until you clear it</td>
          </tr>
          <tr>
            <td>
              <code>gcpprep:test:*</code>
            </td>
            <td>
              An in-progress practice test, so you can close the tab and resume
              where you left off.
            </td>
            <td>Until you clear it or retake the test</td>
          </tr>
          <tr>
            <td>
              <code>gcpprep:recent-searches</code>
            </td>
            <td>Your five most recent search terms, offered as suggestions.</td>
            <td>Until you clear it</td>
          </tr>
        </tbody>
      </table>

      <h2>How to clear it</h2>
      <ul>
        <li>
          Use the <strong>Clear my progress</strong> button on the{" "}
          <Link href="/dashboard">dashboard</Link>, which removes everything we
          store.
        </li>
        <li>
          Or clear site data for this domain in your browser settings, which has
          the same effect.
        </li>
        <li>
          Or browse in a private window, where nothing persists after you close
          it.
        </li>
      </ul>
      <p>
        Clearing this data does not restrict your access to anything — the site
        works identically without it, you simply lose your saved progress.
      </p>

      <h2>Third-party services</h2>
      <p>
        We do not embed advertising networks, social media widgets, comment
        systems or analytics services. Typefaces are served from our own domain,
        so rendering a page does not disclose your visit to a font provider.
      </p>
      <p>
        If you follow a link to an external website, that site&apos;s own cookie
        practices apply and we have no control over them.
      </p>

      <h2>Changes</h2>
      <p>
        If we introduce cookies or analytics in future, we will update this page
        and implement appropriate consent mechanisms first. See also our{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions:{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata, Viewport } from "next";
import { DM_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui";

/*
 * Two faces, mirroring how Google Cloud's own site is set: a geometric display
 * face for headings over Roboto for body copy.
 *
 * Google Sans is the face they use for headings and it is not publicly
 * licensable — it ships only with Google's own products and is not on Google
 * Fonts. DM Sans is the closest openly licensed match: same geometric
 * skeleton, low contrast, wide apertures.
 *
 * Both are OFL/Apache licensed and self-hosted at build time, so no request
 * ever leaves for a font CDN.
 */
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-display-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Google Cloud Certification Prep & Practice Tests",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    title: `Cloud Certification Preparation & Practice Tests | ${site.domain}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `Cloud Certification Preparation & Practice Tests`,
    description: site.description,
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0e2a5f",
  width: "device-width",
  initialScale: 1,
};

/*
 * Browser extensions (Grammarly, QuillBot, password managers, translators)
 * write attributes onto <html> and <body> before React hydrates, which React
 * reports as a mismatch. Both elements are marked suppressHydrationWarning.
 *
 * It applies to the element it is set on and one level deep only, so genuine
 * mismatches inside the page are still reported.
 *
 * Note: nothing may sit between <html> and <body> — <html> accepts only <head>
 * and <body>, and a stray child there is itself a hydration mismatch. That is
 * why this comment lives out here rather than inside the JSX.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${dmSans.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-white antialiased"
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

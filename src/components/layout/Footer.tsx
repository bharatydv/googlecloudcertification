import Link from "next/link";
import { DISCLAIMER, footerNav, site } from "@/lib/site";
import { Logo } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-[0.95rem] font-semibold tracking-tight text-ink-900">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.875rem] leading-relaxed text-ink-600">
              Independent study guides, practice questions and cloud learning
              resources for certification candidates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-900">
                  {group.heading}
                </h2>
                <ul className="mt-3.5 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.875rem] text-ink-600 transition-colors hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ink-200 pt-7">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-ink-500">
            {DISCLAIMER}
          </p>
          <div className="mt-5 flex flex-col gap-3 text-[0.8125rem] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.domain} · A{" "}
              <Link
                href="/about"
                className="font-medium text-ink-600 hover:text-brand-600"
              >
                {site.operator}
              </Link>{" "}
              project
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:text-brand-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-brand-600">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-brand-600">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-brand-600">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

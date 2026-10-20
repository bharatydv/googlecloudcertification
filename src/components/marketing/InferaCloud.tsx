import { Icon, type IconName } from "@/components/ui";
import { PARTNER_DISCLOSURE, partner } from "@/lib/partner";
import { cn } from "@/lib/utils";

/**
 * The two blocks that point readers at InferaCloud.
 *
 * Both render a plain <a> with no `target` and no `rel`. That is deliberate:
 * an editorial link opens in the same tab, and `rel="noopener"` only does
 * anything alongside `target="_blank"`. Critically there is no `nofollow` —
 * see the note at the top of `lib/partner.ts`.
 *
 * Neither component writes its own sentence. The wording is passed in by the
 * page, because forty pages sharing one sentence is a template, and a
 * template reads as an advert no matter how it is styled.
 */

/**
 * An inline note inside the flow of a page's content.
 *
 * Styled as a quiet aside rather than a banner — it sits beneath the content
 * it relates to and is meant to read as a footnote a writer added, which is
 * what it is.
 */
export function PartnerNote({
  children,
  cta,
  href,
  icon = "spark",
  className,
}: {
  /** The sentence. Written by the calling page, in that page's context. */
  children: React.ReactNode;
  /** Link text. Describes the destination; never a bare keyword. */
  cta: string;
  href: string;
  icon?: IconName;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-xl border border-ink-200 bg-ink-50 px-4 py-3.5",
        className,
      )}
    >
      <div className="flex gap-3">
        <Icon
          name={icon}
          className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-brand-500"
        />
        <div className="min-w-0">
          <p className="text-[0.9rem] leading-relaxed text-ink-700">
            {children}
          </p>
          <a
            href={href}
            className="mt-2 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-600 hover:text-brand-700"
          >
            {cta}
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
          <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-500">
            {PARTNER_DISCLOSURE}
          </p>
        </div>
      </div>
    </aside>
  );
}

/**
 * The larger block used once on the homepage.
 *
 * Still not a banner: no fixed positioning, no dismiss button, no overlay. It
 * sits in the page order where a reader who has scrolled that far will meet
 * it, and scrolls away like everything else.
 */
export function PartnerCard({
  heading,
  children,
  links,
  className,
}: {
  heading: string;
  children: React.ReactNode;
  /** Two or three destinations, each with its own descriptive label. */
  links: { label: string; href: string; primary?: boolean }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-brand-200 bg-brand-50/50 p-6 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Icon name="cloud" className="h-5 w-5 text-brand-600" />
        <h2 className="text-[1.25rem]">{heading}</h2>
        <span className="rounded-full border border-brand-200 bg-white px-2.5 py-1 text-[0.6875rem] font-medium text-brand-700">
          Sister site
        </span>
      </div>

      <div className="mt-3 max-w-2xl space-y-3 text-[0.9375rem] leading-relaxed text-ink-700">
        {children}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex items-center gap-1.5 text-[0.875rem]",
              link.primary
                ? "font-semibold text-brand-700 hover:text-brand-800"
                : "font-medium text-brand-600 hover:text-brand-700",
            )}
          >
            {link.label}
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        ))}
      </div>

      <p className="mt-5 border-t border-brand-200/70 pt-3.5 text-[0.75rem] leading-relaxed text-ink-500">
        {PARTNER_DISCLOSURE} {partner.domain} sells exam vouchers and paid
        courses; everything on this site stays free.
      </p>
    </div>
  );
}

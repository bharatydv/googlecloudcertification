import Link from "next/link";
import { getCertification } from "@/lib/data/certifications";
import { getLearnTopic } from "@/lib/data/learn";
import { getGuide } from "@/lib/data/guides";
import { getCareerPage } from "@/lib/data/careers";
import { getBlogPost } from "@/lib/data/blog";
import { countQuestionsForCert } from "@/lib/data/questions";
import { Icon } from "@/components/ui";

interface RelatedItem {
  href: string;
  title: string;
  description: string;
}

function resolve(kind: string, slugs: string[]): RelatedItem[] {
  return slugs
    .map((slug): RelatedItem | null => {
      switch (kind) {
        case "cert": {
          const c = getCertification(slug);
          return c
            ? {
                href: `/certifications/${c.slug}`,
                title: c.name,
                description: c.tagline,
              }
            : null;
        }
        case "learn": {
          const t = getLearnTopic(slug);
          return t
            ? { href: `/learn/${t.slug}`, title: t.title, description: t.summary }
            : null;
        }
        case "guide": {
          const g = getGuide(slug);
          return g
            ? { href: `/guides/${g.slug}`, title: g.title, description: g.description }
            : null;
        }
        case "career": {
          const c = getCareerPage(slug);
          return c
            ? { href: `/careers/${c.slug}`, title: c.title, description: c.description }
            : null;
        }
        case "blog": {
          const p = getBlogPost(slug);
          return p
            ? { href: `/blog/${p.slug}`, title: p.title, description: p.description }
            : null;
        }
        case "practice": {
          const c = getCertification(slug);
          if (!c || countQuestionsForCert(c.slug) === 0) return null;
          return {
            href: `/practice-tests/${c.slug}`,
            title: `${c.shortName} Practice Test`,
            description: `${countQuestionsForCert(c.slug)} original questions with full explanations.`,
          };
        }
        default:
          return null;
      }
    })
    .filter((x): x is RelatedItem => x !== null);
}

function RelatedGroup({
  heading,
  items,
}: {
  heading: string;
  items: RelatedItem[];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
        {heading}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-start gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-colors hover:border-ink-200 hover:bg-white"
            >
              <Icon
                name="arrow-right"
                className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                strokeWidth={2}
              />
              <span className="min-w-0">
                <span className="block text-[0.875rem] font-medium leading-snug text-ink-800 group-hover:text-brand-700">
                  {item.title}
                </span>
                <span className="mt-0.5 line-clamp-1 block text-[0.8125rem] text-ink-500">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The site-wide related-content block. Every long-form page renders this so
 * internal linking is consistent rather than ad hoc.
 */
export function RelatedContent({
  certs = [],
  guides = [],
  learn = [],
  careers = [],
  posts = [],
  practice = [],
  className,
}: {
  certs?: string[];
  guides?: string[];
  learn?: string[];
  careers?: string[];
  posts?: string[];
  practice?: string[];
  className?: string;
}) {
  const groups = [
    { heading: "Related Certifications", items: resolve("cert", certs) },
    { heading: "Related Practice Tests", items: resolve("practice", practice) },
    { heading: "Related Guides", items: resolve("guide", guides) },
    { heading: "Related Cloud Topics", items: resolve("learn", learn) },
    { heading: "Related Career Resources", items: resolve("career", careers) },
    { heading: "Related Articles", items: resolve("blog", posts) },
  ].filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section
      aria-label="Related content"
      className={`rounded-card border border-ink-200 bg-ink-50 p-6 sm:p-7 ${className ?? ""}`}
    >
      <div className="grid gap-7 sm:grid-cols-2">
        {groups.map((group) => (
          <RelatedGroup
            key={group.heading}
            heading={group.heading}
            items={group.items}
          />
        ))}
      </div>
    </section>
  );
}

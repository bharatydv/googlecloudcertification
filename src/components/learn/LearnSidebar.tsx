import Link from "next/link";
import { getPopulatedLearnCategories } from "@/lib/data/learn";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Documentation-style navigation for the learning hub. Rendered on the server
 * with the active slug passed in, so there is no client JavaScript involved.
 * On small screens it collapses into a native disclosure.
 */
export function LearnSidebar({ currentSlug }: { currentSlug?: string }) {
  const groups = getPopulatedLearnCategories();

  const nav = (
    <ul className="space-y-6">
      {groups.map((group) => (
        <li key={group.category}>
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-500">
            {group.label}
          </h2>
          <ul className="mt-2 space-y-0.5">
            {group.topics.map((topic) => {
              const active = topic.slug === currentSlug;
              return (
                <li key={topic.slug}>
                  <Link
                    href={`/learn/${topic.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-1.5 text-[0.875rem] transition-colors",
                      active
                        ? "bg-brand-50 font-medium text-brand-700"
                        : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                    )}
                  >
                    {topic.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible contents */}
      <details className="group mb-8 rounded-card border border-ink-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[0.875rem] font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <Icon name="list" className="h-4 w-4 text-ink-500" />
            Browse all topics
          </span>
          <Icon
            name="chevron-down"
            className="h-4 w-4 text-ink-400 transition-transform group-open:rotate-180"
            strokeWidth={2}
          />
        </summary>
        <div className="border-t border-ink-200 px-4 py-4">{nav}</div>
      </details>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Learning topics"
        className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2"
      >
        {nav}
      </nav>
    </>
  );
}

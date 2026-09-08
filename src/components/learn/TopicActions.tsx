"use client";

import { useEffect } from "react";
import {
  markTopicRead,
  toggleBookmark,
  useHydrated,
  useProgress,
} from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Marks a learning topic as read and offers a bookmark toggle. Both feed the
 * dashboard, which is why this exists as a small client island on an otherwise
 * fully static page.
 */
export function TopicActions({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { progress } = useProgress();
  const hydrated = useHydrated();
  const href = `/learn/${slug}`;

  // Writing to the progress store is a side effect on an external system,
  // which is exactly what an effect is for.
  useEffect(() => {
    markTopicRead(slug);
  }, [slug]);

  const bookmarked = progress.bookmarks.some((b) => b.href === href);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(href, title)}
      aria-pressed={hydrated ? bookmarked : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors",
        hydrated && bookmarked
          ? "border-brand-300 bg-brand-50 text-brand-700"
          : "border-ink-200 text-ink-600 hover:border-ink-300 hover:bg-ink-50",
      )}
    >
      <Icon
        name="bookmark"
        className="h-3.5 w-3.5"
        strokeWidth={hydrated && bookmarked ? 2.2 : 1.8}
      />
      {hydrated && bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}

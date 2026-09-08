"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Social sharing. Deliberately link-based rather than script-based: no
 * third-party tracking scripts are loaded, which keeps the page fast and
 * avoids sending reader data to networks they did not choose.
 */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard can be blocked; the share links still work. */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[0.8125rem] font-medium text-ink-600">
        Share this article
      </span>
      <ul className="flex flex-wrap gap-2">
        {targets.map((target) => (
          <li key={target.label}>
            <a
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-[0.8125rem] text-ink-600 transition-colors hover:border-ink-300 hover:bg-ink-50"
            >
              {target.label.replace("Share on ", "").replace("Share by ", "")}
              <Icon name="external" className="h-3.5 w-3.5" strokeWidth={1.8} />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-1.5 text-[0.8125rem] text-ink-600 transition-colors hover:border-ink-300 hover:bg-ink-50"
          >
            {copied ? "Copied" : "Copy link"}
            <Icon
              name={copied ? "check" : "bookmark"}
              className="h-3.5 w-3.5"
              strokeWidth={1.8}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}

import { cn } from "@/lib/utils";

/**
 * Original icon set drawn for GCP Prep.
 *
 * These are simple 24px stroke glyphs on a consistent grid. They are
 * deliberately generic geometric forms — nothing here is traced from or
 * derived from any vendor's icon library.
 */

export type IconName =
  | "search"
  | "menu"
  | "close"
  | "arrow-right"
  | "arrow-left"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "cloud"
  | "shield"
  | "database"
  | "network"
  | "chip"
  | "book"
  | "chart"
  | "spark"
  | "flag"
  | "clock"
  | "layers"
  | "target"
  | "compass"
  | "bookmark"
  | "external"
  | "info"
  | "warning"
  | "list"
  | "briefcase"
  | "graduation"
  | "terminal";

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M20 12H5m6-6-6 6 6 6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  "chevron-right": <path d="m9.5 6 6 6-6 6" />,
  cloud: (
    <>
      <path d="M7 18.5h9.5a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 6.4 9.6 3.95 3.95 0 0 0 7 18.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5c0 4.2 2.8 7.6 7 9.3 4.2-1.7 7-5.1 7-9.3v-5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v11c0 1.66 3.13 3 7 3s7-1.34 7-3v-11" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5.5" cy="18" r="2.2" />
      <circle cx="18.5" cy="18" r="2.2" />
      <path d="M12 7.2v4.3m0 0-5 4.3m5-4.3 5 4.3" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3.5v3m4-3v3m-4 14v-3m4 3v-3M3.5 10h3m-3 4h3m14-4h3m-3 4h3" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5h9a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H5Z" />
      <path d="M5 4.5v12.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6m5 6V6m5 14v-9" />
    </>
  ),
  spark: (
    <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9Z" />
  ),
  flag: (
    <>
      <path d="M6 21V4.5" />
      <path d="M6 5h11l-2 3.5 2 3.5H6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8 4-8 4-8-4Z" />
      <path d="m4 12 8 4 8-4M4 16.5l8 4 8-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2Z" />
    </>
  ),
  bookmark: <path d="M7 4.5h10v16l-5-3.6-5 3.6Z" />,
  external: (
    <>
      <path d="M14 4.5h5.5V10" />
      <path d="M19.5 4.5 12 12" />
      <path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="8" r="0.7" fill="currentColor" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4.5 3.5 19.5h17Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="16.8" r="0.7" fill="currentColor" />
    </>
  ),
  list: <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />,
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" />
      <path d="M3.5 12.5h17" />
    </>
  ),
  graduation: (
    <>
      <path d="m12 4.5 9 4-9 4-9-4Z" />
      <path d="M7 10.5v5c0 1.4 2.24 2.5 5 2.5s5-1.1 5-2.5v-5" />
    </>
  ),
  terminal: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="m7.5 9.5 3 2.5-3 2.5M13 15h4" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
  ...rest
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
} & Omit<React.SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5 shrink-0", className)}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/**
 * The GCP Prep mark.
 *
 * Three ascending bars for the three certification tiers — foundational,
 * associate, professional — brightening as they rise, with the summit in the
 * accent colour. It echoes the stacked planes in the hero illustration, and
 * the geometry is simple enough to stay legible at favicon size.
 *
 * Entirely original: no vendor letterforms, glyphs or colour system.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="8" className="fill-brand-900" />
      <rect x="8" y="18" width="4" height="6" rx="2" fill="#ffffff" opacity="0.5" />
      <rect x="14" y="13.5" width="4" height="10.5" rx="2" fill="#ffffff" opacity="0.78" />
      <rect x="20" y="9" width="4" height="15" rx="2" className="fill-brand-300" />
    </svg>
  );
}

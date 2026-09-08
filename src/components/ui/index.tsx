import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  tone = "plain",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "plain" | "subtle" | "dark";
}) {
  return (
    <section
      className={cn(
        "py-14 sm:py-18",
        tone === "subtle" && "bg-ink-50",
        tone === "dark" && "bg-brand-900 text-brand-100",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.11em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 text-[0.975rem] leading-relaxed text-ink-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "onDark";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,box-shadow,color,border-color] duration-150 disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-subtle hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-ink-200 bg-white text-ink-800 shadow-subtle hover:border-ink-300 hover:bg-ink-50",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  danger: "bg-danger-500 text-white hover:bg-danger-700",
  onDark:
    "bg-white text-brand-900 shadow-subtle hover:bg-brand-50 active:bg-brand-100",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-12 px-7 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function Card({
  className,
  children,
  interactive = false,
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
  as?: React.ElementType;
}) {
  return (
    <As
      className={cn(
        "rounded-card border border-ink-200 bg-white",
        interactive &&
          "transition-[box-shadow,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised",
        className,
      )}
    >
      {children}
    </As>
  );
}

/** A card whose whole surface is a link, with the heading as the accessible name. */
export function LinkCard({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-card border border-ink-200 bg-white transition-[box-shadow,border-color,transform] duration-150 focus-within:border-brand-400 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-raised",
        className,
      )}
    >
      {children}
      <Link href={href} className="absolute inset-0 rounded-card">
        <span className="sr-only">View</span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Badge                                                               */
/* ------------------------------------------------------------------ */

type BadgeTone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "outline";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "bg-ink-100 text-ink-700",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-50 text-danger-700",
  outline: "border border-ink-200 bg-white text-ink-600",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  icon,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
  icon?: IconName;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        badgeTones[tone],
        className,
      )}
    >
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" strokeWidth={1.8} /> : null}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

export function ProgressBar({
  value,
  label,
  className,
  tone = "brand",
}: {
  value: number;
  label?: string;
  className?: string;
  tone?: "brand" | "success";
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={className}>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-ink-200"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            tone === "brand" ? "bg-brand-500" : "bg-success-500",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

type CalloutTone = "info" | "warning" | "success" | "source";

const calloutTones: Record<
  CalloutTone,
  { wrap: string; icon: IconName; iconClass: string }
> = {
  info: {
    wrap: "border-brand-200 bg-brand-50/70 text-brand-900",
    icon: "info",
    iconClass: "text-brand-600",
  },
  warning: {
    wrap: "border-warning-200 bg-warning-50/80 text-warning-700",
    icon: "warning",
    iconClass: "text-warning-500",
  },
  success: {
    wrap: "border-success-200 bg-success-50/80 text-success-700",
    icon: "check",
    iconClass: "text-success-500",
  },
  source: {
    wrap: "border-ink-200 bg-ink-50 text-ink-700",
    icon: "external",
    iconClass: "text-ink-500",
  },
};

export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const t = calloutTones[tone];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3.5 text-[0.9rem] leading-relaxed",
        t.wrap,
        className,
      )}
    >
      <Icon name={t.icon} className={cn("mt-0.5 h-[1.15rem] w-[1.15rem]", t.iconClass)} />
      <div className="min-w-0">
        {title ? <p className="mb-1 font-semibold">{title}</p> : null}
        <div className="[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-ink-700" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="rounded transition-colors hover:text-brand-600"
                  >
                    {item.name}
                  </Link>
                  <Icon
                    name="chevron-right"
                    className="h-3.5 w-3.5 text-ink-300"
                    strokeWidth={2}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ accordion — native details/summary for accessibility            */
/* ------------------------------------------------------------------ */

export function FaqList({
  faqs,
  className,
}: {
  faqs: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-ink-200 border-y border-ink-200", className)}>
      {faqs.map((faq) => (
        <details key={faq.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded px-1 py-4 text-[0.975rem] font-medium text-ink-900 marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{faq.q}</span>
            <Icon
              name="chevron-down"
              className="mt-0.5 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180"
              strokeWidth={2}
            />
          </summary>
          <div className="px-1 pb-5 text-[0.9375rem] leading-relaxed text-ink-600">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Structured data helper                                              */
/* ------------------------------------------------------------------ */

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated from our own typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export { Icon, Logo } from "./Icon";
export type { IconName } from "./Icon";

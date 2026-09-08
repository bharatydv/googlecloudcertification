import type { LearnBlock } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Renders the structured block content used by learn topics, guides, blog
 * posts and career pages.
 *
 * Paragraph and list text supports a deliberately tiny inline syntax —
 * `**bold**` and `` `code` `` — so editorial copy stays readable in the data
 * files without pulling in a full markdown parser.
 */

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-ink-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

function Diagram({ caption, steps }: { caption: string; steps: string[] }) {
  return (
    <figure className="my-7 overflow-hidden rounded-card border border-ink-200 bg-ink-50">
      <ol className="flex flex-col gap-0 p-5 sm:p-6">
        {steps.map((step, i) => (
          <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-[0.9375rem] top-8 h-[calc(100%-1.5rem)] w-px bg-ink-300"
              />
            ) : null}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white text-[0.75rem] font-semibold text-brand-700">
              {i + 1}
            </span>
            <span className="pt-1.5 text-[0.9375rem] leading-relaxed text-ink-700">
              {inline(step, `d-${i}`)}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="border-t border-ink-200 bg-white px-5 py-3 text-[0.8125rem] text-ink-500 sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-7 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[36rem] border-collapse text-[0.9rem]">
        <thead>
          <tr className="border-b border-ink-300">
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="px-3 py-2.5 text-left align-bottom font-semibold text-ink-900"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.join("|")} className="border-b border-ink-200 align-top">
              {row.map((cell, ci) => (
                <td
                  key={`${ri}-${ci}`}
                  className={cn(
                    "px-3 py-3 leading-relaxed text-ink-600",
                    ci === 0 && "font-medium text-ink-800",
                  )}
                >
                  {inline(cell, `t-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Blocks({ blocks }: { blocks: LearnBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="my-4 leading-[1.75] text-ink-700">
                {inline(block.text, `p-${i}`)}
              </p>
            );

          case "ul":
            return (
              <ul key={i} className="my-4 space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-[1.7] text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300"
                    />
                    <span>{inline(item, `ul-${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="my-4 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-[1.7] text-ink-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[0.7rem] font-semibold text-brand-700">
                      {j + 1}
                    </span>
                    <span>{inline(item, `ol-${i}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );

          case "note":
            return (
              <aside
                key={i}
                className="my-6 flex gap-3 rounded-xl border border-brand-200 bg-brand-50/70 px-4 py-3.5"
              >
                <Icon
                  name="spark"
                  className="mt-0.5 h-[1.15rem] w-[1.15rem] text-brand-600"
                />
                <p className="text-[0.9rem] leading-relaxed text-brand-900">
                  {inline(block.text, `n-${i}`)}
                </p>
              </aside>
            );

          case "diagram":
            return <Diagram key={i} caption={block.caption} steps={block.steps} />;

          case "table":
            return <Table key={i} head={block.head} rows={block.rows} />;

          default:
            return null;
        }
      })}
    </>
  );
}

/** Renders a list of headed sections with anchor ids for the on-page nav. */
export function SectionedContent({
  sections,
}: {
  sections: { heading: string; body: LearnBlock[] }[];
}) {
  return (
    <div className="text-[1.0125rem]">
      {sections.map((section) => (
        <section key={section.heading} className="mt-10 first:mt-0">
          <h2
            id={sectionId(section.heading)}
            className="scroll-mt-28 text-[1.4rem] leading-snug"
          >
            {section.heading}
          </h2>
          <div className="mt-3">
            <Blocks blocks={section.body} />
          </div>
        </section>
      ))}
    </div>
  );
}

export function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

import { formatDate } from "@/lib/utils";
import { Breadcrumbs, Container, Section } from "@/components/ui";

/**
 * Shared shell for the legal pages so they stay visually consistent and the
 * "last updated" date is always displayed.
 */
export function LegalPage({
  title,
  path,
  updated,
  intro,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <Section className="py-10">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: title, path },
          ]}
        />
        <h1 className="text-[2rem] leading-tight sm:text-[2.3rem]">{title}</h1>
        <p className="mt-3 text-[0.8125rem] text-ink-500">
          Last updated {formatDate(updated)}
        </p>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-700">
          {intro}
        </p>
        <div className="prose-gcp mt-8">{children}</div>
      </Container>
    </Section>
  );
}

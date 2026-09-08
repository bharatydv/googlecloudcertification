import Link from "next/link";
import { ButtonLink, Container, Icon, Section } from "@/components/ui";

const destinations = [
  {
    href: "/certifications",
    title: "Certifications",
    description: "Every exam, what it covers and who it suits.",
    icon: "graduation" as const,
  },
  {
    href: "/practice-tests",
    title: "Practice Tests",
    description: "Original questions with full explanations.",
    icon: "list" as const,
  },
  {
    href: "/learn",
    title: "Learning Hub",
    description: "Cloud concepts explained in plain language.",
    icon: "book" as const,
  },
  {
    href: "/guides",
    title: "Guides",
    description: "Roadmaps, costs, study plans and career value.",
    icon: "compass" as const,
  },
];

export default function NotFound() {
  return (
    <Section className="py-16">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-brand-600">
            404
          </p>
          <h1 className="mt-3 text-[2rem] leading-tight sm:text-[2.4rem]">
            We could not find that page
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-600">
            The link may be out of date, or the page may have moved. Here are
            the places people usually want.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" size="md">
              Back to the homepage
            </ButtonLink>
            <ButtonLink href="/certifications" variant="secondary" size="md">
              Browse certifications
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {destinations.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-card border border-ink-200 bg-white p-5 transition-[box-shadow,border-color] hover:border-brand-300 hover:shadow-subtle"
              >
                <Icon name={item.icon} className="h-5 w-5 text-brand-500" />
                <h2 className="mt-3 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-700">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

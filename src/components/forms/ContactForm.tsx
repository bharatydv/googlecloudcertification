"use client";

import { useState } from "react";
import { Icon, buttonClass } from "@/components/ui";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";

const subjects = [
  "General enquiry",
  "Report a content error",
  "Suggest a topic",
  "Partnership or advertising",
  "Privacy or data request",
  "Something else",
];

/**
 * Contact form.
 *
 * There is no mail backend configured yet, so rather than silently discarding
 * a message we validate locally and hand the user a prefilled mail link. When
 * an endpoint exists, only `submit` needs to change.
 */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 20)
      next.message = "Please give us at least a couple of sentences.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(
      `[${values.subject}] ${values.name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400";

  if (status === "sent") {
    return (
      <div className="rounded-card border border-success-200 bg-success-50 p-6">
        <div className="flex gap-3">
          <Icon
            name="check"
            className="mt-0.5 h-5 w-5 shrink-0 text-success-500"
            strokeWidth={2.2}
          />
          <div>
            <p className="text-[0.9375rem] font-medium text-success-700">
              Your email client should have opened
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-success-700/90">
              If it did not, email us directly at{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium underline underline-offset-2"
              >
                {email}
              </a>
              . We read everything and reply to most messages within a few days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-[0.875rem] font-medium text-success-700 underline underline-offset-2"
            >
              Write another message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="text-[0.875rem] font-medium text-ink-800"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(field, errors.name && "border-danger-500")}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[0.8125rem] text-danger-500">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="text-[0.875rem] font-medium text-ink-800"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(field, errors.email && "border-danger-500")}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              className="mt-1.5 text-[0.8125rem] text-danger-500"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="text-[0.875rem] font-medium text-ink-800"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
          className={cn(field, "bg-white")}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-[0.875rem] font-medium text-ink-800"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(field, "resize-y", errors.message && "border-danger-500")}
          placeholder="Tell us what you need. If you are reporting an error, a link to the page helps."
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="mt-1.5 text-[0.8125rem] text-danger-500"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClass("primary", "md")}
        >
          Send message
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
        </button>
        <p className="text-[0.8125rem] text-ink-500">
          Or email{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-brand-600 underline underline-offset-2"
          >
            {email}
          </a>
        </p>
      </div>
    </form>
  );
}

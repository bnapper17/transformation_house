"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Field, inputClass } from "@/components/FormField";
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon } from "@/components/icons";
import { useMapsHref } from "@/lib/useMapsHref";
import { nextPhoneValue } from "@/lib/phone";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  LADIES_CONTACT_NAME,
  LADIES_PHONE_DISPLAY,
  LADIES_PHONE_HREF,
  MENS_CONTACT_NAME,
  MENS_PHONE_DISPLAY,
  MENS_PHONE_HREF,
} from "@/lib/contactInfo";

function ContactInfoLink({
  href,
  icon,
  label,
  sublabel,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
    >
      <span className="flex-none text-primary">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span>{label}</span>
        {sublabel && <span className="text-sm text-foreground/60">{sublabel}</span>}
      </span>
    </a>
  );
}

interface ContactFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialState: ContactFormState = { name: "", phone: "", email: "", message: "" };

export default function ContactForm() {
  const mapsHref = useMapsHref();
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or reach out using the information above."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">Contact Us</h1>
        <p className="text-foreground mb-8">
          We&rsquo;d love to hear from you. Reach out directly or send us a message below.
        </p>

        <section className="mb-10 grid gap-6 sm:grid-cols-2">
          <ContactInfoLink
            href={LADIES_PHONE_HREF}
            icon={<PhoneIcon className="h-5 w-5" />}
            label={LADIES_PHONE_DISPLAY}
            sublabel={`Ladies' Facility — ${LADIES_CONTACT_NAME}`}
          />
          <ContactInfoLink
            href={MENS_PHONE_HREF}
            icon={<PhoneIcon className="h-5 w-5" />}
            label={MENS_PHONE_DISPLAY}
            sublabel={`Men's Facility — ${MENS_CONTACT_NAME}`}
          />
          <ContactInfoLink
            href={`mailto:${CONTACT_EMAIL}`}
            icon={<MailIcon className="h-5 w-5" />}
            label={CONTACT_EMAIL}
          />
          <ContactInfoLink
            href={mapsHref}
            icon={<MapPinIcon className="h-5 w-5" />}
            label={ADDRESS_LINE_1}
            sublabel={ADDRESS_LINE_2}
            external
          />
          <ContactInfoLink
            href={FACEBOOK_URL}
            icon={<FacebookIcon className="h-5 w-5" />}
            label="Facebook"
            external
          />
        </section>

        {submitted ? (
          <div className="rounded-md border border-accent/40 p-6 text-center">
            <h2 className="text-2xl font-serif text-secondary mb-2">Message Sent</h2>
            <p className="text-foreground">
              Thank you for reaching out. We&rsquo;ll get back to you as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-serif text-secondary border-b border-accent pb-2">
              Send Us a Message
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </Field>

              <Field label="Phone Number" required>
                <input
                  type="tel"
                  required
                  placeholder="(555) 555-5555"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => update("phone", nextPhoneValue(form.phone, e.target.value))}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Message" required>
              <textarea
                required
                rows={6}
                className={inputClass}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </Field>

            {submitError && <p className="text-secondary">{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-secondary px-6 py-3 text-lg text-background hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

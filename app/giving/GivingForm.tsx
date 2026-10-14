"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { Field, inputClass } from "@/components/FormField";
import { US_STATES } from "@/lib/usStates";
import ButterfliesBg from "@/public/images/butterfies.jpg";

const PRESET_AMOUNTS = ["10", "25", "50", "100"];

interface GivingFormState {
  anonymous: boolean;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  amount: string;
}

const initialState: GivingFormState = {
  anonymous: false,
  name: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  amount: "",
};

export default function GivingForm() {
  const [form, setForm] = useState<GivingFormState>(initialState);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof GivingFormState>(key: K, value: GivingFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function selectPreset(preset: string) {
    setCustomAmount("");
    update("amount", preset);
  }

  function handleCustomAmountChange(value: string) {
    const cleaned = value.replace(/[^\d.]/g, "");
    setCustomAmount(cleaned);
    update("amount", cleaned);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");

    const amountNumber = Number(form.amount);
    if (!form.amount || !Number.isFinite(amountNumber) || amountNumber <= 0) {
      setSubmitError("Please choose or enter a donation amount.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/giving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: undefined }));
        throw new Error(error || "Request failed");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : "Something went wrong submitting your gift. Please try again, or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <Image
        src={ButterfliesBg}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover -z-20"
      />
      <div className="absolute inset-0 bg-background/85 -z-10" />

      <Header />

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">Giving</h1>
        <p className="text-foreground mb-8">
          Your generosity helps men and women find freedom through Butterfly
          Transformation House. Fields marked with{" "}
          <span className="text-secondary">*</span> are required.
        </p>

        {submitted ? (
          <div className="rounded-lg border border-accent/40 bg-background/90 backdrop-blur-md p-6 text-center shadow-lg">
            <h2 className="text-2xl font-serif text-secondary mb-2">Thank You</h2>
            <p className="text-foreground">
              Your gift means more than you know.
              {(form.email.trim() || (form.name.trim() && form.address.trim())) &&
                " We'll follow up soon."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg border border-accent/40 bg-background/90 backdrop-blur-md p-6 sm:p-8 shadow-lg"
          >
            <Field label="Donation Amount" required group>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => selectPreset(preset)}
                    className={`rounded-md border px-3 py-2 text-center transition-colors ${
                      form.amount === preset && !customAmount
                        ? "border-secondary bg-secondary text-background"
                        : "border-primary/40 text-foreground hover:border-secondary"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Other amount"
                className={`${inputClass} mt-3`}
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            </Field>

            <label className="flex items-center gap-2 text-foreground">
              <input
                type="checkbox"
                checked={form.anonymous}
                onChange={(e) => update("anonymous", e.target.checked)}
                className="accent-secondary"
              />
              Give anonymously
            </label>

            {!form.anonymous && (
              <div className="space-y-5 rounded-md border border-accent/40 p-4">
                <Field label="Name" required>
                  <input
                    type="text"
                    required={!form.anonymous}
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </Field>

                <Field label="Address" required>
                  <input
                    type="text"
                    required={!form.anonymous}
                    className={inputClass}
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="City" required>
                    <input
                      type="text"
                      required={!form.anonymous}
                      className={inputClass}
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </Field>

                  <Field label="State" required>
                    <select
                      required={!form.anonymous}
                      className={inputClass}
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Zip Code" required>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      required={!form.anonymous}
                      className={inputClass}
                      value={form.zipCode}
                      onChange={(e) =>
                        update("zipCode", e.target.value.replace(/[^\d-]/g, ""))
                      }
                    />
                  </Field>
                </div>
              </div>
            )}

            <Field label="Email">
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </Field>

            {submitError && <p className="text-secondary">{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-secondary px-6 py-3 text-lg text-background hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Give Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

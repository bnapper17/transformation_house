"use client";

import { useState } from "react";
import Header from "@/components/Header";
import type { ApplicationFormState as FormState, YN } from "@/lib/applicationTypes";
import { nextPhoneValue } from "@/lib/phone";
import { Field, inputClass } from "@/components/FormField";
import { US_STATES } from "@/lib/usStates";

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  hasDependents: "",
  dependentsCount: "",
  dependentAges: [{ id: "dep-1", age: "" }],
  drugAlcoholHistory: "",
  longestClean: "",
  onProbation: "",
  probationOfficerName: "",
  probationOfficerPhone: "",
  onMedication: "",
  medications: [{ id: "med-1", name: "" }],
  psychiatricCare: "",
  validLicense: "",
};

function YesNo({
  name,
  value,
  onChange,
  required,
}: {
  name: string;
  value: YN;
  onChange: (v: YN) => void;
  required?: boolean;
}) {
  return (
    <div className="flex gap-6">
      <label className="flex items-center gap-2 text-foreground">
        <input
          type="radio"
          name={name}
          required={required}
          checked={value === "Y"}
          onChange={() => onChange("Y")}
          className="accent-secondary"
        />
        Yes
      </label>
      <label className="flex items-center gap-2 text-foreground">
        <input
          type="radio"
          name={name}
          required={required}
          checked={value === "N"}
          onChange={() => onChange("N")}
          className="accent-secondary"
        />
        No
      </label>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-secondary hover:text-primary"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-secondary text-secondary leading-none">
        +
      </span>
      {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove"
      className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-background"
    >
      ×
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-serif text-secondary mb-4 border-b border-accent pb-2">
        {title}
      </h2>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateDependentAge(id: string, age: string) {
    setForm((f) => ({
      ...f,
      dependentAges: f.dependentAges.map((d) => (d.id === id ? { ...d, age } : d)),
    }));
  }

  function addDependent() {
    setForm((f) => ({
      ...f,
      dependentAges: [...f.dependentAges, { id: `dep-${Date.now()}`, age: "" }],
    }));
  }

  function removeDependent(id: string) {
    setForm((f) => ({
      ...f,
      dependentAges: f.dependentAges.filter((d) => d.id !== id),
    }));
  }

  function updateMedication(id: string, name: string) {
    setForm((f) => ({
      ...f,
      medications: f.medications.map((m) => (m.id === id ? { ...m, name } : m)),
    }));
  }

  function addMedication() {
    setForm((f) => ({
      ...f,
      medications: [...f.medications, { id: `med-${Date.now()}`, name: "" }],
    }));
  }

  function removeMedication(id: string) {
    setForm((f) => ({
      ...f,
      medications: f.medications.filter((m) => m.id !== id),
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      // The submit button sits at the bottom of a long form; without this the
      // much shorter confirmation view can render scrolled out of sight.
      window.scrollTo({ top: 0 });
    } catch {
      setSubmitError(
        "Something went wrong sending your application. Please try again, or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div>
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="text-3xl font-serif text-secondary mb-4">
            Application Received
          </h1>
          <p className="text-lg text-foreground">
            Thank you for submitting your application to Butterfly
            Transformation House. Our team will be in touch with you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-4xl font-serif text-secondary mb-2">
          Program Application
        </h1>
        <p className="text-foreground mb-8">
          Please complete the form below. Fields marked with{" "}
          <span className="text-secondary">*</span> are required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          <Section title="Personal Information">
            <Field label="First Name" required>
              <input
                type="text"
                required
                className={inputClass}
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
              />
            </Field>

            <Field label="Last Name" required>
              <input
                type="text"
                required
                className={inputClass}
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
              />
            </Field>

            <Field label="Email" required>
              <input
                type="email"
                required
                className={inputClass}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
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

            <Field label="Address" required>
              <input
                type="text"
                required
                className={inputClass}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </Field>

            <Field label="City" required>
              <input
                type="text"
                required
                className={inputClass}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </Field>

            <div className="space-y-5">
              <Field label="State" required>
                <select
                  required
                  className={inputClass}
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                >
                  <option value="" disabled>
                    Select a state
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
                  pattern="\d{5}(-\d{4})?"
                  maxLength={10}
                  placeholder="12345"
                  required
                  className={inputClass}
                  value={form.zipCode}
                  onChange={(e) =>
                    update("zipCode", e.target.value.replace(/[^\d-]/g, ""))
                  }
                />
              </Field>
            </div>

            <Field label="Date of Birth" required>
              <input
                type="date"
                required
                className={inputClass}
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </Field>

            <Field label="Gender" required group>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-foreground">
                  <input
                    type="radio"
                    name="gender"
                    required
                    checked={form.gender === "M"}
                    onChange={() => update("gender", "M")}
                    className="accent-secondary"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input
                    type="radio"
                    name="gender"
                    required
                    checked={form.gender === "F"}
                    onChange={() => update("gender", "F")}
                    className="accent-secondary"
                  />
                  Female
                </label>
              </div>
            </Field>

            <Field label="Marital Status" required group>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-foreground">
                  <input
                    type="radio"
                    name="maritalStatus"
                    required
                    checked={form.maritalStatus === "Single"}
                    onChange={() => update("maritalStatus", "Single")}
                    className="accent-secondary"
                  />
                  Single
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input
                    type="radio"
                    name="maritalStatus"
                    required
                    checked={form.maritalStatus === "Married"}
                    onChange={() => update("maritalStatus", "Married")}
                    className="accent-secondary"
                  />
                  Married
                </label>
              </div>
            </Field>
          </Section>

          <Section title="Dependents">
            <Field label="Do you have any dependents?" required group>
              <YesNo
                name="hasDependents"
                required
                value={form.hasDependents}
                onChange={(v) => update("hasDependents", v)}
              />
            </Field>

            {form.hasDependents === "Y" && (
              <div className="md:col-span-2 space-y-4 rounded-md border border-accent/40 p-4">
                <Field label="Number of Dependents">
                  <input
                    type="number"
                    min="0"
                    className={`${inputClass} md:w-1/3`}
                    value={form.dependentsCount}
                    onChange={(e) => update("dependentsCount", e.target.value)}
                  />
                </Field>

                <div className="space-y-3">
                  {form.dependentAges.map((dep, i) => (
                    <div key={dep.id} className="flex items-end gap-3">
                      <div className="flex-1 md:max-w-xs">
                        <Field label={`Age of Dependent ${i + 1}`}>
                          <input
                            type="number"
                            min="0"
                            className={inputClass}
                            value={dep.age}
                            onChange={(e) => updateDependentAge(dep.id, e.target.value)}
                          />
                        </Field>
                      </div>
                      {form.dependentAges.length > 1 && (
                        <RemoveButton onClick={() => removeDependent(dep.id)} />
                      )}
                    </div>
                  ))}
                  <AddButton label="Add another dependent" onClick={addDependent} />
                </div>
              </div>
            )}
          </Section>

          <Section title="Substance History">
            <div className="md:col-span-2">
              <Field label="Drug and Alcohol History" required>
                <textarea
                  required
                  rows={6}
                  className={inputClass}
                  value={form.drugAlcoholHistory}
                  onChange={(e) => update("drugAlcoholHistory", e.target.value)}
                />
              </Field>
            </div>

            <div className="space-y-5">
              <Field label="Longest Period of Time Clean">
                <input
                  type="text"
                  placeholder="e.g. 8 months"
                  className={inputClass}
                  value={form.longestClean}
                  onChange={(e) => update("longestClean", e.target.value)}
                />
              </Field>

              <Field label="Are you on Probation?" required group>
                <YesNo
                  name="onProbation"
                  required
                  value={form.onProbation}
                  onChange={(v) => update("onProbation", v)}
                />
              </Field>

              {form.onProbation === "Y" && (
                <div className="space-y-4 rounded-md border border-accent/40 p-4">
                  <Field label="Probation Officer's Name">
                    <input
                      type="text"
                      className={inputClass}
                      value={form.probationOfficerName}
                      onChange={(e) => update("probationOfficerName", e.target.value)}
                    />
                  </Field>
                  <Field label="Probation Officer's Phone Number">
                    <input
                      type="tel"
                      placeholder="(555) 555-5555"
                      className={inputClass}
                      value={form.probationOfficerPhone}
                      onChange={(e) =>
                        update(
                          "probationOfficerPhone",
                          nextPhoneValue(form.probationOfficerPhone, e.target.value)
                        )
                      }
                    />
                  </Field>
                </div>
              )}
            </div>
          </Section>

          <Section title="Medical History">
            <Field label="Are you currently on any medication?" required group>
              <YesNo
                name="onMedication"
                required
                value={form.onMedication}
                onChange={(v) => update("onMedication", v)}
              />
            </Field>

            {form.onMedication === "Y" && (
              <div className="md:col-span-2 space-y-3">
                {form.medications.map((med, i) => (
                  <div key={med.id} className="flex items-end gap-3">
                    <div className="flex-1 md:max-w-sm">
                      <Field label={`Medication ${i + 1}`}>
                        <input
                          type="text"
                          className={inputClass}
                          value={med.name}
                          onChange={(e) => updateMedication(med.id, e.target.value)}
                        />
                      </Field>
                    </div>
                    {form.medications.length > 1 && (
                      <RemoveButton onClick={() => removeMedication(med.id)} />
                    )}
                  </div>
                ))}
                <AddButton label="Add another medication" onClick={addMedication} />
              </div>
            )}

            <Field label="Have you ever had psychiatric care?" required group>
              <YesNo
                name="psychiatricCare"
                required
                value={form.psychiatricCare}
                onChange={(v) => update("psychiatricCare", v)}
              />
            </Field>
          </Section>

          <Section title="Other">
            <Field label="Do you have a valid driver's license?" required group>
              <YesNo
                name="validLicense"
                required
                value={form.validLicense}
                onChange={(v) => update("validLicense", v)}
              />
            </Field>
          </Section>

          <div className="pt-4">
            {submitError && <p className="mb-3 text-secondary">{submitError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-secondary px-6 py-3 text-lg text-background hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

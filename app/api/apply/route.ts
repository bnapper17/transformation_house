import { sendMail } from "@/lib/mailer";
import { isHoneypotFilled } from "@/lib/honeypot";
import type { ApplicationFormState } from "@/lib/applicationTypes";

function formatApplication(form: ApplicationFormState) {
  const lines: string[] = [];

  lines.push("PERSONAL INFORMATION");
  lines.push(`Name: ${form.firstName} ${form.lastName}`);
  lines.push(`Email: ${form.email}`);
  lines.push(`Phone: ${form.phone}`);
  lines.push(`Address: ${form.address}, ${form.city}, ${form.state} ${form.zipCode}`);
  lines.push(`Date of Birth: ${form.dob}`);
  lines.push(`Gender: ${form.gender}`);
  lines.push(`Marital Status: ${form.maritalStatus}`);

  lines.push("", "DEPENDENTS");
  lines.push(`Has Dependents: ${form.hasDependents}`);
  if (form.hasDependents === "Y") {
    lines.push(`Number of Dependents: ${form.dependentsCount}`);
    form.dependentAges.forEach((d, i) => lines.push(`Age of Dependent ${i + 1}: ${d.age}`));
  }

  lines.push("", "SUBSTANCE HISTORY");
  lines.push(`Drug and Alcohol History: ${form.drugAlcoholHistory}`);
  lines.push(`Longest Period of Time Clean: ${form.longestClean || "Not provided"}`);
  lines.push(`On Probation: ${form.onProbation}`);
  if (form.onProbation === "Y") {
    lines.push(`Probation Officer's Name: ${form.probationOfficerName}`);
    lines.push(`Probation Officer's Phone: ${form.probationOfficerPhone}`);
  }

  lines.push("", "MEDICAL HISTORY");
  lines.push(`On Medication: ${form.onMedication}`);
  if (form.onMedication === "Y") {
    form.medications.forEach((m, i) => lines.push(`Medication ${i + 1}: ${m.name}`));
  }
  lines.push(`Psychiatric Care: ${form.psychiatricCare}`);

  lines.push("", "OTHER");
  lines.push(`Valid Driver's License: ${form.validLicense}`);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const form = (await request.json()) as ApplicationFormState;
  // Pretend success so a bot that filled the hidden field gets no signal.
  if (isHoneypotFilled(form)) return Response.json({ ok: true });

  if (!form.firstName?.trim() || !form.lastName?.trim() || !form.email?.trim()) {
    return Response.json({ error: "Missing required application fields." }, { status: 400 });
  }

  try {
    await sendMail({
      subject: `New Program Application — ${form.firstName} ${form.lastName}`,
      text: formatApplication(form),
      replyTo: form.email,
    });
  } catch (error) {
    console.error("Failed to send application email:", error);
    return Response.json(
      { error: "Failed to send application. Please try again later." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}

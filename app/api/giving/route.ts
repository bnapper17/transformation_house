import { sendMail } from "@/lib/mailer";

interface GivingPayload {
  anonymous: boolean;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  email?: string;
  amount?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as GivingPayload;
  const { anonymous, name, address, city, state, zipCode, email, amount } = body;

  const amountNumber = Number(amount);
  if (!amount || !Number.isFinite(amountNumber) || amountNumber <= 0) {
    return Response.json({ error: "A valid donation amount is required." }, { status: 400 });
  }

  if (!anonymous && !name?.trim()) {
    return Response.json(
      { error: "Name is required unless giving anonymously." },
      { status: 400 }
    );
  }

  const lines = [
    "NOTE: This was submitted before Stripe payment processing was connected.",
    "No payment has been collected — this is a donation intent only.",
    "",
    `Amount: $${amountNumber.toFixed(2)}`,
    `Anonymous: ${anonymous ? "Yes" : "No"}`,
  ];

  if (!anonymous) {
    lines.push(
      "",
      `Name: ${name}`,
      `Address: ${address || "Not provided"}`,
      `City: ${city || "Not provided"}`,
      `State: ${state || "Not provided"}`,
      `Zip Code: ${zipCode || "Not provided"}`
    );
  }

  lines.push("", `Email: ${email?.trim() || "Not provided"}`);

  try {
    await sendMail({
      subject: `New Giving Submission — $${amountNumber.toFixed(2)}${anonymous ? " (Anonymous)" : name ? ` (${name})` : ""}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("Failed to send giving email:", error);
    return Response.json(
      { error: "Failed to submit. Please try again later." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}

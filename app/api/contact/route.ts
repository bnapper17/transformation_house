import { sendMail } from "@/lib/mailer";
import { isHoneypotFilled } from "@/lib/honeypot";

export async function POST(request: Request) {
  const body = await request.json();
  // Pretend success so a bot that filled the hidden field gets no signal.
  if (isHoneypotFilled(body)) return Response.json({ ok: true });

  const { name, phone, email, message } = body as {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Name, phone number, and message are required." },
      { status: 400 }
    );
  }

  const text = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email?.trim() || "Not provided"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    await sendMail({
      subject: `New Contact Form Submission — ${name}`,
      text,
      replyTo: email,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}

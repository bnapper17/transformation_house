import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/contactInfo";

const RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL ?? CONTACT_EMAIL;

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local."
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// `replyTo` is the visitor's address, so hitting Reply in the inbox answers
// them rather than the site's own account (which both sends and receives).
export async function sendMail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: RECIPIENT,
    replyTo: replyTo?.trim() || undefined,
    subject,
    text,
  });
}

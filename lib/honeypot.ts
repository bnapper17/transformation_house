// Name of a hidden form field that people never see or fill in. Bots that
// auto-fill every input will, so a submission with it set is dropped.
export const HONEYPOT_FIELD = "website";

export function isHoneypotFilled(body: unknown) {
  const value = (body as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}

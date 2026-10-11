export function formatDigitsAsPhone(digits: string) {
  if (digits.length < 4) return digits.length ? `(${digits}` : "";
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Deleting a punctuation character (e.g. the ")" in "(555) ") leaves the
// digit count unchanged, so re-formatting silently re-inserts it and the
// backspace appears to do nothing. Drop one more digit in that case.
export function nextPhoneValue(previous: string, raw: string) {
  const prevDigits = previous.replace(/\D/g, "");
  let digits = raw.replace(/\D/g, "").slice(0, 10);
  const deleted = raw.length < previous.length;
  if (deleted && digits.length === prevDigits.length && digits.length > 0) {
    digits = digits.slice(0, -1);
  }
  return formatDigitsAsPhone(digits);
}

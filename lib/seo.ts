export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// This deploy is for client review — content (photos, program copy) isn't
// final yet. Keep this unset until the site is ready for real public launch;
// flipping it to "true" turns on search indexing (robots.txt + meta robots).
export const SITE_IS_LIVE = process.env.NEXT_PUBLIC_SITE_IS_LIVE === "true";

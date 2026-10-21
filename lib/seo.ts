import type { Metadata } from "next";

// Canonical URLs, the sitemap and social previews all build on this, so it
// should be the production domain. VERCEL_PROJECT_PRODUCTION_URL is that
// domain on Vercel; VERCEL_URL is the per-deployment URL (a last resort).
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

// Keep this unset until the site is ready for real public launch; flipping it
// to "true" turns on search indexing (robots.txt + meta robots).
export const SITE_IS_LIVE = process.env.NEXT_PUBLIC_SITE_IS_LIVE === "true";

export const SITE_NAME = "Butterfly Transformation House";

// Shown when a page is shared (Facebook, texts, etc.).
export const SHARE_IMAGE = {
  url: "/images/goup_edit.jpg",
  width: 1816,
  height: 947,
  alt: "Residents and staff of Butterfly Transformation House",
};

// Next replaces (not merges) a parent's `openGraph`, so each page builds its
// full set here — otherwise every shared link would show the home page's
// title. `title` is the short page title; the layout's template appends the
// site name for <title>, and it's added explicitly for the share card.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      images: [SHARE_IMAGE],
    },
  };
}

// Where residents come from — Laconia is in Harrison County, a short drive
// from the Louisville metro. Used in structured data (`areaServed`); the
// visible copy on the home page names the same places.
export const SERVICE_AREAS = {
  cities: [
    "Laconia, IN",
    "Corydon, IN",
    "New Albany, IN",
    "Jeffersonville, IN",
    "Clarksville, IN",
    "Louisville, KY",
  ],
  counties: [
    "Harrison County, IN",
    "Floyd County, IN",
    "Clark County, IN",
    "Crawford County, IN",
    "Washington County, IN",
    "Meade County, KY",
  ],
  regions: ["Southern Indiana", "Kentuckiana", "Indiana", "Kentucky"],
};

// What the house offers, phrased the way people search for it. Feeds the
// structured data's service list and the keywords meta tag.
export const SERVICES = [
  "Faith-based halfway house",
  "Christian sober living home",
  "Sober living for men",
  "Sober living for women",
  "Drug and alcohol addiction recovery program",
  "Transitional recovery housing",
  "Stepping into Freedom faith-based step program",
  "Personal recovery mentorship",
  "Recovery meetings",
];

// Google ignores the keywords meta tag (rankings come from page text,
// titles and descriptions), but Bing and some directories still read it.
export const KEYWORDS = [
  "halfway house Southern Indiana",
  "sober living Southern Indiana",
  "Christian halfway house Indiana",
  "faith-based sober living",
  "faith-based addiction recovery",
  "Christian drug rehab Indiana",
  "drug and alcohol rehab Southern Indiana",
  "sober living for women Indiana",
  "sober living for men Indiana",
  "recovery house Harrison County",
  "halfway house Corydon",
  "sober living New Albany",
  "sober living Jeffersonville",
  "halfway house near Louisville",
  "sober living Louisville KY",
  "Kentuckiana recovery housing",
  "transitional housing addiction recovery",
  "Laconia Indiana",
];

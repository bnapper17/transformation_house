import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import Footer from "@/components/Footer";
import {
  KEYWORDS,
  SERVICE_AREAS,
  SERVICES,
  SHARE_IMAGE,
  SITE_IS_LIVE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import {
  ADDRESS_CITY,
  ADDRESS_LINE_1,
  ADDRESS_STATE,
  ADDRESS_ZIP,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  LADIES_PHONE_HREF,
  MENS_PHONE_HREF,
} from "@/lib/contactInfo";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
});

const DESCRIPTION =
  "Butterfly Transformation House is a faith-based, non-profit halfway house and Christian sober living home in Laconia, Indiana, offering a Christ-centered drug and alcohol recovery program for men and women across Southern Indiana and the Louisville area.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Christian Halfway House & Sober Living in Southern Indiana`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Christian Halfway House & Sober Living in Southern Indiana`,
    description: DESCRIPTION,
    url: "/",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [SHARE_IMAGE.url],
  },
  robots: SITE_IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

const structuredData = {
  "@context": "https://schema.org",
  // NGO for the non-profit, LocalBusiness so search engines treat it as a
  // place with a service area for "near me" and town-name searches.
  "@type": ["NGO", "LocalBusiness"],
  name: SITE_NAME,
  description: DESCRIPTION,
  slogan: "Helping you grow in your relationship with God and living a life free from addiction",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo_image.png`,
  image: `${SITE_URL}${SHARE_IMAGE.url}`,
  email: CONTACT_EMAIL,
  telephone: LADIES_PHONE_HREF.replace("tel:", ""),
  areaServed: [
    ...SERVICE_AREAS.cities.map((name) => ({ "@type": "City", name })),
    ...SERVICE_AREAS.counties.map((name) => ({ "@type": "AdministrativeArea", name })),
    ...SERVICE_AREAS.regions.map((name) => ({ "@type": "Place", name })),
  ],
  knowsAbout: ["Addiction recovery", "Sober living", "Christian discipleship", "Faith-based recovery"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recovery services",
    itemListElement: SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINE_1,
    addressLocality: ADDRESS_CITY,
    addressRegion: ADDRESS_STATE,
    postalCode: ADDRESS_ZIP,
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: LADIES_PHONE_HREF.replace("tel:", ""),
      contactType: "Ladies' Facility",
      areaServed: "US",
    },
    {
      "@type": "ContactPoint",
      telephone: MENS_PHONE_HREF.replace("tel:", ""),
      contactType: "Men's Facility",
      areaServed: "US",
    },
  ],
  sameAs: [FACEBOOK_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // Escaping "<" keeps a stray "</script>" in the data from closing the tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

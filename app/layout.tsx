import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_IS_LIVE } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Butterfly Transformation House | Faith-Based Halfway House & Sober Living in Laconia, IN",
    template: "%s | Butterfly Transformation House",
  },
  description:
    "Butterfly Transformation House is a faith-based, non-profit halfway house offering a Christ-centered drug and alcohol rehabilitation program for men and women in Laconia, Indiana.",
  robots: SITE_IS_LIVE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Butterfly Transformation House",
  description:
    "A faith-based, non-profit halfway house offering a Christ-centered drug and alcohol rehabilitation program for men and women.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo_image.png`,
  email: CONTACT_EMAIL,
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

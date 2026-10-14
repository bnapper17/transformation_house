"use client";

import Image from "next/image";
import logoImage from "@/public/images/logo_image.png";
import { useMapsHref } from "@/lib/useMapsHref";
import { useCurrentYear } from "@/lib/useCurrentYear";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  LADIES_CONTACT_NAME,
  LADIES_PHONE_DISPLAY,
  LADIES_PHONE_HREF,
  MENS_CONTACT_NAME,
  MENS_PHONE_DISPLAY,
  MENS_PHONE_HREF,
} from "@/lib/contactInfo";
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon } from "./icons";

// When both are given, `compactLabel` stands in for `detail`/`subDetail` below
// the `sm` breakpoint (used where the full text, like the email address, is
// too long for a phone screen). Links without a `compactLabel` always show
// their full detail.
function FooterLink({
  href,
  icon,
  compactLabel,
  detail,
  subDetail,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  compactLabel?: string;
  detail?: string;
  subDetail?: string;
  external?: boolean;
}) {
  const hasCompact = Boolean(compactLabel && detail);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center gap-3 text-white hover:text-accent transition-colors"
    >
      <span className="flex-none">{icon}</span>
      {compactLabel && <span className={hasCompact ? "sm:hidden" : ""}>{compactLabel}</span>}
      {detail && (
        <span className={`${hasCompact ? "hidden sm:flex" : "flex"} flex-col leading-tight`}>
          <span>{detail}</span>
          {subDetail && <span className="text-xs text-white/70">{subDetail}</span>}
        </span>
      )}
    </a>
  );
}

export default function Footer() {
  const mapsHref = useMapsHref();
  const year = useCurrentYear();

  return (
    <footer className="mt-auto bg-secondary text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
          <Image
            src={logoImage}
            alt=""
            sizes="56px"
            className="h-14 w-14 flex-none"
          />
          <p className="font-serif italic text-lg sm:text-xl text-white leading-snug">
            Helping you grow in your relationship with God and living a life
            free from addiction
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Contact
            </h2>
            <FooterLink
              href={LADIES_PHONE_HREF}
              icon={<PhoneIcon className="h-5 w-5" />}
              detail={LADIES_PHONE_DISPLAY}
              subDetail={`Ladies' Facility — ${LADIES_CONTACT_NAME}`}
            />
            <FooterLink
              href={MENS_PHONE_HREF}
              icon={<PhoneIcon className="h-5 w-5" />}
              detail={MENS_PHONE_DISPLAY}
              subDetail={`Men's Facility — ${MENS_CONTACT_NAME}`}
            />
            <FooterLink
              href={`mailto:${CONTACT_EMAIL}`}
              icon={<MailIcon className="h-5 w-5" />}
              compactLabel="Email"
              detail={CONTACT_EMAIL}
            />
            <FooterLink
              href={mapsHref}
              icon={<MapPinIcon className="h-5 w-5" />}
              compactLabel="Address"
              detail={ADDRESS_LINE_1}
              subDetail={ADDRESS_LINE_2}
              external
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Follow Us
            </h2>
            <FooterLink
              href={FACEBOOK_URL}
              icon={<FacebookIcon className="h-5 w-5" />}
              compactLabel="Facebook"
              external
            />
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-white/70">
          <p>&copy; {year} Butterfly Transformation House. All rights reserved.</p>
          <p className="mt-1 text-xs">Website by Ntouch Solutions</p>
        </div>
      </div>
    </footer>
  );
}

import type { NextConfig } from "next";
import { GIVING_URL } from "./lib/contactInfo";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the same network
  // (e.g. a phone at http://192.168.4.107:3000) for testing on mobile.
  allowedDevOrigins: ["192.168.4.*"],

  async redirects() {
    return [
      // Giving is handled by Vanco; old /giving links and bookmarks go straight there.
      { source: "/giving", destination: GIVING_URL, permanent: false },

      // Page URLs from the previous web.com site on this domain, so search
      // results and saved links keep working after the switch.
      { source: "/programs", destination: "/program", permanent: true },
      { source: "/contact-1", destination: "/contact", permanent: true },
      { source: "/blank", destination: "/apply", permanent: true },
    ];
  },
};

export default nextConfig;

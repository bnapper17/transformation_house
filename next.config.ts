import type { NextConfig } from "next";
import { GIVING_URL } from "./lib/contactInfo";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the same network
  // (e.g. a phone at http://192.168.4.107:3000) for testing on mobile.
  allowedDevOrigins: ["192.168.4.*"],

  // Giving is handled by Vanco; old /giving links and bookmarks go straight there.
  async redirects() {
    return [{ source: "/giving", destination: GIVING_URL, permanent: false }];
  },
};

export default nextConfig;

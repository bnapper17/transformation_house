import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the same network
  // (e.g. a phone at http://192.168.4.107:3000) for testing on mobile.
  allowedDevOrigins: ["192.168.4.*"],
};

export default nextConfig;

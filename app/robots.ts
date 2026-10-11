import type { MetadataRoute } from "next";
import { SITE_URL, SITE_IS_LIVE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_IS_LIVE) {
    // Content (photos, program copy) isn't final — keep this deploy out of
    // search results entirely until NEXT_PUBLIC_SITE_IS_LIVE is set to "true".
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

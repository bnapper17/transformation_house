import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/program", priority: 0.8 },
  { path: "/testimonies", priority: 0.8 },
  { path: "/giving", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/apply", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

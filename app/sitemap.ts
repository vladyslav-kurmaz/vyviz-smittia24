import type { MetadataRoute } from "next";
import { ALL_SEO_PATHS } from "@/lib/seo-routes";
import { SITE_URL } from "@/lib/seo-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const seoPages: MetadataRoute.Sitemap = ALL_SEO_PATHS.map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path.startsWith("vyviz-smittya-") ? 0.85 : 0.8,
  }));

  const privacy: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...home, ...seoPages, ...privacy];
}

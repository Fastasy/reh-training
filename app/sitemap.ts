import type { MetadataRoute } from "next";
import { ALL_COURSES_WITH_SLUG } from "@/lib/slugs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rehtraining.co.za";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/consulting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/medicals`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = ALL_COURSES_WITH_SLUG.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes];
}

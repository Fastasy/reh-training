import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { ALL_COURSES_WITH_SLUG } from "@/lib/slugs";
import { ALL_COURSES } from "@/lib/courses";
import { ALL_ARTICLES, articleUrl } from "@/lib/articles";

/**
 * Canonical origin. Every URL here must be the same host the pages declare as their
 * canonical (app/layout.tsx metadataBase) or Search Console reports a mismatch.
 */
const BASE = "https://www.rstlcentre.co.za";

const BUILD_TIME = new Date();

/**
 * lastmod should mean "this page's content last changed", not "we deployed". Next's
 * default of stamping every URL with the build time teaches Google to ignore the
 * field, so read the real mtime of the files that feed each route instead. Falls back
 * to the build time when the files are unreadable (the field is optional, not a lie).
 */
function newestMtime(paths: string[]): Date {
  let newest = 0;
  for (const p of paths) {
    try {
      newest = Math.max(newest, statSync(p).mtimeMs);
    } catch {
      // ignore unreadable paths
    }
  }
  if (!newest) return BUILD_TIME;
  return new Date(Math.min(newest, BUILD_TIME.getTime()));
}

// Paths stay as static literals relative to the project root: a dynamic
// path.join(process.cwd(), ...) makes Turbopack trace the entire project into the
// server bundle for this route.
const CONTENT_DIR = "lib/course-content";

/** Every JSON in lib/course-content feeds the course pages via lib/coursePages.ts. */
function contentFiles(): string[] {
  try {
    return readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => path.join(CONTENT_DIR, f));
  } catch {
    return [];
  }
}

/** Shared inputs for every course page (catalogue + content + unit standards). */
const COURSE_CONTENT = newestMtime([
  "lib/courses.ts",
  "lib/coursePages.ts",
  "lib/slugs.ts",
  "lib/delivery.ts",
  ...contentFiles(),
]);

const POPULAR = new Set(ALL_COURSES.filter((c) => c.popular).map((c) => c.name));

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      // No trailing slash: byte-identical to the canonical Next emits for "/" from
      // metadataBase, so sitemap and canonical can never drift apart.
      url: BASE,
      lastModified: newestMtime([
        "app/page.tsx",
        "components/HomeReviewsSection.tsx",
        "lib/courses.ts",
      ]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/courses`,
      lastModified: newestMtime([
        "app/courses/page.tsx",
        "components/CourseBrowser.tsx",
        "lib/courses.ts",
      ]),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/soft-skills`,
      lastModified: newestMtime(["app/soft-skills/page.tsx"]),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/medicals`,
      lastModified: newestMtime(["app/medicals/page.tsx"]),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      lastModified: newestMtime(["app/contact/page.tsx"]),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      // Article pages share one content file, so the index takes the same lastmod as its
      // pages: publishing an article means both genuinely changed.
      url: `${BASE}/articles`,
      lastModified: newestMtime(["lib/articles.ts"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 404/500, /_not-found and the /api/reviews route are deliberately absent, as are
  // /consulting and /Consulting (308 redirects to /soft-skills) and anything with a
  // query string (?category= is a client-side filter on the same page, canonical /courses).
  const courseRoutes: MetadataRoute.Sitemap = ALL_COURSES_WITH_SLUG.map((c) => ({
    url: `${BASE}/courses/${c.slug}`,
    lastModified: COURSE_CONTENT,
    changeFrequency: "monthly" as const,
    priority: POPULAR.has(c.name) ? 0.8 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ALL_ARTICLES.map((a) => ({
    url: `${BASE}${articleUrl(a)}`,
    lastModified: newestMtime(["lib/articles.ts"]),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...articleRoutes];
}

import type { NextConfig } from "next";

/** Canonical host for the rebranded site (RSTL Centre, formerly REH Safety Training). */
const CANONICAL = "https://www.rstlcentre.co.za";

/** Legacy brand domains that must 301 to the canonical domain. */
const LEGACY_HOSTS = ["rehtraining.co.za", "www.rehtraining.co.za"];

/**
 * Paths from the old Zoho site that no longer exist here. The old site published only
 * six URLs (sitemap-cms.xml + sitemap-post.xml, checked 2026-09-10): /, /contact,
 * /courses, /medicals, /Consulting and the one blog post below. Destinations are
 * absolute so a legacy URL resolves in a single hop instead of bouncing through the
 * old host first, and these rules deliberately come BEFORE the host catch-all.
 */
const LEGACY_PATHS = [
  // The old site's only blog post (2026-01-04) duplicates its Working at Heights landing
  // page and is the domain's only aged content URL, so it must not 404 after the flip.
  { source: "/blogs/post/working-at-heights", destination: `${CANONICAL}/courses/working-at-heights` },
  // The old consulting page was replaced by the soft-skills page.
  { source: "/consulting", destination: `${CANONICAL}/soft-skills` },
  { source: "/Consulting", destination: `${CANONICAL}/soft-skills` },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...LEGACY_PATHS.map((r) => ({ ...r, permanent: true })),
      // Legacy brand domain -> new canonical domain. Host-based, so it only fires
      // once rehtraining.co.za is actually pointed at this app; the vercel.app
      // preview and localhost are unaffected.
      ...LEGACY_HOSTS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      })),
      // Non-www -> www on the new domain.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "rstlcentre.co.za" }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

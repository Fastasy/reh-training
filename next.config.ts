import type { NextConfig } from "next";

/** Canonical host for the rebranded site (RSTL Centre, formerly REH Safety Training). */
const CANONICAL = "https://www.rstlcentre.co.za";

/** Legacy brand domains that must 301 to the canonical domain. */
const LEGACY_HOSTS = ["rehtraining.co.za", "www.rehtraining.co.za"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
      { source: "/consulting", destination: "/soft-skills", permanent: true },
      { source: "/Consulting", destination: "/soft-skills", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/consulting", destination: "/soft-skills", permanent: true },
      { source: "/Consulting", destination: "/soft-skills", permanent: true },
    ];
  },
};

export default nextConfig;

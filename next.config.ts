import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  // Pin the project root so a lockfile in a parent folder can never change it.
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({ isDev: process.env.NODE_ENV !== "production" }),
      },
    ];
  },
};

export default nextConfig;

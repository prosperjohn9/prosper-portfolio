import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root so a lockfile in a parent folder can never change it.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;

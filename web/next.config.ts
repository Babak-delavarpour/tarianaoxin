import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to the directory Next was launched from. Using
  // import.meta.dirname here makes Next's config loader resolve the parent
  // workspace, producing broken `web/web/node_modules` junctions on Windows.
  turbopack: { root: process.cwd() },
  experimental: {
    // react-icons ships thousands of modules per set; this keeps only the
    // icons actually referenced in the client bundle.
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;

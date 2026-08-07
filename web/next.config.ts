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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

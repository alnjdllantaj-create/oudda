import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deployable on any free static host (Cloudflare Pages, GitHub Pages...).
  // No server, no API routes, no database: every tool runs inside the visitor's browser.
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;

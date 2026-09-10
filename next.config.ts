import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Emit .next/standalone — a self-contained server.js plus only the traced
  // node_modules. The container image copies that instead of the full
  // dependency tree, which keeps it small enough to cold-start quickly on
  // Container Apps' scale-to-zero.
  output: "standalone",
};

export default nextConfig;

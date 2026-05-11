import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For development, we run as a server (not static export)
  // GitHub Pages deployment uses the GitHub Actions workflow
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

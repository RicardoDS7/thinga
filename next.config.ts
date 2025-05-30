import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/thinga",
  trailingSlash: true, // Optional but recommended for GitHub Pages
  images: {
    unoptimized: true, // 👈 required for static export
  },
};

export default nextConfig;

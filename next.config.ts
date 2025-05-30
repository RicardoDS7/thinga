import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/your-repo-name",
  trailingSlash: true, // Optional but recommended for GitHub Pages
};

export default nextConfig;

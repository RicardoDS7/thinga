import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**", // optional but allows any path
      },
    ],
  },

  experimental: {
    serverActions: {},
  },
};

export default nextConfig;

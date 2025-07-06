import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  trailingSlash: true,

  images: {
    // ✅ If you're using `next/image` and hosting external images (like from Firebase), allow them:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.firebasestorage.googleapis.com",
      },
    ],
  },

  // ✅ Optionally enable experimental features if needed
  experimental: {
    serverActions: {}, // if you're using server actions
  },
};

export default nextConfig;

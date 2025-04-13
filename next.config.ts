import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "linkstorage.linkfire.com",
        protocol: "https",
        pathname: "/medialinks/images/**",
      },
    ],
  },
};

export default nextConfig;

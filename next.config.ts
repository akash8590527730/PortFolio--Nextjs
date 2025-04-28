import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during the build process
  },
  // Add other configuration options as needed
};

export default nextConfig;

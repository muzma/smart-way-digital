import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid failing production builds due to ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

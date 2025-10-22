import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'domovrosa-api.tyvole.sk'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'api.domovrosa.sk', 'domovrosa.sk'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

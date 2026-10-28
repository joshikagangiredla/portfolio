import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Higher than the default (75) so text inside project screenshots stays crisp.
    qualities: [90],
  },
};

export default nextConfig;

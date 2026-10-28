import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the original image files as they are, without recompressing them,
    // so text and fine lines in project screenshots stay as sharp as the source.
    unoptimized: true,
  },
};

export default nextConfig;

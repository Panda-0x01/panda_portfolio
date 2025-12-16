import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
};

export default nextConfig;

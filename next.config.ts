import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  images: {
    remotePatterns: [
      // Unsplash (for high-quality stock images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      // Nike official website
      {
        protocol: 'https',
        hostname: 'static.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'secure-images.nike.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nike.com',
      },
      // Puma official website
      {
        protocol: 'https',
        hostname: 'images.puma.com',
      },
      {
        protocol: 'https',
        hostname: 'www.puma.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.puma.com',
      },
      // IndiaMART (from your URLs)
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.indiamart.com',
      },
      // SeeAndWear (from your URLs)
      {
        protocol: 'http',
        hostname: 'seeandwear.com',
      },
      {
        protocol: 'https',
        hostname: 'seeandwear.com',
      },
      // Additional shoe/fashion websites
      {
        protocol: 'https',
        hostname: 'www.adidas.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
      {
        protocol: 'https',
        hostname: 'brand.assets.adidas.com',
      },
      // Placeholder services
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;

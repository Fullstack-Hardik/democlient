import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.21st.dev',
      },
      {
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net', // For video poster or future images
      }
    ],
  },
};

export default nextConfig;

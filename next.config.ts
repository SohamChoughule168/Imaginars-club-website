import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["192.168.1.42", "localhost:3000"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "soft-zoom-63098134.figma.site" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
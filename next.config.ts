import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "img1.daumcdn.net" },
      { protocol: "https", hostname: "blog.kakaocdn.net" },
    ],
  },
};

export default nextConfig;

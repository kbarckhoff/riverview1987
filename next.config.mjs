/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    // allow photo uploads up to ~8MB through server actions
    serverActions: { bodySizeLimit: "8mb" },
  },
};

export default nextConfig;

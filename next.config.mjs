/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    serverActions: { bodySizeLimit: "8mb" },
    // Ship the static photo folders with the serverless functions that read them.
    outputFileTracingIncludes: {
      "/flashback": ["./public/gallery/**"],
      "/teachers": ["./public/teachers/**"],
    },
  },
};

export default nextConfig;

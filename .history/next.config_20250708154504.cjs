// ✅ Enhanced next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb", // or increase to 50mb if needed
    },
  },

  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  // Optional: to allow images or file URLs from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;

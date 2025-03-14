import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:1337',  // URL della tua API Strapi
  },
};

export default nextConfig;

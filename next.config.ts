import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;

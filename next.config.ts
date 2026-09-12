import type { NextConfig } from "next";
const config: NextConfig = {
  allowedDevOrigins: ["192.168.100.6"],
  images: { formats: ["image/avif", "image/webp"] },
  devIndicators: false,
};
export default config;

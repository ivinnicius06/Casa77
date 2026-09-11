import type { NextConfig } from "next";
const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  devIndicators: false,
};
export default config;

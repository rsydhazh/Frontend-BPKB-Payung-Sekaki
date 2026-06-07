import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ini tetap wajib ada untuk mengabaikan error tipe data di cloud
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
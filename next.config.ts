import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/sports-dashboard-templates",
  assetPrefix: "/sports-dashboard-templates/",
};

export default nextConfig;

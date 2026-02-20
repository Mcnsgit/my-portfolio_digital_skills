import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Use basePath only when deploying to a subpath (e.g. GitHub Pages):
  // basePath: "/my-portfolio_digital_skills",
};

export default nextConfig;

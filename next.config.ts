import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Use basePath only when deploying to a subpath (e.g. GitHub Pages):
  // basePath: "/my-portfolio_digital_skills",
};

export default nextConfig;

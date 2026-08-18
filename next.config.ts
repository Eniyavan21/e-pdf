import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack config (Next.js 16+ default)
  turbopack: {
    resolveAlias: {
      // Prevent pdfjs-dist from trying to load the optional canvas native module
      canvas: { browser: "./empty-module.js" },
    },
  },
  // Keep webpack config for environments that opt into Webpack
  webpack: (config, { isServer }) => {
    if (isServer) {
      const externals = Array.isArray(config.externals) ? config.externals : [];
      config.externals = [...externals, { canvas: "canvas" }];
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from 'path';

const config: NextConfig = {
  reactStrictMode: true,
  // Ensure output file tracing root is the project folder (helpful in monorepos)
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    // Ignore ESLint errors during production builds on Vercel where ESLint
    // may run with incompatible options; prefer failing CI locally instead.
    ignoreDuringBuilds: true,
  },
};

export default config;

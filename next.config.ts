import type { NextConfig } from "next";
import path from 'path';

const config: NextConfig = {
  reactStrictMode: true,
  // Ensure output file tracing root is the project folder (helpful in monorepos)
  outputFileTracingRoot: path.join(__dirname),
};

export default config;

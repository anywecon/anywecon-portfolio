import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Pin the tracing root to this repo: stray lockfiles in parent folders
  // (e.g. F:\Projects\package-lock.json) otherwise confuse root inference.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};
export default nextConfig;

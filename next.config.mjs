import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle (`node .next/standalone/server.js`) so the
  // site also runs outside Vercel, e.g. Docker + Caddy on a VPS.
  output: "standalone",
  images: { unoptimized: true },
  // Pin the tracing root to this repo: stray lockfiles in parent folders
  // (e.g. F:\Projects\package-lock.json) otherwise confuse root inference.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};
export default nextConfig;

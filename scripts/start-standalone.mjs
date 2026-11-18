// Cross-platform runner for the `output: "standalone"` build.
// Next.js does not copy `public/` and `.next/static/` into the standalone
// folder (a CDN is expected to serve them), so copy them before starting.
import { spawn } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");
const server = join(standalone, "server.js");

if (!existsSync(server)) {
  console.error(`[start:standalone] ${server} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const copies = [
  [join(root, "public"), join(standalone, "public")],
  [join(root, ".next", "static"), join(standalone, ".next", "static")],
];

for (const [from, to] of copies) {
  if (!existsSync(from)) continue;
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

const child = spawn(process.execPath, [server], { cwd: standalone, stdio: "inherit", env: process.env });

const forward = (signal) => {
  if (!child.killed) child.kill(signal);
};
process.on("SIGINT", forward);
process.on("SIGTERM", forward);

child.on("exit", (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});

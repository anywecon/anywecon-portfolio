import { defineConfig, devices } from "@playwright/test";
import { VERCEL_STATE_PATH } from "./e2e/global-setup";

const PORT = 3100;
const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseURL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Locally run serially: on the dev Windows box a third-party WFP firewall
  // driver makes the server's closesocket() block for ~10s whenever many
  // browser connections are aborted at once, which stalls parallel workers.
  // Override with --workers=N.
  workers: process.env.CI ? undefined : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  globalSetup: "./e2e/global-setup.ts",
  use: {
    baseURL,
    trace: "retain-on-failure",
    // Auth cookie for a protected Vercel deployment (see e2e/global-setup.ts).
    storageState: process.env.PLAYWRIGHT_VERCEL_SHARE_URL ? VERCEL_STATE_PATH : undefined,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  // Against a deployed URL (e.g. a Vercel preview) no local server is started.
  webServer: externalBaseURL
    ? undefined
    : {
        command: "npm run build && npm run start:standalone",
        url: baseURL,
        env: { PORT: String(PORT), HOSTNAME: "127.0.0.1" },
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
        stdout: "ignore",
        stderr: "pipe",
      },
});

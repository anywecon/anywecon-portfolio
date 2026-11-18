import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { request } from "@playwright/test";

export const VERCEL_STATE_PATH = "playwright/.auth/vercel-share.json";

/**
 * When PLAYWRIGHT_VERCEL_SHARE_URL is set (a protected deployment's
 * `?_vercel_share=...` link), open it once so Vercel sets its auth cookie,
 * and persist that cookie for every test context and request fixture.
 */
export default async function globalSetup(): Promise<void> {
  const shareUrl = process.env.PLAYWRIGHT_VERCEL_SHARE_URL;
  if (!shareUrl) return;

  const ctx = await request.newContext();
  try {
    const res = await ctx.get(shareUrl, { maxRedirects: 5 });
    if (res.status() >= 400) {
      throw new Error(`Vercel share link returned HTTP ${res.status()}`);
    }
    mkdirSync(dirname(VERCEL_STATE_PATH), { recursive: true });
    await ctx.storageState({ path: VERCEL_STATE_PATH });
  } finally {
    await ctx.dispose();
  }
}

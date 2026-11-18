import { expect, test } from "@playwright/test";
import { SECTION_IDS, SITE_TITLE, scrollThroughPage } from "./helpers";

test.describe("home", () => {
  test("loads with title, sections and no errors", async ({ page, baseURL }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];
    const origin = new URL(baseURL ?? "http://localhost").origin;
    const sameOrigin = (url: string): boolean => new URL(url).origin === origin;

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      // Scripts injected by the host (e.g. the Vercel preview toolbar) are not ours.
      const source = msg.location().url;
      if (source && !sameOrigin(source)) return;
      consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("requestfailed", (req) => {
      if (sameOrigin(req.url())) failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
    });
    page.on("response", (res) => {
      if (sameOrigin(res.url()) && res.status() >= 400) {
        failedRequests.push(`${res.url()} -> ${res.status()}`);
      }
    });

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(SITE_TITLE);

    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    await scrollThroughPage(page);

    expect(pageErrors, "uncaught page errors").toEqual([]);
    expect(consoleErrors, "console errors").toEqual([]);
    expect(failedRequests, "failed same-origin requests").toEqual([]);
  });
});

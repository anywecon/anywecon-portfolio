import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import { profiles, ossRepos, repoUrl } from "../lib/oss";
import { projects } from "../lib/projects";
import { isMobileProject } from "./helpers";

const CONTACT_MAILTO = "mailto:anywecon@gmail.com";

async function collectHrefs(page: Page): Promise<string[]> {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
  return [...new Set(hrefs)];
}

/** HEAD first; some hosts reject HEAD, so fall back to GET. */
async function statusOf(request: APIRequestContext, url: string): Promise<number> {
  try {
    const head = await request.head(url, { maxRedirects: 10, timeout: 20_000 });
    if (head.status() < 400) return head.status();
  } catch {
    // fall through to GET
  }
  const get = await request.get(url, { maxRedirects: 10, timeout: 30_000 });
  return get.status();
}

test("internal links and anchors resolve", async ({ page, request, baseURL }) => {
  const hrefs = await collectHrefs(page);
  const origin = new URL(baseURL ?? "http://localhost").origin;

  for (const href of hrefs) {
    if (href.startsWith("#")) {
      await expect(page.locator(href), `anchor ${href}`).toHaveCount(1);
      continue;
    }
    if (href.startsWith("mailto:")) continue;
    const url = new URL(href, origin);
    if (url.origin !== origin) continue;
    const res = await request.get(url.toString());
    expect(res.status(), url.toString()).toBeLessThan(400);
  }
});

test("contact mailto link", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#contact a[href^='mailto:']")).toHaveAttribute("href", CONTACT_MAILTO);
});

test.describe("external links", { tag: "@external" }, () => {
  test.describe.configure({ retries: 2 });

  test("respond with < 400", async ({ page, request, baseURL }, testInfo) => {
    test.skip(isMobileProject(testInfo.project.name), "checked once, in the desktop project");
    test.setTimeout(180_000);
    const origin = new URL(baseURL ?? "http://localhost").origin;
    const hrefs = await collectHrefs(page);
    const external = hrefs.filter((h) => /^https?:\/\//.test(h) && new URL(h).origin !== origin);

    // Every link the content files declare must actually be on the page.
    const expected = [
      ...projects.flatMap((p) => [p.storeUrl, p.liveUrl]),
      ...profiles.map((p) => p.url),
      ...ossRepos.flatMap((r) => [repoUrl(r), r.homepage]),
    ].filter((u): u is string => typeof u === "string");
    expect(external.sort()).toEqual([...new Set(expected)].sort());

    const failures: string[] = [];
    for (const url of external) {
      const status = await statusOf(request, url);
      if (status >= 400) failures.push(`${url} -> ${status}`);
    }
    expect(failures).toEqual([]);
  });
});

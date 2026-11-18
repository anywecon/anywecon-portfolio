import { expect, type Locator, type Page } from "@playwright/test";

export const SITE_TITLE = "Any WeCon - Freelance Developer";
export const SECTION_IDS = ["top", "work", "oss", "contact"] as const;

/** Desktop header nav links are hidden below Tailwind's `sm` breakpoint. */
export const isMobileProject = (projectName: string): boolean => projectName.startsWith("mobile");

export function shotPath(slug: string, n: number): string {
  return `/shots/${slug}/${String(n).padStart(2, "0")}.png`;
}

export function projectArticle(page: Page, name: string): Locator {
  return page.locator("#work article").filter({
    has: page.getByRole("heading", { level: 3, name, exact: true }),
  });
}

export function lightbox(page: Page): Locator {
  return page.locator("div.fixed.inset-0").filter({
    has: page.getByRole("button", { name: "Close", exact: true }),
  });
}

/**
 * Scrolls every section and card into view (so whileInView animations and
 * lazy images run) and ends at the footer.
 */
export async function scrollThroughPage(page: Page): Promise<void> {
  const blocks = page.locator("main > section, main section article, main > footer");
  const count = await blocks.count();
  for (let i = 0; i < count; i++) {
    await blocks.nth(i).scrollIntoViewIfNeeded();
  }
  await expect(page.locator("main > footer")).toBeInViewport();
}

/** Resolves once the <img> has decoded with a non-zero intrinsic width. */
export async function expectImageLoaded(img: Locator): Promise<void> {
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => (el.complete ? el.naturalWidth : 0)))
    .toBeGreaterThan(0);
}

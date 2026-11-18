import { expect, test } from "@playwright/test";
import { dict } from "../lib/i18n";
import { isMobileProject } from "./helpers";

const t = dict.en;

test("header links scroll to their sections", async ({ page }, testInfo) => {
  test.skip(isMobileProject(testInfo.project.name), "header nav links are hidden below sm");
  await page.goto("/");
  const nav = page.locator("header nav");

  for (const [id, label] of [
    ["work", t.nav.work],
    ["oss", t.nav.oss],
    ["contact", t.nav.contact],
  ] as const) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }

  await page.locator('header a[href="#top"]').click();
  await expect(page).toHaveURL(/#top$/);
  await expect(page.locator("#top h1")).toBeInViewport();
});

test("mobile: hero CTA and logo scroll to their sections", async ({ page }, testInfo) => {
  test.skip(!isMobileProject(testInfo.project.name), "mobile-only flow");
  await page.goto("/");

  await expect(page.locator('header nav a[href="#work"]')).toBeHidden();

  await page.locator("#top").getByRole("link", { name: t.hero.cta }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work h2")).toBeInViewport();

  await page.locator('header a[href="#top"]').click();
  await expect(page).toHaveURL(/#top$/);
  await expect(page.locator("#top h1")).toBeInViewport();
});

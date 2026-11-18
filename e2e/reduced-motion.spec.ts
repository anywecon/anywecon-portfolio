import { expect, test } from "@playwright/test";
import { dict } from "../lib/i18n";
import { projects } from "../lib/projects";
import { lightbox, projectArticle } from "./helpers";

const t = dict.en;

test.use({ reducedMotion: "reduce" });

test("content is visible and usable with reduced motion", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#top h1")).toContainText(t.hero.line1);
  await expect(page.locator("#top h1")).toContainText(t.hero.lineRotate[0]);
  await expect(page.locator(".custom-cursor")).toBeHidden();

  // Every animated block must end fully opaque once it has been scrolled to.
  const animated = page.locator("main [style*='opacity']");
  const count = await animated.count();
  for (let i = 0; i < count; i++) {
    const el = animated.nth(i);
    await el.scrollIntoViewIfNeeded();
    await expect(el).toHaveCSS("opacity", "1");
  }

  for (const id of ["work", "oss", "contact"]) {
    await page.locator(`#${id} h2`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} h2`)).toBeVisible();
  }

  // Still usable: lightbox and locale toggle work.
  const first = projects[0];
  const article = projectArticle(page, first.name);
  await article.scrollIntoViewIfNeeded();
  await article.getByRole("button", { name: `Open ${first.name} screenshot 1` }).click();
  await expect(lightbox(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lightbox(page)).toBeHidden();

  await page.getByRole("button", { name: "Toggle language" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "el");
  await expect(page.locator("#work h2")).toHaveText(dict.el.work.title);
});

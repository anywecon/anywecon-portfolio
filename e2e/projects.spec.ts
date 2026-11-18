import { expect, test } from "@playwright/test";
import { projects } from "../lib/projects";
import { expectImageLoaded, lightbox, projectArticle, shotPath } from "./helpers";

for (const project of projects) {
  test.describe(`project: ${project.name}`, () => {
    test("renders name, specs and stack", async ({ page }) => {
      await page.goto("/");
      const article = projectArticle(page, project.name);
      await expect(article).toHaveCount(1);
      await article.scrollIntoViewIfNeeded();
      await expect(article.getByRole("heading", { level: 3 })).toHaveText(project.name);
      await expect(article).toContainText(project.tagline.en);

      for (const spec of project.specs) {
        const cell = article.locator("div.bg-surface").filter({ hasText: spec.label.en });
        await expect(cell).toContainText(spec.value);
      }
      for (const item of project.stack) {
        // stack badges: span.rounded.border.bg-surface in the card's copy column
        await expect(
          article.locator("span.rounded.border.bg-surface").filter({ hasText: item }).first(),
        ).toBeVisible();
      }
    });

    test("every screenshot is served", async ({ request }) => {
      for (let n = 1; n <= project.shots; n++) {
        const res = await request.get(shotPath(project.slug, n));
        expect(res.status(), shotPath(project.slug, n)).toBe(200);
        expect(res.headers()["content-type"]).toContain("image/png");
      }
    });

    test("lightbox shows every screenshot and closes with Escape", async ({ page }) => {
      await page.goto("/");
      const article = projectArticle(page, project.name);
      await expect(article).toHaveCount(1);
      await article.scrollIntoViewIfNeeded();

      const firstThumb = article.getByRole("button", { name: `Open ${project.name} screenshot 1` });
      await expectImageLoaded(article.getByAltText(`${project.name} screenshot 1`));
      await firstThumb.click();

      const box = lightbox(page);
      await expect(box).toBeVisible();
      for (let n = 1; n <= project.shots; n++) {
        await expect(box).toContainText(`${project.name} · ${n} / ${project.shots}`);
        await expectImageLoaded(box.locator(`img[alt="${project.name} screenshot ${n}"]`));
        if (n < project.shots) await page.keyboard.press("ArrowRight");
      }

      await page.keyboard.press("Escape");
      await expect(box).toBeHidden();
      await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    });

    if (project.shotAspect) {
      const aspect = project.shotAspect;
      test(`uses aspect-ratio ${aspect}`, async ({ page }) => {
        await page.goto("/");
        const article = projectArticle(page, project.name);
        await expect(article).toHaveCount(1);
        await article.scrollIntoViewIfNeeded();
        const thumb = article
          .getByRole("button", { name: `Open ${project.name} screenshot 1` })
          .locator("..");
        await expect(thumb).toHaveCSS("aspect-ratio", aspect);

        await thumb.getByRole("button").click();
        const frame = lightbox(page).locator(`img[alt="${project.name} screenshot 1"]`).locator("..");
        await expect(frame).toHaveCSS("aspect-ratio", aspect);
        await page.keyboard.press("Escape");
        await expect(lightbox(page)).toBeHidden();
      });
    }
  });
}

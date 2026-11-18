import { expect, test, type Page } from "@playwright/test";
import { dict } from "../lib/i18n";
import type { Locale } from "../lib/projects";
import { isMobileProject } from "./helpers";

async function expectLocale(page: Page, locale: Locale, mobile: boolean): Promise<void> {
  const t = dict[locale];
  await expect(page.locator("html")).toHaveAttribute("lang", locale);

  const nav = page.locator("header nav");
  for (const [id, label] of [
    ["work", t.nav.work],
    ["oss", t.nav.oss],
    ["contact", t.nav.contact],
  ] as const) {
    const link = nav.locator(`a[href="#${id}"]`);
    // Header links are display:none below the sm breakpoint; their text still switches.
    await expect(link).toHaveText(label);
    if (!mobile) await expect(link).toBeVisible();
  }

  const hero = page.locator("#top");
  await expect(hero.getByText(t.hero.role)).toBeVisible();
  await expect(hero.locator("h1")).toContainText(t.hero.line1);
  await expect(hero.locator("h1")).toContainText(t.hero.line2);
  await expect(hero.getByRole("link", { name: t.hero.cta })).toBeVisible();

  await expect(page.locator("#work h2")).toHaveText(t.work.title);
  await expect(page.locator("#oss h2")).toHaveText(t.oss.title);
  await expect(page.locator("#contact h2")).toHaveText(t.contact.title);
  await expect(page.locator("footer")).toContainText(t.footer);
}

test("locale toggle switches EN <-> EL", async ({ page }, testInfo) => {
  const mobile = isMobileProject(testInfo.project.name);
  await page.goto("/");
  await expectLocale(page, "en", mobile);

  const toggle = page.getByRole("button", { name: "Toggle language" });
  await toggle.click();
  await expectLocale(page, "el", mobile);

  await toggle.click();
  await expectLocale(page, "en", mobile);
});

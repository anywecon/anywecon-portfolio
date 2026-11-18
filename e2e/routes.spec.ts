import { expect, test } from "@playwright/test";

test("/opengraph-image returns a PNG", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
  const body = await res.body();
  // PNG signature + IHDR width/height (big-endian at bytes 16..23)
  expect(body.subarray(1, 4).toString("ascii")).toBe("PNG");
  expect(body.readUInt32BE(16)).toBe(1200);
  expect(body.readUInt32BE(20)).toBe(630);
});

test("unknown route returns 404", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
});

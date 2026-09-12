import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("desktop: narrative, reversible video scrub, tabs, real contact links and metadata", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("CASA 77.");
  await page.waitForFunction(
    () => document.querySelector("video")!.readyState >= 2,
  );
  await page.waitForTimeout(1100);
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  const firstTime = await page
    .locator("video")
    .evaluate((v: HTMLVideoElement) => v.currentTime);
  const duration = await page
    .locator("video")
    .evaluate((v: HTMLVideoElement) => v.duration);
  expect(duration).toBeGreaterThan(5);
  await page.getByRole("button", { name: "Momento 2: O clube" }).click();
  await expect(page.locator(".hero-chapter").nth(1)).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect
    .poll(() =>
      page.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime),
    )
    .toBeGreaterThan(duration * 0.25);
  await page.screenshot({ path: "test-results/desktop-chapter-2.png" });
  await page.getByRole("button", { name: "Momento 4: Seu momento" }).click();
  await expect(page.locator(".hero-chapter").nth(3)).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect
    .poll(() =>
      page.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime),
    )
    .toBeGreaterThan(duration * 0.7);
  await page.screenshot({ path: "test-results/desktop-chapter-4.png" });
  await page.getByRole("button", { name: "Momento 1: Identidade" }).click();
  await expect(page.locator(".hero-chapter").nth(0)).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect
    .poll(() =>
      page.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime),
    )
    .toBeLessThan(duration * 0.2);
  expect(firstTime).toBeLessThan(0.2);
  const units = page.locator("#unidades");
  await units.scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: /Renato Gonçalves/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Rua Ruy Barbosa, 1375",
  );
  await page.getByRole("tab", { name: /Renato Gonçalves/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Avenida/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText("Ver no mapa");
  const links = await page
    .locator('a[target="_blank"]')
    .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));
  expect(links.every((url) => /^https:\/\//.test(url))).toBe(true);
  expect(links.some((url) => url.includes("55KJSXV3Q7CGP1"))).toBe(true);
  expect(links.some((url) => url.includes("onelink.to/23vzd9"))).toBe(true);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Barreiras/,
  );
  expect(errors).toEqual([]);
});

for (const viewport of [
  { width: 360, height: 780 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`layout and images ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForTimeout(1200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `test-results/hero-${viewport.width}.png` });
    for (const id of [
      "a-casa",
      "equipe",
      "unidades",
      "assinaturas",
      "avaliacoes",
      "contato",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `test-results/${id}-${viewport.width}.png`,
      });
    }
    const broken = await page
      .locator("img")
      .evaluateAll((images: HTMLImageElement[]) =>
        images
          .filter(
            (img) =>
              img.offsetParent !== null &&
              img.complete &&
              img.naturalWidth === 0,
          )
          .map((img) => img.src),
      );
    expect(broken).toEqual([]);
  });
}

test("mobile menu focus trap, closing, anchor and contextual analytics event", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Assinaturas/ })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#assinaturas/);
  await page.evaluate(() => {
    (window as unknown as { events: unknown[] }).events = [];
    window.addEventListener("casa77:analytics", (e) =>
      (window as unknown as { events: unknown[] }).events.push(
        (e as CustomEvent).detail,
      ),
    );
    document
      .querySelector("#assinaturas a")!
      .addEventListener("click", (e) => e.preventDefault());
  });
  await page.locator("#assinaturas .plan-card a").first().click();
  expect(
    await page.evaluate(() =>
      (window as unknown as { events: { event: string }[] }).events.map(
        (e) => e.event,
      ),
    ),
  ).toEqual(["whatsapp_click", "plan_interest"]);
});

test("mobile: hero follows native scroll and review controls advance", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.evaluate(() => window.scrollTo(0, innerHeight * 1.8));
  await expect(page.locator(".hero-chapter").nth(2)).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(page.locator(".hero-detail").first()).toBeVisible();

  await page.locator("#avaliacoes").scrollIntoViewIfNeeded();
  const track = page.locator("#review-track");
  await page.getByRole("button", { name: "Próxima avaliação" }).tap();
  await expect(page.locator(".review-controls span")).toHaveText("2 / 6");
  await expect
    .poll(() => track.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await track.evaluate((el) => {
    const card = el.children[2] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft, behavior: "instant" });
  });
  await expect(page.locator(".review-controls span")).toHaveText("3 / 6");
  await page.getByRole("button", { name: "Avaliação anterior" }).tap();
  await expect(page.locator(".review-controls span")).toHaveText("2 / 6");
  await context.close();
});

test("reduced motion and accessibility", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  expect(await page.locator("video").getAttribute("src")).toBeNull();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.screenshot({
    path: "test-results/reduced-motion.png",
    fullPage: true,
  });
});

test("without JavaScript, content, poster, contact and legal route remain available", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".nojs-nav")).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute(
    "poster",
    "/images/hero-poster.webp",
  );
  await expect(page.locator(".mobile-units .unit-info")).toHaveCount(3);
  await page.goto("/privacidade");
  await expect(
    page.getByRole("heading", { name: "Privacidade." }),
  ).toBeVisible();
  await context.close();
});

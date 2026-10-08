import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("renders every section a recruiter needs", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("AI products");
    for (const id of ["brief", "experience", "work", "skills", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("resume download points at the PDF", async ({ page }) => {
    const link = page.getByRole("link", { name: "Download resume" }).first();
    await expect(link).toHaveAttribute("href", "/resume.pdf");
    const response = await page.request.get("/resume.pdf");
    expect(response.ok()).toBe(true);
  });

  test("experience lists all five roles from the resume", async ({ page }) => {
    const roles = page.locator("#experience details");
    await expect(roles).toHaveCount(5);
    await expect(roles.first()).toHaveAttribute("open", "");
    await expect(page.locator("#experience")).toContainText("Appstango");
    await expect(page.locator("#experience")).toContainText("MindScript Technologies LLC");
  });

  test("project showcase switches the selected project", async ({ page }) => {
    await page.getByRole("button", { name: /Project Sentinel/ }).click();
    await expect(page.locator("#work article h3")).toHaveText("Project Sentinel");
  });

  test("archive filter narrows the list", async ({ page }) => {
    const before = await page.locator("#work h4").count();
    await page.getByRole("button", { name: "Research", exact: true }).click();
    const after = await page.locator("#work h4").count();
    expect(after).toBeGreaterThan(0);
    expect(after).toBeLessThan(before);
  });

  test("header resume button opens the viewer dialog", async ({ page }) => {
    await page.locator("header").getByRole("button", { name: "Resume" }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });

  test("chat API validates input", async ({ request }) => {
    const response = await request.post("/api/chat", { data: { message: "" } });
    expect(response.status()).toBe(400);
  });

  test("chat API answers even when the model is unavailable", async ({ request }) => {
    const response = await request.post("/api/chat", {
      data: { message: "What is Erven working on now?" },
    });
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.response).toContain("Appstango");
  });

  test("mobile layout has no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBe(0);
  });
});

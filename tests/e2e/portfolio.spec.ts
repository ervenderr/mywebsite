import { test, expect } from "@playwright/test";

test.describe("Portfolio Website Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for client-side hydration
    await page.waitForTimeout(2000);
  });

  test("all main sections render on the page", async ({ page }) => {
    // Hero section
    await expect(page.getByText("Erven Idjad", { exact: true }).first()).toBeVisible();

    // All section IDs exist
    await expect(page.locator("#about")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("header navigation links exist and are visible", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check nav links exist (desktop + mobile = 2 each, use .first())
    await expect(page.locator('header a[href="#about"]').first()).toBeAttached();
    await expect(page.locator('header a[href="#skills"]').first()).toBeAttached();
    await expect(page.locator('header a[href="#experience"]').first()).toBeAttached();
    await expect(page.locator('header a[href="#projects"]').first()).toBeAttached();
    await expect(page.locator('header a[href="#contact"]').first()).toBeAttached();
  });

  test("resume button opens modal (not download)", async ({ page }) => {
    // Ensure desktop viewport so the Resume button is visible
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);

    // Listen for any downloads - there should be none
    let downloadTriggered = false;
    page.on("download", () => {
      downloadTriggered = true;
    });

    // Click the Resume button in the header using role selector
    const resumeBtn = page.locator("header").getByRole("button", { name: "Resume" });
    await expect(resumeBtn).toBeVisible({ timeout: 5000 });
    await resumeBtn.click({ force: true });

    // Wait and check for dialog - Radix Dialog portal may use role="dialog" or data attributes
    await page.waitForTimeout(2000);

    // Try multiple selectors for the dialog
    const dialog = page.locator('[role="dialog"], [data-state="open"][data-radix-dialog-content]').first();
    await expect(dialog).toBeVisible({ timeout: 10000 });

    // Modal should have resume-related content
    await expect(dialog.getByText("Download")).toBeVisible();
    await expect(dialog.getByText("Open")).toBeVisible();

    // Verify no download was triggered
    expect(downloadTriggered).toBe(false);
  });

  test("GuestPulse project card appears in projects section", async ({
    page,
  }) => {
    // Scroll to projects section to trigger animations
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const projects = page.locator("#projects");
    await expect(
      projects.getByText("GuestPulse", { exact: false })
    ).toBeVisible({ timeout: 10000 });
  });

  test("skills section shows updated AI/ML skills", async ({ page }) => {
    // Scroll to skills section to trigger animations
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const skills = page.locator("#skills");

    // Check for AI/ML category skills - these are inside SkillBadge components
    await expect(skills.getByText("OpenAI API")).toBeVisible({
      timeout: 10000,
    });
    await expect(skills.getByText("Ollama")).toBeVisible();
    await expect(skills.getByText("LLM Integration")).toBeVisible();
    await expect(skills.getByText("Prompt Engineering")).toBeVisible();
  });

  test("experience section shows merged SparkSoft and GuestPulse roles", async ({
    page,
  }) => {
    // Scroll to experience section
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const experience = page.locator("#experience");

    // SparkSoft merged role
    await expect(
      experience.getByText("SparkSoft", { exact: false })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      experience.getByText("Jun 2024", { exact: false })
    ).toBeVisible();

    // GuestPulse freelance role
    await expect(
      experience.getByText("GuestPulse", { exact: false })
    ).toBeVisible();
    await expect(
      experience.getByText("Dec 2025", { exact: false })
    ).toBeVisible();
  });

  test("hero section displays name and role correctly", async ({ page }) => {
    await expect(page.getByText("Erven Idjad", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Software Engineer").first()).toBeVisible();
    await expect(page.getByText("Get in touch").first()).toBeVisible();
    await expect(page.getByText("View my work").first()).toBeVisible();
  });

  test("projects section shows See More and can expand", async ({ page }) => {
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const projects = page.locator("#projects");
    const seeMore = projects.getByText("See More Projects");
    await expect(seeMore).toBeVisible({ timeout: 10000 });

    // Click to expand
    await seeMore.click();
    await page.waitForTimeout(500);

    // Should now show "Show Less"
    await expect(projects.getByText("Show Less")).toBeVisible();
  });

  test("full page screenshot for visual review", async ({ page }) => {
    // Scroll slowly through the page to trigger all animations
    const sections = ["#about", "#skills", "#experience", "#projects", "#contact"];
    for (const section of sections) {
      await page.locator(section).scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "tests/e2e/artifacts/full-page.png",
      fullPage: true,
    });
  });
});

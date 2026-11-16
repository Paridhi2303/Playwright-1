import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 14']
});

test('Tablet testing', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.locator('#login-button'))
    .toBeVisible();
});
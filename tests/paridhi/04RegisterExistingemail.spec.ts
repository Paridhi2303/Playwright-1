import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

const TEST_EMAIL = 'playwright@gmail.com';

test('AE-004 - Register with an existing email', async ({ page }) => {
  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.locator('[data-qa="signup-name"]').fill('Existing User');
  await page.locator('[data-qa="signup-email"]').fill(TEST_EMAIL);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(
    page.locator('p').filter({ hasText: 'Email Address already exist!' })).toBeVisible();
});

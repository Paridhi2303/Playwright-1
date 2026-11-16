import { test, expect, Page } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

const TEST_EMAIL = 'playwright@gmail.com';
const TEST_PASSWORD = 'Test@12345';

async function login(page: Page) {
  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.locator('[data-qa="login-email"]').fill(TEST_EMAIL);
  await page.locator('[data-qa="login-password"]').fill(TEST_PASSWORD);
  await page.locator('[data-qa="login-button"]').click();

  await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toBeVisible();
}

test('AE-002 - Login with valid credentials', async ({ page }) => {
  await login(page);
  await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toBeVisible();
});

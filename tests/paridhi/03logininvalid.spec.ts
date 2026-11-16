import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-003 - Login with invalid credentials', async ({ page }) => {
  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.locator('[data-qa="login-email"]').fill('wronguser@gmail.com');
  await page.locator('[data-qa="login-password"]').fill('WrongPassword123');
  await page.locator('[data-qa="login-button"]').click();

  await expect(
    page.getByText('Your email or password is incorrect!')
  ).toBeVisible();
});

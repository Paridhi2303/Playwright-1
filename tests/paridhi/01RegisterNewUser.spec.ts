import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-001 - Register a new user', async ({ page }) => {
  const newEmail = `playwright${Date.now()}@gmail.com`;

  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  await page.locator('[data-qa="signup-name"]').fill('Playwright User');
  await page.locator('[data-qa="signup-email"]').fill(newEmail);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await page.locator('#id_gender1').check();
  await page.locator('[data-qa="password"]').fill('Test@12345');
  await page.locator('[data-qa="days"]').selectOption('10');
  await page.locator('[data-qa="months"]').selectOption('5');
  await page.locator('[data-qa="years"]').selectOption('1995');

  await page.locator('[data-qa="first_name"]').fill('Playwright');
  await page.locator('[data-qa="last_name"]').fill('User');
  await page.locator('[data-qa="address"]').fill('Salem, Tamil Nadu');
  await page.locator('[data-qa="country"]').selectOption({ label: 'India' });
  await page.locator('[data-qa="state"]').fill('Tamil Nadu');
  await page.locator('[data-qa="city"]').fill('Salem');
  await page.locator('[data-qa="zipcode"]').fill('636001');
  await page.locator('[data-qa="mobile_number"]').fill('9876543210');

  await page.locator('[data-qa="create-account"]').click();

  await expect(page.getByText('Account Created!')).toBeVisible();
});

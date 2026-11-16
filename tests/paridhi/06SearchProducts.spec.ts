import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-006 - Search for products', async ({ page }) => {
  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Products' }).click();

  await page.locator('#search_product').fill('Top');
  await page.locator('#submit_search').click();

  await expect(page.getByText('Searched Products')).toBeVisible();
  await expect(page.locator('.features_items')).toBeVisible();
});

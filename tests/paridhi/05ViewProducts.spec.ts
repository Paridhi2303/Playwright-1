import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-005 - View products and product details', async ({ page }) => {
  await page.goto(Base_URL);

  await page.getByRole('link', { name: 'Products' }).click();

  await expect(page).toHaveURL(/products/);
  await expect(page.locator('.features_items')).toBeVisible();

  await page.locator('a[href="/product_details/"]').click();

  await expect(page).toHaveURL('/products/');
  await expect(page.locator('.product-information')).toBeVisible();
  await expect(page.getByText('Availability:')).toBeVisible();
});

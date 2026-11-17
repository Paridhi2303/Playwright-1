import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-008 - Update quantity and remove product', async ({ page }) => {
  await page.goto(Base_URL);
  await page.getByRole('link', { name: 'Products' }).click();

  await page.locator('.productinfo').nth(0).locator('a.add-to-cart').click();

  await page.getByRole('link', { name: 'View Cart' }).click();

  await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(1);

await page.locator('a[href^="/product_details/"]').first().click();

  await page.locator('#quantity').fill('4');
  await page.getByRole('button', { name: 'Add to cart' }).click();

  await page.getByRole('link', { name: 'View Cart' }).click();

  const quantity = page.locator('#cart_info_table .cart_quantity button');
  console.log('Actual quantity:', await quantity.textContent());  
  await page.locator('.cart_quantity_delete').click();

  await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(0);
});

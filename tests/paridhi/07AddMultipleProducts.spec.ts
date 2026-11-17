import { test, expect } from '@playwright/test';

const Base_URL = 'https://automationexercise.com/';

test('AE-007 - Add multiple products to cart', async ({ page }) => {

    await page.goto(Base_URL);
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL(/\/products$/);

    const products = page.locator('.productinfo');

    await expect(products.nth(0)).toBeVisible();
    await products.nth(0).locator('a.add-to-cart').click();
    await expect(page.locator('#cartModal')).toBeVisible();

    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await products.nth(1).locator('a.add-to-cart').click();

    await expect(page.locator('#cartModal')).toBeVisible();

    await page.locator('#cartModal').getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/view_cart/);

    const cartRows = page.locator('#cart_info_table tbody tr');

    await expect(cartRows).toHaveCount(2);

});
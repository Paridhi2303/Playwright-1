import { test, expect } from '@playwright/test';
import config from '../testdata/config.json' with { type: 'json' };

test.describe('addtocart', () => { 

const BaseUrl = 'https://automationexercise.com';

test('add product to cart, validate message, verify via GET view_cart', async ({ page }) => {

  await page.goto(BaseUrl);
  await expect(page).toHaveTitle(/Automation Exercise/);
  await page.getByRole('link', { name: /Products/ }).click();
  await expect(page).toHaveURL(/\/products/);
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  const firstProduct = page.locator('.features_items .product-image-wrapper').first();
  const productName = (await firstProduct.locator('.productinfo p').innerText()).trim();
  const productId = await firstProduct
    .locator('.product-overlay .add-to-cart')
    .getAttribute('data-product-id');
  await firstProduct.hover();
  await firstProduct.locator('.product-overlay .add-to-cart').click();
  const modal = page.locator('#cartModal');
  await expect(modal).toBeVisible();
  await expect(modal.getByText('Added!')).toBeVisible();
  await expect(modal.getByText('Your product has been added to cart.')).toBeVisible();
  const response = await page.request.get(`${BaseUrl}/view_cart`);
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain(`id="product-${productId}"`);
  expect(html).toContain(productName);                  
});
});
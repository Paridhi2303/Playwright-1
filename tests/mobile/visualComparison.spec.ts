import { test, expect } from '@playwright/test';

test('Visual testing - Homepage', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveScreenshot('loginpage.png', {
    fullPage: true,
    animations: 'disabled'
  });

});
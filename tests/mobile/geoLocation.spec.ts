import { test, expect } from '@playwright/test';

test.use({
  geolocation: {
    latitude: 25.2048,
    longitude: 55.2708,
  },
  permissions: ['geolocation'],
});

test('Verify Dubai location', async ({ page }) => {

  await page.goto('https://www.google.com/maps');

  console.log('Dubai location configured');

});
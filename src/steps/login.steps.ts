import { expect } from "@playwright/test";
import { Given, When, Then } from "./bdd";

Given("I am on the login page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

When("I log in with {string} and {string}", async ({ page }, user: string, pass: string) => {
  await page.fill("#user-name", user);
  await page.fill("#password", pass);
  await page.click("#login-button");
});

Then("I should see the products page", async ({ page }) => {
  await expect(page).toHaveURL(/inventory/);
});

Then("I should see an error containing {string}", async ({ page }, text: string) => {
  await expect(page.locator('[data-test="error"]')).toContainText(text);
});
When(`This is now line`, () => {
    // [When] Describes the action or event that triggers the scenario.
});
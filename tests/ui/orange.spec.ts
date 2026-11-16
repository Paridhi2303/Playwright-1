import { test, expect } from "../../src/fixtures/test-fixtures";
import { TestConfig } from "../../src/config/testConfig";
import { Page } from "@playwright/test";

test.describe("OrangeHRM application login functionality", () => {
  const loginUrl = /auth\/login/;
  const dashboardUrl = /dashboard\/index/;

  const usernameInput = (page: Page) => page.getByRole("textbox", { name: "Username" });
  const passwordInput = (page: Page) => page.getByRole("textbox", { name: "Password" });
  const loginButton = (page: Page) => page.getByRole("button", { name: "Login" });
  const requiredMessages = (page: Page) => page.locator(".oxd-input-field-error-message");
  const invalidCredentialsAlert = (page: Page) => page.getByRole("alert").filter({ hasText: "Invalid credentials" });

  async function getDemoCredentials(page: Page) {
    const usernameText = await page
      .locator("//div[contains(@class,'orangehrm-demo-credentials')]/p")
      .first()
      .textContent();
    const passwordText = await page
      .locator("//div[contains(@class,'orangehrm-demo-credentials')]/p")
      .last()
      .textContent();
    const username = usernameText?.split(":")[1]?.trim() || "";
    const password = passwordText?.split(":")[1]?.trim() || "";
    return { username, password };
  }

  async function login(page: Page, username: string, password: string) {
    await usernameInput(page).fill(username);
    await passwordInput(page).fill(password);
    await loginButton(page).click();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(TestConfig.orangewebsite);
    await expect(page).toHaveURL(loginUrl);
    await expect(page).toHaveTitle("OrangeHRM");
  });

  // -------------------- Positive scenarios --------------------

  test("should display all login page elements correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(usernameInput(page)).toBeVisible();
    await expect(usernameInput(page)).toBeEditable();
    await expect(passwordInput(page)).toBeVisible();
    await expect(passwordInput(page)).toBeEditable();
    await expect(loginButton(page)).toBeVisible();
    await expect(loginButton(page)).toBeEnabled();
    await expect(page.getByText("Forgot your password?")).toBeVisible();
    await expect(page.getByAltText("company-branding")).toBeVisible();
  });

  test("should display demo credentials on the login page", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);
    await expect(page.getByText(`Username : ${username}`)).toBeVisible();
    await expect(page.getByText(`Password : ${password}`)).toBeVisible();
    expect(username.length).toBeGreaterThan(0);
    expect(password.length).toBeGreaterThan(0);
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);

    await login(page, username, password);

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.locator(".oxd-userdropdown-tab")).toBeVisible();
  });

  test("should navigate to dashboard and show user menu after valid login", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);

    await login(page, username, password);

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Info" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
  });

  test("should login successfully with case-insensitive username", async ({ page }) => {
    const { password } = await getDemoCredentials(page);

    await login(page, "admin", password);

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });

  test("should logout successfully after login", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);

    await login(page, username, password);
    await expect(page).toHaveURL(dashboardUrl);

    await page.locator(".oxd-userdropdown-tab").click();
    await page.getByRole("menuitem", { name: "Logout" }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(loginButton(page)).toBeVisible();
  });

  // -------------------- Negative scenarios --------------------

  test("should show Required validation when both fields are empty", async ({ page }) => {
    await loginButton(page).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(requiredMessages(page)).toHaveCount(2);
    await expect(requiredMessages(page).first()).toHaveText("Required");
    await expect(requiredMessages(page).last()).toHaveText("Required");
  });

  test("should show Required validation when username is empty", async ({ page }) => {
    const { password } = await getDemoCredentials(page);

    await passwordInput(page).fill(password);
    await loginButton(page).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(requiredMessages(page)).toHaveCount(1);
    await expect(requiredMessages(page)).toHaveText("Required");
  });

  test("should show Required validation when password is empty", async ({ page }) => {
    const { username } = await getDemoCredentials(page);

    await usernameInput(page).fill(username);
    await loginButton(page).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(requiredMessages(page)).toHaveCount(1);
    await expect(requiredMessages(page)).toHaveText("Required");
  });

  test("should show Invalid credentials for wrong username and wrong password", async ({ page }) => {
    await login(page, "InvalidUser", "WrongPassword");

    await expect(page).toHaveURL(loginUrl);
    await expect(invalidCredentialsAlert(page)).toBeVisible();
    await expect(invalidCredentialsAlert(page)).toHaveText("Invalid credentials");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should show Invalid credentials for valid username and wrong password", async ({ page }) => {
    const { username } = await getDemoCredentials(page);

    await login(page, username, "WrongPassword123");

    await expect(page).toHaveURL(loginUrl);
    await expect(invalidCredentialsAlert(page)).toBeVisible();
    await expect(invalidCredentialsAlert(page)).toHaveText("Invalid credentials");
  });

  test("should show Invalid credentials for wrong username and valid password", async ({ page }) => {
    const { password } = await getDemoCredentials(page);

    await login(page, "WrongUser", password);

    await expect(page).toHaveURL(loginUrl);
    await expect(invalidCredentialsAlert(page)).toBeVisible();
    await expect(invalidCredentialsAlert(page)).toHaveText("Invalid credentials");
  });

  test("should show Invalid credentials when username has leading/trailing spaces", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);

    await login(page, ` ${username} `, password);

    await expect(page).toHaveURL(loginUrl);
    await expect(invalidCredentialsAlert(page)).toBeVisible();
    await expect(invalidCredentialsAlert(page)).toHaveText("Invalid credentials");
  });

  test("should show Invalid credentials for special characters in credentials", async ({ page }) => {
    await login(page, "Admin@#$%", "pass!@#$%");

    await expect(page).toHaveURL(loginUrl);
    await expect(invalidCredentialsAlert(page)).toBeVisible();
    await expect(invalidCredentialsAlert(page)).toHaveText("Invalid credentials");
  });

  test("should remain on login page after failed login attempt", async ({ page }) => {
    await login(page, "failedUser", "failedPass");

    await expect(page).toHaveURL(loginUrl);
    await expect(usernameInput(page)).toBeVisible();
    await expect(passwordInput(page)).toBeVisible();
    await expect(loginButton(page)).toBeEnabled();
    await expect(invalidCredentialsAlert(page)).toBeVisible();
  });

  test("should allow retry after failed login and succeed with valid credentials", async ({ page }) => {
    const { username, password } = await getDemoCredentials(page);

    await login(page, "InvalidUser", "WrongPassword");
    await expect(invalidCredentialsAlert(page)).toBeVisible();

    await usernameInput(page).clear();
    await passwordInput(page).clear();
    await login(page, username, password);

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});

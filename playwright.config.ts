// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const bddTestDir = defineBddConfig({
  features: "src/features/**/*.feature",
  steps: "src/steps/**/*.ts",
});

export default defineConfig({
  timeout: 120 * 1000,
  retries: 0,
  expect: { timeout: 5000 },
  reporter: "html",

  fullyParallel: true, 
  workers: 4,        
  use: {
    headless: false,
    screenshot: "off",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
 
    {
      name: "bdd-edge",
      testDir: bddTestDir,
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "bdd-chrome",
      testDir: bddTestDir,
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "bdd-firefox",
      testDir: bddTestDir,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "bdd-webkit",
      testDir: bddTestDir,
      use: { ...devices["Desktop Safari"] },
    },

    // Existing tests, kept on Edge only
    {
      name: "legacy",
      testDir: "./tests",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
  ],
});
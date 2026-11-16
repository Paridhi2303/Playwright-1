import { test, expect } from "../../src/fixtures/demo-fixtures";
import { DemoPage } from "../../src/pages/demo.page"; 

test.describe("@web demo", () => {
  test("opens Playwright homepage and checks title", async ({ newPage,page }) => {
    console.log(await newPage.title())
    expect(newPage).toHaveTitle("New Window — Software Testing Mentor & RCV Academy")
    await newPage.getByRole('textbox',{name:'New window text input'}).fill("asif")
    await newPage.getByRole('button',{name:'Close This Window'}).click()

  });
});


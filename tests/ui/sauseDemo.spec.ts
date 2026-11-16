import {test,expect} from "@playwright/test";
import {Login} from "../../src/pages/sauseDemoLogin.page"

test.describe("sause demo website automation",()=>{
test("login authentication", async ({page}) => {
await page.goto("https://www.saucedemo.com/")

let obj=new Login(page)
await obj.login("standard_user","secret_sauce")
let actual=await page.title();
await page.goto("https://www.google.com")
await page.goto("https://www.amazon.com/")
let pgtitle=await page.title()
console.log(pgtitle)



});
});
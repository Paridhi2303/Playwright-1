import {test,expect} from '@playwright/test'

test.describe("rev store automation ",()=>{
    test("register new user in rev store ",async({page})=>{
       await page.goto("https://practice.rcvacademy.com/form-validation")
       const lastname=page.getByPlaceholder("Last name")
       await lastname.waitFor({state:'visible'})
       await page.goto("https://practice.rcvacademy.com/form-validation")
       await page.pause()
       await page.getByPlaceholder('First name').fill("asif")
       await page.keyboard.press('Tab')

    })
})
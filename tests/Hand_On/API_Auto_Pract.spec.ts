import {test,expect} from '@playwright/test'
import config from '../testdata/config.json' with { type: 'json' };

test.describe("API_Hands_On",()=>{

    test("API_Testcase_GET", async({request})=>{
        const response=await request.get(`${config.API_Hands.Base_URL}${config.API_Hands.End_Point}`)
        expect(response.status()).toBe(200)
        const body=await response.json()
        const product = body.products
        expect(product[0].name).toBe('Blue Top')
        expect(product[1].price).toBe('Rs. 400')
    })

    test("API_Testcase_POST", async({request})=>{
        const reqbody = {
            name: "Udhaya Test",
            email: `udhaya.test.${Date.now()}@example.com`,
            password: "TestPass123",
            title: "Mr",
            birth_date: "15",
            birth_month: "June",
            birth_year: "1996",
            firstname: "Udhaya",
            lastname: "Test",
            company: "QA Company",
            address1: "123 Main Street",
            address2: "Suite 100",
            country: "India",
            zipcode: "560001",
            state: "Karnataka",
            city: "Bangalore",
            mobile_number: "9876543210"
        }
        const response = await request.post(`${config.API_Hands.Base_URL}/api/createAccount`, {form: reqbody})
        const body = await response.json()
        expect(body.responseCode).toBe(201)
        expect(body.message).toBe("User created!")
    })
})
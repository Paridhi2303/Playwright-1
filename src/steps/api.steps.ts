import { expect } from "@playwright/test";
import { When, Then } from "./bdd";
import config from "../../tests/testdata/config.json" with { type: "json" };

When("I send a GET request to the products list endpoint", async ({ request }) => {
  const response = await request.get(`${config.API_Hands.Base_URL}${config.API_Hands.End_Point}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  const product = body.products;
  expect(product[0].name).toBe("Blue Top");
  expect(product[1].price).toBe("Rs. 400");
});

Then("the first product name should be {string}", async ({ request }, name: string) => {
  const response = await request.get(`${config.API_Hands.Base_URL}${config.API_Hands.End_Point}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  const product = body.products;
  expect(product[0].name).toBe(name);
});

Then("the second product price should be {string}", async ({ request }, price: string) => {
  const response = await request.get(`${config.API_Hands.Base_URL}${config.API_Hands.End_Point}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  const product = body.products;
  expect(product[1].price).toBe(price);
});

When("I send a POST request to create a user account", async ({ request }) => {
  const reqbody = {
    name: "Udhaya_Test",
    email: `udhaya.test123.${Date.now()}@example.com`,
    password: "TestPass12345",
    title: "Mr",
    birth_date: "15",
    birth_month: "June",
    birth_year: "1990",
    firstname: "Udhaya",
    lastname: "Test",
    company: "QA Company",
    address1: "123 Main Street",
    address2: "Suite 100",
    country: "India",
    zipcode: "560001",
    state: "Karnataka",
    city: "Bangalore",
    mobile_number: "9876543210",
  };
  const response = await request.post(`${config.API_Hands.Base_URL}/api/createAccount`, { form: reqbody });
  const body = await response.json();
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe("User created!");
});

Then("the response message should be {string}", async ({ request }, message: string) => {
  const reqbody = {
    name: "Udhaya_Test",
    email: `udhaya.test123.${Date.now()}@example.com`,
    password: "TestPass12345",
    title: "Mr",
    birth_date: "15",
    birth_month: "June",
    birth_year: "1990",
    firstname: "Udhaya",
    lastname: "Test",
    company: "QA Company",
    address1: "123 Main Street",
    address2: "Suite 100",
    country: "India",
    zipcode: "560001",
    state: "Karnataka",
    city: "Bangalore",
    mobile_number: "9876543210",
  };
  const response = await request.post(`${config.API_Hands.Base_URL}/api/createAccount`, { form: reqbody });
  const body = await response.json();
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe(message);
});

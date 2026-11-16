// Generated from: src\features\api.feature
import { test } from "playwright-bdd";

test.describe('API_Hands_On', () => {

  test('API_Testcase_GET', async ({ When, Then, And, request }) => { 
    await When('I send a GET request to the products list endpoint', null, { request }); 
    await Then('the first product name should be "Blue Top"', null, { request }); 
    await And('the second product price should be "Rs. 400"', null, { request }); 
  });

  test('API_Testcase_POST', async ({ When, Then, request }) => { 
    await When('I send a POST request to create a user account', null, { request }); 
    await Then('the response message should be "User created!"', null, { request }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\api.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When I send a GET request to the products list endpoint","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then the first product name should be \"Blue Top\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Blue Top\"","children":[{"start":34,"value":"Blue Top","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"And the second product price should be \"Rs. 400\"","stepMatchArguments":[{"group":{"start":35,"value":"\"Rs. 400\"","children":[{"start":36,"value":"Rs. 400","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I send a POST request to create a user account","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the response message should be \"User created!\"","stepMatchArguments":[{"group":{"start":31,"value":"\"User created!\"","children":[{"start":32,"value":"User created!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end
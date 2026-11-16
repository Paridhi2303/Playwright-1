// Generated from: src\features\login.feature
import { test } from "playwright-bdd";

test.describe('Sauce Demo login', () => {

  test('Successful login', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I log in with "standard_user" and "secret_sauce"', null, { page }); 
    await Then('I should see the products page', null, { page }); 
  });

  test('Locked out user', async ({ Given, When, Then, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I log in with "locked_out_user" and "secret_sauce"', null, { page }); 
    await Then('I should see an error containing "locked out"', null, { page }); 
  });

  test('login with invalid users', async ({ Given, When, Then, And, page }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I log in with "locked_out_u323r" and "secret_sauce"', null, { page }); 
    await And('This is now line'); 
    await Then('I should see an error containing "Epic sadface: Username and password do not match any user in this service"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I log in with \"standard_user\" and \"secret_sauce\"","stepMatchArguments":[{"group":{"start":14,"value":"\"standard_user\"","children":[{"start":15,"value":"standard_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":34,"value":"\"secret_sauce\"","children":[{"start":35,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the products page","stepMatchArguments":[]}]},
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I log in with \"locked_out_user\" and \"secret_sauce\"","stepMatchArguments":[{"group":{"start":14,"value":"\"locked_out_user\"","children":[{"start":15,"value":"locked_out_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":36,"value":"\"secret_sauce\"","children":[{"start":37,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should see an error containing \"locked out\"","stepMatchArguments":[{"group":{"start":33,"value":"\"locked out\"","children":[{"start":34,"value":"locked out","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I log in with \"locked_out_u323r\" and \"secret_sauce\"","stepMatchArguments":[{"group":{"start":14,"value":"\"locked_out_u323r\"","children":[{"start":15,"value":"locked_out_u323r","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"\"secret_sauce\"","children":[{"start":38,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And This is now line","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then I should see an error containing \"Epic sadface: Username and password do not match any user in this service\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Epic sadface: Username and password do not match any user in this service\"","children":[{"start":34,"value":"Epic sadface: Username and password do not match any user in this service","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end
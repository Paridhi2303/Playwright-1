Feature: Sauce Demo login

  Scenario: Successful login
    Given I am on the login page
    When I log in with "standard_user" and "secret_sauce"
    Then I should see the products page

  Scenario: Locked out user
    Given I am on the login page
    When I log in with "locked_out_user" and "secret_sauce"
    Then I should see an error containing "locked out"

    Scenario: login with invalid users
    Given I am on the login page
    When I log in with "locked_out_u323r" and "secret_sauce"
    And This is now line
    Then I should see an error containing "Epic sadface: Username and password do not match any user in this service"
 

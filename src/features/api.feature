Feature: API_Hands_On

  Scenario: API_Testcase_GET
    When I send a GET request to the products list endpoint
    Then the first product name should be "Blue Top"
    And the second product price should be "Rs. 400"

  Scenario: API_Testcase_POST
    When I send a POST request to create a user account
    Then the response message should be "User created!"

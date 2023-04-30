Feature: Login with PODS

  Scenario: Successful login
    Given I am on the login page
    When I click on the providers box
    And I select login.inrupt as my Identity Provider
    And I click the login button
    Then I should be redirected to the dashboard page

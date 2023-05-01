Feature: Login with PODS

  Scenario: Successful login
    Given I am on the login page
    When I click on the providers box
    And I select solid.community as my Identity Provider
    And I click the login button
    Then I should be redirected to the dashboard page
    When I write my user and password
    Then I should be redirected to the home page

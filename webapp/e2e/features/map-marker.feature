Feature: Map interactions

  Scenario: Double clicking on the map should create a marker
    Given I am on the Map page
    When I double click on the map
    Then I should see a marker on the map
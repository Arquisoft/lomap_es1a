Feature: Adding map markers
  As a user
  I want to add a marker on the map
  So that I can mark a specific location

  Scenario: Adding a marker
    Given I am on the map page
    When I click on the map at location (x, y)
    Then a marker should be shown on the map at location (x, y)

Feature: Navegación en la página principal
  Como un usuario
  Quiero poder navegar a las diferentes secciones de la página principal
  Para encontrar información relevante

  Scenario: Navegar por las diferentes secciones
    Given Estoy en la página principal
    When hago clic en Map
    Then debería ir a la pagina principal
    When hago clic en account
    Then debería estar en la sección Account
    When hago clic en Friends
    Then debería estar en la sección Friends
    When hago clic en About
    Then debería estar en la sección About

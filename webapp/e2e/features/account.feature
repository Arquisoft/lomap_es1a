Feature: Navegación en la página principal
  Como un usuario
  Quiero poder ver el account
  Para ver mi cuenta

  Scenario: Navegar por la seccion de Account
    Given Estoy en la página principal
    When Hago clic en el icono de Account
    Then Debería ir a la pagina de Account
    
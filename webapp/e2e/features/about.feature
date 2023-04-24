Feature: Navegación en la página principal
  Como un usuario
  Quiero poder ver el about
  Para ver la informacion

  Scenario: Navegar por la seccion de about
    Given Estoy en la página principal
    When Hago clic en el icono de About
    Then Debería ir a la pagina de About
    
Feature: Navegación en la página principal
  Como un usuario
  Quiero poder ver mis amigos
  Para ver quienes son

  Scenario: Navegar por la seccion de Friends
    Given Estoy en la página principal
    When Hago clic en el icono de Friends
    Then Debería ir a la pagina de Friends
    
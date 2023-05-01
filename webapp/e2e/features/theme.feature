Feature: Cambiar el Theme
  Como un usuario
  Quiero cambiar la apariencia del mapa
  Para ver el mapa con otro theme

  Scenario: Cambiar la apariencia
    Given Estoy en la página principal
    When Hago clic en el boton de cambio de apariencia
    Then Debería cambiar la apariencia

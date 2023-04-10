Feature: Inicio de sesión con PODs

  Como usuario
  Quiero poder iniciar sesión en el sitio utilizando PODs
  Para poder acceder a mi información personal y hacer uso de las funcionalidades del sitio

  Background:
    Given que el usuario está en la página de inicio de sesión

  Scenario: Inicio de sesión exitoso con credenciales válidas
    When el usuario ingresa sus credenciales válidas y presiona el botón de inicio de sesión
    Then el usuario debe ser redirigido a la página de inicio

  Scenario: Inicio de sesión fallido con credenciales inválidas
    When el usuario ingresa sus credenciales inválidas y presiona el botón de inicio de sesión
    Then el usuario debe ver un mensaje de error

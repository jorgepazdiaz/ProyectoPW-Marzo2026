Feature: Login

  
  Scenario: Crear Cuenta
    Given el usuario ingresa a la página de Mercado Prueba
    When da click en crear cuenta
    And ingresa los datos de cliente
    Then da click en el boton crear cuenta
    And el usuario visualiza un mensaje de creado con exito

    @smoke @login
    Scenario: Login exitoso
    Given el usuario ingresa a la página de Mercado Prueba
    When ingresar usuario y contraseña
    And da click en ingresar
    Then el usuario visualiza el mensaje de bienvenida
    



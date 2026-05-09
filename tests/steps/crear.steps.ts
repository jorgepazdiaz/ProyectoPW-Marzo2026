import { Given, When,Then } from '@cucumber/cucumber';
import { CrearPage } from '../pages/CrearPage';

Given('el usuario ingresa a la página de Mercado Prueba', async function () {
  this.Page = new CrearPage(this.page);
  await this.Page.goto();
});

When('da click en crear cuenta', async function () {
  await this.Page.ClickBoton();
});

When('ingresa los datos de cliente', async function () {
  await this.Page.IngresarDatos();
});

Then('da click en el boton crear cuenta', async function () {
  await this.Page.btnCrear();
});

Then('el usuario visualiza un mensaje de creado con exito', async function () {
  await this.Page.ValidarCreacion();
});
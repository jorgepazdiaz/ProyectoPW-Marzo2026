import { Given, When,Then } from '@cucumber/cucumber';
//import { CrearPage } from '../pages/CrearPage';
import { LoginPage } from '../pages/LoginPage';


When('ingresar usuario y contraseña', async function () {
    this.Page = new LoginPage(this.page);
  await this.Page.IngresaDatosLogin();
  
});

When('da click en ingresar', async function () {
    
  
});

Then('el usuario visualiza el mensaje de bienvenida', async function () {
    
  await this.Page.IngresaDatosLogin();
  
});






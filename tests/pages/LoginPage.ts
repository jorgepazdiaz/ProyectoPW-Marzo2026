import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

     async IngresaDatosLogin() {
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox', { name: 'Correo electrónico o teléfono' }).fill('jorge@test.com');
        await this.page.getByRole('textbox', { name: 'Contraseña' }).fill('1234abcd');
    }

     async ClickIngresar() {
        await this.page.getByRole('button', { name: 'Ingresar' }).click();
    }

     async ValidarMensajeBienvenida() {
        await this.page.waitForLoadState();
        await this.page.getByRole('heading', { name: '¡Bienvenido de nuevo!' }).textContent().then(text => {console.log(text);});
     }      
}




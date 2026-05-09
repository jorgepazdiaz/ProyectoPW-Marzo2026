import { Page, expect } from '@playwright/test';

export class CrearPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://physician-oxygen-literary-classroom.trycloudflare.com');
  }

  async ClickBoton() {
        await this.page.waitForLoadState();
        await this.page.getByRole('main').getByRole('link', { name: 'Crear cuenta' }).click();
  }

  async IngresarDatos(user: string, pass: string) {
        await this.page.getByRole('textbox', { name: 'Nombre/s' }).fill('Jorge');
        await this.page.getByRole('textbox', { name: 'Apellido' }).fill('Paz');
        await this.page.getByRole('textbox', { name: 'Correo electrónico' }).fill('jorgepazdiaz@gmail.com');
        await this.page.getByRole('textbox', { name: 'Teléfono celular' }).fill('935404484');
        await this.page.getByRole('textbox', { name: 'Contraseña' }).fill('pepitodelpiano2026');

  }

  async btnCrear() {
    await this.page.getByRole('button', { name: 'Crear cuenta' }).click();
  }

  async ValidarCreacion() {
    await this.page.waitForLoadState();
        await this.page.getByRole('heading', { name: '¡Creado con éxito!' }).textContent().then(text => {console.log(text);});
    }   
} 
---
name: playwright-bdd-conventions
description: "Convenciones y patrones para pruebas Playwright+Cucumber BDD en MercadoPrueba"
applyTo: "tests/**/*.{ts,feature}"
---

# Convenciones Playwright + Cucumber BDD

Este documento define estándares, patrones y mejores prácticas para todo el código de tests en Proyecto3.

## Estructura de carpetas

```
tests/
├── features/          # Escenarios Gherkin (.feature)
├── pages/             # Page Object Models (POM) — un archivo por pantalla
├── steps/             # Step definitions — agrupa steps relacionados
├── hooks/             # Before/After global (setup/teardown)
├── support/           # world.ts — contexto compartido
└── data/              # users.json, fixtures, etc.
```

## Convenciones de nombres

### Features (.feature)

```gherkin
# ✅ CORRECTO
Feature: Crear Cuenta en MercadoPrueba
Feature: Login y autenticación
Feature: Carrito de compras

# ❌ EVITAR
Feature: Test
Feature: crear_cuenta
Feature: Feature1
```

### Page Objects

```typescript
// ✅ CORRECTO: NombrePage.ts (PascalCase)
export class LoginPage { }
export class CheckoutPage { }
export class ProfilePage { }

// ❌ EVITAR
export class loginPage { }
export class login_page { }
export class LoginPageHelper { }
```

### Steps

```typescript
// ✅ CORRECTO: nombre.steps.ts (kebab-case)
// login.steps.ts
// checkout.steps.ts
// profile.steps.ts

// ❌ EVITAR
// LoginSteps.ts
// stepsdefinition.ts
// AllSteps.ts
```

## Patrones de código

### Page Object Model

```typescript
// ✅ CORRECTO
import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://physician-oxygen-literary-classroom.trycloudflare.com');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('Correo electrónico').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByLabel('Contraseña').fill(password);
  }

  async clickLogin() {
    await this.page.getByRole('button', { name: 'Ingresar' }).click();
  }

  async validateWelcomeMessage() {
    await expect(this.page.getByText('¡Bienvenido!')).toBeVisible();
  }
}

// ❌ EVITAR
export class LoginPage {
  page: any; // Sin tipado
  
  async test() { } // Métodos genéricos
  
  validate = async () => { } // Arrow functions sin context
}
```

### Step Definitions

```typescript
// ✅ CORRECTO
import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';

Given('el usuario está en la página de login', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('ingresa su email {string}', async function (email: string) {
  await this.loginPage.fillEmail(email);
});

Then('debería ver el mensaje de bienvenida', async function () {
  await this.loginPage.validateWelcomeMessage();
});

// ❌ EVITAR
Given('login', async function () { }) // Demasiado genérico
Given('el usuario ingresa al login', async function () { // Confunde with/Given
  await this.page.goto('url'); // Lógica UI en steps
});
Then('todo ok', async function () { }) // No descriptivo
```

### Features (.feature)

```gherkin
# ✅ CORRECTO: Given ↔ estado inicial, When ↔ acción, Then ↔ resultado
Feature: Autenticación de usuarios

  Background:
    Given el usuario está en la página de login

  @smoke @login
  Scenario: Login exitoso con credenciales válidas
    When ingresa el email "usuario@test.com"
    And ingresa la contraseña "pass123"
    And hace clic en "Ingresar"
    Then debería ver el mensaje "¡Bienvenido!"

  @login
  Scenario: Login fallido con credenciales inválidas
    When ingresa el email "invalido@test.com"
    And ingresa la contraseña "wrongpass"
    And hace clic en "Ingresar"
    Then debería ver el error "Credenciales inválidas"

# ❌ EVITAR
Feature: Login
  
  Scenario: Test login
    Given voy a login
    When hago login
    Then todo funciona
```

## Tags

Usa tags para categorizar y filtrar tests:

| Tag | Uso | Ejecutar con |
|-----|-----|-------------|
| `@smoke` | Tests críticos rápidos | `npm run test:smoke` |
| `@login` | Flujo de autenticación | `npm run test:login` |
| `@checkout` | Flujo de compra | `npm run test:checkout` |
| `@regression` | Tests de regresión | `npm run test:regression` |
| `@wip` | Work in Progress (skip) | Usar con `not @wip` |
| `@slow` | Tests lentos (evitar CI) | - |

**Siempre mínimo 1 tag por escenario**, preferiblemente 2:

```gherkin
@smoke @login
Scenario: Login exitoso
```

## Locators y selectores

### Orden de preferencia

```typescript
// 1️⃣ getByRole — MEJOR (accesible, resiliente)
await this.page.getByRole('button', { name: 'Enviar' }).click();
await this.page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');

// 2️⃣ getByLabel — MUY BUENO (forma y labels)
await this.page.getByLabel('Contraseña').fill('pass');

// 3️⃣ getByPlaceholder
await this.page.getByPlaceholder('Enter email').fill('test@test.com');

// 4️⃣ getByTestId — BUENO si el HTML tiene data-testid
await this.page.getByTestId('submit-button').click();

// 5️⃣ CSS Selector — último recurso
await this.page.locator('#main-button').click();

// ❌ EVITAR: XPath, selectores genéricos
await this.page.locator('//button[text()="Click me"]').click();
await this.page.locator('div > div > button').click();
```

## Waits y timeouts

```typescript
// ✅ CORRECTO: Confía en Playwright
await this.page.goto('url'); // Auto-espera domcontentloaded
await this.page.getByRole('button').click(); // Auto-espera que esté visible
await this.page.waitForLoadState('networkidle'); // Si necesitas esperar red

// ❌ EVITAR
await this.page.waitForTimeout(2000); // No uses sleep
await new Promise(r => setTimeout(r, 3000)); // Timing frágil
this.page.goto('url', { waitUntil: 'load' }); // Es el default
```

## Manejo de datos

```typescript
// ✅ CORRECTO: Datos en tests/data/users.json
import users from '../data/users.json';

Given('un usuario válido', async function () {
  this.user = users.validUser;
});

// ✅ Datos en variables de entorno
const email = process.env.TEST_EMAIL || 'default@test.com';

// ❌ EVITAR
const email = 'hardcoded@test.com'; // Credenciales hardcodeadas
const password = 'password123'; // Secretos en código
```

## Validaciones

```typescript
// ✅ CORRECTO: Usa Playwright assertions
import { expect } from '@playwright/test';

await expect(this.page.getByText('Success')).toBeVisible();
await expect(this.page.locator('input')).toHaveValue('expected');
await expect(this.page).toHaveTitle('Page Title');

// ❌ EVITAR
if (!await this.page.locator('button').isVisible()) {
  throw new Error('Button not visible'); // Error manual
}
```

## Asincronía y errores

```typescript
// ✅ CORRECTO: Usa async/await consistentemente
async clickButton() {
  await this.page.getByRole('button').click();
  await this.page.waitForLoadState();
}

// ✅ Manejo de errores explícito si es necesario
async fillFormSafely() {
  try {
    await this.page.getByLabel('Email').fill('test@test.com');
  } catch (error) {
    console.error('Fill failed:', error.message);
    throw error;
  }
}

// ❌ EVITAR
clickButton() { // Falta async
  this.page.getByRole('button').click(); // No await
}

// ❌ Promesas sin await
async test() {
  this.page.goto('url'); // FALTA await
  this.page.click('button'); // FALTA await
}
```

## Hooks y ciclo de vida

```typescript
// ✅ CORRECTO: hooks.ts maneja setup/teardown global
// Todos los tests automáticamente:
// - Abren browser + context + page en Before
// - Cierran todo en After
// - No necesitas crear browser en cada test

// Por escenario, puedes agregar lógica:
Before(async function (scenario) {
  console.log(`Starting: ${scenario.pickle.name}`);
  // Lógica adicional si es necesario
});

// ❌ EVITAR: Crear browser en cada test
Given('voy a la página', async function () {
  this.browser = await chromium.launch(); // NO HACER ESTO
  this.page = await this.browser.newPage();
});
```

## Reportes y logs

```typescript
// ✅ CORRECTO: Logs útiles
console.log(`✓ Logged in as: ${email}`);
console.log(`✓ Navigating to checkout...`);

// ✅ Screenshot en fallos
await this.page.screenshot({ path: 'screenshot-failure.png' });

// ❌ EVITAR
console.log('Test'); // No descriptivo
console.log(this.page); // Logs de objetos enormes
```

## Checklist antes de hacer commit

- [ ] Nombres descriptivos (Feature, Page, Steps, Scenarios)
- [ ] Mínimo 1 tag por escenario
- [ ] Given = contexto, When = acción, Then = validación
- [ ] Selectores robustos (getByRole, getByLabel, getByTestId)
- [ ] No hardcode credenciales (usar data/users.json o env vars)
- [ ] Async/await en todo lado
- [ ] TypeScript strict habilitado (no `any`)
- [ ] Tests pasan localmente antes de push
- [ ] Reporte HTML generado sin errores

## Referencias

- [Playwright Selectors Best Practices](https://playwright.dev/docs/locators)
- [Cucumber/Gherkin Guide](https://cucumber.io/docs/gherkin/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
